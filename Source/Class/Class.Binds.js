/*
Script: Class.Binds.js
	Automagically binds specified methods in a class to the instance of the class.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

Class.Mutators.Binds = function(binds){
    return binds;
};

(function(){
	var orig = Class.Mutators.initialize;

	Class.Mutators.initialize = function(initialize){
		if (orig) orig.apply(Class.Mutators, initialize);
		return function(){
			$splat(this.Binds).each(function(name){
				var original = this[name];
				if (original) this[name] = original.bind(this);
			}, this);
			return initialize.apply(this, arguments);
		};

	};
})();