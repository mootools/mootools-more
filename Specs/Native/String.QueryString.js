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