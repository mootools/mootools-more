/*
---

script: Form.Validator.German.js

description: Date messages for German.

license: MIT-style license

authors: 
- Frank Rossi
- Ulrich Petri

requires:
- /Lang
- /Form.Validator

provides: [Form.Validator.German]

...
*/

MooTools.lang.set('de-DE', 'Form.Validator', {

	required:'Dieses Feld mu&szlig; ausgef&uuml;llt werden.',
	minLength:'Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	maxLength:'Bitte geben Sie nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).',
	integer:'Geben Sie bitte eine ganze Zahl ein. Dezimalzahlen (z.B. 1.25) sind nicht erlaubt.',
	numeric:'Geben Sie bitte nur Zahlenwerte in dieses Eingabefeld ein (z.B. &quot;1&quot;, &quot;1.1&quot;, &quot;-1&quot; oder &quot;-1.1&quot;).',
	digits:'Benutzen Sie bitte nur Zahlen und Satzzeichen in diesem Eingabefeld (z.B. eine Telefonnummer mit Bindestrichen und Punkten ist erlaubt).',
	alpha:'Benutzen Sie bitte nur Buchstaben (a-z) in diesem Feld. Leerzeichen und andere Zeichen sind nicht erlaubt.',
	alphanum:'Benutzen Sie bitte nur Buchstaben (a-z) und Zahlen (0-9) in diesem Eingabefeld (0-9). Leerzeichen und andere Zeichen sind nicht erlaubt.',
	dateSuchAs:'Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel {date}',
	dateInFormatMDY:'Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel TT.MM.JJJJ (z.B. &quot;31.12.1999&quot;)',
	email:'Geben Sie bitte eine g&uuml;ltige E-Mail Adresse ein. Wie zum Beispiel &quot;max@mustermann.de&quot;.',
	url:'Geben Sie bitte eine g&uuml;ltige URL ein. Wie zum Beispiel http://www.google.de.',
	currencyDollar:'Geben Sie bitte einen g&uuml;ltigen Betrag in EURO ein. Wie zum Beispiel 100.00&#8364; .',
	oneRequired:'Machen Sie f&uuml;r mindestens eines der Eingabefelder einen Eintrag.',
	errorPrefix: 'Fehler: ',
	warningPrefix: 'Warnung: ',

	//Form.Validator.Extras

	noSpace: 'Es darf kein Leerzeichen in diesem Eingabefeld sein.',
	reqChkByNode: 'Es wurden keine Elemente gew&auml;hlt.',
	requiredChk: 'Dieses Feld mu&szlig; ausgef&uuml;llt werden.',
	reqChkByName: 'Bitte w&auml;hlen Sie ein {label}.',
	match: 'Dieses Eingabefeld muss mit dem Feld {matchName} &uuml;bereinstimmen.',
	startDate: 'Das Anfangsdatum',
	endDate: 'Das Enddatum',
	currendDate: 'Das aktuelle Datum',
	afterDate: 'Das Datum sollte zur gleichen Zeit oder sp&auml;ter sein {label}.',
	beforeDate: 'Das Datum sollte zur gleichen Zeit oder fr&uuml;her sein {label}.',
	startMonth: 'W&auml;hlen Sie bitte einen Anfangsmonat',
	sameMonth: 'Diese zwei Datumsangaben m&uuml;ssen im selben Monat sein - Sie m&uuml;ssen eine von beiden ver&auml;ndern.'

});