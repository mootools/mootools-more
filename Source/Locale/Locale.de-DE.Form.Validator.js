/*
---

name: Locale.de-DE.Form.Validator

description: Form Validator messages for German.

license: MIT-style license

authors:
  - Frank Rossi
  - Ulrich Petri
  - Fabian Beiner

requires:
  - /Locale

provides: [Locale.de-DE.Form.Validator]

...
*/

Locale.define('de-DE', 'FormValidator', {

	required: 'Dieses Eingabefeld muss ausgefüllt werden.',
	minLength: 'Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben nur {length} Zeichen eingegeben).',
	maxLength: 'Geben Sie bitte nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	integer: 'Geben Sie in diesem Eingabefeld bitte eine ganze Zahl ein. Dezimalzahlen (z.B. "1.25") sind nicht erlaubt.',
	numeric: 'Geben Sie in diesem Eingabefeld bitte nur Zahlenwerte (z.B. "1", "1.1", "-1" oder "-1.1") ein.',
	digits: 'Geben Sie in diesem Eingabefeld bitte nur Zahlen und Satzzeichen ein (z.B. eine Telefonnummer mit Bindestrichen und Punkten ist erlaubt).',
	alpha: 'Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) ein. Leerzeichen und andere Zeichen sind nicht erlaubt.',
	alphanum: 'Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) und Zahlen (0-9) ein. Leerzeichen oder andere Zeichen sind nicht erlaubt.',
	dateSuchAs: 'Geben Sie bitte ein gültiges Datum ein (z.B. "{date}").',
	dateInFormatMDY: 'Geben Sie bitte ein gültiges Datum im Format TT.MM.JJJJ ein (z.B. "31.12.1999").',
	email: 'Geben Sie bitte eine gültige E-Mail-Adresse ein (z.B. "max@mustermann.de").',
	url: 'Geben Sie bitte eine gültige URL ein (z.B. "http://www.example.com").',
	currencyDollar: 'Geben Sie bitte einen gültigen Betrag in EURO ein (z.B. 100.00€).',
	oneRequired: 'Bitte füllen Sie mindestens ein Eingabefeld aus.',
	errorPrefix: 'Fehler: ',
	warningPrefix: 'Warnung: ',

	// Form.Validator.Extras
	noSpace: 'Es darf kein Leerzeichen in diesem Eingabefeld sein.',
	reqChkByNode: 'Es wurden keine Elemente gewählt.',
	requiredChk: 'Dieses Feld muss ausgefüllt werden.',
	reqChkByName: 'Bitte wählen Sie ein {label}.',
	match: 'Dieses Eingabefeld muss mit dem {matchName} Eingabefeld übereinstimmen.',
	startDate: 'Das Anfangsdatum',
	endDate: 'Das Enddatum',
	currendDate: 'Das aktuelle Datum',
	afterDate: 'Das Datum sollte zur gleichen Zeit oder später sein als {label}.',
	beforeDate: 'Das Datum sollte zur gleichen Zeit oder früher sein als {label}.',
	startMonth: 'Wählen Sie bitte einen Anfangsmonat',
	sameMonth: 'Diese zwei Datumsangaben müssen im selben Monat sein - Sie müssen eines von beiden verändern.',
	creditcard: 'Die eingegebene Kreditkartennummer ist ungültig. Bitte überprüfen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben.'

});
