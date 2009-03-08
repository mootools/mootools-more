/*
Script: Array.Extras.js
	Specs for Array.Extras.js

License:
	MIT-style license.
*/

describe('Array.sum', {

	'should some up all number values': function(){
		value_of([1, 2, 3, 4, 5, 6].sum()).should_be(21);
	},

	'should start concatenation if any of the array contents is not a number': function(){
		value_of([1, 2, 'a', 3].sum()).should_be('3a3');
	}

});