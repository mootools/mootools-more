/*
---

name: Locale.sk-SK.Form.Validator

description: Form Validator messages for Czech.

license: MIT-style license

authors:
  - Ivan Masár

requires:
  - Locale

provides: [Locale.sk-SK.Form.Validator]

...
*/

Locale.define('sk-SK', 'FormValidator', {

	required: 'Táto položka je povinná.',
	minLength: 'Zadajte prosím aspoň {minLength} znakov (momentálne {length} znakov).',
	maxLength: 'Zadajte prosím menej ako {maxLength} znakov (momentálne {length} znakov).',
	integer: 'Zadajte prosím celé číslo. Desetinné čísla (napr. 1.25) nie sú povolené.',
	numeric: 'Zadajte len číselné hodnoty (t.j. „1“ alebo „1.1“ alebo „-1“ alebo „-1.1“).',
	digits: 'Zadajte prosím len čísla a interpunkčné znamienka (napríklad telefónne číslo s pomlčkami albo bodkami je povolené).',
	alpha: 'Zadajte prosím len písmená (a-z). Medzery alebo iné znaky nie sú povolené.',
	alphanum: 'Zadajte prosím len písmená (a-z) alebo číslice (0-9). Medzery alebo iné znaky nie sú povolené.',
	dateSuchAs: 'Zadajte prosím platný dátum v tvare {date}',
	dateInFormatMDY: 'Zadajte prosím platný datum v tvare MM / DD / RRRR (t.j. „12/31/1999“)',
	email: 'Zadajte prosím platnú emailovú adresu. Napríklad „fred@domain.com“.',
	url: 'Zadajte prosím platnoú adresu URL v tvare http://www.example.com.',
	currencyDollar: 'Zadajte prosím platnú čiastku. Napríklad $100.00.',
	oneRequired: 'Zadajte prosím aspoň jednu hodnotu z týchto položiek.',
	errorPrefix: 'Chyba: ',
	warningPrefix: 'Upozornenie: ',

	// Form.Validator.Extras
	noSpace: 'V tejto položle nie sú povolené medzery',
	reqChkByNode: 'Nie sú vybrané žiadne položky.',
	requiredChk: 'Táto položka je povinná.',
	reqChkByName: 'Prosím vyberte {label}.',
	match: 'Táto položka sa musí zhodovať s položkou {matchName}',
	startDate: 'dátum začiatku',
	endDate: 'dátum ukončenia',
	currendDate: 'aktuálny dátum',
	afterDate: 'Dátum by mal býť rovnaký alebo väčší ako {label}.',
	beforeDate: 'Dátum by mal byť rovnaký alebo menší ako {label}.',
	startMonth: 'Vyberte počiatočný mesiac.',
	sameMonth: 'Tieto dva dátumy musia býť v rovnakom mesiaci - zmeňte jeden z nich.',
	creditcard: 'Zadané číslo kreditnej karty je neplatné. Prosím, opravte ho. Bolo zadaných {length} číslic.'

});
