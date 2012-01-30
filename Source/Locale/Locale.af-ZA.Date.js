/*
---

name: Locale.af-ZA.Date

description: Date messages for ZA Afrikaans.

license: MIT-style license

authors:
  - Werner Mollentze

requires:
  - /Locale

provides: [Locale.af-ZA.Date]

...
*/

Locale.define('af-ZA', 'Date', {

	months: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember'],
	months_abbr: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	days: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
	days_abbr: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d-%m-%Y',
	shortTime: '%H:%M',
	AM: 'VM',
	PM: 'NM',
	firstDayOfWeek: 1,
   
	// Date.Extras
	ordinal: function(dayOfMonth){
		return ((dayOfMonth > 1 && dayOfMonth < 20 && dayOfMonth != 8) || (dayOfMonth > 100 && dayOfMonth.toString().substr(-2, 1) == '1')) ? 'de' : 'ste';
	},

	lessThanMinuteAgo: 'minder as \'n minuut gelede',
	minuteAgo: 'ongeveer \'n minuut gelede',
	minutesAgo: '{delta} minute gelede',
	hourAgo: 'omtret \'n uur gelede',
	hoursAgo: 'ongeveer {delta} ure gelede',
	dayAgo: '1 dag gelede',
	daysAgo: '{delta} dae gelede',
	weekAgo: '1 week gelede',
	weeksAgo: '{delta} weke gelede',
	monthAgo: '1 maand gelede',
	monthsAgo: '{delta} maande gelede',
	yearAgo: '1 jaar gelede',
	yearsAgo: '{delta} jare gelede',

	lessThanMinuteUntil: 'oor minder as \'n minuut',
	minuteUntil: 'oor ongeveer \'n minuut',
	minutesUntil: 'oor {delta} minute',
	hourUntil: 'oor ongeveer \'n uur',
	hoursUntil: 'oor {delta} uur',
	dayUntil: 'oor ongeveer \'n dag',
	daysUntil: 'oor {delta} dae',
	weekUntil: 'oor \'n week',
	weeksUntil: 'oor {delta} weke',
	monthUntil: 'oor \'n maand',
	monthsUntil: 'oor {delta} maande',
	yearUntil: 'oor \'n jaar',
	yearsUntil: 'oor {delta} jaar'

});
