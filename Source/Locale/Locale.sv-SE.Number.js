/*
---

name: Locale.sv-SE.Number

description: Number messages for Swedish.

license: MIT-style license

authors:
  - Arian Stolwijk
  - Martin Lundgren

requires:
  - /Locale
  - /Locale.EU.Number

provides: [Locale.sv-SE.Number]

...
*/

Locale.define('sv-SE', 'Number', {

	currency: {
		prefix: 'SEK '
	}

}).inherit('EU', 'Number');
