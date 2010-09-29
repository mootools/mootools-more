/*
---

name: Locale.ja-JP.Number

description: Number messages for Japanese.

license: MIT-style license

authors:
  - Noritaka Horio

requires:
  - /Locale

provides: [Locale.ja-JP.Number]

...
*/

Locale.define('ja-JP', 'Number', {

	decimal: '.',
	group: ',',

	currency: {
		decimals: 0,
		prefix: '\\'
	}

});
