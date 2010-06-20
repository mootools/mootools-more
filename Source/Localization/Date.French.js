/*
---

script: Date.French.js

name: Date.French

description: Date messages for French.

license: MIT-style license

authors:
  - Nicolas Sorosac
  - Antoine Abt

requires:
  - /Lang

provides: [Date.French]

...
*/

MooTools.lang.set('fr-FR', 'Date', {

	months: ['Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre'],
	months_abbr: ['Jan', 'F&eacute;v', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Ao&ucirc;', 'Sep', 'Oct', 'Nov', 'D&eacute;c'],
  days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  days_abbr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',

	// Date.Extras
	ordinal: 'er',

	lessThanMinuteAgo: "il y a moins d'une minute",
	minuteAgo: 'il y a une minute',
	minutesAgo: 'il y a {delta} minutes',
	hourAgo: 'il y a une heure',
	hoursAgo: 'il y a {delta} heures',
	dayAgo: 'il y a un jour',
	daysAgo: 'il y a {delta} jours',
	weekAgo: 'il y a une semaine',
	weeksAgo: 'il y a {delta} semaines',
	monthAgo: 'il y a 1 mois',
	monthsAgo: 'il y a {delta} mois',
	yearthAgo: 'il y a 1 an',
	yearsAgo: 'il y a {delta} ans',

	lessThanMinuteUntil: "dans moins d'une minute",
	minuteUntil: 'dans une minute',
	minutesUntil: 'dans {delta} minutes',
	hourUntil: 'dans une heure',
	hoursUntil: 'dans {delta} heures',
	dayUntil: 'dans un jour',
	daysUntil: 'dans {delta} jours',
	weekUntil: 'dans 1 semaine',
	weeksUntil: 'dans {delta} semaines',
	monthUntil: 'dans 1 mois',
	monthsUntil: 'dans {delta} mois',
	yearUntil: 'dans 1 an',
	yearsUntil: 'dans {delta} ans'

});
