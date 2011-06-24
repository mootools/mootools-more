/*
---
name: String.QueryString Tests
requires: [More/String.QueryString]
provides: [String.QueryString.Tests]
...
*/
(function(){

	describe('String.parseQueryString', {

		'should parse a query string to an object': function(){
			expect('apple=red&lemon=yellow'.parseQueryString().apple).toEqual('red');
			//verify that empty keys are ignored
			expect('apple=red&lemon=yellow&='.parseQueryString().apple).toEqual('red');
		},

		'should parse a query string with array syntax to an array': function(){
			var apple = 'apple=red&apple=green'.parseQueryString().apple;
			expect(typeOf(apple)).toEqual('array');
			expect(apple.length).toEqual(2);
		},

		'should parse a query string with an object to an object': function(){
			var obj = 'foo[bar][baz]=red'.parseQueryString();
			expect(obj.foo.bar.baz).toEqual('red');
		},

		'should parse a plain string to a key': function(){
			expect('appleyellow'.parseQueryString().hasOwnProperty('appleyellow')).toEqual(true);
			expect('a=1&b'.parseQueryString().hasOwnProperty('b')).toEqual(true);
		},

		'should parse an encoded querystring to an object': function(){
			expect('this%20should%20be%20decoded=yes'.parseQueryString()).toEqual({'this should be decoded': 'yes'});
		},

		'should parse a querystring without decoding': function(){
			expect('this%20should%20be%20encoded=oh%20dear'.parseQueryString(false, false)).toEqual({'this%20should%20be%20encoded': 'oh%20dear'});
		},

		'should parse a collection correctly': function(){
			expect(Hash.toQueryString('f[28][]=110&order=pv'.parseQueryString())).toEqual('f[28][]=110&order=pv');
		}

	});

	describe('String.cleanQueryString', {

		'should remove empty keys': function(){
			expect('a=b&x=y&z=123&e='.cleanQueryString()).toEqual('a=b&x=y&z=123');
		},

		'should remove specified keys': function(){
			expect('a=b&x=y&z=123&e='.cleanQueryString(function(key, value){
				return !value.match(/[0-9]/);
			})).toEqual('a=b&x=y&e=');
		}

	});


})();
