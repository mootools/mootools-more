/*
Script: Date.Italian.js
	Date messages for Italian.

	License:
    	MIT-style license.

	Authors:
		Andrea Novero
		Valerio Proietti

*/
 
MooTools.lang.set('it-IT', 'Date', {
 
	months: function(i) {
		return ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'][i];
	},
	days: function(i) {
		return ['Domenica', 'Luned&igrave;', 'Marted&igrave;', 'Mercoled&igrave;', 'Gioved&igrave;', 'Venerd&igrave;', 'Sabato'][i];
	},
	//culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year', '/'],
	AM: 'AM',
	PM: 'PM',

	/* Date.Extras */
	ordinal: '&ordm;',

	lessThanMinuteAgo: 'meno di un minuto fa',
	minuteAgo: 'circa un minuto fa',
	minutesAgo: 'circa {delta} minuti fa',
	hourAgo: 'circa un\'ora fa',
	hoursAgo: 'circa {delta} ore fa',
	dayAgo: 'circa 1 giorno fa',
	daysAgo: 'circa {delta} giorni fa',
	lessThanMinuteUntil: 'tra meno di un minuto',
	minuteUntil: 'tra circa un minuto',
	minutesUntil: 'tra circa {delta} minuti',
	hourUntil: 'tra circa un\'ora',
	hoursUntil: 'tra circa {delta} ore',
	dayUntil: 'tra circa un giorno',
	daysUntil: 'tra circa {delta} giorni'

});