/*
Script: Class.Binds.js
	Automagically binds specified methods in a class to the instance of the class.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
		Perrin Westrich
*/

(function(){

	var binder = function(self, binds, method){
		var oldInit = self.initialize;
		self.initialize = function(){
			Array.flatten(binds).each(function(binder){
				var original = this[binder];
<<<<<<< HEAD:Source/Class/Class.Binds.js
				this[binder] = original.bind(this);
=======
				this[binder] = original[method](this);
>>>>>>> eef56a5... Changed Class.Binds to be more generic to allow various types of bind mutators.:Source/Class/Class.Binds.js
				this[binder].parent = original.parent;
			}, this);
			return oldInit.apply(this,arguments);
		};
		return self;
	};

	(function(bindName, bindMethod){
		Class.Mutators[bindName] = function(self, binds){
			if(!self[bindName]) return self;
			delete self[bindName];
			return binder(self, binds, bindMethod);
		};
		return arguments.callee;
	})
	('Binds', 'bind')
	('BindsWithEvent', 'bindWithEvent');

})();
