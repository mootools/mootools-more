/*
Script: URI.js
	Provides methods useful in managing the window location and uris.

	License:
		MIT-style license.

	String subclass based on:
		http://webreflection.blogspot.com/2008/10/subclassing-javascript-native-string.html

	Authors:
		Aaron Newton, Lennart Pilon, Valerio Proietti
*/

String.implement({
	
	parseQueryString: function(encodeKeys, encodeValues){
		encodeKeys = $pick(encodeKeys, true);
		encodeValues = $pick(encodeValues, true);
		var vars = this.split(/[&;]/), rs = {};
		if (vars.length) vars.each(function(val){
			var keys = val.split('=');
			if (keys.length && keys.length == 2){
				rs[(encodeKeys) ? encodeURIComponent(keys[0]):keys[0]] = (encodeValues) ? encodeURIComponent(keys[1]) : keys[1];
			}
		});
		return rs;
	},

	cleanQueryString: function(method){
		return this.split('&').filter(method || function(set){
			return $chk(set.split('=')[1]);
		}).join('&');
	}
	
});

var URI = new Class({

	toString: function(){
		return this.value;
	},

	valueOf: function(){
		return this.value;
	},

	validate: function(regex, parts){
		parts = parts || this.parts;
		var bits = this.parse(regex, parts);
		return parts.every(function(part) {
			return !!bits[part];
		});
	},

	parse: function(regex, parts) {
		regex = regex || this.regex;
		parts = parts || this.parts;
		var bits = this.value.match(regex).associate(parts);
		delete bits.full;
		return bits;
	},

	set: function(part, value){
		var bits = this.parse();
		bits[part] = value;
		this.combine(bits);
		return this;
	},

	get: function(part){
		return this.parse()[part];
	},

	combine: function(bits){
		bits = bits || this.parse();
		var result = '';
		$each(bits, function(value, key) {
			var wrapped = this.wrappers[key] ? this.wrappers[key](value) : value;
			result += wrapped ? wrapped : '';
		}, this);
		this.value = result;
		return this;
	},

	go: function(){
		document.location.href = this.value;
	}

});

(function(){

	//HTTP: protocol, user, password, hostname, port, directory, pathname, file, search, hash
	//MAILTO: email, username, hostname, headers, subject, body
	URI.URL = new Class({

		Extends: URI,

		wrappers: {
			protocol: function(s) { return s ? s += '://' : s },
			password: function(s) { return s ? ':' + s : s },
			port: function(s) { return s ? ':' + s : s},
			query: function(s) { return s ? '?' + s : s},
			fragment: function(s) { return s ? '#' + s : s}
		},

		initialize: function(uri){
			this.value = uri || document.location.href || '';
			this.regex = URI.URL.regex;
			this.parts = URI.URL.parts;
		},

		parse: function(){
			return this.parent(URI.URL.regex, URI.URL.parts);
		},

		validate: function(regex, parts){
			return this.parent(regex || this.regex, parts || ['protocol', 'host']);
		},

		set: function(part, value){
			switch(part) {
				case 'data': return this.setData(value);
				case 'directory': return this.setDirectory(value);
			}
			return this.parent(part, value);
		},

		get: function(part){
			switch(part) {
				case 'data': return this.getData();
				case 'directory': return this.getDirectory();
			}
			return this.parent(part);
		},

		getData: function(key){
			var qs = this.get('query');
			if (!$chk(qs)) return key ? null : {};
			var obj = decodeURI(qs).parseQueryString(false, false); 
			return key ? obj[key] : obj;
		},

		getDirectory: function() {
			var bits = this.get('path').split('/');
			bits.pop();
			return bits.join('/');
		},

		setDirectory: function(dir){
			return this.set('path', dir + '/' + this.get('path').split('/').getLast());
		},

		setData: function(values, merge){
			var merged = merge ? $merge(this.getData(), values) : values;
			var newQuery = '';
			for (key in merged) newQuery += encodeURIComponent(key) + '=' + encodeURIComponent(merged[key]) + '&';
			return this.set('query', newQuery.substring(0, newQuery.length-1));
		},

		clearData: function(){
			this.set('query', '');
		}

	});

	URI.URL.regex = /^(?:(\w+):\/\/)?(?:(?:(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]+)?(?::(\d*))?)?([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/;
	URI.URL.parts = ['full', 'protocol', 'user', 'password', 'host', 'port', 'path', 'query', 'fragment'];

	var methods = {};

	URI.URL.parts.each(function(part){

		methods['get' + part.capitalize()] = function(){
			return this.get(part);
		};

		methods['set' + part.capitalize()] = function(value){
			return this.set(part, value);
		};

	});

	URI.URL.implement(methods);

})();