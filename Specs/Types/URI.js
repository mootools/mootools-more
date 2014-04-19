/*
---
name: URI Tests
requires: [More/URI]
provides: [URI.Tests]
...
*/

(function(){

	var uri;

	describe('URI initialize', function(){

		it('new URI() should return the current location', function(){
			expect(new URI().toString()).toEqual(window.location.href.replace(/#$|\?$|\?(?=#)/, ''));
		});

		it('new URI(\'http://www.calyptus.eu\') should return itself with a trailing slash', function(){
			expect(new URI('http://www.calyptus.eu').toString()).toEqual('http://www.calyptus.eu/');
		});

		it('new URI(\'http://www.calyptus.eu/\') should return itself', function(){
			expect(new URI('http://www.calyptus.eu/').toString()).toEqual('http://www.calyptus.eu/');
		});

		it('\'http://www.calyptus.eu/\' + \'./mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html', function(){
			expect(new URI('./mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }).toString()).toEqual('http://www.calyptus.eu/mydirectory/myfile.html');
		});

		it('\'http://www.calyptus.eu\' + \'mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html', function(){
			expect(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu' }).toString()).toEqual('http://www.calyptus.eu/mydirectory/myfile.html');
		});

		it('\'http://www.calyptus.eu/mydirectory/#\' + \'../myfile.html\' == http://www.calyptus.eu/myfile.html', function(){
			expect(new URI('../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/#' }).toString()).toEqual('http://www.calyptus.eu/myfile.html');
		});

		it('\'http://www.calyptus.eu/mydirectory/mydirectory2/\' + \'../../myfile.html\' == http://www.calyptus.eu/myfile.html', function(){
			expect(new URI('../../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/' }).toString()).toEqual('http://www.calyptus.eu/myfile.html');
		});

		it('\'http://www.calyptus.eu/mydirectory/mydirectory2/\' + \'../test/../myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html', function(){
			expect(new URI('../test/../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/' }).toString()).toEqual('http://www.calyptus.eu/mydirectory/myfile.html');
		});

		it('\'http://www.calyptus.eu/\' + \'http://otherdomain/mydirectory/myfile.html\' == http://otherdomain/mydirectory/myfile.html', function(){
			expect(new URI('http://otherdomain/mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }).toString()).toEqual('http://otherdomain/mydirectory/myfile.html');
		});

		it('\'http://www.calyptus.eu/mydirectory2/myfile.html\' + \'/mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html', function(){
			expect(new URI('/mydirectory/myfile.html', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' }).toString()).toEqual('http://www.calyptus.eu/mydirectory/myfile.html');
		});

		it('\'http://www.calyptus.eu/mydirectory2/\' + \'mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory2/mydirectory/myfile.html', function(){
			expect(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' }).toString()).toEqual('http://www.calyptus.eu/mydirectory2/mydirectory/myfile.html');
		});

		it('\'http://www.calyptus.eu/mydirectory2/\' + \'mydirectory\' == http://www.calyptus.eu/mydirectory2/mydirectory', function(){
			expect(new URI('mydirectory', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' }).toString()).toEqual('http://www.calyptus.eu/mydirectory2/mydirectory');
		});

		it('\'http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html\' + \'..\' == http://www.calyptus.eu/mydirectory/', function(){
			expect(new URI('..', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html' }).toString()).toEqual('http://www.calyptus.eu/mydirectory/');
		});

		it('Query String can contain @ symbol', function(){
			expect(new URI('http://www.calyptus.eu/myfile.html?email=somebody@gmail.com').get('host')).toEqual('www.calyptus.eu');
		});

	});

	describe('URI methods', function(){

		beforeEach(function(){
			uri = new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		});

		it('URI.toString() should be same as input', function(){
			expect(uri.toString()).toEqual('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		});

		it('URI.setData({ keyName: \'my value\' }) should return ?keyName=my%20value as the query', function(){
			uri.setData('keyName', 'myOtherValue');
			expect(uri.get('query')).toEqual('keyName=myOtherValue');
			uri.setData({ keyName: 'my value' });
			expect(uri.get('query')).toEqual('keyName=my%20value');
		});

		it('URI.getData() should return an object with the value set above', function(){
			expect(uri.getData().keyName).toEqual('my value');
		});

		it('URI.getData(\'keyName\') should return the string with the value set above', function(){
			expect(uri.getData('keyName')).toEqual('my value');
		});

	});

	describe('URI use where string is expected', function(){

		it('Request self should work with an URI object', function(){
			new Request({url: new URI()}).get();
		});

		it('A HREF should take an URI object', function(){
			expect(new Element('a').set('href', new URI()).get('href')).toEqual(new URI().toString());
		});

		it('post-concatenation with string', function(){
			expect(new URI('http://www.calyptus.eu/') + '?test').toEqual('http://www.calyptus.eu/?test');
		});

		it('pre-concatenation with string', function(){
			expect('URL: ' + new URI('http://www.calyptus.eu/')).toEqual('URL: http://www.calyptus.eu/');
		});

		it('regexp test', function(){
			expect(/^http/.test(new URI('http://www.calyptus.eu/'))).toEqual(true);
		});

	});

})();
