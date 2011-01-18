/*
---

name: Locale.hu-HU.Form.Validator

description: Form Validator messages for Hungarian.

license: MIT-style license

authors:
  - Zsolt Szegheő

requires:
  - /Locale

provides: [Locale.hu-HU.Form.Validator]

...
*/

Locale.define('hu-HU', 'FormValidator', {

	required: 'A mező kitöltése kötelező.',
	minLength: 'Legalább {minLength} karakter megadása szükséges (megadva {length} karakter).',
	maxLength: 'Legfeljebb {maxLength} karakter megadása lehetséges (megadva {length} karakter).',
	integer: 'Egész szám megadása szükséges. A tizedesjegyek (pl. 1.25) nem engedélyezettek.',
	numeric: 'Szám megadása szükséges (pl. "1" vagy "1.1" vagy "-1" vagy "-1.1").',
	digits: 'Csak számok és írásjelek megadása lehetséges (pl. telefonszám kötőjelek és/vagy perjelekkel).',
	alpha: 'Csak betűk (a-z) megadása lehetséges. Szóköz és egyéb karakterek nem engedélyezettek.',
	alphanum: 'Csak betűk (a-z) vagy számok (0-9) megadása lehetséges. Szóköz és egyéb karakterek nem engedélyezettek.',
	dateSuchAs: 'Valós dátum megadása szükséges (pl. {date}).',
	dateInFormatMDY: 'Valós dátum megadása szükséges ÉÉÉÉ.HH.NN. formában. (pl. "1999.12.31.")',
	email: 'Valós e-mail cím megadása szükséges (pl. "fred@domain.hu").',
	url: 'Valós URL megadása szükséges (pl. http://www.example.com).',
	currencyDollar: 'Valós pénzösszeg megadása szükséges (pl. 100.00 Ft.).',
	oneRequired: 'Az alábbi mezők legalább egyikének kitöltése kötelező.',
	errorPrefix: 'Hiba: ',
	warningPrefix: 'Figyelem: ',

	// Form.Validator.Extras
	noSpace: 'A mező nem tartalmazhat szóközöket.',
	reqChkByNode: 'Nincs egyetlen kijelölt elem sem.',
	requiredChk: 'A mező kitöltése kötelező.',
	reqChkByName: 'Egy {label} kiválasztása szükséges.',
	match: 'A mezőnek egyeznie kell a(z) {matchName} mezővel.',
	startDate: 'a kezdet dátuma',
	endDate: 'a vég dátuma',
	currendDate: 'jelenlegi dátum',
	afterDate: 'A dátum nem lehet kisebb, mint {label}.',
	beforeDate: 'A dátum nem lehet nagyobb, mint {label}.',
	startMonth: 'Kezdeti hónap megadása szükséges.',
	sameMonth: 'A két dátumnak ugyanazon hónapban kell lennie.',
	creditcard: 'A megadott bankkártyaszám nem valódi (megadva {length} számjegy).'

});
