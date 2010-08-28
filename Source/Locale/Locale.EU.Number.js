/*
---

name: Locale.EU.Number

description: Number messages for German.

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - /Locale

provides: [Locale.EU.Number]

...
*/

Locale.define('EU', 'Number', {

	decimal: ',',
	group: '.',
/*
	decimals: 0,
	precision: 0,
*/
	// Negative/Currency/percentage will mixin Number
	negative: {
		prefix: '-'
	},

	currency: {
		decimals: 2,
		prefix: '€ '
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

});
