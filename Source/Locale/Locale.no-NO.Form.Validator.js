/*
---

name: Locale.no-NO.Form.Validator

description: Form Validator messages for Norwegian.

license: MIT-style license

authors:
  - Aaron Newton
  - Espen 'Rexxars' Hovlandsdal
  - Ole Tøsse Kolvik

requires:
  - Locale

provides: [Locale.no-NO.Form.Validator]

...
*/

Locale.define('no-NO', 'FormValidator', {

	required: 'Dette feltet er påkrevd.',
	length: 'Skriv inn {length} tegn (du skrev {elLength} tegn)',
	minLength: 'Skriv inn minst {minLength} tegn (du skrev {length} tegn).',
	maxLength: 'Ikke skriv mer enn {maxLength} tegn (du skrev {length} tegn).',
	integer: 'Skriv inn et tall i dette feltet. Tall med desimaler (f.eks. 1,25) er ikke tillat.',
	numeric: 'Skriv kun inn numeriske verdier i dette feltet (f.eks. "1", "1.1", "-1" eller "-1.1").',
	digits: 'Skriv kun nummer og skilletegn i dette feltet.',
	alpha: 'Skriv kun bokstaver (a-å) i dette feltet. Ingen mellomrom eller andre tegn er tillat.',
	alphanum: 'Skriv kun bokstaver (a-å) eller nummer (0-9) i dette feltet. Ingen mellomrom eller andre tegn er tillat.',
	dateSuchAs: 'Skriv inn en gyldig dato, som f.eks. {date}',
	dateInFormatMDY: 'Skriv inn en gyldig dato, f.eks. DD/MM/YYYY ("31/12/1999")',
	email: 'Skriv inn en gyldig epost-adresse. F.eks. "ola.nordmann@example.com".',
	url: 'Skriv inn en gyldig URL, f.eks. http://www.example.com.',
	currencyDollar: 'Skriv inn et gyldig beløp. F.eks. 100,00.',
	oneRequired: 'Minst ett av disse feltene må fylles ut.',
	errorPrefix: 'Feil: ',
	warningPrefix: 'Advarsel: ',

	// Form.Validator.Extras
	noSpace: 'Mellomrom er ikke tillatt i dette feltet.',
	reqChkByNode: 'Ingen objekter er valgt.',
	requiredChk: 'Dette feltet er påkrevd.',
	reqChkByName: 'Velg en {label}.',
	match: 'Dette feltet må være lik {matchName}',
	startDate: 'startdato',
	endDate: 'sluttdato',
	currentDate: 'dagens dato',
	afterDate: 'Datoen må være den samme som eller etter {label}.',
	beforeDate: 'Datoen må være den samme som eller før {label}.',
	startMonth: 'Velg en startmåned',
	sameMonth: 'Datoene må være i den samme måneden - velg den ene eller den andre.',
	creditcard: 'Kortnummeret du skrev inn er ikke gyldig. Prøv igjen. Du skrev {length} siffer.'

});
