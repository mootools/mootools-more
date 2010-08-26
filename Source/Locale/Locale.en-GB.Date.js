/*
---

name: Locale.en-GB.Date

description: Date messages for British English.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - /Locale
  - /Locale.en-US.Date

provides: [Locale.en-GB.Date]

...
*/

Locale.define('en-GB', 'Date', {

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M'

}).inherit('en-US', 'Date');
