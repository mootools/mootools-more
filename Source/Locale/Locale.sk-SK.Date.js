/*
---

name: Locale.sk-SK.Date

description: Date messages for Slovak.

license: MIT-style license

authors:
  - Ivan Masár

requires:
  - /Locale

provides: [Locale.sk-SK.Date]

...
*/
(function(){

// Slovak language pluralization rules, see http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
// one -> n is 1;            1
// few -> n in 2..4;         2-4
// other -> everything else  0, 5-999, 1.31, 2.31, 5.31...
var pluralize = function (n, one, few, other){
	if (n == 1) return one;
	else if (n == 2 || n == 3 || n == 4) return few;
	else return other;
};

Locale.define('sk-SK', 'Date', {

	months: ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'],
	months_abbr: ['januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'],
	days: ['Nedele', 'Pondelí', 'Úterý', 'Streda', 'Čtvrtek', 'Pátek', 'Sobota'],
	days_abbr: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],

	// Culture's date order: DD.MM.YYYY
	dateOrder: ['date', 'month', 'year'],
	shortDate: '%d.%m.%Y',
	shortTime: '%H:%M',
	AM: 'dop.',
	PM: 'pop.',
	firstDayOfWeek: 1,

	// Date.Extras
	ordinal: '.',

	lessThanMinuteAgo: 'pred chvíľou',
	minuteAgo: 'približne pred minútou',
	minutesAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'minútou', 'minútami', 'minútami'); },
	hourAgo: 'približne pred hodinou',
	hoursAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'hodinou', 'hodinami', 'hodinami'); },
	dayAgo: 'pred dňom',
	daysAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'dňom', 'dňami', 'dňami'); },
	weekAgo: 'pred týždňom',
	weeksAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'týždňom', 'týždňami', 'týždňami'); },
	monthAgo: 'pred mesiacom',
	monthsAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'mesiacom', 'mesiacmi', 'mesiacmi'); },
	yearAgo: 'pred rokom',
	yearsAgo: function(delta){ return 'pred {delta} ' + pluralize(delta, 'rokom', 'rokmi', 'rokmi'); },

	lessThanMinuteUntil: 'o chvíľu',
	minuteUntil: 'približne o minútu',
	minutesUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'minútu', 'minúty', 'minúty'); },
	hourUntil: 'približne o hodinu',
	hoursUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'hodinu', 'hodiny', 'hodín'); },
	dayUntil: 'o deň',
	daysUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'deň', 'dni', 'dní'); },
	weekUntil: 'o týždeň',
	weeksUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'týždeň', 'týždne', 'týždňov'); },
	monthUntil: 'o mesiac',
	monthsUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'mesiac', 'mesiace', 'mesiacov'); },
	yearUntil: 'o rok',
	yearsUntil: function(delta){ return 'o {delta} ' + pluralize(delta, 'rok', 'roky', 'rokov'); }
});

})();
