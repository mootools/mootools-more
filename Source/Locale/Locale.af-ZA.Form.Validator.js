/*
---

name: Locale.af-ZA.Form.Validator

description: Form Validator messages for Afrikaans.

license: MIT-style license

authors:
  - Werner Mollentze

requires:
  - /Locale

provides: [Locale.af-ZA.Form.Validator]

...
*/

Locale.define('af-ZA', 'FormValidator', {

	required: 'Hierdie veld word vereis.',
	length: 'Voer asseblief {length} karakters in (u het {elLength} karakters ingevoer)',
	minLength: 'Voer asseblief ten minste {minLength} karakters in (u het {length} karakters ingevoer).',
	maxLength: 'Moet asseblief nie meer as {maxLength} karakters invoer nie (u het {length} karakters ingevoer).',
	integer: 'Voer asseblief \'n heelgetal in hierdie veld in. Getalle met desimale (bv. 1.25) word nie toegelaat nie.',
	numeric: 'Voer asseblief slegs numeriese waardes in hierdie veld in (bv. "1" of "1.1" of "-1" of "-1.1").',
	digits: 'Gebruik asseblief slegs nommers en punktuasie in hierdie veld. (by voorbeeld, \'n telefoon nommer wat koppeltekens en punte bevat is toelaatbaar).',
	alpha: 'Gebruik asseblief slegs letters (a-z) binne-in hierdie veld. Geen spasies of ander karakters word toegelaat nie.',
	alphanum: 'Gebruik asseblief slegs letters (a-z) en nommers (0-9) binne-in hierdie veld. Geen spasies of ander karakters word toegelaat nie.',
	dateSuchAs: 'Voer asseblief \'n geldige datum soos {date} in',
	dateInFormatMDY: 'Voer asseblief \'n geldige datum soos MM/DD/YYYY in (bv. "12/31/1999")',
	email: 'Voer asseblief \'n geldige e-pos adres in. Byvoorbeeld "fred@domain.com".',
	url: 'Voer asseblief \'n geldige bronadres (URL) soos http://www.example.com in.',
	currencyDollar: 'Voer asseblief \'n geldige $ bedrag in. Byvoorbeeld $100.00 .',
	oneRequired: 'Voer asseblief iets in vir ten minste een van hierdie velde.',
	errorPrefix: 'Fout: ',
	warningPrefix: 'Waarskuwing: ',

	// Form.Validator.Extras
	noSpace: 'Daar mag geen spasies in hierdie toevoer wees nie.',
	reqChkByNode: 'Geen items is gekies nie.',
	requiredChk: 'Hierdie veld word vereis.',
	reqChkByName: 'Kies asseblief \'n {label}.',
	match: 'Hierdie veld moet by die {matchName} veld pas',
	startDate: 'die begin datum',
	endDate: 'die eind datum',
	currendDate: 'die huidige datum',
	afterDate: 'Die datum moet dieselfde of na {label} wees.',
	beforeDate: 'Die datum moet dieselfde of voor {label} wees.',
	startMonth: 'Kies asseblief \'n begin maand',
	sameMonth: 'Hierdie twee datums moet in dieselfde maand wees - u moet een of beide verander.',
	creditcard: 'Die ingevoerde kredietkaart nommer is ongeldig. Bevestig asseblief die nommer en probeer weer. {length} syfers is ingevoer.'

});
