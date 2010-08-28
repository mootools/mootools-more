/*
---

name: Locale.pt-BR.Number

description: Number messages for PT Brazilian.

license: MIT-style license

authors:
  - Arian Stolwijk
  - Danillo César

requires:
  - /Locale

provides: [Locale.pt-BR.Number]

...
*/

Locale.define('pt-BR', 'Number', {

	decimal: ',',
	group: '.',
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
		prefix: 'R$ ',
		'scientific': false
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

});


