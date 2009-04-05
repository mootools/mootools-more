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

	Implements: Options,

	options: {
		regex: /^(?:(\w+):\/\/)?(?:(?:(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]+)?(?::(\d*))?)?([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/,
		parts: ['full', 'scheme', 'user', 'password', 'host', 'port', 'path', 'query', 'fragment'],
		schemes: ['https','ftp','file','rtsp','mms'],
		required: ['scheme', 'host'],
		wrappers: {
			scheme: function(s) { return s ? s += '://' : '' },
			password: function(s) { return s ? ':' + s : '' },
			port: function(s) { return s ? ':' + s : ''},
			query: function(s) { return s ? '?' + s : ''},
			fragment: function(s) { return s ? '#' + s : ''}
		}
	},

	initialize: function(uri, options){
		this.setOptions(options);
		this.value = uri || document.location.href || '';
		this.parsed = this.parse(this.value);
	},

	valueOf: function(){
		return this.combine();
	},

	validate: function(parts, regex){
		parts = parts || this.options.parts;
		var valid = parts.every(function(part) {
			return !!this.parsed[part];
		}, this);
		return valid && (this.schemes.contains(bits.scheme) || !bits.scheme);
	},

	parse: function(value, regex, parts) {
		value = value || this.value;
		regex = regex || this.options.regex;
		parts = parts || this.options.parts;
		var match = this.value.match(regex);
		if (!match) return {};
		var bits = match.associate(parts);
		delete bits.full;
		return bits;
	},

	set: function(part, value){
		switch(part){
			case 'data': return this.setData(value);
			case 'value': 
				this.value = value;
				this.parse();
				return this;
		}
		var bits = this.parse();
		bits[part] = value;
		this.combine(bits);
		return this;
	},

	get: function(part){
		switch(part) {
			case 'data': return this.getData();
			case 'value': return this.toString();
		}
		return this.parse()[part];
	},

	getData: function(key){
		var qs = this.get('query');
		if (!$chk(qs)) return key ? null : {};
		var obj = decodeURI(qs).parseQueryString(false, false); 
		return key ? obj[key] : obj;
	},

	setData: function(values, merge){
		var merged = merge ? $merge(this.getData(), values) : values;
		var newQuery = '';
		for (key in merged) newQuery += encodeURIComponent(key) + '=' + encodeURIComponent(merged[key]) + '&';
		return this.set('query', newQuery.substring(0, newQuery.length-1));
	},

	clearData: function(){
		this.set('query', '');
	},

	combine: function(bits){
		bits = bits || this.parse();
		var result = '';
		$each(bits, function(value, key) {
			var wrapped = this.options.wrappers[key] ? this.options.wrappers[key](value) : value;
			result += wrapped ? wrapped : '';
		}, this);
		this.value = result;
		return this.value;
	},

	go: function(){
		document.location.href = this.value;
	}

});

URI.prototype.toString = function(){
	return this.combine();
};