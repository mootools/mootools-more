/*
Script: URI.js
	Specs for URI.js

License:
	MIT-style license.
*/
(function(){

	var uri;

	describe('String.toURI using relative path', {

		before: function(){
			uri = '/mydirectory/myfile.html?myquery=true#myhash'.toURI({ base: 'http://myuser:mypass@www.calyptus.eu:8080/' });
		},

		'URI.toString() should be same as input combined': function(){
			value_of(uri.toString()).should_be('http://myuser:mypass@www.calyptus.eu:8080/mydirectory/myfile.html?myquery=true#myhash');
		},
		
		'should have a all properties set': function(){
			value_of(uri.get('scheme')).should_be('http');
			value_of(uri.get('user')).should_be('myuser');
			value_of(uri.get('password')).should_be('mypass');
			value_of(uri.get('host')).should_be('www.calyptus.eu');
			value_of(uri.get('port')).should_be(8080);
			value_of(uri.get('directory')).should_be('/mydirectory/');
			value_of(uri.get('file')).should_be('myfile.html');
			value_of(uri.get('query')).should_be('myquery=true');
			value_of(uri.get('fragment')).should_be('myhash');
		}
	});
	
	describe('URI initialize', {

		'new URI() should return the current location': function(){
			value_of(new URI()).should_be(window.location.href.replace(/#$|\?$|\?(?=#)/, ''));
		},

		'new URI(\'../otherfolder\').toRelative() should return a folder up from the current location': function(){
			value_of(new URI('../otherfolder').toRelative()).should_be('../otherfolder');
		},

		'new URI(\'../otherfolder\').toRelative(currentLocation) should return a folder up from the current location': function(){
			value_of(new URI('../otherfolder').toRelative(window.location)).should_be('../otherfolder');
		},

		'new URI(\'http://www.calyptus.eu\') should return itself with a trailing slash': function(){
			value_of(new URI('http://www.calyptus.eu')).should_be('http://www.calyptus.eu/');
		},

		'new URI(\'http://www.calyptus.eu/\') should return itself': function(){
			value_of(new URI('http://www.calyptus.eu/')).should_be('http://www.calyptus.eu/');
		},
		
		'\'http://www.calyptus.eu/\' + \'./mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('./mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' })).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},

		'\'http://www.calyptus.eu\' + \'mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu' })).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},
		
		'\'http://www.calyptus.eu/mydirectory/#\' + \'../myfile.html\' == http://www.calyptus.eu/myfile.html': function(){
			value_of(new URI('../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/#' })).should_be('http://www.calyptus.eu/myfile.html');
		},
		
		'\'http://www.calyptus.eu/mydirectory/mydirectory2/\' + \'../../myfile.html\' == http://www.calyptus.eu/myfile.html': function(){
			value_of(new URI('../../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/' })).should_be('http://www.calyptus.eu/myfile.html');
		},

		'\'http://www.calyptus.eu/mydirectory/mydirectory2/\' + \'../test/../myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('../test/../myfile.html', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/' })).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},
		
		'\'http://www.calyptus.eu/\' + \'http://otherdomain/mydirectory/myfile.html\' == http://otherdomain/mydirectory/myfile.html': function(){
			value_of(new URI('http://otherdomain/mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' })).should_be('http://otherdomain/mydirectory/myfile.html');
		},
		
		'\'http://www.calyptus.eu/mydirectory2/myfile.html\' + \'/mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory/myfile.html': function(){
			value_of(new URI('/mydirectory/myfile.html', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' })).should_be('http://www.calyptus.eu/mydirectory/myfile.html');
		},

		'\'http://www.calyptus.eu/mydirectory2/\' + \'mydirectory/myfile.html\' == http://www.calyptus.eu/mydirectory2/mydirectory/myfile.html': function(){
			value_of(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' })).should_be('http://www.calyptus.eu/mydirectory2/mydirectory/myfile.html');
		},

		'\'http://www.calyptus.eu/mydirectory2/\' + \'mydirectory\' == http://www.calyptus.eu/mydirectory2/mydirectory': function(){
			value_of(new URI('mydirectory', { base: 'http://www.calyptus.eu/mydirectory2/myfile.html' })).should_be('http://www.calyptus.eu/mydirectory2/mydirectory');
		},

		'\'http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html\' + \'..\' == http://www.calyptus.eu/mydirectory/': function(){
			value_of(new URI('..', { base: 'http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html' })).should_be('http://www.calyptus.eu/mydirectory/');
		}

	});
	
	describe('URI http protocol', {

		before: function(){
			uri = new URI('http://myuser:mypass@www.calyptus.eu:80/mydirectory/myfile.html?myquery=true#myhash');
		},
		
		'toString() should be same as input but cleaned up (port removed)': function(){
			value_of(uri.toString()).should_be('http://myuser:mypass@www.calyptus.eu/mydirectory/myfile.html?myquery=true#myhash');
		},

		'should have all properties set': function(){
			value_of(uri.get('scheme')).should_be('http');
			value_of(uri.get('user')).should_be('myuser');
			value_of(uri.get('password')).should_be('mypass');
			value_of(uri.get('host')).should_be('www.calyptus.eu');
			value_of(uri.get('port')).should_be(80);
			value_of(uri.get('directory')).should_be('/mydirectory/');
			value_of(uri.get('file')).should_be('myfile.html');
			value_of(uri.get('query')).should_be('myquery=true');
			value_of(uri.get('fragment')).should_be('myhash');
		},
		
		'set and get path property': function(){
			value_of(uri.set('path', '/mypath')).should_be('http://myuser:mypass@www.calyptus.eu/mypath?myquery=true#myhash');
			value_of(uri.set('path', '/mypath/myfile')).should_be('http://myuser:mypass@www.calyptus.eu/mypath/myfile?myquery=true#myhash');
			value_of(uri.get('path')).should_be('/mypath/myfile');
		}
		
	});
	
	describe('URI file protocol', {

		before: function(){
			uri = new URI('file:///mytopdirectory/mydirectory/myfile.html?myquery=true#myhash');
		},
		
		'should have relevant properties set': function(){
			value_of(uri.get('scheme')).should_be('file');
			value_of(uri.get('directory')).should_be('/mytopdirectory/mydirectory/');
			value_of(uri.get('file')).should_be('myfile.html');
			value_of(uri.get('query')).should_be('myquery=true');
			value_of(uri.get('fragment')).should_be('myhash');
		},
		
		'non file properties should be undefined': function(){
			value_of(uri.get('user')).should_be(undefined);
			value_of(uri.get('password')).should_be(undefined);
			value_of(uri.get('host')).should_be(undefined);
			value_of(uri.get('port')).should_be(undefined);
		}

	});

	describe('URI mailto protocol', {

		before: function(){
			uri = new URI('mailto:info@calyptus.eu?subject=This%20rocks');
		},

		'toString() should be same as input': function(){
			value_of(uri.toString()).should_be('mailto:info@calyptus.eu?subject=This%20rocks');
		},
		
		'should have all mailto properties set': function(){
			value_of(uri.get('scheme')).should_be('mailto');
			value_of(uri.get('email')).should_be('info@calyptus.eu');
			value_of(uri.get('user')).should_be('info');
			value_of(uri.get('host')).should_be('calyptus.eu');
			value_of(uri.get('query')).should_be('subject=This%20rocks');
		},

		'subject should be the "subject" part of the headers': function(){
			value_of(uri.getData('subject')).should_be('This rocks');
		},
		
		'subject should be the "body" part of the headers, in this case undefined': function(){
			value_of(uri.getData('body')).should_be(undefined);
		},

		'http/https/ftp/file specific properties should be undefined': function(){
			value_of(uri.get('password')).should_be(undefined);
			value_of(uri.get('port')).should_be(undefined);
			value_of(uri.get('directory')).should_be(undefined);
			value_of(uri.get('file')).should_be(undefined);
			value_of(uri.get('search')).should_be(undefined);
			value_of(uri.get('fragment')).should_be(undefined);
		}
	});

	describe('URI methods', {

		before_all: function(){
			uri = new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		
		'URI.toString() should be same as input': function(){
			value_of(uri.toString()).should_be('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		
		'URI.toRelative(string)': function(){
			value_of(uri.toRelative('http://www.calyptus.eu/mydirectory/myfile.html')).should_be('mydirectory2/myfile.html');
		},

		'URI.toRelative(string)': function(){
			value_of(uri.toRelative('http://www.calyptus.eu/mydirectory/')).should_be('mydirectory2/myfile.html');
		},

		'URI.toRelative(uri)': function(){
			value_of(uri.toRelative(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }))).should_be('mydirectory2/myfile.html');
		},

		'URI.toAbsolute(string)': function(){
			value_of(uri.toAbsolute('http://www.calyptus.eu/mydirectory/myfile.html')).should_be('/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toAbsolute(uri)': function(){
			value_of(uri.toAbsolute(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }))).should_be('/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) on parent': function(){
			value_of(uri.toRelative('http://www.calyptus.eu/test/myfile.html')).should_be('../mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) on different host': function(){
			value_of(uri.toRelative('http://otherdomain/mydirectory/myfile.html')).should_be('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toAbsolute(string) on different host': function(){
			value_of(uri.toAbsolute('http://otherdomain/mydirectory/myfile.html')).should_be('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) on different port': function(){
			value_of(uri.toRelative('http://www.calyptus.eu:81/mydirectory/myfile.html')).should_be('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toAbsolute(string) on different port': function(){
			value_of(uri.toAbsolute('http://www.calyptus.eu:81/mydirectory/myfile.html')).should_be('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		
		'URI.toRelative(string) with query': function(){
			value_of(new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html?myquery=q').toRelative('http://www.calyptus.eu/mydirectory/myfile.html')).should_be('mydirectory2/myfile.html?myquery=q');
		},

		'URI.toAbsolute(string) with query': function(){
			value_of(new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html?myquery=q').toAbsolute('http://www.calyptus.eu/mydirectory/myfile.html')).should_be('/mydirectory/mydirectory2/myfile.html?myquery=q');
		},

		'URI.toRelative(string) to same file': function(){
			value_of(uri.toRelative('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html')).should_be('myfile.html');
		},

		'URI.toRelative(string) to same path': function(){
			value_of(new URI('http://www.calyptus.eu').toRelative('http://www.calyptus.eu')).should_be('./');
		},
		
		'new URI(\'../otherfolder\').toRelative() should return the same as input': function(){
			value_of(new URI('../otherfolder').toRelative(window.location)).should_be('../otherfolder');
		},

		'new URI(\'../otherfolder\').toRelative(window.location) should return the same as input': function(){
			value_of(new URI('../otherfolder').toRelative(window.location)).should_be('../otherfolder');
		},
		
		'URI.setData({ keyName: \'my value\' }) should return ?keyName=my%20value as the query': function(){
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
			new Request({ url: new URI() }).get();
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