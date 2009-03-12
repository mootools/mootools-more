/*
Script: Date.French.js
	Date messages in French.

	License:
		MIT Style License

	Authors:
		Nicolas Sorosac

*/
 
MooTools.lang.set('fr-FR', 'Date', {

	months: function(i) {
		return ['janvier', 'f&eacute;vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'ao&ucirc;t', 'septembre', 'octobre', 'novembre', 'd&eacute;cembre'][i];
	},
	days: function(i){
		return ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][i]
	},
	dateOrder: ['date', 'month', 'year', '/'],
	AM: 'AM',
	PM: 'PM',

	/* Date.Extras */
	getOrdinal: function(dayOfMonth){
	  return (dayOfMonth > 1) ? '' : 'er';
	},

	lessThanMinuteAgo: 'il y a moins d\'une minute',
	minuteAgo: 'il y a une minute',
	minutesAgo: 'il y a {delta} minutes',
	hourAgo: 'il y a une heure',
	hoursAgo: 'il y a {delta} heures',
	dayAgo: 'il y a un jour',
	daysAgo: 'il y a {delta} jours',
	lessThanMinuteUntil: 'dans moins d\'une minute',
	minuteUntil: 'dans une minute',
	minutesUntil: 'dans {delta} minutes',
	hourUntil: 'dans une heure',
	hoursUntil: 'dans {delta} heures',
	dayUntil: 'dans un jour',
	daysUntil: 'dans {delta} jours'

});