/*
Script: FormValidator.Polish.js
	Date messages for Polish. Thanks Oskar Krawczyk.

	License:
		MIT-style license.

*/

MooTools.lang.set('PL', 'FormValidator', {

	required:'To pole jest wymagane.',
	minLength:'Wymagane jest przynajmniej {minLenght} znaków (wpisanych zostało tylko {length}).',
	maxLength:'Dozwolone jest nie więcej niż {maxLenght} znaków (wpisanych zostało {length})',
	integer:'To pole wymaga liczb całych. Liczby dziesiętne (np. 1.25) są niedozwolone.',
	numeric:'Prosimy używać tylko numerycznych wartości w tym polu (np. "1", "1.1", "-1" lub "-1.1").',
	digits:'Prosimy używać liczb oraz zankow punktuacyjnych w typ polu (dla przykładu, przy numerze telefonu myślniki i kropki są dozwolone).',
	alpha:'Prosimy używać tylko liter (a-z) w tym polu. Spacje oraz inne znaki są niedozwolone.',
	alphanum:'Prosimy używać tylko liter (a-z) lub liczb (0-9) w tym polu. Spacje oraz inne znaki są niedozwolone.',
	dateSuchAs:'Prosimy podać prawidłową datę w formacie: {date}',
	dateInFormatMDY:'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")',
	email:'Prosimy podać prawidłowy adres e-mail, np. "jan@domena.pl".',
	url:'Prosimy podać prawidłowy adres URL, np. http://www.google.pl.',
	currencyDollar:'Please enter a valid $ amount. For example $100.00 .', // this makes no sense for other than the US localization
	oneRequired:'Prosimy wypełnić chociaż jedno z pól.',
	errorPrefix: 'Błąd: ',
	warningPrefix: 'Uwaga: ',

	//FormValidator.Extras

	noSpace: 'W tym polu nie mogą znajdować się spacje.',
	reqChkByNode: 'Brak zaznaczonych elementów.',
	requiredChk: 'To pole jest wymagane.',
	reqChkByName: 'Prosimy wybrać z {label}.',
	match: 'To pole musi być takie samo jak {matchName}',
	startDate: 'data początkowa',
	endDate: 'data końcowa',
	currendDate: 'aktualna data',
	afterDate: 'The date should be the same or after {label}.',
	beforeDate: 'The date should be the same or before {label}.',
	startMonth: 'Prosimy wybrać początkowy miesiąc.',
	sameMonth: 'Te dwie daty muszą być w zakresie tego samego miesiąca - wymagana jest zmiana któregoś z pól.'

});