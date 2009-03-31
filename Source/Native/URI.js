/*
Script: URI.js
	Provides methods useful in managing the window location and uris.

	License:
		MIT-style license.

	Authors:
		Sebastian Markbåge, Aaron Newton
*/

var URI = new Class({

	Implements: Options,
	
	/*
	options: {
		scheme: false,
		base: false
	}
	*/

	initialize: function(uri, options){
		this.setOptions(options);
		if (uri) uri = uri.href || uri.toString();
		if (!uri.test(/^\w+:/)){
			var base = new URI(this.options.base, { base: URI.base });
			this.parsed = base.parsed;
			var scheme = base.scheme;
			if(!scheme || !scheme.fromRelative) return false;
			scheme.fromRelative(this.parsed, uri);
			return this;
		}
		
		var bits, scheme = this.options.scheme;
		if (scheme)
			bits = scheme.parse(uri, base);
		else
			URI.Schemes.some(function(s){ scheme = s; return bits = s.parse(uri, base); });
			
		if(!bits) return false;

		this.scheme = scheme;
		this.parsed = bits;
	},

	toString: function(){
		return this.scheme.combine(this.parsed);
	},
	
	set: function(part, value){
		switch(part){
			case "data": return this.setData(value);
			case "value":
			var bits = this.scheme.parse(value);
			if(bits) this.parsed = bits;
			return this;
		}
		this.parsed[part] = value;
		return this;
	},

	get: function(part){
		switch(part) {
			case "data": return this.getData();
			case "value": return this.toString();
		}
		return this.parsed[part];
	},

	go: function(){
		document.location.href = this.toString();
	}

});

URI.base = new URI($$('base[href]').getLast(), { base: document.location });

URI.validate = function(value){
	return URI.Schemes.some(function(scheme){ return scheme.validate(value); });
};

URI.Scheme = function(options){
	var scheme = new RegExp('^' + options.scheme + ':', 'i'),
		length = options.scheme.length + 1;
	return {
		parse: function(value){
			if(!scheme.test(value)) return false;
			var bits = value.substr(length).match(options.regex),
				defaults = options.defaults;
			if(!bits) return false;
			bits.shift();
			if(defaults) bits = bits.map(function(part, index){ return part || defaults[index]; });
			return bits.associate(options.parts);
		},
		validate: function(value){
			return scheme.test(value) && value.substr(length).test(options.regex);
		},
		combine: function(bits){
			return options.scheme + ':' + options.combine(bits);
		},
		// TODO: fromRelative...
	};
};

URI.Schemes = new Hash();

Hash.each({ http: 80, https: 443, ftp: 21, rtsp: 554, mms: 1755, file: undefined }, function(port, scheme){

	URI.Schemes[scheme] = new URI.Scheme({
		scheme: scheme,
		regex: /^(?:\/\/(?:(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]+)?(?::(\d*))?)?((?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
		parts: ['user', 'password', 'host', 'port', 'directory', 'file', 'query', 'fragment'],
		defaults: ['', '', '', port, '/', '', '', ''],
		combine: function(bits){
			return '//' + (bits.user ? bits.user + (bits.password ? ':' + bits.password : '') + '@' : '') +
				   (bits.hostname || '') + (bits.port && bits.port != port ? ':' + bits.port : '') +
				   (bits.directory || '/') + (bits.file || '') +
				   (bits.query ? '?' + bits.query : '') +
				   (bits.fragment ? '#' + bits.fragment : '');
		},
		props: {
			path: {
				regex: /^([^\/]*)(.*)$/,
				parts: ['directory', 'file'],
				combine: function(uri){ return uri.directory + (uri.file || ''); }
			}
		},
		fromRelative: {
			regex: /^(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(\?[^#]*)?(#.*)?/,
			parts: ['directory', 'file', 'query', 'fragment'],
			init: function(bits){
				var newDirectory = bits.directory || '';
				var oldDirectory = /^\/.?/.test(newDirectory) ? '' : (this.directory || '/');
				var dirs = oldDirectory + newDirectory.replace(/\/\s*$/, '');
				var result = [];
				dirs.split('/').each(function(dir){
					if(dir == '..' && result.length > 0)
						result.pop();
					else if(dir != '.')
						result.push(dir);
				});
				uri.directory = result.join('/') + '/';
			}
		}
	});
	
});
