/*
Script: Date.Extras.js
	Specs for Date.Extras.js

License:
	MIT-style license.
*/

describe('Date.getTimePhrase', {
	'should describe a number of seconds in simple terms': function(){
		var phrases = {
			'less than a minute ago': 30,
			'about a minute ago': 65,
			'2 minutes ago': 120,
			'about 3 hours ago': 60 * 60 * 3,
			'1 day ago': 60 * 60 * 25,
			'2 days ago': 60 * 60 * 48,
			'1 week ago': 60 * 60 * 24 * 7,
			'3 weeks ago': 60 * 60 * 24 * 20,
			'1 month ago': 60 * 60 * 24 * 30,
			'2 months ago': 60 * 60 * 24 * 55,
			'10 years ago': 60 * 60 * 24 * 3650,
			'about a minute from now': -65,
			'2 minutes from now': -120,
			'about 3 hours from now': -60 * 60 * 3,
			'1 day from now': -60 * 60 * 25,
			'2 days from now': -60 * 60 * 48,
			'2 weeks from now': -60 * 60 * 24 * 16,
			'1 month from now': -60 * 60 * 24 * 28,
			'2 months from now': -60 * 60 * 24 * 55
		};

		for (var phrase in phrases)
			expect(Date.getTimePhrase(phrases[phrase])).toEqual(phrase);
	}

});

describe('Date.timeAgoInWords', {

	'should return a readable description of the age of a date': function(){
		var d = new Date();
		expect(d.decrement('day', 2).timeAgoInWords()).toEqual('2 days ago');
	}

});

describe('Date.Extras.parse', {

	'should parse a string value into a date': function(){

		expect(Date.parse('today').get('date')).toEqual(new Date().get('date'));
		expect(Date.parse('yesterday').get('date')).toEqual(new Date().decrement().get('date'));
		expect(Date.parse('tomorrow').get('date')).toEqual(new Date().increment().get('date'));
	}

});
