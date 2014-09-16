/*
---

name: Locale.no-NO.Number

description: Number messages for Norwegian.

license: MIT-style license

authors:
  - Arian Stolwijk
  - Martin Lundgren
  - Ole Tøsse Kolvik

requires:
  - Locale
  - Locale.EU.Number

provides: [Locale.no-NO.Number]

...
*/

Locale.define('no-NO', 'Number', {

	currency: {
		prefix: 'NOK '
	}

}).inherit('EU', 'Number');
