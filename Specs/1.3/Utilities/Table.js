/*
Script: Hash.Cookie.js
	Specs for Hash.Cookie.js

License:
	MIT-style license.
*/

(function(){
	var table = new Table();
	var one = 1;
	var obj = {};

	describe('Table', {

		'Adds a values to a Table instance': function(){
			expect(table.length).toEqual(0);
			table.set('foo', 'bar');
			expect(table.length).toEqual(1);
			table.set(one, 'one');
			table.set(document.body, 'doc body');
			table.set(obj, 'an object');
			expect(table.get('foo')).toEqual('bar');
			expect(table.get(one)).toEqual('one');
			expect(table.get(document.body)).toEqual('doc body');
			expect(table.get(obj)).toEqual('an object');
			expect(table.length).toEqual(4);
		},

		'Iterates over a Table instance': function(){
			var keys = [];
			var values = [];
			table.each(function(key, val){
				keys.push(key);
				values.push(val);
			});
			expect(keys).toEqual(['foo', one, document.body, obj]);
			expect(values).toEqual(['bar', 'one', 'doc body', 'an object']);
		},

		'Removes values from a Table instance': function(){
			expect(table.length).toEqual(4);
			table.erase('foo');
			expect(table.length).toEqual(3);
			table.erase(one);
			table.erase(document.body);
			table.erase(obj);
			expect(table.get('foo')).toEqual(null);
			expect(table.get(one)).toEqual(null);
			expect(table.get(document.body)).toEqual(null);
			expect(table.get(obj)).toEqual(null);
			expect(table.length).toEqual(0);
		}

	});
})();