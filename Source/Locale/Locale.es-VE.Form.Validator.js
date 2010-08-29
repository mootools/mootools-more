/*
---

name: Locale.es-VE.Form.Validator

description: Form Validator messages for Spanish (Venezuela).

license: MIT-style license

authors:
  - Daniel Barreto

requires:
  - /Locale
  - /Locale.es-ES.Form.Validator

provides: [Locale.es-VE.Form.Validator]

...
*/

Locale.define('es-VE', 'FormValidator', {

	digits: 'Por favor usa solo n&uacute;meros y puntuaci&oacute;n en este campo. Por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones y puntos no esta permitido.',
	alpha: 'Por favor usa solo letras (a-z) en este campo. No se admiten espacios ni otros caracteres.',
	currencyDollar: 'Por favor introduce una cantidad v&aacute;lida de Bs. Por ejemplo Bs. 100,00 .',
	oneRequired: 'Por favor introduce un valor para por lo menos una de estas entradas.',

	// Form.Validator.Extras
	startDate: 'La fecha de inicio',
	endDate: 'La fecha de fin',
	currendDate: 'La fecha actual'

}).inherit('es-ES', 'FormValidator');
