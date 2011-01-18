/*
---

name: Locale.cs-CZ.Form.Validator

description: Form Validator messages for Czech.

license: MIT-style license

authors:
  - Jan Černý chemiX

requires:
  - /Locale

provides: [Locale.cs-CZ.Form.Validator]

...
*/

Locale.define('cs-CZ', 'FormValidator', {

	required: 'Tato položka je povinná.',
	minLength: 'Zadejte prosím alespoň {minLength} znaků (napsáno {length} znaků).',
	maxLength: 'Zadejte prosím méně než {maxLength} znaků (nápsáno {length} znaků).',
	integer: 'Zadejte prosím celé číslo. Desetinná čísla (např. 1.25) nejsou povolena.',
	numeric: 'Zadejte jen číselné hodnoty (tj. "1" nebo "1.1" nebo "-1" nebo "-1.1").',
	digits: 'Zadejte prosím pouze čísla a interpunkční znaménka(například telefonní číslo s pomlčkami nebo tečkami je povoleno).',
	alpha: 'Zadejte prosím pouze písmena (a-z). Mezery nebo jiné znaky nejsou povoleny.',
	alphanum: 'Zadejte prosím pouze písmena (a-z) nebo číslice (0-9). Mezery nebo jiné znaky nejsou povoleny.',
	dateSuchAs: 'Zadejte prosím platné datum jako {date}',
	dateInFormatMDY: 'Zadejte prosím platné datum jako MM / DD / RRRR (tj. "12/31/1999")',
	email: 'Zadejte prosím platnou e-mailovou adresu. Například "fred@domain.com".',
	url: 'Zadejte prosím platnou URL adresu jako http://www.example.com.',
	currencyDollar: 'Zadejte prosím platnou částku. Například $100.00.',
	oneRequired: 'Zadejte prosím alespoň jednu hodnotu pro tyto položky.',
	errorPrefix: 'Chyba: ',
	warningPrefix: 'Upozornění: ',

	// Form.Validator.Extras
	noSpace: 'V této položce nejsou povoleny mezery',
	reqChkByNode: 'Nejsou vybrány žádné položky.',
	requiredChk: 'Tato položka je vyžadována.',
	reqChkByName: 'Prosím vyberte {label}.',
	match: 'Tato položka se musí shodovat s položkou {matchName}',
	startDate: 'datum zahájení',
	endDate: 'datum ukončení',
	currendDate: 'aktuální datum',
	afterDate: 'Datum by mělo být stejné nebo větší než {label}.',
	beforeDate: 'Datum by mělo být stejné nebo menší než {label}.',
	startMonth: 'Vyberte počáteční měsíc.',
	sameMonth: 'Tyto dva datumy musí být ve stejném měsíci - změňte jeden z nich.',
	creditcard: 'Zadané číslo kreditní karty je neplatné. Prosím opravte ho. Bylo zadáno {length} čísel.'

});
