/*
Script: Class.Binds.js
	Automagically binds specified methods in a class to the instance of the class.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

Class.Binds = new Class({
	
	_bound_: {},
	
	bound: function(name) {
		return (this._bound_[name]) ? this._bound_[name] : this._bound_[name] = this[name].bind(this);
	}
	
});


if (window.console && console.warn)
	Class.Mutators.Binds = function(binds){
		console.warn('You are using the deprecated Binds mutator on one of your classes, you should remove it. The bound methods are: ', binds);
	};