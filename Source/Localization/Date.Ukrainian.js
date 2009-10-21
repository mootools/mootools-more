/*
---

script: Date.Ukrainian.js

description: Date messages for Ukrainian.

license: MIT-style license

authors:
- Slik

requires:
- /Lang
- /Date

provides: [Date.Ukrainian]

...
*/

MooTools.lang.set('uk-UA', 'Date', {
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    //culture's date order: DD/MM/YYYY
    dateOrder: ['date', 'month', 'year'],
    AM: 'до полудня',
    PM: 'по полудню',

    shortDate: '%d/%m/%Y',
    shortTime: '%H:%M',

    pluralize: function(n, one, few, many, other) {
        var d = parseInt(n / 10);
        var z = n % 10;
        var s = parseInt(n / 100);

        if(d == 1 && n > 10) {
            return many;
        }

        if(z == 1) {
            return one;
        } else if(z > 0 && z < 5) {
            return few;
        } else {
            return many; 
        }
    },

    /* Date.Extras */
    ordinal: '',
    lessThanMinuteAgo: 'меньше хвилини тому',
    minuteAgo: 'хвилину тому',
    minutesAgo: function (delta) { return  '{delta} ' + this.pluralize(delta, 'хвилину', 'хвилини', 'хвилин') + ' назад'},
    hourAgo: 'годину назад',
    hoursAgo: function (delta) { return  '{delta} ' + this.pluralize(delta, 'годину', 'години', 'годин') + ' назад'},
    dayAgo: 'вчора',
    daysAgo: function (delta) { return '{delta} ' + this.pluralize(delta, 'день', 'дня', 'днів') + ' назад' },
    lessThanMinuteUntil: 'за мить',
    minuteUntil: 'через хвилину',
    minutesUntil: function (delta) { return  'через {delta} ' + this.pluralize(delta, 'хвилину', 'хвилини', 'хвилин')},
    hourUntil: 'через годину',
    hoursUntil: function (delta) { return  'через {delta} ' + this.pluralize(delta, 'годину', 'години', 'годин')},
    dayUntil: 'завтра',
    daysUntil: function (delta) { return 'через {delta} ' + this.pluralize(delta, 'день', 'дня', 'днів')}

});
