/*
Script: URI.Relative.js
	Specs for URI.Relative.js

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

	describe('URI toRelative functionality', {
		before: function(){
			uri = new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		'new URI(\'../otherfolder\').toRelative() should return a folder up from the current location': function(){
			value_of(new URI('../otherfolder').toRelative()).should_be('../otherfolder');
		},

		'new URI(\'../otherfolder\').toRelative(currentLocation) should return a folder up from the current location': function(){
			value_of(new URI('../otherfolder').toRelative(window.location)).should_be('../otherfolder');
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
		
	})

})();