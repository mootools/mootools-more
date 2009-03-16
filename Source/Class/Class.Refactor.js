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
	for (k in orig) {
		update[k] = update[k] || orig[k];
	}
	return update;
};