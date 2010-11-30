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
	integer: 'Lütfen bu alana sadece tamsayý girin. Ondalýklý sayýlar (ör: 1.25) kullanýlamaz.',
	numeric: 'Lütfen bu alana sadece sayýsal deðer girin (ör: "1", "1.1", "-1" ya da "-1.1").',
	digits: 'Lütfen bu alana sadece sayýsal deðer ve noktalama iþareti girin (örneðin, nokta ve tire içeren bir telefon numarasý kullanýlabilir).',
	alpha: 'Lütfen bu alanda yalnýzca harf kullanýn. Boþluk ve diðer karakterler kullanýlamaz.',
	alphanum: 'Lütfen bu alanda sadece harf ve rakam kullanýn. Boþluk ve diðer karakterler kullanýlamaz.',
	dateSuchAs: 'Lütfen geçerli bir tarih girin (Ör: {date})',
	dateInFormatMDY: 'Lütfen geçerli bir tarih girin (GG/AA/YYYY, ör: "31/12/1999")',
	email: 'Lütfen geçerli bir email adresi girin. Ör: "kemal@etikan.com".',
	url: 'Lütfen geçerli bir URL girin. Ör: http://www.google.com.',
	currencyDollar: 'Lütfen geçerli bir TL miktarý girin. Ör: 100,00 TL .',
	oneRequired: 'Lütfen en az bir tanesini doldurun.',
	errorPrefix: 'Hata: ',
	warningPrefix: 'Uyarý: ',

	// Form.Validator.Extras
	noSpace: 'Bu alanda boþluk kullanýlamaz.',
	reqChkByNode: 'Hiçbir öðe seçilmemiþ.',
	requiredChk: 'Bu alan zorunlu.',
	reqChkByName: 'Lütfen bir {label} girin.',
	match: 'Bu alan, {matchName} alanýyla uyuþmalý',
	startDate: 'baþlangýç tarihi',
	endDate: 'bitiþ tarihi',
	currendDate: 'bugünün tarihi',
	afterDate: 'Tarih, {label} tarihiyle ayný gün ya da ondan sonra olmalýdýr.',
	beforeDate: 'Tarih, {label} tarihiyle ayný gün ya da ondan önce olmalýdýr.',
	startMonth: 'Lütfen bir baþlangýç ayý seçin',
	sameMonth: 'Bu iki tarih ayný ayda olmalý - bir tanesini deðiþtirmeniz gerekiyor.',
	creditcard: 'Girdiðiniz kredi kartý numarasý geçersiz. Lütfen kontrol edip tekrar deneyin. {length} hane girildi.'

});
