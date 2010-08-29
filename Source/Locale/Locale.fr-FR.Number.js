/*
---

name: Locale.fr-FR.Number

description: Number messages for French.

license: MIT-style license

authors:
  - Arian Stolwijk
  - sv1l

requires:
  - /Locale
  - /Locale.EU.Number

provides: [Locale.fr-FR.Number]

...
*/

Locale.define('fr-FR', 'Number', {

	decimal: ',',
	group: ' ', // In fr-FR localization, group character is a blank space
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
		prefix: '',
		suffix: ' €' // In fr-FR localization, currency is suffixed by the Euro symbol
	},

	percentage: {
		decimals: 2,
		suffix: '%'
	}

}).inherit('EU', 'Number');
