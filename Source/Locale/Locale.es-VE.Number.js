/*
---

name: Locale.es-VE.Number

description: Number messages for Spanish (Venezuela).

license: MIT-style license

authors:
  - Daniel Barreto

requires:
  - /Locale

provides: [Locale.es-VE.Number]

...
*/

Locale.define('es-VE', 'Number', {

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
		prefix: 'Bs. '
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

});
