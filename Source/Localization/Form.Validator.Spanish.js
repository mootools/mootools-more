/*
---

script: Form.Validator.Spanish.js

description: Date messages for Spanish.

license: MIT-style license

authors:
- Ãlfons Sanchez

requires:
- /Lang
- /Form.Validator

provides: [Form.Validator.Spanish]

...
*/

MooTools.lang.set('es-ES', 'Form.Validator', {

	required:'Este campo es obligatorio.',
	minLength:'Por favor introduce al menos {minLength} caracteres (has introducido {length} caracteres).',
	maxLength:'Por favor introduce no mas de {maxLength} caracteres (has introducido {length} caracteres).',
	integer:'Por favor introduce un numero entero en este campo. Numeros con decimales (p.e. 1,25) no se permiten.',
	numeric:'Por favor introduce solo valores numericos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',
	digits:'Por favor usa solo numeros y puntuacion en este campo (por ejemplo, un numero de telefono con guines y puntos no esta permitido).',
	alpha:'Por favor usa letras solo (a-z) en este campo. No se admiten espacios ni otros caracteres.',
	alphanum:'Por favor, usa solo letras (a-z) o numeros (0-9) en este campo. No se admiten espacios ni otros caracteres.',
	dateSuchAs:'Por favor introduce una fecha valida como {date}',
	dateInFormatMDY:'Por favor introduce una fecha valida como DD/MM/YYYY (p.e. "31/12/1999")',
	email:'Por favor, introduce una direccione de email valida. Por ejemplo,  "fred@domain.com".',
	url:'Por favor introduce una URL valida como http://www.google.com.',
	currencyDollar:'Por favor introduce una cantidad valida de €. Por ejemplo €100,00 .',
	oneRequired:'Por favor introduce algo para por lo menos una de estas entradas.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Aviso: ',

	//Form.Validator.Extras

	noSpace: 'No pueden haber espacios en esta entrada.',
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