/*
---

name: Locale.zh-CH.Date

description: Date messages for Chinese (simplified and traditional).

license: MIT-style license

authors:
  - YMind Chan

requires:
  - /Locale

provides: [Locale.zh-CH.Date]

...
*/

// Simplified Chinese
Locale.define('zh-CHS', 'Date', {

	months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	months_abbr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	days_abbr: ['日', '一', '二', '三', '四', '五', '六'],

	// Culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y-%m-%d',
	shortTime: '%I:%M%p',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: '不到1分钟前',
	minuteAgo: '大约1分钟前',
	minutesAgo: '{delta}分钟之前',
	hourAgo: '大约1小时前',
	hoursAgo: '大约{delta}小时前',
	dayAgo: '1天前',
	daysAgo: '{delta}天前',
	weekAgo: '1星期前',
	weeksAgo: '{delta}星期前',
	monthAgo: '1个月前',
	monthsAgo: '{delta}个月前',
	yearAgo: '1年前',
	yearsAgo: '{delta}年前',

	lessThanMinuteUntil: '从现在开始不到1分钟',
	minuteUntil: '从现在开始約1分钟',
	minutesUntil: '从现在开始约{delta}分钟',
	hourUntil: '从现在开始1小时',
	hoursUntil: '从现在开始约{delta}小时',
	dayUntil: '从现在开始1天',
	daysUntil: '从现在开始{delta}天',
	weekUntil: '从现在开始1星期',
	weeksUntil: '从现在开始{delta}星期',
	monthUntil: '从现在开始一个月',
	monthsUntil: '从现在开始{delta}个月',
	yearUntil: '从现在开始1年',
	yearsUntil: '从现在开始{delta}年'

});

// Traditional Chinese
Locale.define('zh-CHT', 'Date', {

	months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	months_abbr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	days_abbr: ['日', '一', '二', '三', '四', '五', '六'],

	// Culture's date order: YYYY-MM-DD
	dateOrder: ['year', 'month', 'date'],
	shortDate: '%Y-%m-%d',
	shortTime: '%I:%M%p',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: '不到1分鐘前',
	minuteAgo: '大約1分鐘前',
	minutesAgo: '{delta}分鐘之前',
	hourAgo: '大約1小時前',
	hoursAgo: '大約{delta}小時前',
	dayAgo: '1天前',
	daysAgo: '{delta}天前',
	weekAgo: '1星期前',
	weeksAgo: '{delta}星期前',
	monthAgo: '1个月前',
	monthsAgo: '{delta}个月前',
	yearAgo: '1年前',
	yearsAgo: '{delta}年前',

	lessThanMinuteUntil: '從現在開始不到1分鐘',
	minuteUntil: '從現在開始約1分鐘',
	minutesUntil: '從現在開始約{delta}分鐘',
	hourUntil: '從現在開始1小時',
	hoursUntil: '從現在開始約{delta}小時',
	dayUntil: '從現在開始1天',
	daysUntil: '從現在開始{delta}天',
	weekUntil: '從現在開始1星期',
	weeksUntil: '從現在開始{delta}星期',
	monthUntil: '從現在開始一個月',
	monthsUntil: '從現在開始{delta}個月',
	yearUntil: '從現在開始1年',
	yearsUntil: '從現在開始{delta}年'

});
