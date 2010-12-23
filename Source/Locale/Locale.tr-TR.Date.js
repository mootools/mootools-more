/*
---

name: Locale.tr-TR.Date

description: Date messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - /Locale

provides: [Locale.tr-TR.Date]

...
*/

Locale.define('tr-TR', 'Date', {

	months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
	months_abbr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
	days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
	days_abbr: ['Pa', 'Pzt', 'Sa', 'Ça', 'Pe', 'Cu', 'Cmt'],

	// Culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H.%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'bir dakikadan önce',
	minuteAgo: 'yaklaşık bir dakika önce',
	minutesAgo: '{delta} dakika önce',
	hourAgo: 'bir saat kadar önce',
	hoursAgo: '{delta} saat kadar önce',
	dayAgo: 'bir gün önce',
	daysAgo: '{delta} gün önce',
	weekAgo: 'bir hafta önce',
	weeksAgo: '{delta} hafta önce',
	monthAgo: 'bir ay önce',
	monthsAgo: '{delta} ay önce',
	yearAgo: 'bir yıl önce',
	yearsAgo: '{delta} yıl önce',

	lessThanMinuteUntil: 'bir dakikadan az sonra',
	minuteUntil: 'bir dakika kadar sonra',
	minutesUntil: '{delta} dakika sonra',
	hourUntil: 'bir saat kadar sonra',
	hoursUntil: '{delta} saat kadar sonra',
	dayUntil: 'bir gün sonra',
	daysUntil: '{delta} gün sonra',
	weekUntil: 'bir hafta sonra',
	weeksUntil: '{delta} hafta sonra',
	monthUntil: 'bir ay sonra',
	monthsUntil: '{delta} ay sonra',
	yearUntil: 'bir yıl sonra',
	yearsUntil: '{delta} yıl sonra'

});
