/*
---

script: String.QueryString.js

description: Methods for dealing with URI query strings.

license: MIT-style license

authors:
- Sebastian Markbåge, Aaron Newton, Lennart Pilon, Valerio Proietti

requires:
- Core:1.2.4/Array
- Core:1.2.4/String
- /MooTools.More

provides: [String.QueryString]

...
*/

String.implement({

	parseQueryString: function(decodeKeys, decodeValues){
		var decodeKeys = typeof decodeKeys == 'undefined' ? true : decodeKeys;
		var decodeValues = typeof decodeValues == 'undefined' ? true : decodeValues;
		var vars = this.split(/[&;]/), res = {};
		if (vars.length) vars.each(function(val){
			var index = val.indexOf('='),
				keys = index < 0 ? [''] : val.substr(0, index).match(/[^\]\[]+/g),
				value = decodeValues ? decodeURIComponent(val.substr(index + 1)) : val.substr(index + 1),
				obj = res;
			keys.each(function(key, i){
				var key = decodeKeys ? decodeURIComponent(key) : key;
				var current = obj[key];
				if(i < keys.length - 1)
					obj = obj[key] = current || {};
				else if($type(current) == 'array')
					current.push(value);
				else
					obj[key] = $defined(current) ? [current, value] : value;
			});
		});
		return res;
	},

	cleanQueryString: function(method){
		return this.split('&').filter(function(val){
			var index = val.indexOf('='),
			key = index < 0 ? '' : val.substr(0, index),
			value = val.substr(index + 1);
			return method ? method.run([key, value]) : $chk(value);
		}).join('&');
	}

});