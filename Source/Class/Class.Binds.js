/*
Script: Class.Binds.js
	Automagically binds specified methods in a class to the instance of the class.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

Class.Binds = new Class({
	_bound: {},
	bound: function(name) {
		if (!this._bound[name]) this._bound[name] = this[name].bind(this);
		return this._bound[name]
	}
});

Class.Mutators.Binds = function(binds){
	if (window.console && console.warn)
		console.warn("You are using the deprecated Binds mutator on one of your classes, you should remove it. The bound methods are: ", binds);
};