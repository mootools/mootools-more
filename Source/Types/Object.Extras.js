/*
---

script: Object.Extras.js

name: Hash.Extras

description: Extends the Hash native object to include getFromPath which allows a path notation to child elements.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Object
  - /MooTools.More

provides: [Object.Extras, Hash.Extras]

...
*/

Object.extend({

	getFromPath: function(source, notation){
		notation.replace(/\[([^\]]+)\]|\.([^.[]+)|[^[.]+/g, function(match){
			if (!source) return null;
			var prop = arguments[2] || arguments[1] || arguments[0];
			source = (prop in source && source.hasOwnProperty(prop)) ? source[prop] : null;
			return match;
		});
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


//<1.2compat>

Hash.implement({
	
	getFromPath: function(notation){
		return Object.getFromPath(this, notation);
	},
	
	cleanValues: function(method){
		return new Hash(Object.cleanValues(this, method));
	},
	
	run: function(){
		Object.run(arguments);
	}
		
});

//</1.2compat>
