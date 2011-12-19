/*
---
name: URI.Relative Tests
requires: [More/URI.Relative]
provides: [URI.Relative.Tests]
...
*/
(function(){

var uri;

	describe('String.toURI using relative path', {

		before: function(){
			uri = '/mydirectory/myfile.html?myquery=true#myhash'.toURI({ base: 'http://myuser:mypass@www.calyptus.eu:8080/' });
		},

		'URI.toString() should be same as input combined': function(){
			expect(uri.toString()).toEqual('http://myuser:mypass@www.calyptus.eu:8080/mydirectory/myfile.html?myquery=true#myhash');
		},

		'should have a all properties set': function(){
			expect(uri.get('scheme')).toEqual('http');
			expect(uri.get('user')).toEqual('myuser');
			expect(uri.get('password')).toEqual('mypass');
			expect(uri.get('host')).toEqual('www.calyptus.eu');
			expect(uri.get('port')).toEqual('8080');
			expect(uri.get('directory')).toEqual('/mydirectory/');
			expect(uri.get('file')).toEqual('myfile.html');
			expect(uri.get('query')).toEqual('myquery=true');
			expect(uri.get('fragment')).toEqual('myhash');
		}

	});

	describe('URI toRelative functionality', {
		before: function(){
			uri = new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},
		'new URI(\'../otherfolder\').toRelative() should return a folder up from the current location': function(){
			expect(new URI('../otherfolder').toRelative()).toEqual('../otherfolder');
		},

		'new URI(\'../otherfolder\').toRelative(currentLocation) should return a folder up from the current location': function(){
			expect(new URI('../otherfolder').toRelative(window.location)).toEqual('../otherfolder');
		},

		'URI.toRelative(string)': function(){
			expect(uri.toRelative('http://www.calyptus.eu/mydirectory/myfile.html')).toEqual('mydirectory2/myfile.html');
		},

		'URI.toRelative(string)': function(){
			expect(uri.toRelative('http://www.calyptus.eu/mydirectory/')).toEqual('mydirectory2/myfile.html');
		},

		'URI.toRelative(uri)': function(){
			expect(uri.toRelative(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }))).toEqual('mydirectory2/myfile.html');
		},

		'URI.toAbsolute(string)': function(){
			expect(uri.toAbsolute('http://www.calyptus.eu/mydirectory/myfile.html')).toEqual('/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toAbsolute(uri)': function(){
			expect(uri.toAbsolute(new URI('mydirectory/myfile.html', { base: 'http://www.calyptus.eu/' }))).toEqual('/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) on parent': function(){
			expect(uri.toRelative('http://www.calyptus.eu/test/myfile.html')).toEqual('../mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) on different host': function(){
			expect(uri.toRelative('http://otherdomain/mydirectory/myfile.html')).toEqual('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toAbsolute(string) on different host': function(){
			expect(uri.toAbsolute('http://otherdomain/mydirectory/myfile.html')).toEqual('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) on different port': function(){
			expect(uri.toRelative('http://www.calyptus.eu:81/mydirectory/myfile.html')).toEqual('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toAbsolute(string) on different port': function(){
			expect(uri.toAbsolute('http://www.calyptus.eu:81/mydirectory/myfile.html')).toEqual('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html');
		},

		'URI.toRelative(string) with query': function(){
			expect(new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html?myquery=q').toRelative('http://www.calyptus.eu/mydirectory/myfile.html')).toEqual('mydirectory2/myfile.html?myquery=q');
		},

		'URI.toAbsolute(string) with query': function(){
			expect(new URI('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html?myquery=q').toAbsolute('http://www.calyptus.eu/mydirectory/myfile.html')).toEqual('/mydirectory/mydirectory2/myfile.html?myquery=q');
		},

		'URI.toRelative(string) to same file': function(){
			expect(uri.toRelative('http://www.calyptus.eu/mydirectory/mydirectory2/myfile.html')).toEqual('myfile.html');
		},

		'URI.toRelative(string) to same path': function(){
			expect(new URI('http://www.calyptus.eu').toRelative('http://www.calyptus.eu')).toEqual('./');
		},

		'new URI(\'../otherfolder\').toRelative() should return the same as input': function(){
			expect(new URI('../otherfolder').toRelative(window.location)).toEqual('../otherfolder');
		},

		'new URI(\'../otherfolder\').toRelative(window.location) should return the same as input': function(){
			expect(new URI('../otherfolder').toRelative(window.location)).toEqual('../otherfolder');
		}

	});

})();
