/*
---

name: Locale.si-SI.Date

description: Date messages for Slovenian.

license: MIT-style license

authors:
  - Radovan Lozej

requires:
  - /Locale

provides: [Locale.si-SI.Date]

...
*/

(function(){

var pluralize = function(n, one, two, three, other){
	return (n >= 1 && n <= 3) ? arguments[n] : other;
};

Locale.define('sl-SI', 'Date', {

	months: ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'],
	months_abbr: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
	days: ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'],
	days_abbr: ['ned', 'pon', 'tor', 'sre', 'čet', 'pet', 'sob'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H.%M',
	AM: 'AM',
	PM: 'PM',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'manj kot minuto nazaj',
	minuteAgo: 'minuto nazaj',
	minutesAgo: function(delta){ return '{delta} ' + pluralize(delta, 'minuto', 'minuti', 'minute', 'minut') + ' nazaj'; },
	hourAgo: 'uro nazaj',
	hoursAgo: function(delta){ return '{delta} ' + pluralize(delta, 'uro', 'uri', 'ure', 'ur') + ' nazaj'; },
	dayAgo: 'dan nazaj',
	daysAgo: function(delta){ return '{delta} ' + pluralize(delta, 'dan', 'dneva', 'dni', 'dni') + ' nazaj'; },
	weekAgo: 'teden nazaj',
	weeksAgo: function(delta){ return '{delta} ' + pluralize(delta, 'teden', 'tedna', 'tedne', 'tednov') + ' nazaj'; },
	monthAgo: 'mesec nazaj',
	monthsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'mesec', 'meseca', 'mesece', 'mesecov') + ' nazaj'; },
	yearthAgo: 'leto nazaj',
	yearsAgo: function(delta){ return '{delta} ' + pluralize(delta, 'leto', 'leti', 'leta', 'let') + ' nazaj'; },

	lessThanMinuteUntil: 'še manj kot minuto',
	minuteUntil: 'še minuta',
	minutesUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'minuta', 'minuti', 'minute', 'minut'); },
	hourUntil: 'še ura',
	hoursUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'ura', 'uri', 'ure', 'ur'); },
	dayUntil: 'še dan',
	daysUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'dan', 'dneva', 'dnevi', 'dni'); },
	weekUntil: 'še tedn',
	weeksUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'teden', 'tedna', 'tedni', 'tednov'); },
	monthUntil: 'še mesec',
	monthsUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'mesec', 'meseca', 'meseci', 'mesecov'); },
	yearUntil: 'še leto',
	yearsUntil: function(delta){ return 'še {delta} ' + pluralize(delta, 'leto', 'leti', 'leta', 'let'); }

});

})();
