/*
Script: FormValidator.Italian.js
	FormValidator messages in Italian.

	License:
		MIT-style license.

	Authors:
		Leonardo Laureti

*/

MooTools.lang.set('IT', 'FormValidator', {
	required:'Il campo è richiesto.',
	minLength:'Si prega di inserire un minimo di {minLength} caratteri (Lei ne ha inseriti {length}).',
	maxLength:'Si prega di non inserire più di {maxLength} caratteri (Lei ne ha inseriti {length}).',
	integer:'Si prega di inserire un numero intero. Numeri con decimali (es.: 1.25) non sono permessi.',
	numeric:'Si prega di inserire esclusivamente valori numerici (es.: "1" oppure "1.1" oppure "-1" oppure "-1.1").',
	digits:'Si prega di usare esclusivamente valori numerici e punteggiatura in questo campo di testo (per esempio, un numero di telefono con trattini o barre non può essere accettato).',
	alpha:'Si prega di utilizzare esclusivamente lettere (a-z) in questo campo di testo. Spazi o altri caratteri non sono accettatti.',
	alphanum:'Si prega di utilizzare esclusivamente lettere (a-z) o numeri (0-9) in questo campo di testo. Spazi o altri caratteri non sono	accettatti.',
	dateSuchAs:'Si prega di inserire correttamente la data: {date}',
	dateInFormatMDY:'Si prega di inserire la data nel formato: GG/MM/AAAA (es.: "31/12/1999")',
	email:'Si prega di inserire un indirizzo e-mail valido. Per esempio: "mionome@tuodominio.com".',
	url:'Si prega di inserire una URL valida. Per esempio: "http://www.miodominio.com".',
	currencyDollar:'Si prega di inserire una valuta $ corretta. Per esempio: "$100.00".',
	oneRequired:'Si prega di riempire almeno uno dei campi richiesti.',
	warningPrefix: 'Avvertimento: ',
	errorPrefix: 'Errore: '
}).set('IT', 'Date', {
	dateOrder: ['date', 'month', 'year', '/']
});