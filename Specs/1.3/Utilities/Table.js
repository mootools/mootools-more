/*
---
name: Table Tests
requires: [More/Table]
provides: [Table.Tests]
license: MIT-style license.
...
*/

describe('Table', function(){

	var table = new Table();
	var one = 1;
	var obj = {};
	var fn = function(){};

	it('Adds a values to a Table instance', function(){
		expect(table.length).toEqual(0);
		table.set('foo', 'bar');
		expect(table.length).toEqual(1);
		table.set(one, 'one');
		table.set(fn, 'function');
		table.set(obj, 'an object');
		expect(table.get('foo')).toEqual('bar');
		expect(table.get(one)).toEqual('one');
		expect(table.get(fn)).toEqual('function');
		expect(table.get(obj)).toEqual('an object');
		expect(table.length).toEqual(4);
	});

	it('Iterates over a Table instance', function(){
		var keys = [];
		var values = [];
		table.each(function(key, val){
			keys.push(key);
			values.push(val);
		});
		expect(keys).toEqual(['foo', one, fn, obj]);
		expect(values).toEqual(['bar', 'one', 'function', 'an object']);
	});

	it('Removes values from a Table instance', function(){
		expect(table.length).toEqual(4);
		table.erase('foo');
		expect(table.length).toEqual(3);
		table.erase(one);
		table.erase(fn);
		table.erase(obj);
		expect(table.get('foo')).toEqual(null);
		expect(table.get(one)).toEqual(null);
		expect(table.get(fn)).toEqual(null);
		expect(table.get(obj)).toEqual(null);
		expect(table.length).toEqual(0);
	});

});
