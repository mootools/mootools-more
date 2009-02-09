/*
Script: Class.Refactor.js
	Extends a class onto itself with new property, preserving any items attached to the class's namespace.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

Class.refactor = function(orig, props){
	props = $extend($unlink(props), {Extends: orig});
	var update = new Class(props);
	$each(orig, function(v, k){
		update[k] = update[k] || v;
	});
	return update;
};

$extend(Class.prototype, {

	refactor: function(props){
		this.prototype = Class.refactor(this, props).prototype;
		return this;
	}

});