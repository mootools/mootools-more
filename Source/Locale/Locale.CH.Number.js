/*
---
name: Locale.CH.Number
description: Number messages for Switzerland.
license: MIT-style license
authors:
  - Kim D. Jeker
requires:
  - Locale
provides: [Locale.CH.Number]
...
*/

Locale.define('CH', 'Number', {

	decimal: ',',
	group: '\'',

	currency: {
	  decimal: '.',
		suffix: ' CHF'
	}

});
