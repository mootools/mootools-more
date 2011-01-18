/*
---

name: Locale.it-IT.Form.Validator

description: Form Validator messages for Italian.

license: MIT-style license

authors:
  - Leonardo Laureti
  - Andrea Novero

requires:
  - /Locale

provides: [Locale.it-IT.Form.Validator]

...
*/

Locale.define('it-IT', 'FormValidator', {

	required: 'Il campo &egrave; obbligatorio.',
	minLength: 'Inserire almeno {minLength} caratteri (ne sono stati inseriti {length}).',
	maxLength: 'Inserire al massimo {maxLength} caratteri (ne sono stati inseriti {length}).',
	integer: 'Inserire un numero intero. Non sono consentiti decimali (es.: 1.25).',
	numeric: 'Inserire solo valori numerici (es.: "1" oppure "1.1" oppure "-1" oppure "-1.1").',
	digits: 'Inserire solo numeri e caratteri di punteggiatura. Per esempio &egrave; consentito un numero telefonico con trattini o punti.',
	alpha: 'Inserire solo lettere (a-z). Non sono consentiti spazi o altri caratteri.',
	alphanum: 'Inserire solo lettere (a-z) o numeri (0-9). Non sono consentiti spazi o altri caratteri.',
	dateSuchAs: 'Inserire una data valida del tipo {date}',
	dateInFormatMDY: 'Inserire una data valida nel formato MM/GG/AAAA (es.: "12/31/1999")',
	email: 'Inserire un indirizzo email valido. Per esempio "nome@dominio.com".',
	url: 'Inserire un indirizzo valido. Per esempio "http://www.example.com".',
	currencyDollar: 'Inserire un importo valido. Per esempio "$100.00".',
	oneRequired: 'Completare almeno uno dei campi richiesti.',
	errorPrefix: 'Errore: ',
	warningPrefix: 'Attenzione: ',

	// Form.Validator.Extras
	noSpace: 'Non sono consentiti spazi.',
	reqChkByNode: 'Nessuna voce selezionata.',
	requiredChk: 'Il campo &egrave; obbligatorio.',
	reqChkByName: 'Selezionare un(a) {label}.',
	match: 'Il valore deve corrispondere al campo {matchName}',
	startDate: "data d'inizio",
	endDate: 'data di fine',
	currendDate: 'data attuale',
	afterDate: 'La data deve corrispondere o essere successiva al {label}.',
	beforeDate: 'La data deve corrispondere o essere precedente al {label}.',
	startMonth: "Selezionare un mese d'inizio",
	sameMonth: 'Le due date devono essere dello stesso mese - occorre modificarne una.'

});
