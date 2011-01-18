/*
---

name: Locale.ru-RU-unicode.Form.Validator

description: Form Validator messages for Russian (utf-8).

license: MIT-style license

authors:
  - Chernodarov Egor

requires:
  - /Locale

provides: [Locale.ru-RU.Form.Validator]

...
*/

Locale.define('ru-RU', 'FormValidator', {

	required: 'Это поле обязательно к заполнению.',
	minLength: 'Пожалуйста, введите хотя бы {minLength} символов (Вы ввели {length}).',
	maxLength: 'Пожалуйста, введите не больше {maxLength} символов (Вы ввели {length}).',
	integer: 'Пожалуйста, введите в это поле число. Дробные числа (например 1.25) тут не разрешены.',
	numeric: 'Пожалуйста, введите в это поле число (например "1" или "1.1", или "-1", или "-1.1").',
	digits: 'В этом поле Вы можете использовать только цифры и знаки пунктуации (например, телефонный номер со знаками дефиса или с точками).',
	alpha: 'В этом поле можно использовать только латинские буквы (a-z). Пробелы и другие символы запрещены.',
	alphanum: 'В этом поле можно использовать только латинские буквы (a-z) и цифры (0-9). Пробелы и другие символы запрещены.',
	dateSuchAs: 'Пожалуйста, введите корректную дату {date}',
	dateInFormatMDY: 'Пожалуйста, введите дату в формате ММ/ДД/ГГГГ (например "12/31/1999")',
	email: 'Пожалуйста, введите корректный емейл-адрес. Для примера "fred@domain.com".',
	url: 'Пожалуйста, введите правильную ссылку вида http://www.example.com.',
	currencyDollar: 'Пожалуйста, введите сумму в долларах. Например: $100.00 .',
	oneRequired: 'Пожалуйста, выберите хоть что-нибудь в одном из этих полей.',
	errorPrefix: 'Ошибка: ',
	warningPrefix: 'Внимание: '

});

//<1.2compat>

Locale.define('ru-RU-unicode').inherit('ru-RU', 'FormValidator');

//</1.2compat>
