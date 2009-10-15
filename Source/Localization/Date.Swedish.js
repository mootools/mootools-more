/*
---

script: Date.Swedish.js

description: Date messages for Swedish (SE).

license: MIT-style license

authors:
- Martin Lundgren

requires:
- /Lang
- /Date

provides: [Date.Swedish]

...
*/

MooTools.lang.set('sv-SE', 'Date', {

	months: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
	days: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
	// culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	AM: '',
	PM: '',

	shortDate: '%Y-%m-%d',
	shortTime: '%H:%M',

	/* Date.Extras */
	ordinal: function(dayOfMonth){
		// Not used in Swedish
		return '';
	},

	lessThanMinuteAgo: 'mindre än en minut sedan',
	minuteAgo: 'ungefär en minut sedan',
	minutesAgo: '{delta} minuter sedan',
	hourAgo: 'ungefär en timme sedan',
	hoursAgo: 'ungefär {delta} timmar sedan',
	dayAgo: '1 dag sedan',
	daysAgo: '{delta} dagar sedan',
	lessThanMinuteUntil: 'mindre än en minut sedan',
	minuteUntil: 'ungefär en minut sedan',
	minutesUntil: '{delta} minuter sedan',
	hourUntil: 'ungefär en timme sedan',
	hoursUntil: 'ungefär {delta} timmar sedan',
	dayUntil: '1 dag sedan',
	daysUntil: '{delta} dagar sedan'

});