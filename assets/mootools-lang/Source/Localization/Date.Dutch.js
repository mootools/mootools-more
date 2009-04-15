/*
Script: Date.Dutch.js
	Date messages in Dutch.

	License:
		MIT-style license.

	Authors:
		Lennart Pilon

*/

MooTools.lang.set('nl-NL', 'Date', {

	months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustys', 'September', 'Oktober', 'November', 'December'],
	days: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
	//culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],

	AM: 'AM',
	PM: 'PM',

	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',

	/* Date.Extras */
	ordinal: 'e',

	lessThanMinuteAgo: 'korter dan een minuut geleden',
	minuteAgo: 'ongeveer een minuut geleden',
	minutesAgo: 'minuten geleden',
	hourAgo: 'ongeveer een uur geleden',
	hoursAgo: 'ongeveer {delta} uur geleden',
	dayAgo: '{delta} dag geleden',
	daysAgo: 'dagen geleden',
	lessThanMinuteUntil: 'minder dan een minuut vanaf nu',
	minuteUntil: 'ongeveer een minuut vanaf nu',
	minutesUntil: '{delta} minuten vanaf nu',
	hourUntil: 'ongeveer een uur vanaf nu',
	hoursUntil: 'ongeveer {delta} uur vanaf nu',
	dayUntil: '1 dag vanaf nu',
	daysUntil: '{delta} dagen vanaf nu'

})