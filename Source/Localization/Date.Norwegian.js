/*
---

script: Date.Norwegian.js

name: Date.Norwegian

description: Date messages for Norwegian.

license: MIT-style license

authors:
  - Espen 'Rexxars' Hovlandsdal

requires:
  - /Lang

provides: [Date.Norwegian]

...
*/

MooTools.lang.set('no-NO', 'Date', {

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',

	lessThanMinuteAgo: 'kortere enn et minutt siden',
	minuteAgo: 'omtrent et minutt siden',
	minutesAgo: '{delta} minutter siden',
	hourAgo: 'omtrent en time siden',
	hoursAgo: 'omtrent {delta} timer siden',
	dayAgo: '{delta} dag siden',
	daysAgo: '{delta} dager siden'

});
