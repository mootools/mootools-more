/*
Script: Date.Czech.js
	Date messages for Czech.

	License:
		MIT-style license.

	Authors:
		Jan Černý chemiX

*/

MooTools.lang.set('cs-CZ', 'Date', {

	months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
	days: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
	//culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'dop.',
	PM: 'odp.',

	/* Date.Extras */
	ordinal: function(dayOfMonth){
		return '.';
	},

    // TODO : in examples use and fix it
	lessThanMinuteAgo: 'méně než minutou',
	minuteAgo: 'přibližně před minutou',
	minutesAgo: 'před {delta} minutami',
	hourAgo: 'přibližně před hodinou',
	hoursAgo: 'před {delta} hodinami',
	dayAgo: 'před dnem',
	daysAgo: 'před {delta} dni',
	lessThanMinuteUntil: 'před méně než minutou',
	minuteUntil: 'asi před minutou',
	minutesUntil: ' asi před {delta} minutami',
	hourUntil: 'asi před hodinou',
	hoursUntil: 'před {delta} hodinami',
	dayUntil: 'před dnem',
	daysUntil: 'před {delta} dni'

});
