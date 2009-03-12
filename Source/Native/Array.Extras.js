/*
Script: Array.Extras.js
	Extends the Array native object to include useful methods to work with arrays.

	License:
		MIT-style license.

	Authors:
		Christoph Pojer

*/
Array.implement({

	sum: function(){
		var s = 0;
		for(var i = 0, l = this.length; i < l; i++) s += this[i];
		return s;
	},

	dedupe: function(){
		var result = [];
		for(var i = 0, l = this.length; i < l; i++) result.include(this[i]);
		return result;
	}

});