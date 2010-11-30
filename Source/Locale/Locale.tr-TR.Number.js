/*
---

name: Locale.tr-TR.Number

description: Number messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - /Locale

provides: [Locale.tr-TR.Number]

...
*/

Locale.define('tr-TR', 'Number', {

	decimal: ',',
	group: '.',

	currency: {
    decimals: 0
		suffix: ' TL'
	},
	
	percentage: {
    prefix: '%'
	}

});
