/*
---

name: Locale.EU.Number

description: Number messages for Europe.

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

	currency: {
		prefix: '€ '
	}

});
