/*
---

name: Locale.he-IL.Number

description: Number messages for Hebrew.

license: MIT-style license

authors:
  - Elad Ossadon

requires:
  - /Locale

provides: [Locale.he-IL.Number]

...
*/

Locale.define('he-IL', 'Number', {

	decimal: '.',
	group: ',',
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
		suffix: ' ₪',
		'scientific': false
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

});
