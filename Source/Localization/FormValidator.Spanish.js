/*
Script: FormValidator.Spanish.js
	FormValidator messages in Spanish. Thanks Miquel Hudin.

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/

MooTools.lang.set('ESP', 'FormValidator', {
	required:'Este campo es obligatorio.',
	minLength:'Por favor escribe como m&iacute;nimo {minLength} caracteres (has escrito {length} caracteres).',
	maxLength:'Por favor no escribas m&aacute;s de {maxLength} caracteres (has escrito {length} caracteres).',
	integer:'Por favor escribe un n&uacute;mero entero. Los n&uacute;meros con decimales (p.ej. 1\'25) no est&aacute;n permitidos.',
	numeric:'Por favor escribe tan s&oacute;lo valores num&eacute;ricos en este campo (p.ej. "1" or "1\'1" or "-1" or "-1\'1").',
	digits:'Por favor utiliza n&uacute;meros y signos de puntuaci&oacute;n tan s&oacute;lo en este campo (por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones est&aacute; permitido).',
	alpha:'Por favor utiliza s&oacute;lo letras (a-z) en este campo. Los espacios u otros caracteres no est&aacute;n permitidos.',
	alphanum:'Por favor utiliza s&oacute;lo letras (a-z) o n&uacute;meros en este campo. Los espacios u otros caracteres no estn permitidos.',
	dateSuchAs:'Por favor escribe una fecha v&aacute;lida, como {date}',
	dateInFormatMDY:'Por favor escribe una fecha v&aacute;lida, como DD/MM/AAAA (p.ej. "31/11/1999")',
	email:'Por favor escribe una direcci&oacute;n de correo electr&oacute;nico v&aacute;lida. Por ejemplo "fred@domain.com".',
	url:'Por favor escribe una URL v&aacute;lida, como http://www.google.com.',
	currencyDollar:'Por favor escribe una cantidad v&aacute;lida. Por ejemplo $100.00 .',
	oneRequired:'Por favor selecciona al menos una de estas opciones.',
	errorPrefix:'Error: ',
	warningPrefix:'Aviso: '
}).set('ESP', 'Date', {
	dateOrder: ['date', 'month', 'year', '/']
});