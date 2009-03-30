/*
Script: URI.Data.js
	...

	License:
		MIT-style license.

	Authors:
		Sebastian Markbåge, Aaron Newton, Lennart Pilon, Valerio Proietti
*/

String.implement({
	
	parseQueryString: function(){
		var vars = this.split(/[&;]/), res = {};
		if (vars.length) vars.each(function(val){
			var index = val.indexOf('='),
				keys = index < 1 ? [''] : val.substr(0, index).match(/[^\]\[]+/g),
				value = decodeURIComponent(val.substr(index + 1)),
				obj = res;
			keys.each(function(key, i){
				var current = obj[key];
				if(i < keys.length - 1)
					obj = obj[key] = current || {};
				else if($typeof(current) == 'array')
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

URI.implement({

	getData: function(key){
		var qs = this.get('query');
		if (!$chk(qs)) return key ? null : {};
		var obj = qs.parseQueryString();
		return key ? obj[key] : obj;
	},

	setData: function(values, merge){
		if($type(arguments[0]) == 'string'){ values = this.getData(); values[arguments[0]] = arguments[1]; }
		else if(merge) values = $merge(this.getData(), values);
		return this.set('query', Hash.toQueryString(values));
	},

	clearData: function(){
		return this.set('query', '');
	}

});