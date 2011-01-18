/*
---

name: Locale.sv-SE.Form.Validator

description: Form Validator messages for Swedish.

license: MIT-style license

authors:
  - Martin Lundgren

requires:
  - /Locale

provides: [Locale.sv-SE.Form.Validator]

...
*/

Locale.define('sv-SE', 'FormValidator', {

	required: 'Fältet är obligatoriskt.',
	minLength: 'Ange minst {minLength} tecken (du angav {length} tecken).',
	maxLength: 'Ange högst {maxLength} tecken (du angav {length} tecken). ',
	integer: 'Ange ett heltal i fältet. Tal med decimaler (t.ex. 1,25) är inte tillåtna.',
	numeric: 'Ange endast numeriska värden i detta fält (t.ex. "1" eller "1.1" eller "-1" eller "-1,1").',
	digits: 'Använd endast siffror och skiljetecken i detta fält (till exempel ett telefonnummer med bindestreck tillåtet).',
	alpha: 'Använd endast bokstäver (a-ö) i detta fält. Inga mellanslag eller andra tecken är tillåtna.',
	alphanum: 'Använd endast bokstäver (a-ö) och siffror (0-9) i detta fält. Inga mellanslag eller andra tecken är tillåtna.',
	dateSuchAs: 'Ange ett giltigt datum som t.ex. {date}',
	dateInFormatMDY: 'Ange ett giltigt datum som t.ex. YYYY-MM-DD (i.e. "1999-12-31")',
	email: 'Ange en giltig e-postadress. Till exempel "erik@domain.com".',
	url: 'Ange en giltig webbadress som http://www.example.com.',
	currencyDollar: 'Ange en giltig belopp. Exempelvis 100,00.',
	oneRequired: 'Vänligen ange minst ett av dessa alternativ.',
	errorPrefix: 'Fel: ',
	warningPrefix: 'Varning: ',

	// Form.Validator.Extras
	noSpace: 'Det får inte finnas några mellanslag i detta fält.',
	reqChkByNode: 'Inga objekt är valda.',
	requiredChk: 'Detta är ett obligatoriskt fält.',
	reqChkByName: 'Välj en {label}.',
	match: 'Detta fält måste matcha {matchName}',
	startDate: 'startdatumet',
	endDate: 'slutdatum',
	currendDate: 'dagens datum',
	afterDate: 'Datumet bör vara samma eller senare än {label}.',
	beforeDate: 'Datumet bör vara samma eller tidigare än {label}.',
	startMonth: 'Välj en start månad',
	sameMonth: 'Dessa två datum måste vara i samma månad - du måste ändra det ena eller det andra.'

});
