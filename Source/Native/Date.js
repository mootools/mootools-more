/*
Script: Date.js
	Extends the Date native object to include methods useful in managing dates.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
		Nicholas Barthelemy - https://svn.nbarthelemy.com/date-js/
		Harald Kirshner - mail [at] digitarald.de; http://digitarald.de

*/

(function(){

['now', 'parse', 'UTC'].each(function(method){
	Native.genericize(Date, method, true);
});

Date.Methods = {};

['Date', 'Day', 'FullYear', 'Hours', 'Milliseconds', 'Minutes', 'Month', 'Seconds', 'Time', 'TimezoneOffset',
	'Week', 'Timezone', 'GMTOffset', 'DayOfYear', 'LastMonth', 'UTCDate', 'UTCDay', 'UTCFullYear',
	'AMPM', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes', 'UTCMonth', 'UTCSeconds'].each(function(method){
	Date.Methods[method.toLowerCase()] = method;
});

$each({
	ms: 'Milliseconds',
	year: 'FullYear',
	min: 'Minutes',
	mo: 'Month',
	sec: 'Seconds',
	hr: 'Hours'
}, function(value, key){
	Date.Methods[key] = value;
});

var zeroize = function(what, length){
	return '0'.repeat(length - what.toString().length) + what;
};

Date.implement({

	set: function(prop, value){
		switch ($type(prop)){
			case 'object':
				for (var p in prop) this.set(p, prop[p]);
				break;
			case 'string':
				prop = prop.toLowerCase();
				var m = Date.Methods;
				if (m[prop]) this['set' + m[prop]](value);
		}
		return this;
	},

	get: function(prop){
		prop = prop.toLowerCase();
		var m = Date.Methods;
		if (m[prop]) return this['get' + m[prop]]();
		return null;
	},

	clone: function(){
		return new Date(this.get('time'));
	},

	increment: function(interval, times){
		return this.multiply(interval, times);
	},

	decrement: function(interval, times){
		return this.multiply(interval, times, false);
	},

	multiply: function(interval, times, increment){
		interval = interval || 'day';
		times = $pick(times, 1);
		increment = $pick(increment, true);
		var multiplier = increment ? 1 : -1;
		var month = this.get('mo');
		var year = this.get('year');
		var time = this.get('time');
		var offset = 0;
		
		switch (interval){
				case 'year':
					times.times(function(val){
						if (Date.isLeapYear(year + val)){
							if      (month >  1 && multiplier > 0) val++;
							else if (month <= 1 && multiplier < 0) val--;
						}
						offset += Date.units.year(year + val);
					});
					break;
				case 'month':
					times.times(function(val){
						if (multiplier < 0) val++;
						var mo = month + (val * multiplier);
						var yr = year;
						if (mo < 0){
							yr--;
							mo += 12;
						}
						if (mo > 11 || mo < 0){
							yr += (mo / 12).toInt() * multiplier;
							mo = mo % 12;
						}
						offset += Date.units.month(mo, yr);
					});
					break;
				case 'day':
					return this.set('date', this.get('date') + (multiplier * times));
				default:
					offset = Date.units[interval]() * times;
					break;
		}
		
		this.set('time', time + (offset * multiplier));
		return this;
	},

	isLeapYear: function(){
		return Date.isLeapYear(this.get('year'));
	},

	clearTime: function(){
		['hr', 'min', 'sec', 'ms'].each(function(t){
			this.set(t, 0);
		}, this);
		return this;
	},

	diff: function(d, resolution){
		resolution = resolution || 'day';
		if ($type(d) == 'string') d = Date.parse(d);
		
		switch (resolution){
			case 'year':
				return d.get('year') - this.get('year');
			case 'month':
				var months = (d.get('year') - this.get('year')) * 12;
				return months + d.get('mo') - this.get('mo');
			default:
				var diff = d.get('time') - this.get('time');
				if (Date.units[resolution]() > diff.abs()) return 0;
				return ((d.get('time') - this.get('time')) / Date.units[resolution]()).round();
		}
		
		return null;
	},

	getWeek: function(){
		return (this.get('dayofyear') / 7).ceil();
	},

	getTimezone: function(){
		return this.toString()
			.replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/, '$1')
			.replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, '$1$2$3');
	},

	getGMTOffset: function(){
		var off = this.get('timezoneOffset');
		return ((off > 0) ? '-' : '+')
			+ zeroize((off.abs() / 60).floor(), 2)
			+ zeroize(off % 60, 2);
	},
	
	setAMPM: function(ampm){
		ampm = ampm.toUpperCase();
		var hr = this.get('hr');
		if (hr > 11 && ampm == 'AM')
			return this.decrement('hour', 12);
		else if (hr < 12 && ampm == 'PM')
			return this.increment('hour', 12);
		return this;
	},
	
	getAMPM: function(){
		return (this.get('hr') < 12) ? 'AM' : 'PM';
	},

	parse: function(str){
		this.set('time', Date.parse(str));
		return this;
	},

	isValid: function(date) {
		return !!(date || this).valueOf();
	},

	format: function(f){
		if (!this.isValid()) return 'invalid date';
		f = f || '%x %X';
		f = formats[f.toLowerCase()] || f;	// replace short-hand with actual format
		var d = this;
		
		return f.replace(/\%([aAbBcdHIjmMpSUWwxXyYTZ\%])/g,
			function($1, $2){
				switch ($2){
					case 'a': return Date.getMsg('days')[d.get('day')].substr(0, 3);
					case 'A': return Date.getMsg('days')[d.get('day')];
					case 'b': return Date.getMsg('months')[d.get('month')].substr(0, 3);
					case 'B': return Date.getMsg('months')[d.get('month')];
					case 'c': return d.toString();
					case 'd': return zeroize(d.get('date'), 2);
					case 'H': return zeroize(d.get('hr'), 2);
					case 'I': return ((d.get('hr') % 12) || 12);
					case 'j': return zeroize(d.get('dayofyear'), 3);
					case 'm': return zeroize((d.get('mo') + 1), 2);
					case 'M': return zeroize(d.get('min'), 2);
					case 'p': return Date.getMsg(d.get('ampm'));
					case 'S': return zeroize(d.get('seconds'), 2);
					case 'U': return zeroize(d.get('week'), 2);
					case 'W': throw new Error('%W is not supported yet');
					case 'w': return d.get('day');
					case 'x': return d.format(Date.getMsg('shortDate'));
					case 'X': return d.format(Date.getMsg('shortTime'));
					case 'y': return d.get('year').toString().substr(2);
					case 'Y': return d.get('year');
					case 'T': return d.get('GMTOffset');
					case 'Z': return d.get('Timezone');
					case '%': return '%';
				}
				return $2;
			}
		);
	},
	
	toISOString: function(){
		return this.format('iso8601');
	}

});

Date.alias('diff', 'compare');
Date.alias('format', 'strftime');

var formats = {
	db: '%Y-%m-%d %H:%M:%S',
	compact: '%Y%m%dT%H%M%S',
	iso8601: '%Y-%m-%dT%H:%M:%S%T',
	rfc822: '%a, %d %b %Y %H:%M:%S %Z',
	'short': '%d %b %H:%M',
	'long': '%B %d, %Y %H:%M'
};

var nativeParse = Date.parse;

var daysInMonth = function(monthIndex, year){
	if (Date.isLeapYear(year) && monthIndex === 1) return 29;
	return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIndex];
};

var parseWord = function(type, word, num){
	var ret = -1;
	var translated = Date.getMsg(type + 's');
	
	switch ($type(word)){
		case 'object':
			ret = translated[word.get(type)];
			break;
		case 'number':
			ret = translated[month - 1];
			if (!ret) throw new Error('Invalid ' + type + ' index:' + index);
			break;
		case 'string':
			var match = translated.filter(function(name){
				return this.test(name);
			}, new RegExp('^' + word, 'i'));
			if (!match.length) throw new Error('Invalid ' + type + ' string');
			if (match.length > 1) throw new Error('Ambiguous ' + type);
			ret = match[0];
	}
	
	return (num) ? translated.indexOf(ret) : ret;
};


$extend(Date, {

	getMsg: function(key, args) {
		return MooTools.lang.get('Date', key, args);
	},

	units: {
		ms: $lambda(1),
		second: $lambda(1000),
		minute: $lambda(60000),
		hour: $lambda(3600000),
		day: $lambda(86400000),
		week: $lambda(608400000),
		month: function(monthIndex, year){
			var d = new Date();
			return daysInMonth($pick(monthIndex, d.get('mo')), $pick(year, d.get('year'))) * 86400000;
		},
		year: function(year){
			year = year || new Date().get('year');
			return Date.isLeapYear(year) ? 31622400000 : 31536000000;
		}
	},

	isLeapYear: function(year){
		return new Date(year, 1, 29).get('date') == 29;
	},

	fixY2K: function(d){
		if (!isNaN(d)){
			var newDate = new Date(d);
			if (newDate.get('year') < 2000 && d.toString().indexOf(newDate.get('year')) < 0)
				newDate.increment('year', 100);
			return newDate;
		} else {
			return d;
		}
	},

	parse: function(from){
		var t = $type(from);
		if (t == 'number') return new Date(from);
		if (t != 'string') return from;
		from = from.clean();
		if (!from.length) return null;
		
		var parsed;
		Date.parsePatterns.some(function(pattern){
			var r = pattern.re.exec(from);
			return (r) ? (parsed = pattern.handler(r)) : false;
		});
		
		return parsed || new Date(nativeParse(from));
	},

	parseDay: function(day, num){
		return parseWord('day', day, num);
	},

	parseMonth: function(month, num){
		return parseWord('month', month, num);
	},

	parseUTC: function(value){
		var localDate = new Date(value);
		var utcSeconds = Date.UTC(localDate.get('year'), localDate.get('mo'),
		localDate.get('date'), localDate.get('hr'), localDate.get('min'), localDate.get('sec'));
		return new Date(utcSeconds);
	},

	orderIndex: function(unit){
		return Date.getMsg('dateOrder').indexOf(unit) + 1;
	},

	defineFormat: function(f, format){
		formats[f] = format;
		return Date;
	},

	defineFormats: function(format){
		for (var f in format) Date.defineFormat(f, format[f]);
		return Date;
	},

	parsePatterns: [],
	
	defineParser: function(format){
		Date.parsePatterns.push( (format.re && format.handler) ? format : build(format) );
		return Date;
	},
	
	defineParsers: function(){
		Array.flatten(arguments).each(function(format){
			Date.defineParser(format);
		});
		return Date;
	}

});

var keys = {
	a: /[a-z]{3,}/,
	d: /\d{1,2}/,
	s: /\d+/,
	y: /\d{2}|\d{4}/,
	Y: /\d{4}/,
	T: /Z|[+-]\d{2}(?::?\d{2})?/,
	
	o: /[^\d\s]*/,
	X: /%H([.:]%M)?([.:]%S([.:]%s)?)?\s?%p?\s?%T?/
};

keys.B = keys.b = keys.A = keys.a;
keys.H = keys.I = keys.m = keys.M = keys.S = keys.d;

var parsers = function(key){
	switch(key){
		case 'p':
			return ['[ap]\\.?m\\.?', Date.getMsg('AM'), Date.getMsg('PM')].join('|');
		case 'x':
			return (Date.orderIndex('month') == 1) ? '%m[.-/]%d([.-/]%y)?' : '%d[.-/]%m([.-/]%y)?';
	}
	return keys[key] ? keys[key].source : null;
};

var lang;

var build = function(format){
	if (!lang) return {format: format};	// wait until language is set
	
	var parsed = [null];

	var re = (format.source || format)	// allow format to be regex
	 .replace(/%([xXo])/g,
		function($1, $2){
			return parsers($2) || $2;
		}
	).replace(/\((?!\?)/g, '(?:')		// make all groups non-capturing
	 .replace(/ (?!\?|\*)/g, ',? ')		// be forgiving with spaces and commas
	 .replace(/%([a-z%])/gi,
		function($1, $2){
			var f = parsers($2);
			if (!f) return $2;
			parsed.push($2);
			return '(' + f + ')';
		}
	);
	
	return {
		format: format,
		re: new RegExp('^' + re + '$', 'i'),
		
		handler: function(bits){
			var date = new Date;

			for (var i = 1; i < parsed.length; i++)
				date = handle.call(date, parsed[i], bits[i]);

			return date;
		}
	};
};

var handle = function(key, value){
	if (!value){
		if (/[HIMSs]/.test(key)) value = 0;
		else if (/[md]/.test(key)) value = 1;
		else return this;
	}
	
	switch(key){
		case 'a': case 'A': return this.set('day', Date.parseDay(value, true));
		case 'b': case 'B': return this.set('mo', Date.parseMonth(value, true));
		case 'd': 			return this.set('date', value);
		case 'H': case 'I': return this.set('hr', value);
		case 'm':			return this.set('mo', value - 1);
		case 'M':			return this.set('min', value);
		case 'p':			return this.set('ampm', value.replace(/\./g, ''));
		case 'S':			return this.set('sec', value);
		case 's': 			return this.set('ms', ('0.' + value) * 1000);
		case 'w':			return this.set('day', value);
		case 'Y':			return this.set('year', value);
		case 'y':			this.setYear(value); return Date.fixY2K(this);
		case 'T':
			if (value == 'Z') value = '+00';
			var offset = value.match(/([+-]\d{2}):?(\d{2})?/);
			offset = offset[1] * 60 + (offset[2] || 0).toInt() + this.getTimezoneOffset();
			return this.set('time', (this * 1) + offset * 60000);
	}
	
	return this;
};

Date.defineParsers(
	'%Y([-./]%m([-./]%d((T| )%X)?)?)?',		// "1999-12-31", "1999-12-31 11:59pm", "1999-12-31 23:59:59", ISO8601
	'%x( %X)?',								// "12/31", "12.31.99", "12-31-1999", "12/31/2008 11:59 PM"
	'%d%o( %b( %Y)?)?( %X)?',				// "31st", "31st December", "31 Dec 1999", "31 Dec 1999 11:59pm"
	'%b( %d%o)?( %Y)?( %X)?',				// "December 1999" and same as above with month and day switched
	'%Y%m%dT%H%M%S'							// compact
);

MooTools.lang.addEvent('langChange', function(language){
	if (!MooTools.lang.get('Date')) return;
	
	lang = language;
	Date.parsePatterns.each(function(pattern, i){
		if (pattern.format) Date.parsePatterns[i] = build(pattern.format);
	});
	
});

})();