/*
---
name: Array.Extras Tests
requires: [More/Array.Extras]
provides: [Array.Extras.Tests]
...
*/

describe('Array.min', {

	'should return the lowest number in the array': function(){
		expect([1, 2, 3, 4, 5, 6].min()).toEqual(1);
	}

});

describe('Array.max', {

	'should return the highest number in the array': function(){
		expect([1, 2, 3, 4, 5, 6].max()).toEqual(6);
	}

});

describe('Array.average', {

	'should return the average number of the values in the array': function(){
		expect([1, 2, 3, 4, 5].average()).toEqual(3);
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
		expect(toShuffle.shuffle()).toNotEqual(toShuffle2.shuffle());
		expect(toShuffle.shuffle().length).toEqual(100);
		toShuffle.sort();
		toShuffle2.sort();
		expect(toShuffle).toEqual(toShuffle2);
	}

});

describe('Array.sum', {

	'should some up all number values': function(){
		expect([1, 2, 3, 4, 5, 6].sum()).toEqual(21);
	},

	'should start concatenation if any item is not a number': function(){
		expect([1, 2, 'a', 3].sum()).toEqual('3a21');
	}

});


describe('Array.unique', {

	'should remove duplicates from an array': function(){
		expect(['apple', 'lemon', 'pear', 'lemon', 'apple'].unique()).toEqual(["apple", "lemon", "pear"]);
	},

	'should not remove items that are dedupe':function(){
		expect([0, '0', false, null, true].unique()).toEqual([0, '0', false, null, true]);
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

		expect([[0,1], [2,3], [4,5]].reduce(function(a,b){
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

		expect([[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b){
			return a.concat(b);
		}, [])).toEqual([4, 5, 2, 3, 0, 1]);

	});

});

describe('Array.pluck', function(){

	it('should return the specified property from each element', function(){
		expect([{ a: 1 }, { a: 2 }].pluck('a')).toEqual([1, 2]);
	});

	it('should return undefined properties', function(){
		expect([{ a: 1 }, { b: 2 }].pluck('a')).toEqual([1, undefined]);
	});

});

