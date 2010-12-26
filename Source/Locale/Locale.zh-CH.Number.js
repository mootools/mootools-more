/*
---

name: Locale.zh-CH.Number

description: Number messages for for Chinese (simplified and traditional).

license: MIT-style license

authors:
  - YMind Chan

requires:
  - Locale
  - Locale.en-US.Number

provides: [Locale.zh-CH.Number]

...
*/

// Simplified Chinese
Locale.define('zh-CHS', 'Number', {

	currency: {
		prefix: '￥ '
	}

}).inherit('en-US', 'Number');

// Traditional Chinese
Locale.define('zh-CHT').inherit('zh-CHS', 'Number');
