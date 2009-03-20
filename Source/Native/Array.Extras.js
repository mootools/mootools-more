/*
Script: Array.Extras.js
	Extends the Array native object to include useful methods to work with arrays.

	License:
		MIT-style license.

	Authors:
		Christoph Pojer

*/
Array.implement({

	min: function(){
		return Math.min.apply(null, this);
	},

	max: function(){
		return Math.max.apply(null, this);
	},

	average: function(){
		return this.length ? this.sum() / this.length : 0;
	},

	sum: function(){
		var result = 0, l = this.length;
		if (l) do { result += this[--l]; } while (l);
		return result;
	},

	unique: function(){
		return [].combine(this);
	}

});