/*
---

name: Locale.tr-TR.Number

description: Number messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.tr-TR.Number]

...
*/

Locale.define('tr-TR', 'Number', {

	currency: {
		decimals: 0,
		suffix: ' TL'
	}

}).inherit('EU', 'Number');
