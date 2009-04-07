/*
Script: URI.Data.js
	...

	License:
		MIT-style license.

	Authors:
		Sebastian Markbåge, Aaron Newton, Lennart Pilon, Valerio Proietti
*/

URI.implement({

	getData: function(key, part){
		var qs = this.get(part || 'query');
		if (!$chk(qs)) return key ? null : {};
		var obj = qs.parseQueryString();
		return key ? obj[key] : obj;
	},

	setData: function(values, merge, part){
		if($type(arguments[0]) == 'string'){ values = this.getData(); values[arguments[0]] = arguments[1]; }
		else if(merge) values = $merge(this.getData(), values);
		return this.set(part || 'query', Hash.toQueryString(values));
	},
	
	clearData: function(part){
		return this.set(part || 'query', '');
	}

});