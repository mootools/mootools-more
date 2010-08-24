/*
---

script: Number.English.US.js

name: Number.English.US

description: Number messages for US English.

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - /Locale

provides: [Number.English.US]

...
*/

Locale.define('en-US', 'Number', {
	
	decimal: ',',
	group: '.',
	
	decimals: 2,
	precision: 0,
	
	// Negative/Currency/percentage will mixin Number
	negative: {
		prefix: '-'
	},
	
	currency: {
		prefix: '€ '	
	},
	
	percentage: {
		suffix: '%'		
	}

});


