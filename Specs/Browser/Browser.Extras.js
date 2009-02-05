/*
Script: Browser.Extras.js
	Specs for Browser.Extras.js

License:
	MIT-style license.
*/
(function(){

	var url = 'http://www.test.com:8383/this/is/the/path.html?apple=red#anchor';
	
	describe('Browser.getHost', {
		
			'should get the host of a url': function(){
				value_of(Browser.getHost(url)).should_be('www.test.com');
			}
	
	});

	describe('Browser.getQueryStringValue', {
	
			'should get the query string value from a url': function(){
				value_of(Browser.getQueryStringValue('apple', url)).should_be('red');
			}
	
	});

	describe('Browser.getQueryStringValues', {
	
			'should get the query string values from a url': function(){
				value_of(Browser.getQueryStringValues(url)).should_be({apple: 'red'});
			}
	
	});

	describe('Browser.getPort', {
	
			'should get the port from a url': function(){
				value_of(Browser.getPort(url)).should_be('8383');
			}	

	});
	
	describe('Browser.mergeQueryStringValues', {
	
			'should set query string values': function(){
				value_of(Browser.mergeQueryStringValues({a: 'b'}, 'www.test.com')).should_be('www.test.com?a=b');
			},

			'should merge url query string values': function(){
				value_of(Browser.mergeQueryStringValues({a: 'c'}, 'www.test.com?x=y&a=b')).should_be('www.test.com?x=y&a=c');
			},
			
			'should merge query string values': function(){
				value_of(Browser.mergeQueryStringValues({a: 'c'}, 'x=y&a=b')).should_be('x=y&a=c');
			}
	
	});

})();