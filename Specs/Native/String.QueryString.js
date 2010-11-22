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
			//verify that empty keys are ignored
			value_of('apple=red&lemon=yellow&='.parseQueryString().apple).should_be('red');
		},

		'should parse a plain string to a key': function(){
			value_of('appleyellow'.parseQueryString()['']).should_be('appleyellow');
		},

		'should parse an encoded querystring to an object': function(){
			value_of('this%20should%20be%20decoded=yes'.parseQueryString()).should_be({'this should be decoded': 'yes'});
		},

		'should parse a querystring without decoding': function(){
			value_of('this%20should%20be%20encoded=oh%20dear'.parseQueryString(false, false)).should_be({'this%20should%20be%20encoded': 'oh%20dear'});
		},

		'should parse a collection correctly': function(){
			value_of(Hash.toQueryString('f[28][]=110&order=pv'.parseQueryString())).should_be('f[28][]=110&order=pv');
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