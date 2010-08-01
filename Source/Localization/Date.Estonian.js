/*
---

script: Date.Estonian.js

name: Date.Estonian

description: Date messages for Estonian.

license: MIT-style license

authors:
  - Kevin Valdek

requires:
  - /Lang

provides: [Date.Estonian]

...
*/

MooTools.lang.set('et-EE', 'Date', {

	months: ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'],
	days: ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'],

	// Culture's date order: MM.DD.YYYY
	dateOrder: ['month', 'date', 'year'],
	shortDate: '%m.%d.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'vähem kui minut aega tagasi',
	minuteAgo: 'umbes minut aega tagasi',
	minutesAgo: '{delta} minutit tagasi',
	hourAgo: 'umbes tund aega tagasi',
	hoursAgo: 'umbes {delta} tundi tagasi',
	dayAgo: '1 päev tagasi',
	daysAgo: '{delta} päeva tagasi',
	weekAgo: '1 nädal tagasi',
	weeksAgo: '{delta} nädalat tagasi',
	monthAgo: '1 kuu tagasi',
	monthsAgo: '{delta} kuud tagasi',
	yearAgo: '1 aasta tagasi',
	yearsAgo: '{delta} aastat tagasi',

	lessThanMinuteUntil: 'vähem kui minuti aja pärast',
	minuteUntil: 'umbes minuti aja pärast',
	minutesUntil: '{delta} minuti pärast',
	hourUntil: 'umbes tunni aja pärast',
	hoursUntil: 'umbes {delta} tunni pärast',
	dayUntil: '1 päeva pärast',
	daysUntil: '{delta} päeva pärast',
	weekUntil: '1 nädala pärast',
	weeksUntil: '{delta} nädala pärast',
	monthUntil: '1 kuu pärast',
	monthsUntil: '{delta} kuu pärast',
	yearUntil: '1 aasta pärast',
	yearsUntil: '{delta} aasta pärast'

});
