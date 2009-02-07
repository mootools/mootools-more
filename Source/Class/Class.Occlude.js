/*
Script: Class.Occlude.js
	Prevents a class from being applied to a DOM element twice.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

Class.Occlude = new Class({

	// usage: if (this.occlude()) return this.occluded;
	occlude: function(property, element){
		element = $(element || this.element);
		var instance = element.retrieve(property || this.property);
		if (instance && !$defined(this.occluded)){
			this.occluded = instance; 
		} else {
			this.occluded = false;
			element.store(property || this.property, this);
		}
		return this.occluded;
	}

});