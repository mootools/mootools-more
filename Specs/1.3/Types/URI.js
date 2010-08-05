/*
Script: URI.js
	Specs for URI.js

License:
	MIT-style license.
*/
(function(){

	var uri;

	describe('URI initialize', {

		'new URI() should return the current location': function(){
			value_of(new URI().toString()).should_be(window.location.href.replace(/#$|\?$|\?(?=#)/, ''));
		},

		'new URI(\'http://www.calyptus.eu\') should return itself with a trailing slash': function(){
			value_of(new URI('http://www.calyptus.eu').toString()).should_be('http://www.calyptus.eu/');
		},

		'new URI(\'http://www.calyptus.eu/\') should return itself': function(){
			value_of(new URI('http://www.calyptus.eu/').toString()).should_be('http://www.calyptus.eu/');
		},
		
		'\'http://www.calyptus.eu/\' + \'./mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('./mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }).toString()).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},

		'\'http://www.calyptus.eu\' + \'mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu' }).toString()).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},
		
		'\'http://www.calyptus.eu/mydirectory/#\' + \'../myfile.html\' == http://www.calyptus.eu/myfile.html': function(){
			value_of(new URI('../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/#' }).toString()).should_be('http://www.calyptus.eu/myfile.html');
		},
		
		'\'http://www.calyptus.eu/mydirectory/mydirectory2/\' + \'../../myfile.html\' == http://www.calyptus.eu/myfile.html': function(){
			value_of(new URI('../../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/' }).toString()).should_be('http://www.calyptus.eu/myfile.html');
		},

		'\'http://www.calyptus.eu/mydirectory/mydirectory2/\' + \'../test/../myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('../test/../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/' }).toString()).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},
		
		'\'http://www.calyptus.eu/\' + \'http://otherdomain/mydirectory/myfile.html\' == http://otherdomain/mydirectory/myfile.html': function(){
			value_of(new URI('http://otherdomain/mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }).toString()).should_be('http://otherdomain/mydirectory/myfile.html');
		},
		
		'\'http://www.calyptus.eu/mydirectory2/myfile.html\' + \'/mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('/mydirectory/myfile.html', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' }).toString()).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},

		'\'http://www.calyptus.eu/mydirectory2/\' + \'mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory2/mydirectory/myfile.html': function(){
			value_of(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' }).toString()).should_be('http://www.calyptus.eu/mydirectory2/mydirectory/myfile.html');
		},

		'\'http://www.calyptus.eu/mydirectory2/\' + \'mydirectory\' == http://www.calyptus.eu/mydirectory2/mydirectory': function(){
			value_of(new URI('mydirectory', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' }).toString()).should_be('http://www.calyptus.eu/mydirectory2/mydirectory');
		},

		'\'http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html\' + \'..\' == http://www.calyptus.eu/mydirectory/': function(){
			value_of(new URI('..', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html' }).toString()).should_be('http://www.calyptus.eu/mydirectory/');
		},
		
		'Query String can contain @ symbol': function(){
			value_of(new URI('http://www.calyptus.eu/myfile.html?email=somebody@gmail.com').get('host')).should_be('www.calyptus.eu');
		}

	});

	describe('URI methods', {

		before_all: function(){
			uri = new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		
		'URI.toString() should be same as input': function(){
			value_of(uri.toString()).should_be('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		
		'URI.setData({ keyName: \'my value\' }) should return ?keyName=my%20value as the query': function(){
			uri.setData('keyName', 'myOtherValue');
			value_of(uri.get('query')).should_be('keyName=myOtherValue');
			uri.setData({ keyName: 'my value' });
			value_of(uri.get('query')).should_be('keyName=my%20value');
		},
		
		'URI.getData() should return an object with the value set above': function(){
			value_of(uri.getData().keyName).should_be('my value');
		},

		'URI.getData(\'keyName\') should return the string with the value set above': function(){
			value_of(uri.getData('keyName')).should_be('my value');
		}
		
	});

	describe('URI use where string is expected', {

		'Request self should work with an URI object': function(){
			new Request({url: new URI()}).get();
		},

		'A HREF should take an URI object': function(){
			value_of(new Element('a').set('href', new URI()).get('href')).should_be(new URI().toString());
		},
		
		'post-concatenation with string': function(){
			value_of(new URI('http://www.calyptus.eu/') + '?test').should_be('http://www.calyptus.eu/?test');
		},
		
		'pre-concatenation with string': function(){
			value_of('URL: ' + new URI('http://www.calyptus.eu/')).should_be('URL: http://www.calyptus.eu/');
		},
		
		'regexp test': function(){
			value_of(/^http/.test(new URI('http://www.calyptus.eu/'))).should_be(true);
		}

	});

})();