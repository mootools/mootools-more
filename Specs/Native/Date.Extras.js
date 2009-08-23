/*
Script: Date.Extras.js
	Specs for Date.Extras.js

License:
	MIT-style license.
*/

describe('Date.getTimePhrase', {
	'should describe a number of seconds in simple terms': function(){
		value_of(Date.getTimePhrase(65)).should_be('about a minute ago');
		value_of(Date.getTimePhrase(120)).should_be('2 minutes ago');
		value_of(Date.getTimePhrase(60 * 60 * 3)).should_be('about 3 hours ago');
		value_of(Date.getTimePhrase(60 * 60 * 25)).should_be('1 day ago');
		value_of(Date.getTimePhrase(60 * 60 * 48)).should_be('2 days ago');
		value_of(Date.getTimePhrase(60 * 60 * 24 * 55)).should_be('1 month ago');
		value_of(Date.getTimePhrase(-65)).should_be('about a minute from now');
		value_of(Date.getTimePhrase(-120)).should_be('2 minutes from now');
		value_of(Date.getTimePhrase(-60 * 60 * 3)).should_be('about 3 hours from now');
		value_of(Date.getTimePhrase(-60 * 60 * 25)).should_be('1 day from now');
		value_of(Date.getTimePhrase(-60 * 60 * 48)).should_be('2 days from now');
		value_of(Date.getTimePhrase(-60 * 60 * 24 * 55)).should_be('1 month from now');
	}

});

describe('Date.timeAgoInWords', {

	'should return a readable description of the age of a date': function(){
		var d = new Date();
		value_of(d.decrement('day').decrement('day').timeAgoInWords()).should_be('2 days ago');
	}

});

describe('Date.Extras.parse', {

	'should parse a string value into a date': function(){
		var d = new Date;
		
		value_of(Date.parse('today').get('date')).should_be(d.get('date'));
		value_of(Date.parse('yesterday').get('date')).should_be(d.get('date') - 1);
		value_of(Date.parse('tomorrow').get('date')).should_be(d.get('date') + 1);
	}

});
