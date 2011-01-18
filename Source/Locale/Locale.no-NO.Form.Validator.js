/*
---

name: Locale.no-NO.Form.Validator

description: Form Validator messages for Norwegian.

license: MIT-style license

authors:
  - Espen 'Rexxars' Hovlandsdal

requires:
  - /Locale

provides: [Locale.no-NO.Form.Validator]

...
*/

Locale.define('no-NO', 'FormValidator', {

	required: 'Dette feltet er pÃ¥krevd.',
	minLength: 'Vennligst skriv inn minst {minLength} tegn (du skrev {length} tegn).',
	maxLength: 'Vennligst skriv inn maksimalt {maxLength} tegn (du skrev {length} tegn).',
	integer: 'Vennligst skriv inn et tall i dette feltet. Tall med desimaler (for eksempel 1,25) er ikke tillat.',
	numeric: 'Vennligst skriv inn kun numeriske verdier i dette feltet (for eksempel "1", "1.1", "-1" eller "-1.1").',
	digits: 'Vennligst bruk kun nummer og skilletegn i dette feltet.',
	alpha: 'Vennligst bruk kun bokstaver (a-z) i dette feltet. Ingen mellomrom eller andre tegn er tillat.',
	alphanum: 'Vennligst bruk kun bokstaver (a-z) eller nummer (0-9) i dette feltet. Ingen mellomrom eller andre tegn er tillat.',
	dateSuchAs: 'Vennligst skriv inn en gyldig dato, som {date}',
	dateInFormatMDY: 'Vennligst skriv inn en gyldig dato, i formatet MM/DD/YYYY (for eksempel "12/31/1999")',
	email: 'Vennligst skriv inn en gyldig epost-adresse. For eksempel "espen@domene.no".',
	url: 'Vennligst skriv inn en gyldig URL, for eksempel http://www.example.com.',
	currencyDollar: 'Vennligst fyll ut et gyldig $ belÃ¸p. For eksempel $100.00 .',
	oneRequired: 'Vennligst fyll ut noe i minst ett av disse feltene.',
	errorPrefix: 'Feil: ',
	warningPrefix: 'Advarsel: '

});
