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
	},
	*/

	initialize: function(uri, options){
		this.setOptions(options);
		var base = this.options.base || URI.base;
		if (!uri) uri = base;
		else if (uri.scheme) return $extend(this, uri);
		uri = uri.href || uri.toString();
		if (base) base = new URI(base);
		
		var scheme = this.options.scheme;
		if (!scheme){
			var first = uri.match(/^(\w+):/);
			if (first){ scheme = URI.Schemes[first[1].toLowerCase()]; base = false; }
			else if (base) scheme = base.scheme;
			if (!scheme) scheme = URI.Schemes.Unknown;
		}
		this.scheme = scheme;
		this.parts = {};
		this.set('value', uri, base);
	},
	
	set: function(part, value, base){
		var bits = this.scheme.parse(value, (base || this).parts, part);
		if (bits) this.parts = bits; else this.parts[part] = value;
		return this;
	},

	get: function(part, base){
		var value = this.scheme.combine(this.parts, base ? base.parts : false, part);
		return value || this.parts[part] || undefined;
	},

	go: function(){
		document.location.href = this.toString();
	},
	
	toURI: function(){
		return this;
	}

});

URI.prototype.toString = function(){
	return this.get('value');
};

URI.Scheme = function(properties){
	return {

		parse: function(value, base, property){
			var prop = properties[property || 'value'];
			if (!prop) return false;
			var bits = value.match(prop.regex);
			if (!bits) return false;
			bits.shift()
			bits = bits.associate(prop.parts);
			if (base) Hash.each(base, function(value, part){
				if (!prop.parts.contains(part)) bits[part] = value;
			});
			return prop.merge ? prop.merge(bits, base) : bits;
		},
		
		combine: function(bits, base, property){
			var prop = properties[property || 'value'];
			return prop ? prop.combine(bits, base) : false;
		}

	};
};

URI.Schemes = new Hash({

	Unknown: new URI.Scheme({})
	
});

Hash.each({ http: 80, https: 443, ftp: 21, rtsp: 554, mms: 1755, file: undefined }, function(port, scheme){

	URI.Schemes[scheme] = new URI.Scheme({
	
		value: {
			regex: new RegExp('^(?:(?:(' + scheme + '):)?\\/\\/(?:(?:([^:@]*):?([^:@]*))?@)?([^:\\/?#]*)(?::(\\d*))?)?(\\.\\.?$|(?:[^?#\\/]*\\/)*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?', 'i'),
			parts: ['scheme', 'user', 'password', 'host', 'port', 'directory', 'file', 'query', 'fragment'],

			merge: function(bits, base){

				if (base){
					this.parts.every(function(part){
						if (bits[part]) return false;
						bits[part] = base[part] || '';
						return true;
					});
				}
				
				if (!bits.scheme) return false;

				bits.port = bits.port || port;
			
				if (bits.directory){
					var directory = ((/^\/.?/.test(bits.directory)) ? '' :
									(base && base.directory ? base.directory : '/')) +
									(bits.directory || '');

					var result = [];
					directory.replace(/\/$/, '').split('/').each(function(dir){
						if (dir == '..' && result.length > 0)
							result.pop();
						else if (dir != '.')
							result.push(dir);
					});
					bits.directory = result.join('/') + '/';
				}

				return bits;
			},

			combine: function(bits){
				return bits.scheme + '://' +
					(bits.user ? bits.user + (bits.password ? ':' + bits.password : '') + '@' : '') +
					(bits.host || '') + (bits.port && bits.port != port ? ':' + bits.port : '') +
					(bits.directory || '/') + (bits.file || '') +
					(bits.query ? '?' + bits.query : '') +
					(bits.fragment ? '#' + bits.fragment : '');
			}
		},
		
		path: {
			regex: /^((?:[^?#\/]*\/)+)?(.*)$/,
			parts: ['directory', 'file'],
			combine: function(bits){ return bits.directory + bits.file; }
		}

	});

});

URI.base = new URI($$('base[href]').getLast(), { base: document.location });

URI.validate = function(value){
	return URI.Schemes.some(function(scheme){ return scheme.parse(value); });
};

String.implement({

	toURI: function(options){ return new URI(this, options); }

});