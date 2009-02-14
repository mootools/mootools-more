/*
Script: URI.js
	Specs for URI.js

License:
	MIT-style license.
*/
(function(){

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