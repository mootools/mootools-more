/*
---

script: Form.Validator.Dutch.js

description: Form.Validator messages in Dutch.

license: MIT-style license

authors:
- Lennart Pilon

requires:
- /Lang
- /Form.Validator

provides: [Form.Validator.Dutch]

...
*/

MooTools.lang.set('nl-NL', 'Form.Validator', {
	required:'Dit veld is verplicht.',
	minLength:'Vul minimaal {minLength} karakters in (je hebt {length} karakters ingevoerd).',
	maxLength:'Vul niet meer dan {maxLength} karakters in (je hebt {length} karakters ingevoerd).',
	integer:'Vul een getal in. Getallen met decimalen (bijvoorbeeld 1,25) zijn niet toegestaan.',
	numeric:'Vul alleen numerieke waarden in (bijvoorbeeld. "1" of "1.1" of "-1" of "-1.1").',
	digits:'Vul alleen nummers en leestekens in (bijvoorbeeld een telefoonnummer met een streepje).',
	alpha:'Vul alleen letters in (a-z). Spaties en andere karakters zijn niet toegestaan.',
	alphanum:'Vul alleen letters in (a-z) of nummers (0-9). Spaties en andere karakters zijn niet toegestaan.',
	dateSuchAs:'Vul een geldige datum in, zoals {date}',
	dateInFormatMDY:'Vul een geldige datum, in het formaat MM/DD/YYYY (bijvoorbeeld "12/31/1999")',
	email:'Vul een geldig e-mailadres in. Bijvoorbeeld "fred@domein.nl".',
	url:'Vul een geldige URL in, zoals http://www.google.nl.',
	currencyDollar:'Vul een geldig $ bedrag in. Bijvoorbeeld $100.00 .',
	oneRequired:'Vul iets in bij minimaal een van de invoervelden.',
	warningPrefix: 'Waarschuwing: ',
	errorPrefix: 'Fout: '
});