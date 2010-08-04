/*
---

script: Date.Hungarian.js

name: Date.Hungarian

description: Date messages for Hungarian.

license: MIT-style license

authors:
  - Zsolt Szegheő

requires:
  - /Lang

provides: [Date.Hungarian]

...
*/

MooTools.lang.set('hu-HU', 'Date', {

	months: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
	days: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],

	// Culture's date order: YYYY.MM.DD.
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y.%m.%d.',
	shortTime: '%I:%M',
	AM: 'de.',
	PM: 'du.',

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'alig egy perce',
	minuteAgo: 'egy perce',
	minutesAgo: '{delta} perce',
	hourAgo: 'egy órája',
	hoursAgo: '{delta} órája',
	dayAgo: '1 napja',
	daysAgo: '{delta} napja',
	weekAgo: '1 hete',
	weeksAgo: '{delta} hete',
	monthAgo: '1 hónapja',
	monthsAgo: '{delta} hónapja',
	yearAgo: '1 éve',
	yearsAgo: '{delta} éve',

	lessThanMinuteUntil: 'alig egy perc múlva',
	minuteUntil: 'egy perc múlva',
	minutesUntil: '{delta} perc múlva',
	hourUntil: 'egy óra múlva',
	hoursUntil: '{delta} óra múlva',
	dayUntil: '1 nap múlva',
	daysUntil: '{delta} nap múlva',
	weekUntil: '1 hét múlva',
	weeksUntil: '{delta} hét múlva',
	monthUntil: '1 hónap múlva',
	monthsUntil: '{delta} hónap múlva',
	yearUntil: '1 év múlva',
	yearsUntil: '{delta} év múlva'

});
