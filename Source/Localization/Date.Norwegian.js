/*
---

script: Date.Norwegian.js

description: Date messages in Norwegian.

license: MIT-style license

authors:
- Espen 'Rexxars' Hovlandsdal

requires:
- /Lang
- /Date

provides: [Date.Norwegian]

...
*/

MooTools.lang.set('no-NO', 'Date', {

	dateOrder: ['date', 'month', 'year'],

	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',

	lessThanMinuteAgo: 'kortere enn et minutt siden',
	minuteAgo: 'omtrent et minutt siden',
	minutesAgo: '{delta} minutter siden',
	hourAgo: 'omtrent en time siden',
	hoursAgo: 'omtrent {delta} timer siden',
	dayAgo: '{delta} dag siden',
	daysAgo: '{delta} dager siden'

});