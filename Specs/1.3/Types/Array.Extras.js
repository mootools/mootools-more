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
		value_of([1, 2, 3, 4, 5].average()).should_be(3);
	}

});

describe('Array.shuffle', {

	'should shuffle an array': function(){
		var toShuffle = [],
			toShuffle2 = [];
		(100).times(function(i){
			toShuffle.push(i);
			toShuffle2.push(i);
		});
		value_of(toShuffle.shuffle()).should_not_be(toShuffle2.shuffle());
		value_of(toShuffle.shuffle().length).should_be(100);
		toShuffle.sort();
		toShuffle2.sort();
		value_of(toShuffle).should_be(toShuffle2);
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

describe('Array.reduce', function(){
	
	it('should have been implemented according ES5', function(){

		// Examples from https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce

		expect([0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){  
			return previousValue + currentValue;  
		})).toEqual(10);

		expect([0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){  
			return previousValue + currentValue;  
		}, 10)).toEqual(20);
		
		expect([[0,1], [2,3], [4,5]].reduce(function(a,b) {  
			return a.concat(b);  
		}, [])).toEqual([0, 1, 2, 3, 4, 5]);
		
	});
	
});

describe('Array.reduceRight', function(){
	
	it('should have been implemented according ES5', function(){
		
		// Examples from https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Array/ReduceRight
		
		expect([0,1,2,3,4].reduceRight(function(previousValue, currentValue, index, array){  
			return previousValue + currentValue;  
		})).toEqual(10);
		
		expect([0,1,2,3,4].reduceRight(function(previousValue, currentValue, index, array){  
			return previousValue + currentValue;  
		}, 10)).toEqual(20);
		
		expect([[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {  
			return a.concat(b);  
		}, [])).toEqual([4, 5, 2, 3, 0, 1]);
		
	});
	
});

