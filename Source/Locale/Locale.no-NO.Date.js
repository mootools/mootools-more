/*
---

name: Locale.no-NO.Date

description: Date messages for Norwegian.

license: MIT-style license

authors:
  - Espen 'Rexxars' Hovlandsdal
  - Ole Tøsse Kolvik
requires:
  - /Locale

provides: [Locale.no-NO.Date]

...
*/

Locale.define('no-NO', 'Date', {
	months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
	months_abbr: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	days: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
	days_abbr: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	lessThanMinuteAgo: 'mindre enn et minutt siden',
	minuteAgo: 'omtrent et minutt siden',
	minutesAgo: '{delta} minutter siden',
	hourAgo: 'omtrent en time siden',
	hoursAgo: 'omtrent {delta} timer siden',
	dayAgo: '{delta} dag siden',
	daysAgo: '{delta} dager siden',
	weekAgo: 'en uke siden',
	weeksAgo: '{delta} uker siden',
	monthAgo: 'en måned siden',
	monthsAgo: '{delta} måneder siden',
	yearAgo: 'ett år siden',
	yearsAgo: '{delta} år siden',
	
	lessThanMinuteUntil: 'mindre enn et minutt til',
	minuteUntil: 'omtrent et minutt til',
	minutesUntil: '{delta} minutter til',
	hourUntil: 'omtrent en time til',
	hoursUntil: 'omtrent {delta} timer til',
	dayUntil: 'en dag til',
	daysUntil: '{delta} dager til',
	weekUntil: 'en uke til',
	weeksUntil: '{delta} uker til',
	monthUntil: 'en måned til',
	monthsUntil: '{delta} måneder til',
	yearUntil: 'et år til',
	yearsUntil: '{delta} år til'
});
