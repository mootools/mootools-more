/*
---

script: Number.German.js

name: Number.German

description: Number messages for German.

license: MIT-style license

authors:
  - Christoph Pojer

requires:
  - /Locale

provides: [Number.German]

...
*/

Locale.define('nl-NL', 'Number', {

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
