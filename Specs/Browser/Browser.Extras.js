/*
Script: URI.js
	Specs for URI.js

License:
	MIT-style license.
*/
(function(){

	var url = 'http://www.test.com:8383/this/is/the/path.html?apple=red#anchor';

	describe('URL.get(\'host\')', {

			'should get the domain of a url': function(){
				value_of(new URI(url.toString()).get('domain')).should_be('www.test.com');
			}

	});

	describe('URL.getData', {

			'should get the query string values from a url': function(){
				value_of(new URI(url.toString()).getData()['apple']).should_be('red');
			},

			'should get the query string value from a url': function(){
				value_of(new URI(url.toString()).getData('apple')).should_be('red');
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
				value_of(new URI('www.test.com').setData({a: 'b'})).should_be('www.test.com?a=b');
			},

			'should merge url query string values': function(){
				value_of(new URI('www.test.com?x=y&a=b').setData({a: 'c'}, true)).should_be('www.test.com?x=y&a=c');
			}

	});

})();