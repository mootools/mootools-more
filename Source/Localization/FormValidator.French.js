/*
Script: FormValidator.French.js
	FormValidator messages in French. Thanks Miquel Hudin.

	License:
		MIT-style license.

*/

MooTools.lang.set('FR', 'FormValidator', {
	required:'Ce champ est obligatoire.',
	minLength:'S\'il vous vous plat crivez au moins {minLength} caractres (vous avez crit {length} caractres).',
	maxLength:'S\'il vous vous plat n\'crivez pas plus de {maxLength} caractres (vous avez crit {length} caractres).',
	integer:'S\'il vous vous plat crivez un nombre entier dans ce champ. Les nombres avec des dcimals  (p.ex. 1\'25) ne sont pas permis.',
	numeric:'S\'il vous vous plat crivez seulement des chiffres dans ce champ (p.ex. "1" ou "1\'1" ou "-1" or "-1\'1").',
	digits:'S\'il vous vous plat crivez des nombres et des signes de ponctuation seulement dans ce champ (par exemple, un numro de tlphone avec des traits d\'union est permis).',
	alpha:'S\'il vous vous plat crivez seulement des lettres (a-z) dans ce champ. Les espaces ou d\'autres caractres ne sont pas permis.',
	alphanum:'S\'il vous vous plat crivez seulement des lettres (a-z) ou des chiffres (0-9) dans ce champ. Les espaces ou d\'autres caractres ne sont pas permis.',
	dateSuchAs:'S\'il vous vous plat crivez une date correcte, comme {date}',
	dateInFormatMDY:'S\'il vous vous plat crivez une date correcte, comme JJ/MM/AAAA (p.ex. "31/11/1999")',
	email:'S\'il vous vous plat crivez une adresse de courrier lectronique. Par example "fred@domain.com".',
	url:'S\'il vous vous plat crivez une URL, comme http://www.google.com.',
	currencyDollar:'S\'il vous vous plat crivez une quantit correcte. Par example $100.00 .',
	oneRequired:'S\'il vous vous plat slectionnez au moins une de ces options.',
	errorPrefix: 'Erreur: ',
	warningPrefix: 'Attention: '
});