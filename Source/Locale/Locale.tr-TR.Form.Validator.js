/*
---

name: Locale.tr-TR.Form.Validator

description: Form Validator messages for Turkish.

license: MIT-style license

authors:
  - Faruk Can Bilir

requires:
  - /Locale

provides: [Locale.tr-TR.Form.Validator]

...
*/

Locale.define('tr-TR', 'FormValidator', {

	required: 'Bu alan zorunlu.',
	minLength: 'Lütfen en az {minLength} karakter girin (siz {length} karakter girdiniz).',
	maxLength: 'Lütfen en fazla {maxLength} karakter girin (siz {length} karakter girdiniz).',
	integer: 'Lütfen bu alana sadece tamsayı girin. Ondalıklı sayılar (ör: 1.25) kullanılamaz.',
	numeric: 'Lütfen bu alana sadece sayısal değer girin (ör: "1", "1.1", "-1" ya da "-1.1").',
	digits: 'Lütfen bu alana sadece sayısal değer ve noktalama işareti girin (örneğin, nokta ve tire içeren bir telefon numarası kullanılabilir).',
	alpha: 'Lütfen bu alanda yalnızca harf kullanın. Boşluk ve diğer karakterler kullanılamaz.',
	alphanum: 'Lütfen bu alanda sadece harf ve rakam kullanın. Boşluk ve diğer karakterler kullanılamaz.',
	dateSuchAs: 'Lütfen geçerli bir tarih girin (Ör: {date})',
	dateInFormatMDY: 'Lütfen geçerli bir tarih girin (GG/AA/YYYY, ör: "31/12/1999")',
	email: 'Lütfen geçerli bir email adresi girin. Ör: "kemal@etikan.com".',
	url: 'Lütfen geçerli bir URL girin. Ör: http://www.example.com.',
	currencyDollar: 'Lütfen geçerli bir TL miktarı girin. Ör: 100,00 TL .',
	oneRequired: 'Lütfen en az bir tanesini doldurun.',
	errorPrefix: 'Hata: ',
	warningPrefix: 'Uyarı: ',

	// Form.Validator.Extras
	noSpace: 'Bu alanda boşluk kullanılamaz.',
	reqChkByNode: 'Hiçbir öğe seçilmemiş.',
	requiredChk: 'Bu alan zorunlu.',
	reqChkByName: 'Lütfen bir {label} girin.',
	match: 'Bu alan, {matchName} alanıyla uyuşmalı',
	startDate: 'başlangıç tarihi',
	endDate: 'bitiş tarihi',
	currendDate: 'bugünün tarihi',
	afterDate: 'Tarih, {label} tarihiyle aynı gün ya da ondan sonra olmalıdır.',
	beforeDate: 'Tarih, {label} tarihiyle aynı gün ya da ondan önce olmalıdır.',
	startMonth: 'Lütfen bir başlangıç ayı seçin',
	sameMonth: 'Bu iki tarih aynı ayda olmalı - bir tanesini değiştirmeniz gerekiyor.',
	creditcard: 'Girdiğiniz kredi kartı numarası geçersiz. Lütfen kontrol edip tekrar deneyin. {length} hane girildi.'

});
