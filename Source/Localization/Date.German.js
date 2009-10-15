/*
---

script: Date.German.js

description: Date messages for German.

license: MIT-style license

authors:
- Christoph Pojer
- Frank Rossi
- Ulrich Petri

requires:
- /Lang
- /Date

provides: [Date.German]

...
*/

MooTools.lang.set('de-DE', 'Date', {

	months: ['Januar', 'Februar', 'M&auml;rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
	days: ['Sontag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
	//culture's date order: MM/DD/YYYY
	dateOrder: [ 'date', 'month', 'year', '.'],

	AM: 'vormittags',
	PM: 'nachmittags',

	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',

	/* Date.Extras */
	ordinal: '.',

	lessThanMinuteAgo: 'Vor weniger als einer Minute',
	minuteAgo: 'Vor einer Minute',
	minutesAgo: 'Vor {delta} Minuten',
	hourAgo: 'Vor einer Stunde',
	hoursAgo: 'Vor {delta} Stunden',
	dayAgo: 'Vor einem Tag',
	daysAgo: 'Vor {delta} Tagen',
	weekAgo: 'Vor einer Woche',
	weeksAgo: 'Vor {delta} Wochen',
	monthAgo: 'Vor einem Monat',
	monthsAgo: 'Vor {delta} Monaten',
	yearAgo: 'Vor einem Jahr',
	yearsAgo: 'Vor {delta} Jahren',
	lessThanMinuteUntil: 'In weniger als einer Minute',
	minuteUntil: 'In einer Minute',
	minutesUntil: 'In {delta} Minuten',
	hourUntil: 'In ca. einer Stunde',
	hoursUntil: 'In ca. {delta} Stunden',
	dayUntil: 'In einem Tag',
	daysUntil: 'In {delta} Tagen',
	weekUntil: 'In einer Woche',
	weeksUntil: 'In {delta} Wochen',
	monthUntil: 'In einem Monat',
	monthsUntil: 'In {delta} Monaten',
	yearUntil: 'In einem Jahr',
	yearsUntil: 'In {delta} Jahren'
});