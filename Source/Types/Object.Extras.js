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

(function(){

var defined = function(value){
	return value != null;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

Object.extend({

	getFromPath: function(source, parts){
		if (typeof parts == 'string') parts = parts.split('.');
		for (var i = 0, l = parts.length; i < l; i++){
			if (hasOwnProperty.call(source, parts[i])) source = source[parts[i]];
			else return null;
		}
		return source;
	},

	cleanValues: function(object, method){
		method = method || defined;
		for (var key in object) if (!method(object[key])){
			delete object[key];
		}
		return object;
	},

	erase: function(object, key){
		if (hasOwnProperty.call(object, key)) delete object[key];
		return object;
	},

	run: function(object){
		var args = Array.slice(arguments, 1);
		for (var key in object) if (object[key].apply){
			object[key].apply(object, args);
		}
		return object;
	},
	
	isEqual: function(a, b){
		// Check object identity.
		if (a === b) return true;
		// Different types?
		var atype = typeOf(a), btype = typeOf(b);
		if (atype != btype) return false;
		// Basic equality test (watch out for coercions).
		if (a == b) return true;
		// One is falsy and the other truthy.
		if ((!a && b) || (a && !b)) return false;
		// One of them implements an isEqual()?
		if (a.isEqual) return a.isEqual(b);
		if (b.isEqual) return b.isEqual(a);
		// Both are NaN?
		if ((a !== a) && (b !== b)) return false;
		// Check dates' integer values.
		if (atype == 'date') return a.getTime() === b.getTime();
		if (atype == 'function') return true;
		// Compare regular expressions.
		if (atype == 'regexp')
		  return a.source     === b.source &&
		         a.global     === b.global &&
		         a.ignoreCase === b.ignoreCase &&
		         a.multiline  === b.multiline;
		// If a is not an object by this point, we can't handle it.
		if (atype !== 'object' && atype !== 'array') return false;
		// Check for different array lengths before comparing contents.
		if (a.length && (a.length !== b.length)) return false;
		// Nothing else worked, deep compare the contents.
		var aKeys = Object.keys(a), bKeys = Object.keys(b);
		// Different object sizes?
		if (aKeys.length != bKeys.length) return false;
		// Recursive comparison of contents.
		for (var key in a) if (!(key in b) || !Object.isEqual(a[key], b[key])) return false;
		return true;
	}

});

})();
