/*
---
name: HtmlTable Tests
requires: [More/HtmlTable]
provides: [HtmlTable.Tests]
...
*/
describe('HtmlTable', function(){

	it('should create a new HtmlTable instance', function(){

		var properties = {
			border: '1',
			cellspacing: '2',
			cellpadding: '3',
			'class': 'simple-table'
		};

		var t = new HtmlTable({
			properties: properties,
			headers: ['fruit', 'colors'],
			footers: ['fruit', 'colors'],
			rows: [
				['lemon', 'yellow'],
				['apple', 'red']
			]
		});

		expect(t.thead.getElements('th').length).toEqual(2);
		expect(t.body.getElements('td').length).toEqual(4);
		expect(t.body.rows.length).toEqual(2);

		expect($(t).get('border', 'cellspacing', 'cellpadding', 'class')).toEqual(properties);

	});

	describe('HtmlTable:push', function(){
		var t = new HtmlTable(),
			tds;

		it('should push an multidimensional array', function(){
			t.push([
				'apple',
				[
					new Element('span', {'html': 'red'}),
					new Element('span', {'html': '(green)'})
				]
			]);

			tds = t.body.rows[0].getElements('td');
			expect(tds.length).toEqual(2);
			expect(tds[0].get('text')).toEqual('apple');
			expect(tds[1].get('text')).toEqual('red(green)');
		});

		it('should push a simple array with text', function(){
			t.push(['lemon', 'yellow']);
			tds = t.body.rows[1].getElements('td');
			expect(tds[0].get('text')).toEqual('lemon');
			expect(tds[1].get('text')).toEqual('yellow');
		});

		it('should push an array with options and properties', function(){
			t.push([{
					content: 'grapes',
					properties: {'class': 'someClass'}
				},
				'purple'
			]);
			tds = t.body.rows[2].getElements('td');
			expect(tds[0].get('text', 'class')).toEqual({
				text: 'grapes',
				'class': 'someClass'
			});
			expect(tds[1].get('text')).toEqual('purple');
		});

		it('should complement the spanned row with a new td', function(){
			t.push(['green']);
			expect(t.body.rows[3].getElements('td').length).toEqual(1);
		});

		it('should push an tr element', function(){
			var tr = new Element('tr').adopt(
				new Element('td'),
				new Element('td')
			);
			t.push(tr);
			expect(t.body.rows[4]).toEqual(tr);
		});

		it('should return an object {tr: ..., tds: ...}', function(){
			var value = t.push(['banana', 'yellow']);
			expect(value.tr.get('tag')).toEqual('tr');
			expect(value.tds.length).toEqual(2);
		});

		it('should push a row to the designated location', function(){
			var t = new HtmlTable();
			t.push(['red', 'blue']);
			var rows = t.body.rows;
			var value = t.push(['kiwi', 'green'], {}, rows[0], 'td', 'before');
			expect(value.tr).toEqual(t.body.rows[0]);
		});

	});

	describe('HtmlTable:pushMany', function(){
		it('should push many rows', function(){
			var t = new HtmlTable();
			var rows = t.pushMany([
					[1, 'one'],
					[2, 'two'],
					[3, 'three']
				], {
				'class': 'tableRowClass'
			});
			expect(rows.length).toEqual(3);
			expect(t.body.rows.length).toEqual(3);
			expect(rows[0].tr.hasClass).toBeTruthy();
			tds = t.body.rows[0].getElements('td');
			expect(tds.length).toEqual(2);
			expect(tds[0].get('text')).toEqual('1');
			expect(tds[1].get('text')).toEqual('one');
		});

	});

	describe('HtmlTable:update', function(){

		it('should update a table row', function(){
			var table = new HtmlTable();
			var row = table.push(['hello','world']);
			var newrow = table.update(row.tr, ['I','work']);
			expect(newrow.tds.get('text')).toEqual(['I', 'work']);
		});

	});

	describe('HtmlTable:empty', function(){

		it('should empty a table', function(){
			var table = new HtmlTable();
			table.push(['hello','world']);
			table.push(['hello','world again']);
			expect(table.body.rows.length).toEqual(2);
			table.empty();
			expect(table.body.rows.length).toEqual(0);
			table.empty();
			expect(table.body.rows.length).toEqual(0);
		});

	});


	describe('HtmlTable cloned Element methods', function(){

		var t = new HtmlTable({
			rows: [
				['lemon', 'yellow'],
				['apple', 'red']
			]
		});

		it('should inject the table in another element', function(){
			var wrapper = new Element('div');
			t.inject(wrapper);
			expect(wrapper.contains($(t))).toBeTruthy();
		});

		it('should adopt another element into the table', function(){
			var tr = new Element('tr').adopt(
				new Element('td'),
				new Element('td')
			);
			var ret = t.adopt(tr);

			expect($(t).contains(tr)).toBeTruthy();
			expect(ret).toEqual(t);
		});

	});

});
