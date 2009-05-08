/*
Script: Date.Extras.js
	Extends the Date native object to include extra methods (on top of those in Date.js).

	License:
		MIT-style license.

	Authors:
		Aaron Newton

*/

['LastDayOfMonth', 'Ordinal'].each(function(method){
	Date.Methods[method.toLowerCase()] = method;
});


Date.implement({

	timeDiffInWords: function(relative_to){
		return Date.distanceOfTimeInWords(this, relative_to || new Date);
	},

	getOrdinal: function(dayOfMonth){
		return Date.getMsg('ordinal', dayOfMonth || this.get('date'));
	},

	getDayOfYear: function(){
		return ((Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 1, 0, 0, 0)
			- Date.UTC(this.getFullYear(), 0, 1, 0, 0, 0) ) / Date.units.day());
	},

	getLastDayOfMonth: function(){
		var ret = this.clone();
		ret.setMonth(ret.getMonth() + 1, 0);
		return ret.getDate();
	}

});

Date.alias('timeDiffInWords', 'timeAgoInWords');

$extend(Date, {

	distanceOfTimeInWords: function(fromTime, toTime){
		return this.getTimePhrase(((toTime.getTime() - fromTime.getTime()) / 1000).toInt(), fromTime, toTime);
	},

	getTimePhrase: function(delta, fromTime, toTime){
		var getPhrase = function(){
			var suffix;
			if (delta >= 0){
				suffix = 'Ago';
			} else {
				delta = delta * -1;
				suffix = 'Until';
			}
			if (delta < 60){
				return Date.getMsg('lessThanMinute' + suffix, delta);
			} else if (delta < 120){
				return Date.getMsg('minute' + suffix, delta);
			} else if (delta < (45 * 60)){
				delta = (delta / 60).round();
				return Date.getMsg('minutes' + suffix, delta);
			} else if (delta < (90 * 60)){
				return Date.getMsg('hour' + suffix, delta);
			} else if (delta < (24 * 60 * 60)){
				delta = (delta / 3600).round();
				return Date.getMsg('hours' + suffix, delta);
			} else if (delta < (48 * 60 * 60)){
				return Date.getMsg('day' + suffix, delta);
			} else {
				delta = (delta / 86400).round();
				return Date.getMsg('days' + suffix, delta);
			}
		};
		return getPhrase().substitute({delta: delta});
	}

});


Date.parsePatterns.extend([

	{
		// yyyy-mm-ddTHH:MM:SS-0500 (ISO8601) i.e.2007-04-17T23:15:22Z
		// inspired by: http://delete.me.uk/2005/03/iso8601.html
		re: /^(\d{4})(?:-?(\d{2})(?:-?(\d{2})(?:[T ](\d{2})(?::?(\d{2})(?::?(\d{2})(?:\.(\d+))?)?)?(?:Z|(?:([-+])(\d{2})(?::?(\d{2}))?)?)?)?)?)?$/,
		handler: function(bits){
			var offset = 0;
			var d = new Date(bits[1], 0, 1);
			if (bits[3]) d.set('date', bits[3]);
			if (bits[2]) d.set('mo', bits[2] - 1);
			if (bits[4]) d.set('hr', bits[4]);
			if (bits[5]) d.set('min', bits[5]);
			if (bits[6]) d.set('sec', bits[6]);
			if (bits[7]) d.set('ms', ('0.' + bits[7]).toInt() * 1000);
			if (bits[9]){
				offset = (bits[9].toInt() * 60) + bits[10].toInt();
				offset *= ((bits[8] == '-') ? 1 : -1);
			}
			//offset -= d.getTimezoneOffset();
			d.setTime((d * 1) + (offset * 60 * 1000).toInt());
			return d;
		}
	},
	
	{
		// "31st December", "31 Dec 1999", "31 Dec 1999 11:59pm"
		re: /^(\d{1,2})(?:st|nd|rd|th)?\s([a-z]+)(?:,?\s(\d{4}))?(,?\s\d{1,2}(?:[:.]\d{1,2})?(?:[:.]\d{1,2})?\s?(?:[a-z]{2})?)?$/i,
		handler: function(bits){
			var str = (bits[3] || new Date().get('year')) + '-' + (Date.parseMonth(bits[2], true) + 1) + '-' + bits[1];
			if (bits[4]) str += bits[4];
			return Date.parse(str);
		}
	},

	{
		// same as above with month and day switched
		re: /^([a-z]+)\s(\d{1,2})(?:st|nd|rd|th)?(?:,?\s(\d{4}))?(,?\s\d{1,2}(?:[:.]\d{1,2})?(?:[:.]\d{1,2})?\s?(?:[a-z]{2})?)?$/i,
		handler: function(bits){
			var str = (bits[3] || new Date().get('year')) + '-' + (Date.parseMonth(bits[1], true) + 1) + '-' + bits[2];
			if (bits[4]) str += bits[4];
			return Date.parse(str);
		}
	},
	
	{
		// 4th, 23rd
		re: /^(\d{1,2})(?:st|nd|rd|th)?$/i,
		handler: function(bits){
			return new Date().set('date', bits[1]);
		}
	},

	{
		// today
		re: /^tod/i,
		handler: function(){
			return new Date();
		}
	},

	{
		// tomorrow
		re: /^tom/i,
		handler: function(){
			return new Date().increment();
		}
	},

	{
		// yesterday
		re: /^yes/i,
		handler: function(){
			return new Date().decrement();
		}
	},

	{
		// next Wednesday
		re: /^next ([a-z]+)$/i,
		handler: function(bits){
			var d = new Date();
			var day = d.getDay();
			var newDay = Date.parseDay(bits[1], true);
			var addDays = newDay - day;
			if (newDay <= day) addDays += 7;
			return d.set('date', d.getDate() + addDays);
		}
	},

	{
		// last Wednesday
		re: /^last ([a-z]+)$/i,
		handler: function(bits){
			return Date.parse('next ' + bits[1]).decrement('day', 7);
		}
	}

]);
