/*
---

script: Date.Portuguese.BR.js

name: Date.Portuguese.BR

description: Date messages for Portuguese (Brazil).

license: MIT-style license

authors:
  - Fabio Miranda Costa

requires:
  - /Locale
  - /Date.Portuguese

provides: [Date.Portuguese.BR]

...
*/

Locale.define('pt-BR', 'Date', {

	// Culture's date order: DD/MM/YYYY
	shortDate: '%d/%m/%Y'

}).inherit('pt-PT', 'Date');
