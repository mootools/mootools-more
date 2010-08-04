/*
---

script: Object.Extras.js

name: Object.Extras

description: Extra Object generics, like getFromPath which allows a path notation to child elements.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Object
  - /MooTools.More

provides: [Object.Extras]

...
*/

Object.extend({

	getFromPath: function(source, key){

		var parts = key.split('.');
		for (var i = 0, l = parts.length; i < l; i++){
			if (source.hasOwnProperty(parts[i])) source = source[parts[i]];
			else return null;
		}
		return source;
		
	},

	cleanValues: function(object, method){
		method = method || function(obj){
			return obj != null;
		};
		for(key in object){
			if(!method(object[key])) delete object[key];
		}
		return object;
	},

	erase: function(object, key){
		if(object.hasOwnProperty(key)) delete object[key];
		return object;
	},

	run: function(object){
		var args = Array.slice(arguments, 1);
		for(key in object){
			if(typeOf(object[key]) == 'function') object[key].apply(object,  args);
		}
	}

});
