/*
---

script: Date.Dutch.js

description: Date messages in Dutch.

license: MIT-style license

authors:
- Lennart Pilon

requires:
- /Lang
- /Date

provides: [Date.Dutch]

...
*/

MooTools.lang.set('nl-NL', 'Date', {

	months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
	days: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
	//culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],

	AM: 'AM',
	PM: 'PM',

	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',

	/* Date.Extras */
	ordinal: 'e',

	lessThanMinuteAgo: 'minder dan een minuut geleden',
	minuteAgo: 'ongeveer een minuut geleden',
	minutesAgo: 'minuten geleden',
	hourAgo: 'ongeveer een uur geleden',
	hoursAgo: 'ongeveer {delta} uur geleden',
	dayAgo: '{delta} dag geleden',
	daysAgo: 'dagen geleden',
	weekAgo: 'een week geleden',
	weeksAgo: '{delta} weken geleden',
	monthAgo: 'een maand geleden',
	monthsAgo: '{delta} maanden geleden',
	yearAgo: 'een jaar geleden',
	yearsAgo: '{delta} jaar geleden',
	lessThanMinuteUntil: 'minder dan een minuut vanaf nu',
	minuteUntil: 'ongeveer een minuut vanaf nu',
	minutesUntil: '{delta} minuten vanaf nu',
	hourUntil: 'ongeveer een uur vanaf nu',
	hoursUntil: 'ongeveer {delta} uur vanaf nu',
	dayUntil: '1 dag vanaf nu',
	daysUntil: '{delta} dagen vanaf nu',
	weekAgo: 'een week geleden',
	weeksAgo: '{delta} weken geleden',
	monthAgo: 'een maand geleden',
	monthsAgo: '{delta} maanden geleden',
	yearthAgo: 'een jaar geleden',
	yearsAgo: '{delta} jaar geleden',

	weekUntil: 'over een week',
	weeksUntil: 'over {delta} weken',
	monthUntil: 'over een maand',
	monthsUntil: 'over {delta} maanden',
	yearUntil: 'over een jaar',
	yearsUntil: 'over {delta} jaar' 

});