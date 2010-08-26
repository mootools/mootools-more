/*
---

name: Locale.ja-JP.Form.Validator

description: Form Validator messages for Japanese.

license: MIT-style license

authors:
  - Noritaka Horio

requires:
  - /Locale

provides: [Locale.ja-JP.Form.Validator]

...
*/

Locale.define("ja-JP", "FormValidator", {

	required: '入力は必須です。',
	minLength: '入力文字数は{minLength}以上にしてください。({length}文字)',
	maxLength: '入力文字数は{maxLength}以下にしてください。({length}文字)',
	integer: '整数を入力してください。',
	numeric: '入力できるのは数値だけです。(例: "1", "1.1", "-1", "-1.1"....)',
	digits: '入力できるのは数値と句読記号です。 (例: -や+を含む電話番号など).',
	alpha: '入力できるのは半角英字だけです。それ以外の文字は入力できません。',
	alphanum: '入力できるのは半角英数字だけです。それ以外の文字は入力できません。',
	dateSuchAs: '有効な日付を入力してください。{date}',
	dateInFormatMDY: '日付の書式に誤りがあります。YYYY/MM/DD (i.e. "1999/12/31")',
	email: 'メールアドレスに誤りがあります。',
	url: 'URLアドレスに誤りがあります。',
	currencyDollar: '金額に誤りがあります。',
	oneRequired: 'ひとつ以上入力してください。',
	errorPrefix: 'エラー: ',
	warningPrefix: '警告: ',

	// FormValidator.Extras
	noSpace: 'スペースは入力できません。',
	reqChkByNode: '選択されていません。',
	requiredChk: 'この項目は必須です。',
	reqChkByName: '{label}を選択してください。',
	match: '{matchName}が入力されている場合必須です。',
	startDate: '開始日',
	endDate: '終了日',
	currendDate: '今日',
	afterDate: '{label}以降の日付にしてください。',
	beforeDate: '{label}以前の日付にしてください。',
	startMonth: '開始月を選択してください。',
	sameMonth: '日付が同一です。どちらかを変更してください。'

});
