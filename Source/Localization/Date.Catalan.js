/*
---

script: Date.Catalan.US.js

description: Date messages for Catalan.

license: MIT-style license

authors:
- Alfons Sanchez

requires:
- /Lang
- /Date

provides: [Date.Catalan]

...
*/

MooTools.lang.set('ca-CA', 'Date', {

	months: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juli', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
	days: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
	//culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],

	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',

	AM: 'AM',
	PM: 'PM',

	/* Date.Extras */
	ordinal: '',

	lessThanMinuteAgo: 'fa menys d`un minut',
	minuteAgo: 'fa un minut',
	minutesAgo: 'fa {delta} minuts',
	hourAgo: 'fa un hora',
	hoursAgo: 'fa unes {delta} hores',
	dayAgo: 'fa un dia',
	daysAgo: 'fa {delta} dies',
	lessThanMinuteUntil: 'menys d`un minut des d`ara',
	minuteUntil: 'un minut des d`ara',
	minutesUntil: '{delta} minuts des d`ara',
	hourUntil: 'un hora des d`ara',
	hoursUntil: 'unes {delta} hores des d`ara',
	dayUntil: '1 dia des d`ara',
	daysUntil: '{delta} dies des d`ara'

});