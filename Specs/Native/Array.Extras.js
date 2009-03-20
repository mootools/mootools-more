/*
Script: Array.Extras.js
	Specs for Array.Extras.js

License:
	MIT-style license.
*/

describe('Array.min', {

	'should return the lowest number in the array': function(){
		value_of([1, 2, 3, 4, 5, 6].min()).should_be(1);
	}

});

describe('Array.max', {

	'should return the highest number in the array': function(){
		value_of([1, 2, 3, 4, 5, 6].max()).should_be(6);
	}

});

describe('Array.average', {

	'should return the average number of the values in the array': function(){
		value_of([1, 2, 3, 4, 5].max()).should_be(5);
	}

});

describe('Array.sum', {

	'should some up all number values': function(){
		value_of([1, 2, 3, 4, 5, 6].sum()).should_be(21);
	},

	'should start concatenation if any item is not a number': function(){
		value_of([1, 2, 'a', 3].sum()).should_be('3a21');
	}

});


describe('Array.unique', {

	'should remove duplicates from an array': function(){
		value_of(['apple', 'lemon', 'pear', 'lemon', 'apple'].unique()).should_be(["apple", "lemon", "pear"]);
	},

	'should not remove items that are dedupe':function(){
		value_of([0, '0', false, null, true].unique()).should_be([0, '0', false, null, true]);
	}

});