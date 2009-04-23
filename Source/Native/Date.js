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

new Native({name: 'Date', initialize: Date, protect: true});

['now','parse','UTC'].each(function(method){
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

	get: function(key){
		key = key.toLowerCase();
		var m = Date.Methods;
		if (m[key]) return this['get' + m[key]]();
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
		var month = this.format('%m').toInt() - 1;
		var year = this.format('%Y').toInt();
		var time = this.get('time');
		var offset = 0;
		switch (interval) {
				case 'year':
					times.times(function(val) {
						if (Date.isLeapYear(year+val) && month > 1 && multiplier > 0) val++;
						if (Date.isLeapYear(year+val) && month <= 1 && multiplier < 0) val--;
						offset += Date.units.year(year+val);
					});
					break;
				case 'month':
					times.times(function(val){
						if (multiplier < 0) val++;
						var mo = month+(val * multiplier);
						var year = year;
						if (mo < 0) {
							year--;
							mo = 12+mo;
						}
						if (mo > 11 || mo < 0) {
							year += (mo / 12).toInt() * multiplier;
							mo = mo % 12;
						}
						offset += Date.units.month(mo, year);
					});
					break;
				case 'day':
					return this.set('date', this.get('date')+(multiplier*times));
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
				return d.format('%Y').toInt() - this.format('%Y').toInt();
				break;
			case 'month':
				var months = (d.format('%Y').toInt() - this.format('%Y').toInt())*12;
				return months + d.format('%m').toInt() - this.format('%m').toInt();
				break;
			default:
				var diff = d.get('time') - this.get('time');
				if (diff < 0 && Date.units[resolution]() > (-1*(diff))) return 0;
				else if (diff >= 0 && diff < Date.units[resolution]()) return 0;
				return ((d.get('time') - this.get('time')) / Date.units[resolution]()).round();
		}
		return null;
	},

	getWeek: function(){
		var day = (new Date(this.get('year'), 0, 1)).get('date');
		return Math.round((this.get('dayofyear') + (day > 3 ? day - 4 : day + 3)) / 7);
	},

	getTimezone: function(){
		return this.toString()
			.replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/, '$1')
			.replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, '$1$2$3');
	},

	getGMTOffset: function(){
		var off = this.get('timezoneOffset');
		return ((off > 0) ? '-' : ' + ')
			+ zeroize(Math.floor(Math.abs(off) / 60), 2)
			+ zeroize(off % 60, 2);
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
		//replace short-hand with actual format
		f = ({
			db: '%Y-%m-%d %H:%M:%S',
			compact: '%Y%m%dT%H%M%S',
			iso8601: '%Y-%m-%dT%H:%M:%S%T',
			rfc822: '%a, %d %b %Y %H:%M:%S %Z',
			'short': '%d %b %H:%M',
			'long': '%B %d, %Y %H:%M'
		})[f.toLowerCase()] || f;
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
					case 'p': return Date.getMsg(d.get('hr') < 12 ? 'AM' : 'PM');
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

	setAMPM: function(ampm){
		ampm = ampm.toUpperCase();
		if (this.format('%H').toInt() > 11 && ampm == 'AM')
			return this.decrement('hour', 12);
		else if (this.format('%H').toInt() < 12 && ampm == 'PM')
			return this.increment('hour', 12);
		return this;
	}

});

Date.alias('diff', 'compare');
Date.alias('format', 'strftime');

var nativeParse = Date.parse;

var daysInMonth = function(monthIndex, year){
	if (Date.isLeapYear(year.toInt()) && monthIndex === 1) return 29;
	return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIndex];
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
			return daysInMonth($pick(monthIndex,d.format('%m').toInt()), $pick(year,d.format('%Y').toInt())) * 86400000;
		},
		year: function(year){
			year = year || new Date().format('%Y').toInt();
			return Date.isLeapYear(year.toInt()) ? 31622400000 : 31536000000;
		}
	},

	isLeapYear: function(yr){
		return new Date(yr , 1, 29).getDate() == 29;
	},

	fixY2K: function(d){
		if (!isNaN(d)){
			var newDate = new Date(d);
			if (newDate.get('year') < 2000 && d.toString().indexOf(newDate.get('year')) < 0) newDate.increment('year', 100);
			return newDate;
		} else {
			return d;
		}
	},

	parse: function(from){
		var t = $type(from);
		if (t == 'number') return new Date(from);
		if (t != 'string') return from;
		if (!from.length) return null;
		var parsed;
		Date.parsePatterns.each(function(pattern, i){
			if (parsed) return;
			var r = pattern.re.exec(from);
			if (r) parsed = pattern.handler(r);
		});
		return parsed || new Date(nativeParse(from));
	},

	parseDay: function(day, num){
		var ret = -1;
		switch ($type(day)){
			case 'number':
				ret = Date.getMsg('days')[day - 1] || false;
				if (!ret) throw new Error('Invalid day index value must be between 1 and 7');
				break;
			case 'string':
				var match = Date.getMsg('days').filter(function(name){
					return this.test(name);
				}, new RegExp('^' + day, 'i'));
				if (!match.length) throw new Error('Invalid day string');
				if (match.length > 1) throw new Error('Ambiguous day');
				ret = match[0];
		}
		return (num) ? Date.getMsg('days').indexOf(ret) : ret;
	},

	parseMonth: function(month, num){
		var ret = -1;
		switch ($type(month)){
			case 'object':
				ret = Date.getMsg('months')[month.get('mo')];
				break;
			case 'number':
				ret = Date.getMsg('months')[month - 1] || false;
				if (!ret) throw new Error('Invalid month index value must be between 1 and 12:' + index);
				break;
			case 'string':
				var match = Date.getMsg('months').filter(function(name){
					return this.test(name);
				}, new RegExp('^' + month, 'i'));
				if (!match.length) throw new Error('Invalid month string');
				if (match.length > 1) throw new Error('Ambiguous month');
				ret = match[0];
		}
		return (num) ? Date.getMsg('months').indexOf(ret) : ret;
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

	parsePatterns: [
		{
			//"1999-12-31"
			re: /^(\d{4})[\.\-\/](\d{1,2})[\.\-\/](\d{1,2})$/,
			handler: function(bits){
				return new Date(bits[1], bits[2] - 1, bits[3]);
			}
		},
		{
			//"1999-12-31 23:59:59"
			re: /^(\d{4})[\.\-\/](\d{1,2})[\.\-\/](\d{1,2})\s(\d{1,2}):(\d{1,2})(?:\:(\d{1,2}))?(\w{2})?$/,
			handler: function(bits){
				var d = new Date(bits[1], bits[2] - 1, bits[3]);
				d.set('hr', bits[4]);
				d.set('min', bits[5]);
				d.set('sec', bits[6] || 0);
				if (bits[7]) d.set('ampm', bits[7]);
				return d;
			}
		},
		{
			//"12.31.08", "12-31-08", "12/31/08", "12.31.2008", "12-31-2008", "12/31/2008"
			re: /^(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{2,4})$/,
			handler: function(bits){
				var d = new Date(bits[Date.orderIndex('year')],
								 bits[Date.orderIndex('month')] - 1,
								 bits[Date.orderIndex('date')]);
				return Date.fixY2K(d);
			}
		},
		//"12.31.08", "12-31-08", "12/31/08", "12.31.2008", "12-31-2008", "12/31/2008"
		//above plus "10:45pm" ex: 12.31.08 10:45pm
		{
			re: /^(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{2,4})\s(\d{1,2})[:\.](\d{1,2})(?:[\:\.](\d{1,2}))?(\w{2})?$/,
			handler: function(bits){
				var d = new Date(bits[Date.orderIndex('year')],
								 bits[Date.orderIndex('month')] - 1,
								 bits[Date.orderIndex('date')]);
				d.set('hr', bits[4]);
				d.set('min', bits[5]);
				d.set('sec', bits[6] || 0);
				if (bits[7]) d.set('ampm', bits[7]);
				return Date.fixY2K(d);
			}
		}
	]

});

})();