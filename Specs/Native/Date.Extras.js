/*
Script: Date.Extras.js
	Specs for Date.Extras.js

License:
	MIT-style license.
*/

describe('Date.getOrdinal', {

	'should get the ordinal for a Date instance': function(){
		Date.$culture = 'GB';
		var d = new Date(1999, 11, 1);
		value_of(d.get('ordinal')).should_be('st');
		d.increment();
		value_of(d.get('ordinal')).should_be('nd');
		d.increment();
		value_of(d.get('ordinal')).should_be('rd');
		d.increment();
		value_of(d.get('ordinal')).should_be('th');
		d.increment('day', 17);
		value_of(d.get('ordinal')).should_be('st');
		d.increment();
		value_of(d.get('ordinal')).should_be('nd');
		d.increment();
		value_of(d.get('ordinal')).should_be('rd');
		d.increment();
		value_of(d.get('ordinal')).should_be('th');
		d.increment('day', 7);
		value_of(d.get('ordinal')).should_be('st');
	}

});

describe('Date.getDayOfYear', {

	'should get the day of the year for a Date instance': function(){
		var d = new Date(1999, 0, 1, 1, 1, 1, 1);
		value_of(d.get('dayofyear')).should_be(1); // 1st jan 1999
		d.increment();
		value_of(d.get('dayofyear')).should_be(2); //2nd jan 1999
		d.increment('day', 364);
		value_of(d.get('dayofyear')).should_be(1); // 1st jan 2000 - a leap year
		d.increment('day', 365); // should stay in the same year!
		value_of(d.get('dayofyear')).should_be(366);
	}

});

describe('Date.getLastDayOfMonth', {

	'should get the last day of the month for a Date instance': function(){
		var d = new Date(1999, 0, 1, 1, 1, 1, 1);
		value_of(d.get('lastdayofmonth')).should_be(31); // 1st jan 1999
		d.increment('day', 31);
		value_of(d.get('lastdayofmonth')).should_be(28); // 1st Feb 1999
		d.increment('day', 365); // 29th feb 2000 - a leap year!
		value_of(d.get('lastdayofmonth')).should_be(29);
	}

});

describe('Date.getTimePhrase', {
	'should describe a number of seconds in simple terms': function(){
		value_of(Date.getTimePhrase(65)).should_be('about a minute ago');
		value_of(Date.getTimePhrase(120)).should_be('2 minutes ago');
		value_of(Date.getTimePhrase(60 * 60 * 3)).should_be('about 3 hours ago');
		value_of(Date.getTimePhrase(60 * 60 * 25)).should_be('1 day ago');
		value_of(Date.getTimePhrase(60 * 60 * 48)).should_be('2 days ago');
		value_of(Date.getTimePhrase(60 * 60 * 24 * 55)).should_be('55 days ago');
		value_of(Date.getTimePhrase(-65)).should_be('about a minute from now');
		value_of(Date.getTimePhrase(-120)).should_be('2 minutes from now');
		value_of(Date.getTimePhrase(-60 * 60 * 3)).should_be('about 3 hours from now');
		value_of(Date.getTimePhrase(-60 * 60 * 25)).should_be('1 day from now');
		value_of(Date.getTimePhrase(-60 * 60 * 48)).should_be('2 days from now');
		value_of(Date.getTimePhrase(-60 * 60 * 24 * 55)).should_be('55 days from now');
	}

});

describe('Date.timeAgoInWords', {

	'should return a readable description of the age of a date': function(){
		var d = new Date();
		value_of(d.decrement('day').decrement('day').timeAgoInWords()).should_be('2 days ago');
	}

});
