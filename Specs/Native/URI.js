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

		'should parse a plain string to an empty object': function(){
			value_of($H('appleyellow'.parseQueryString()).getLength() == 0).should_be_true();
		}

	});

	describe('String.cleanQueryString', {

		'should remove empty keys': function(){
			value_of('a=b&x=y&z=123&e='.cleanQueryString()).should_be('a=b&x=y&z=123');
		},

		'should remove specified keys': function(){
			value_of('a=b&x=y&z=123&e='.cleanQueryString(function(set){
				return !set.split("=")[1].match(/[0-9]/);
			})).should_be('a=b&x=y&e=');
		}

	});

	var url = 'http://www.test.com:8383/this/is/the/path.html?query=value#anchor';

	describe('URL.get(\'host\')', {

			'should get the domain of a url': function(){
				value_of(new URI(url.toString()).get('domain')).should_be('www.test.com');
			}

	});

	describe('URL.getData', {

			'should get the query string values from a url': function(){
				value_of(new URI(url.toString()).getData()['query']).should_be('value');
			},

			'should get the query string value from a url': function(){
				value_of(new URI(url.toString()).getData('query')).should_be('value');
			}

	});

	describe('URI.get(\'domain\')', {

			'should get the protocol from a url': function(){
				value_of(new URI(url.toString()).get('protocol')).should_be('http');
			}

	});

	describe('URI.get(\'port\')', {

			'should get the port from a url': function(){
				value_of(new URI(url.toString()).get('port')).should_be('8383');
			}

	});

	describe('URI.setData', {

			'should set query string values': function(){
				value_of(new URI('www.test.com').setData({a: 'b'}).toString()).should_be('www.test.com?a=b');
			},

			'should merge url query string values': function(){
				value_of(new URI('www.test.com?x=y&a=b').setData({a: 'c'}, true).toString()).should_be('www.test.com?x=y&a=c');
			}

	});

})();