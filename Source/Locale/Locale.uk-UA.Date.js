/*
---

name: Locale.uk-UA.Date

description: Date messages for Ukrainian (utf-8).

license: MIT-style license

authors:
  - Slik

requires:
  - /Locale

provides: [Locale.uk-UA.Date]

...
*/

(function(){

var pluralize = function(n, one, few, many, other){
	var d = (n / 10).toInt(),
		z = n % 10,
		s = (n / 100).toInt();

	if (d == 1 && n > 10) return many;
	if (z == 1) return one;
	if (z > 0 && z < 5) return few;
	return many;
};

Locale.define('uk-UA', 'Date', {

	months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
	months_abbr: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд' ],
	days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'],
	days_abbr: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

	// Culture's date order: DD/MM/YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',
	AM: 'до полудня',
	PM: 'по полудню',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '',

	lessThanMinuteAgo: 'меньше хвилини тому',
	minuteAgo: 'хвилину тому',
	minutesAgo: function(delta){ return '{delta} ' + pluralize(delta, 'хвилину', 'хвилини', 'хвилин') + ' тому'; },
	hourAgo: 'годину тому',
	hoursAgo: function(delta){ return '{delta} ' + pluralize(delta, 'годину', 'години', 'годин') + ' тому'; },
	dayAgo: 'вчора',
	daysAgo: function(delta){ return '{delta} ' + pluralize(delta, 'день', 'дня', 'днів') + ' тому'; },
	weekAgo: 'тиждень тому',
	weeksAgo: function(delta){ return '{delta} ' + pluralize(delta, 'тиждень', 'тижні', 'тижнів') + ' тому'; },
	monthAgo: 'місяць тому',
	monthsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'місяць', 'місяці', 'місяців') + ' тому'; },
	yearAgo: 'рік тому',
	yearsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'рік', 'роки', 'років') + ' тому'; },

	lessThanMinuteUntil: 'за мить',
	minuteUntil: 'через хвилину',
	minutesUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'хвилину', 'хвилини', 'хвилин'); },
	hourUntil: 'через годину',
	hoursUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'годину', 'години', 'годин'); },
	dayUntil: 'завтра',
	daysUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'день', 'дня', 'днів'); },
	weekUntil: 'через тиждень',
	weeksUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'тиждень', 'тижні', 'тижнів'); },
	monthUntil: 'через місяць',
	monthesUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'місяць', 'місяці', 'місяців'); },
	yearUntil: 'через рік',
	yearsUntil: function(delta){ return 'через {delta} ' + pluralize(delta, 'рік', 'роки', 'років'); }

});

})();
