/*
---

script: Date.English.GB.js

name: Date.English.GB

description: Date messages for British English.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - /Lang

provides: [Date.English.GB]

...
*/

MooTools.lang.set('en-GB', 'Date', {

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M'

}).set('cascade', ['en-US']);
