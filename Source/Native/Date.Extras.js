/*
Script: Date.Extras.js
	Extends the Date native object to include extra methods (on top of those in Date.js).

	License:
		MIT-style license.

	Authors:
		Aaron Newton

*/

Date.implement({

	timeDiffInWords: function(relative_to){
		return Date.distanceOfTimeInWords(this, relative_to || new Date);
	}

});

Date.alias('timeDiffInWords', 'timeAgoInWords');

Date.extend({

	distanceOfTimeInWords: function(from, to){
		return Date.getTimePhrase(((to - from) / 1000).toInt());
	},

	getTimePhrase: function(delta){
		var suffix = (delta < 0) ? 'Until' : 'Ago';
		if (delta < 0) delta *= -1;
		
		var msg = (delta < 60) ? 'lessThanMinute' :
				  (delta < 120) ? 'minute' :
				  (delta < (45 * 60)) ? 'minutes' :
				  (delta < (90 * 60)) ? 'hour' :
				  (delta < (24 * 60 * 60)) ? 'hours' :
				  (delta < (48 * 60 * 60)) ? 'day' :
				  (delta < (7 * 24 * 60 * 60)) ? 'days' :
				  (delta < (14 * 24 * 60 * 60)) ? 'week' :
				  (delta < (30 * 24 * 60 * 60)) ? 'weeks' :
				  (delta < (60 * 24 * 60 * 60)) ? 'month' :
				  (delta < (12 * 30 * 24 * 60 * 60)) ? 'months' :
				  (delta < (24 * 30 * 24 * 60 * 60)) ? 'year' :
				  'years';
		
		switch(msg){
			case 'minutes': delta = (delta / 60).round(); break;
			case 'hours':   delta = (delta / 3600).round(); break;
			case 'days': 	delta = (delta / 86400).round(); break;
			case 'weeks': 	delta = (delta / 604800).round(); break;
			case 'months': 	delta = (delta / 2592000).round(); break;
			case 'years': 	delta = (delta / 31104000).round();
		}
		
		return Date.getMsg(msg + suffix, delta).substitute({delta: delta});
	}

});


Date.defineParsers(

	{
		// "today", "tomorrow", "yesterday"
		re: /^tod|tom|yes/i,
		handler: function(bits){
			var d = new Date().clearTime();
			switch(bits[0]){
				case 'tom': return d.increment();
				case 'yes': return d.decrement();
				default: 	return d;
			}
		}
	},

	{
		// "next Wednesday", "last Thursday"
		re: /^(next|last) ([a-z]+)$/i,
		handler: function(bits){
			var d = new Date().clearTime();
			var day = d.getDay();
			var newDay = Date.parseDay(bits[2], true);
			var addDays = newDay - day;
			if (newDay <= day) addDays += 7;
			if (bits[1] == 'last') addDays -= 7;
			return d.set('date', d.getDate() + addDays);
		}
	}

);
