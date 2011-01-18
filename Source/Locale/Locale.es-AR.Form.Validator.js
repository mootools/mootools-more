/*
---

name: Locale.es-AR.Form.Validator

description: Form Validator messages for Spanish (Argentina).

license: MIT-style license

authors:
  - Diego Massanti

requires:
  - /Locale

provides: [Locale.es-AR.Form.Validator]

...
*/

Locale.define('es-AR', 'FormValidator', {

	required: 'Este campo es obligatorio.',
	minLength: 'Por favor ingrese al menos {minLength} caracteres (ha ingresado {length} caracteres).',
	maxLength: 'Por favor no ingrese más de {maxLength} caracteres (ha ingresado {length} caracteres).',
	integer: 'Por favor ingrese un número entero en este campo. Números con decimales (p.e. 1,25) no se permiten.',
	numeric: 'Por favor ingrese solo valores numéricos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',
	digits: 'Por favor use sólo números y puntuación en este campo (por ejemplo, un número de teléfono con guiones y/o puntos no está permitido).',
	alpha: 'Por favor use sólo letras (a-z) en este campo. No se permiten espacios ni otros caracteres.',
	alphanum: 'Por favor, usa sólo letras (a-z) o números (0-9) en este campo. No se permiten espacios u otros caracteres.',
	dateSuchAs: 'Por favor ingrese una fecha válida como {date}',
	dateInFormatMDY: 'Por favor ingrese una fecha válida, utulizando el formato DD/MM/YYYY (p.e. "31/12/1999")',
	email: 'Por favor, ingrese una dirección de e-mail válida. Por ejemplo, "fred@dominio.com".',
	url: 'Por favor ingrese una URL válida como http://www.example.com.',
	currencyDollar: 'Por favor ingrese una cantidad válida de pesos. Por ejemplo $100,00 .',
	oneRequired: 'Por favor ingrese algo para por lo menos una de estas entradas.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Advertencia: ',

	// Form.Validator.Extras
	noSpace: 'No se permiten espacios en este campo.',
	reqChkByNode: 'No hay elementos seleccionados.',
	requiredChk: 'Este campo es obligatorio.',
	reqChkByName: 'Por favor selecciona una {label}.',
	match: 'Este campo necesita coincidir con el campo {matchName}',
	startDate: 'la fecha de inicio',
	endDate: 'la fecha de fin',
	currendDate: 'la fecha actual',
	afterDate: 'La fecha debe ser igual o posterior a {label}.',
	beforeDate: 'La fecha debe ser igual o anterior a {label}.',
	startMonth: 'Por favor selecciona un mes de origen',
	sameMonth: 'Estas dos fechas deben estar en el mismo mes - debes cambiar una u otra.'

});
