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

	required: 'Dieses Eingabefeld muss ausgef&uuml;llt werden.',
	minLength: 'Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben nur {length} Zeichen eingegeben).',
	maxLength: 'Geben Sie bitte nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	integer: 'Geben Sie in diesem Eingabefeld bitte eine ganze Zahl ein. Dezimalzahlen (z.B. &quot;1.25&quot;) sind nicht erlaubt.',
	numeric: 'Geben Sie in diesem Eingabefeld bitte nur Zahlenwerte (z.B. &quot;1&quot;, &quot;1.1&quot;, &quot;-1&quot; oder &quot;-1.1&quot;) ein.',
	digits: 'Geben Sie in diesem Eingabefeld bitte nur Zahlen und Satzzeichen ein (z.B. eine Telefonnummer mit Bindestrichen und Punkten ist erlaubt).',
	alpha: 'Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) ein. Leerzeichen und andere Zeichen sind nicht erlaubt.',
	alphanum: 'Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) und Zahlen (0-9) ein. Leerzeichen oder andere Zeichen sind nicht erlaubt.',
	dateSuchAs: 'Geben Sie bitte ein g&uuml;ltiges Datum ein (z.B. &quot;{date}&quot;).',
	dateInFormatMDY: 'Geben Sie bitte ein g&uuml;ltiges Datum im Format TT.MM.JJJJ ein (z.B. &quot;31.12.1999&quot;).',
	email: 'Geben Sie bitte eine g&uuml;ltige E-Mail-Adresse ein (z.B. &quot;max@mustermann.de&quot;).',
	url: 'Geben Sie bitte eine g&uuml;ltige URL ein (z.B. &quot;http://www.google.de&quot;).',
	currencyDollar: 'Geben Sie bitte einen g&uuml;ltigen Betrag in EURO ein (z.B. 100.00&#8364;).',
	oneRequired: 'Bitte f&uuml;llen Sie mindestens ein Eingabefeld aus.',
	errorPrefix: 'Fehler: ',
	warningPrefix: 'Warnung: ',

	// Form.Validator.Extras
	noSpace: 'Es darf kein Leerzeichen in diesem Eingabefeld sein.',
	reqChkByNode: 'Es wurden keine Elemente gew&auml;hlt.',
	requiredChk: 'Dieses Feld muss ausgef&uuml;llt werden.',
	reqChkByName: 'Bitte w&auml;hlen Sie ein {label}.',
	match: 'Dieses Eingabefeld muss mit dem {matchName} Eingabefeld &uuml;bereinstimmen.',
	startDate: 'Das Anfangsdatum',
	endDate: 'Das Enddatum',
	currendDate: 'Das aktuelle Datum',
	afterDate: 'Das Datum sollte zur gleichen Zeit oder sp&auml;ter sein als {label}.',
	beforeDate: 'Das Datum sollte zur gleichen Zeit oder fr&uuml;her sein als {label}.',
	startMonth: 'W&auml;hlen Sie bitte einen Anfangsmonat',
	sameMonth: 'Diese zwei Datumsangaben m&uuml;ssen im selben Monat sein - Sie m&uuml;ssen eines von beiden ver&auml;ndern.',
	creditcard: 'Die eingegebene Kreditkartennummer ist ung&uuml;ltig. Bitte &uuml;berpr&uuml;fen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben.'

});
