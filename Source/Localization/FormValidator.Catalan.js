/*
Script: FormValidator.Catalan.js
	FormValidator messages in Catalan. Thanks Miquel Hudin.

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/
MooTools.lang.set('CAT', 'FormValidator', {
	required:'Aquest camp és obligatori.',
	minLength:'Sisplau escriu com a mnim {minLength} carcters (has escrit {length} carcters).',
	maxLength:'Sisplau no escriguis ms de {maxLength} carcters (has escrit {length} carcters).',
	integer:'Sisplau escriu un nmero enter en aquest camp. Els nmeros amb decimals (p.ex. 1\'25) no estan permesos.',
	numeric:'Sisplau escribiu noms valors numrics en aquest camp (p.ex. "1" o "1\'1" o "-1" o "-1\'1").',
	digits:'Sisplau utilitza nmeros i signess de puntuaci noms en aquest camp (per exemple, un nmero de telfon amb guions est perms).',
	alpha:'Sisplau utilitza noms lletres (a-z) en aquest camp. Els espais o altres carcters no estan permesos.',
	alphanum:'Sisplau utilitza noms lletres (a-z) o nmeros (0-9) en aquest camp. Els espais o altres carcters no estan permesos..',
	dateSuchAs:'Sisplau escriu una data vlida, com ara {date}',
	dateInFormatMDY:'Sisplau escriu una data vlida, com ara DD/MM/AAAA (p.ex. "31/11/1999")',
	email:'Sisplau escriu una adrea de correu electrnic vlida. Per exemple "fred@domain.com".',
	url:'Sisplau escriu una URL vlida, com ara http://www.google.com.',
	currencyDollar:'Sisplau escriu una quantitat vlida. Per exemple $100.00 .',
	oneRequired:'Sisplau selecciona almenys una d\'aquestes opcions.',
	errorPrefix: 'Error: ',
	warningPrefix: 'Avís: '
}).set('CAT', 'Date', {
	dateOrder: ['date', 'month', 'year', '/']
});