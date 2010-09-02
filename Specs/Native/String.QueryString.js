/*
Script: URI.js
	Specs for URI.js

License:
	MIT-style license.
*/
(function(){

	describe('String.parseQueryString', {

		'should parse a query string to an object': function(){
			value_of('apple=red&lemon=yellow'.parseQueryString().apple).should_be('red');
		},

		'should parse a plain string to a key': function(){
			value_of('appleyellow'.parseQueryString()['']).should_be('appleyellow');
		},

		'should parse an encoded querystring to an object': function(){
			value_of('this%20should%20be%20encoded=yes'.parseQueryString()).should_be({'this should be encoded': 'yes'});
		}

	});

	describe('String.cleanQueryString', {

		'should remove empty keys': function(){
			value_of('a=b&x=y&z=123&e='.cleanQueryString()).should_be('a=b&x=y&z=123');
		},

		'should remove specified keys': function(){
			value_of('a=b&x=y&z=123&e='.cleanQueryString(function(key, value){
				return !value.match(/[0-9]/);
			})).should_be('a=b&x=y&e=');
		}

	});


})();