/*
---

name: Locale.zh-CH.Form.Validator

description: Form Validator messages for Chinese (simplified and traditional).

license: MIT-style license

authors:
  - YMind Chan

requires:
  - /Locale
  - /Form.Validator

provides: [Form.zh-CH.Form.Validator, Form.Validator.CurrencyYuanValidator]

...
*/

// Simplified Chinese
Locale.define('zh-CHS', 'FormValidator', {

	required: '此项必填。',
	minLength: '请至少输入 {minLength} 个字符 (已输入 {length} 个)。',
	maxLength: '最多只能输入 {maxLength} 个字符 (已输入 {length} 个)。',
	integer: '请输入一个整数，不能包含小数点。例如："1", "200"。',
	numeric: '请输入一个数字，例如："1", "1.1", "-1", "-1.1"。',
	digits: '请输入由数字和标点符号组成的内容。例如电话号码。',
	alpha: '请输入 A-Z 的 26 个字母，不能包含空格或任何其他字符。',
	alphanum: '请输入 A-Z 的 26 个字母或 0-9 的 10 个数字，不能包含空格或任何其他字符。',
	dateSuchAs: '请输入合法的日期格式，如：{date}。',
	dateInFormatMDY: '请输入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。',
	email: '请输入合法的电子信箱地址，例如："fred@domain.com"。',
	url: '请输入合法的 Url 地址，例如：http://www.example.com。',
	currencyDollar: '请输入合法的货币符号，例如：￥100.0',
	oneRequired: '请至少选择一项。',
	errorPrefix: '错误：',
	warningPrefix: '警告：',

	// Form.Validator.Extras
	noSpace: '不能包含空格。',
	reqChkByNode: '未选择任何内容。',
	requiredChk: '此项必填。',
	reqChkByName: '请选择 {label}.',
	match: '必须与{matchName}相匹配',
	startDate: '起始日期',
	endDate: '结束日期',
	currendDate: '当前日期',
	afterDate: '日期必须等于或晚于 {label}.',
	beforeDate: '日期必须早于或等于 {label}.',
	startMonth: '请选择起始月份',
	sameMonth: '您必须修改两个日期中的一个，以确保它们在同一月份。',
	creditcard: '您输入的信用卡号码不正确。当前已输入{length}个字符。'

});

// Traditional Chinese
Locale.define('zh-CHT', 'FormValidator', {

	required: '此項必填。 ',
	minLength: '請至少輸入{minLength} 個字符(已輸入{length} 個)。 ',
	maxLength: '最多只能輸入{maxLength} 個字符(已輸入{length} 個)。 ',
	integer: '請輸入一個整數，不能包含小數點。例如："1", "200"。 ',
	numeric: '請輸入一個數字，例如："1", "1.1", "-1", "-1.1"。 ',
	digits: '請輸入由數字和標點符號組成的內容。例如電話號碼。 ',
	alpha: '請輸入AZ 的26 個字母，不能包含空格或任何其他字符。 ',
	alphanum: '請輸入AZ 的26 個字母或0-9 的10 個數字，不能包含空格或任何其他字符。 ',
	dateSuchAs: '請輸入合法的日期格式，如：{date}。 ',
	dateInFormatMDY: '請輸入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。 ',
	email: '請輸入合法的電子信箱地址，例如："fred@domain.com"。 ',
	url: '請輸入合法的Url 地址，例如：http://www.example.com。 ',
	currencyDollar: '請輸入合法的貨幣符號，例如：￥100.0',
	oneRequired: '請至少選擇一項。 ',
	errorPrefix: '錯誤：',
	warningPrefix: '警告：',

	// Form.Validator.Extras
	noSpace: '不能包含空格。 ',
	reqChkByNode: '未選擇任何內容。 ',
	requiredChk: '此項必填。 ',
	reqChkByName: '請選擇 {label}.',
	match: '必須與{matchName}相匹配',
	startDate: '起始日期',
	endDate: '結束日期',
	currendDate: '當前日期',
	afterDate: '日期必須等於或晚於{label}.',
	beforeDate: '日期必須早於或等於{label}.',
	startMonth: '請選擇起始月份',
	sameMonth: '您必須修改兩個日期中的一個，以確保它們在同一月份。 ',
	creditcard: '您輸入的信用卡號碼不正確。當前已輸入{length}個字符。 '

});

Form.Validator.add('validate-currency-yuan', {

	errorMsg: function(){
		return Form.Validator.getMsg('currencyYuan');
	},

	test: function(element){
		// [￥]1[##][,###]+[.##]
		// [￥]1###+[.##]
		// [￥]0.##
		// [￥].##
		return Form.Validator.getValidator('IsEmpty').test(element) || (/^￥?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(element.get('value'));
	}

});
