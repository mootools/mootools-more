/*
Script: Date.Russian.js
	Date messages for Russian.

	License:
		MIT-style license.

	Authors:
		Evstigneev Pavel
*/

MooTools.lang.set('ru-RU-unicode', 'Date', {

	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	//culture's date order: MM/DD/YYYY
	dateOrder: ['date', 'month', 'year'],
	AM: 'AM',
	PM: 'PM',

	shortDate: '%d/%m/%Y',
	shortTime: '%H:%M',


  /*
   *  Russian language pluralization rules, taken from CLDR project, http://unicode.org/cldr/
   *
   *  one -> n mod 10 is 1 and n mod 100 is not 11;
   *  few -> n mod 10 in 2..4 and n mod 100 not in 12..14;
   *  many -> n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14;
   *  other -> everything else (example 3.14)
   */

  pluralize: function (n, one, few, many, other) {
    var modulo10 = n % 10
    var modulo100 = n % 100

    if (modulo10 == 1 && modulo100 != 11) {
      return one;
    } else if ((modulo10 == 2 || modulo10 == 3 || modulo10 == 4) && !(modulo100 == 12 || modulo100 == 13 || modulo100 == 14)) {
      return few;
    } else if (modulo10 == 0 || (modulo10 == 5 || modulo10 == 6 || modulo10 == 7 || modulo10 == 8 || modulo10 == 9) || (modulo100 == 11 || modulo100 == 12 || modulo100 == 13 || modulo100 == 14)) {
      return many;
    } else {
      return other;
    }
  },

	/* Date.Extras */
	ordinal: '',
	lessThanMinuteAgo: 'меньше минуты назад',
	minuteAgo: 'минута назад',
	minutesAgo: function (delta) { return  '{delta} ' + this.pluralize(delta, 'минута', 'минуты', 'минут') + ' назад'},
	hourAgo: 'час назад',
	hoursAgo: function (delta) { return  '{delta} ' + this.pluralize(delta, 'час', 'часа', 'часов') + ' назад'},
	dayAgo: 'вчера',
	daysAgo: function (delta) { return '{delta} ' + this.pluralize(delta, 'день', 'дня', 'дней') + ' назад' },
	lessThanMinuteUntil: 'меньше минуты назад',
	minuteUntil: 'через минуту',
	minutesUntil: function (delta) { return  'через {delta} ' + this.pluralize(delta, 'час', 'часа', 'часов') + ''},
	hourUntil: 'через час',
	hoursUntil: function (delta) { return  'через {delta} ' + this.pluralize(delta, 'час', 'часа', 'часов') + ''},
	dayUntil: 'завтра',
	daysUntil: function (delta) { return 'через {delta} ' + this.pluralize(delta, 'день', 'дня', 'дней') + '' }

});