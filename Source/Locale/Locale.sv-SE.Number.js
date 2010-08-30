/*
---

name: Locale.sv-SE.Number

description: Number messages for Swedish.

license: MIT-style license

authors:
  - Martin Lundgren

requires:
  - /Locale

provides: [Locale.sv-SE.Number]

...
*/

Locale.define('sv-SE', 'Number', {

	decimal: ',',
	group: ' ',
/*
	decimals: 0,
	precision: 0,
	scientific: null,

	prefix: null,
	suffic: null,
*/
	// Negative/Currency/percentage will mixin Number
	negative: {
		prefix: '-'
	},

	currency: {
		decimals: 2,
		prefix: 'SEK '
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

});
