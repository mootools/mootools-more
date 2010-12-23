/*
---

name: Locale.he-IL.Date

description: Date messages for Hebrew.

license: MIT-style license

authors:
  - Elad Ossadon

requires:
  - /Locale

provides: [Locale.he-IL.Date]

...
*/

Locale.define('he-IL', 'Date', {

	months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
	months_abbr: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
	days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
	days_abbr: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 0,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'לפני פחות מדקה',
	minuteAgo: 'לפני כדקה',
	minutesAgo: 'לפני {delta} דקות',
	hourAgo: 'לפני כשעה',
	hoursAgo: 'לפני {delta} שעות',
	dayAgo: 'לפני יום',
	daysAgo: 'לפני {delta} ימים',
	weekAgo: 'לפני שבוע',
	weeksAgo: 'לפני {delta} שבועות',
	monthAgo: 'לפני חודש',
	monthsAgo: 'לפני {delta} חודשים',
	yearAgo: 'לפני שנה',
	yearsAgo: 'לפני {delta} שנים',

	lessThanMinuteUntil: 'בעוד פחות מדקה',
	minuteUntil: 'בעוד כדקה',
	minutesUntil: 'בעוד {delta} דקות',
	hourUntil: 'בעוד כשעה',
	hoursUntil: 'בעוד {delta} שעות',
	dayUntil: 'בעוד יום',
	daysUntil: 'בעוד {delta} ימים',
	weekUntil: 'בעוד שבוע',
	weeksUntil: 'בעוד {delta} שבועות',
	monthUntil: 'בעוד חודש',
	monthsUntil: 'בעוד {delta} חודשים',
	yearUntil: 'בעוד שנה',
	yearsUntil: 'בעוד {delta} שנים'

});
