/*
---

name: Locale.ar.Form.Validator

description: Form Validator messages for Arabic.

license: MIT-style license

authors:
  - Chafik Barbar

requires:
  - /Locale

provides: [Locale.ar.Form.Validator]

...
*/

Locale.define('ar', 'FormValidator', {

	required: 'هذا الحقل مطلوب.',
	minLength: 'رجاءً إدخال {minLength} أحرف على الأقل (تم إدخال {length} أحرف).',
	maxLength: 'الرجاء عدم إدخال أكثر من {maxLength} أحرف (تم إدخال {length} أحرف).',
	integer: 'الرجاء إدخال عدد صحيح في هذا الحقل. أي رقم ذو كسر عشري أو مئوي (مثال 1.25 ) غير مسموح.',
	numeric: 'الرجاء إدخال قيم رقمية في هذا الحقل (مثال "1" أو "1.1" أو "-1" أو "-1.1").',
	digits: 'الرجاء أستخدام قيم رقمية وعلامات ترقيمية فقط في هذا الحقل (مثال, رقم هاتف مع نقطة أو شحطة)',
	alpha: 'الرجاء أستخدام أحرف فقط (ا-ي) في هذا الحقل. أي فراغات أو علامات غير مسموحة.',
	alphanum: 'الرجاء أستخدام أحرف فقط (ا-ي) أو أرقام (0-9) فقط في هذا الحقل. أي فراغات أو علامات غير مسموحة.',
	dateSuchAs: 'الرجاء إدخال تاريخ صحيح كالتالي {date}',
	dateInFormatMDY: 'الرجاء إدخال تاريخ صحيح (مثال, 31-12-1999)',
	email: 'الرجاء إدخال بريد إلكتروني صحيح.',
	url: 'الرجاء إدخال عنوان إلكتروني صحيح مثل http://www.example.com',
	currencyDollar: 'الرجاء إدخال قيمة $ صحيحة. مثال, 100.00$',
	oneRequired: 'الرجاء إدخال قيمة في أحد هذه الحقول على الأقل.',
	errorPrefix: 'خطأ: ',
	warningPrefix: 'تحذير: '

});
