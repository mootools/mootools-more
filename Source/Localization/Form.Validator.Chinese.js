/*
---

script: Form.Validator.Chinese.js

description: Form.Validator messages in chinese (both simplified and traditional).

license: MIT-style license

authors:
- 陈桂军 - guidy <at> ixuer [dot] net

requires:
- /Lang
- /Form.Validator

provides: [Form.Validator.Chinese]

...
*/

/*
In Chinese:
------------
需要指出的是：
简体中文适用于中国大陆，
繁体中文适用于香港、澳门和台湾省。
简体中文和繁体中文在字体和语法上有很多的不同之处。

我可以确保简体中文语言包的准确性，
但对于繁体中文，我可以保证用户可以准确的理解，但无法保证语句符合他们的阅读习惯。
如果您不能确认的话，可以只使用简体中文语言包，因为它是最通用的。

In English:
------------
It should be noted that:
Simplified  Chinese apply to mainland Chinese,
Traditional Chinese apply to Hong Kong, Macao and Taiwan Province.
There are a lot of different from Simplified  Chinese and Traditional Chinese , Contains font and syntax .

I can assure Simplified Chinese language pack accuracy .
For Traditional Chinese, I can only guarantee that users can understand, but not necessarily in line with their reading habits.
If you are unsure, you can only use the simplified Chinese language pack, as it is the most common.

*/

// Simplified Chinese
MooTools.lang.set('zhs-CN', 'Form.Validator', {
	required:'这是必填项。',
	minLength:'请至少输入 {minLength} 个字符 (已输入 {length} 个)。',
	maxLength:'最多只能输入 {maxLength} 个字符 (已输入 {length} 个)。',
	integer:'请输入一个整数，不能包含小数点。例如："1", "200"。',
	numeric:'请输入一个数字，例如："1", "1.1", "-1", "-1.1"。',
	digits:'这里只能接受数字和标点的输入，标点可以是："(", ")", ".", ":", "-", "+", "#"和空格。',
	alpha:'请输入 A-Z 的 26 个字母，不能包含空格或任何其他字符。',
	alphanum:'请输入 A-Z 的 26 个字母或 0-9 的 10 个数字，不能包含空格或任何其他字符。',
	dateSuchAs:'请输入合法的日期格式，如：{date}。',
	dateInFormatMDY:'请输入合法的日期格式，例如：MM/DD/YYYY ("12/31/1999")。',
	email:'请输入合法的电子信箱地址，例如："fred@domain.com"。',
	url:'请输入合法的 Url 地址，例如：http://www.google.com。',
	currencyDollar:'请输入合法的货币符号，例如：￥',
	oneRequired:'请至少选择一项。',
	errorPrefix: '错误：',
	warningPrefix: '警告：'
});

// Traditional Chinese
MooTools.lang.set('zht-CN', 'Form.Validator', {
	required:'這是必填項。',
	minLength:'請至少鍵入 {minLength} 個字符(已鍵入 {length} 個)。',
	maxLength:'最多只能鍵入 {maxLength} 個字符(已鍵入 {length} 個)。',
	integer:'請鍵入一個整數，不能包含小數點。例如："1", "200"。',
	numeric:'請鍵入一個數字，例如："1", "1.1", "-1", "-1.1"。',
	digits:'這裡只能接受數字和標點的鍵入，標點可以是："(", ")", ".", ":", "-", "+", "#"和空格。',
	alpha:'請鍵入 A-Z 的 26 個字母，不能包含空格或任何其他字符。',
	alphanum:'請鍵入 A-Z 的 26 個字母或 0-9 的 10 個數字，不能包含空格或任何其他字符。',
	dateSuchAs:'請鍵入合法的日期格式，如：{date}。',
	dateInFormatMDY:'請鍵入合法的日期格式，例如：MM/DD/YYYY ("12/31/1999")。',
	email:'請鍵入合法的電子信箱地址，例如："fred@domain.com"。',
	url:'請鍵入合法的 Url 地址，例如：http://www.google.com。',
	currencyYuan:'請鍵入合法的貨幣符號，例如：￥',
	oneRequired:'請至少選擇一項。',
	errorPrefix: '錯誤：',
	warningPrefix: '警告：'
});

Form.Validator.add('validate-currency-yuan', {
	errorMsg: function(){
		return Form.Validator.getMsg('currencyYuan');
	},
	test: function(element) {
		// [￥]1[##][,###]+[.##]
		// [￥]1###+[.##]
		// [￥]0.##
		// [￥].##
		return Form.Validator.getValidator('IsEmpty').test(element) ||  (/^￥?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(element.get('value'));
	}
});
