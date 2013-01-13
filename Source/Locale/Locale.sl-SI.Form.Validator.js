/*
---

name: Locale.si-SI.Form.Validator

description: Form Validator messages for Slovenian.

license: MIT-style license

authors:
  - Radovan Lozej

requires:
  - /Locale

provides: [Locale.si-SI.Form.Validator]

...
*/

Locale.define('sl-SI', 'FormValidator', {

	required: 'To polje je obvezno',
	minLength: 'Prosim, vnesite vsaj {minLength} znakov (vnesli ste {length} znakov).',
	maxLength: 'Prosim, ne vnesite več kot {maxLength} znakov (vnesli ste {length} znakov).',
	integer: 'Prosim, vnesite celo število. Decimalna števila (kot 1,25) niso dovoljena.',
	numeric: 'Prosim, vnesite samo numerične vrednosti (kot "1" ali "1.1" ali "-1" ali "-1.1").',
	digits: 'Prosim, uporabite številke in ločila le na tem polju (na primer, dovoljena je telefonska številka z pomišlaji ali pikami).',
	alpha: 'Prosim, uporabite le črke v tem plju. Presledki in drugi znaki niso dovoljeni.',
	alphanum: 'Prosim, uporabite samo črke ali številke v tem polju. Presledki in drugi znaki niso dovoljeni.',
	dateSuchAs: 'Prosim, vnesite pravilen datum kot {date}',
	dateInFormatMDY: 'Prosim, vnesite pravilen datum kot MM.DD.YYYY (primer "12.31.1999")',
	email: 'Prosim, vnesite pravilen email naslov. Na primer "fred@domain.com".',
	url: 'Prosim, vnesite pravilen URL kot http://www.example.com.',
	currencyDollar: 'Prosim, vnesit epravilno vrednost €. Primer 100,00€ .',
	oneRequired: 'Prosimo, vnesite nekaj za vsaj eno izmed teh polj.',
	errorPrefix: 'Napaka: ',
	warningPrefix: 'Opozorilo: ',

	// Form.Validator.Extras
	noSpace: 'To vnosno polje ne dopušča presledkov.',
	reqChkByNode: 'Nič niste izbrali.',
	requiredChk: 'To polje je obvezno',
	reqChkByName: 'Prosim, izberite {label}.',
	match: 'To polje se mora ujemati z poljem {matchName}',
	startDate: 'datum začetka',
	endDate: 'datum konca',
	currendDate: 'trenuten datum',
	afterDate: 'Datum bi moral biti isti ali po {label}.',
	beforeDate: 'Datum bi moral biti isti ali pred {label}.',
	startMonth: 'Prosim, vnesite začetni datum',
	sameMonth: 'Ta dva datuma morata biti v istem mesecu - premeniti morate eno ali drugo.',
	creditcard: 'Številka kreditne kartice ni pravilna. Preverite številko ali poskusite še enkrat. Vnešenih {length} znakov.'

});
