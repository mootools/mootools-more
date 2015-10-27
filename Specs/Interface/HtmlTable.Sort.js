/*
---
name: HtmlTable.Sort Tests
requires: [More/HtmlTable.Sort]
provides: [HtmlTable.Sort.Tests]
...
*/
describe('HtmlTable.Sort', function(){
	
	function getText(rows){
		return Array.map(rows, function(item){
			return item.cells[0].get('text') || item.cells[0].getElement('input').get('value');
		});
	}

  it('should not step on prior this.bind declarations', function () {
    var table = new HtmlTable();
    expect(table.bound.headClick).not.toEqual(null);
  });

	describe('HtmlTable.Parsers', function(){

		var sortedTable = function(type, data){
			var table = new HtmlTable({
				sortable: true,
				headers: ['col'],
				parsers: type ? [type] : [],
				rows: data.map(function(item){return [item];})
			});

			return getText(table.sort(0, false).body.rows);
		};

		describe('date', function(){

			it('should sort on date', function(){
				expect(sortedTable('date', ['2/4/10', '3/4/10', '1/2/08'])).toEqual(['1/2/08', '2/4/10', '3/4/10']);
			});

			it('should accept multiple date types', function(){
				expect(sortedTable('date', ['Jan 5 2010', '01/08/2010', '1/2/08'])).toEqual(['1/2/08', 'Jan 5 2010', '01/08/2010']);
			});

		});

		describe('input-', function(){

			var data = [
				new Element('input', {type: 'checkbox', checked: false, value: 'd'}),
				new Element('input', {type: 'checkbox', checked: true, value: 'a'}),
				new Element('input', {type: 'checkbox', checked: false, value: 'c'}),
				new Element('input', {type: 'checkbox', checked: true, value: 'b'})
			];

			describe('input-checked', function(){

				it('should sort by checked inputs', function(){
					var result = sortedTable('input-checked', data);
					expect(result[0]).not.toEqual('d');
					expect(result[0]).not.toEqual('c');
					expect(result[3]).not.toEqual('b');
					expect(result[3]).not.toEqual('a');
				});

			});

			describe('input-value', function(){

				it('should sort by input value', function(){
					expect(sortedTable('input-value', data)).toEqual(['a', 'b', 'c', 'd']);
				});

			});

		});

		describe('number', function(){

			it('should sort a list numerically', function(){
				expect(sortedTable('number', [3, 1, 2])).toEqual(['1', '2', '3']);
				expect(sortedTable('number', [3, 1, 12, 2])).toEqual(['1', '2', '3', '12']);
			});

			it('should accept numbers as strings', function(){
				expect(sortedTable('number', ['3', '1', 2])).toEqual(['1', '2', '3']);
			});

			it('should not sort floats according to value', function(){
				expect(sortedTable('number', ['.03', '1', '.2'])).not.toEqual(['.03', '.2', '1']);
			});

		});

		describe('numberLax', function(){

			it('should sort a alphanumerical list numerically', function(){
				expect(sortedTable('number', ['12c', '1a', '4b'])).toEqual(['1a', '4b', '12c']);
			});

		});

		describe('float', function(){

			it('should correctly sort floats according to value', function(){
				expect(sortedTable('float', ['1', '.03', '.2'])).toEqual(['.03', '.2', '1']);
			});

			it('should correctly sort floats in scientific notation according to value', function(){
				expect(sortedTable(false, [1.3e-10, 1.1, 1, 2])).toEqual(['1.3e-10', '1', '1.1', '2']);
				expect(sortedTable(false, [1.3e100, 1.2e+100, 1.3e-10, 1.1, 1, 2])).toEqual(['1.3e-10', '1', '1.1', '2', '1.2e+100', '1.3e+100']);
			});

			it('should sort by float when autodetecting a mix of floats and integers are present', function(){
				expect(sortedTable(false, [1.3, 1.2, 1.1, 1, 2])).toEqual(['1', '1.1', '1.2', '1.3', '2']);
			});

		});

		describe('floatLax', function(){

			it('should correctly sort alpha-floats according to value', function(){
				expect(sortedTable('float', ['.2b', '1c', '.03a'])).toEqual(['.03a', '.2b', '1c']);
			});

		});

		describe('onSort event', function(){
			var status, args, tbody;
			var table = new HtmlTable({
				sortable: true,
				headers: ['col'],
				parsers: ['string'],
				rows: [['a'], ['c'], ['b']],
				onSort: function(body, index, reversed){
					args = arguments;
					tbody = body;
					status = reversed;
				}
			});

			it('should set function arguments', function(){
				expect(args.length).toEqual(3);
				expect(args[0].tagName.toLowerCase()).toEqual('tbody');
				expect(typeof args[1]).toEqual('number');
				expect(typeof args[2]).toEqual('string');
			});
			
			it('should correctly set the direction onSort event', function(){
				table.sort(0, false);
				expect(status).toEqual('asc');
				expect(getText(tbody.rows)).toEqual(['a', 'b', 'c']);
				table.sort(0, true);
				expect(status).toEqual('desc');
				expect(getText(tbody.rows)).toEqual(['c', 'b', 'a']);
			});

		});

		describe('string', function(){

			it('should sort a list alphabetically', function(){
				expect(sortedTable('string', ['a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
			});

			it('should not be case sensitive', function(){
				expect(sortedTable('string', ['A', 'C', 'b'])).toEqual(['A', 'b', 'C']);
			});

			it('should sort a list of numbers alphabetically', function(){
				expect(sortedTable('string', [1, 2, 3, 12])).toEqual(['1', '12', '2', '3']);
			});

		});

		describe('title', function(){

			it('should sort a list alphabetically by title', function(){
				var data = [
					new Element('div', {title: 'b', text: 'b'}),
					new Element('div', {title: 'a', text: 'a'}),
					new Element('div', {title: 'c', text: 'c'})
				];
				expect(sortedTable('string', data)).toEqual(['a', 'b', 'c']);
			});

		});

	});

	describe('serialize/deserialize', function(){

		it('should serialize the sorted state of a table', function(){
			var table = new HtmlTable({
				sortable: true,
				headers: ['col'],
				parsers: ['number'],
				rows: [[1],[0],[2]]
			});

			table.sort(0, false);
			expect(table.serialize()).toEqual({sortIndex: 0, sortReverse: false});
		});

		it('should allow a custom sort function', function(){
			var table = new HtmlTable({
				sortable: true,
				headers: ['col'],
				rows: [
					['cccc'],
					['bb'],
					['aaa']
				]
			});

			function customSort(a, b) { // sort by length of string
				return a.value.length > b.value.length ? 1: -1;
			}

			table.sort(0, false, false, customSort);
			var values = Array.map(table.body.rows, function(item){
				return item.cells[0].get('text');
			});
			expect(values).toEqual(["bb", "aaa", "cccc"]);
		});

		it('should restore the sorted state of a table', function(){
			var table = new HtmlTable({
				sortable: true,
				headers: ['col'],
				parsers: ['number'],
				rows: [[1],[0],[2]]
			});
			table.restore({sortIndex: 0, sortReverse: false});

			var order = Array.map(table.body.rows, function(item){
				return item.cells[0].get('text');
			});

			expect(order).toEqual(['0','1','2']);
		});


	});
});
