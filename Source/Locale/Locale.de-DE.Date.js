/*
---

name: Locale.de-DE.Date

description: Date messages for German.

license: MIT-style license

authors:
  - Christoph Pojer
  - Frank Rossi
  - Ulrich Petri
  - Fabian Beiner

requires:
  - /Locale

provides: [Locale.de-DE.Date]

...
*/

Locale.define('de-DE', 'Date', {

	months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
	months_abbr: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
	days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
	days_abbr: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'vormittags',
	PM: 'nachmittags',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'vor weniger als einer Minute',
	minuteAgo: 'vor einer Minute',
	minutesAgo: 'vor {delta} Minuten',
	hourAgo: 'vor einer Stunde',
	hoursAgo: 'vor {delta} Stunden',
	dayAgo: 'vor einem Tag',
	daysAgo: 'vor {delta} Tagen',
	weekAgo: 'vor einer Woche',
	weeksAgo: 'vor {delta} Wochen',
	monthAgo: 'vor einem Monat',
	monthsAgo: 'vor {delta} Monaten',
	yearAgo: 'vor einem Jahr',
	yearsAgo: 'vor {delta} Jahren',

	lessThanMinuteUntil: 'in weniger als einer Minute',
	minuteUntil: 'in einer Minute',
	minutesUntil: 'in {delta} Minuten',
	hourUntil: 'in ca. einer Stunde',
	hoursUntil: 'in ca. {delta} Stunden',
	dayUntil: 'in einem Tag',
	daysUntil: 'in {delta} Tagen',
	weekUntil: 'in einer Woche',
	weeksUntil: 'in {delta} Wochen',
	monthUntil: 'in einem Monat',
	monthsUntil: 'in {delta} Monaten',
	yearUntil: 'in einem Jahr',
	yearsUntil: 'in {delta} Jahren'

});
