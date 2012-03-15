/*
---

name: Locale.el-GR.Date

description: Date messages for Greek language.

license: MIT-style license

authors:
  - Periklis Argiriadis

requires:
  - /Locale

provides: [Locale.el-GR.Date]

...
*/

Locale.define('el-GR', 'Date', {

	months: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
	months_abbr: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
	days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
	days_abbr: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%I:%M%p',
	AM: 'πμ',
	PM: 'μμ',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: function(dayOfMonth){
		// 1st, 2nd, 3rd, etc.
		return (dayOfMonth > 3 && dayOfMonth < 21) ? 'ος' : ['ος'][Math.min(dayOfMonth % 10, 4)];
	},

	lessThanMinuteAgo: 'λιγότερο από ένα λεπτό πριν',
	minuteAgo: 'περίπου ένα λεπτό πριν',
	minutesAgo: '{delta} λεπτά πριν',
	hourAgo: 'περίπου μια ώρα πριν',
	hoursAgo: 'περίπου {delta} ώρες πριν',
	dayAgo: '1 ημέρα πριν',
	daysAgo: '{delta} ημέρες πριν',
	weekAgo: '1 εβδομάδα πριν',
	weeksAgo: '{delta} εβδομάδες πριν',
	monthAgo: '1 μήνα πριν',
	monthsAgo: '{delta} μήνες πριν',
	yearAgo: '1 χρόνο πριν',
	yearsAgo: '{delta} χρόνια πριν',

	lessThanMinuteUntil: 'λιγότερο από λεπτό από τώρα',
	minuteUntil: 'περίπου ένα λεπτό από τώρα',
	minutesUntil: '{delta} λεπτά από τώρα',
	hourUntil: 'περίπου μια ώρα από τώρα',
	hoursUntil: 'περίπου {delta} ώρες από τώρα',
	dayUntil: '1 ημέρα από τώρα',
	daysUntil: '{delta} ημέρες από τώρα',
	weekUntil: '1 εβδομάδα από τώρα',
	weeksUntil: '{delta} εβδομάδες από τώρα',
	monthUntil: '1 μήνας από τώρα',
	monthsUntil: '{delta} μήνες από τώρα',
	yearUntil: '1 χρόνος από τώρα',
	yearsUntil: '{delta} χρόνια από τώρα'

});
