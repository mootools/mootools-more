/*
---

script: Number.Dutch.js

name: Number.Dutch

description: Number messages for Dutch.

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - /Locale

provides: [Locale.nl-NL.Number]

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


