/*
---
name: HtmlTable.Select Tests
requires: [More/HtmlTable.Select]
provides: [HtmlTable.Select.Tests]
...
*/
describe('HtmlTable.Select', function(){

	var getTable = function(){
		return new HtmlTable({
			selectable: true,
			useKeyboard: true,
			rows: [[0],[1],[2]]
		});
	};

	it('should clear selections when emptying a table', function(){
		var table = getTable();

		var row = table.body.getChildren()[0];
		table.selectRow(row);
		table.empty();
		expect(table.isSelected(row)).toEqual(false);
	});

	it('should serialize the state of the table', function(){
		var SelectableTable = new HtmlTable({
			selectable: true,
			useKeyboard: false,
			rows: [[0],[1],[2]]
		});

		SelectableTable.selectRow(SelectableTable.body.getChildren()[0]);
		SelectableTable.selectRow(SelectableTable.body.getChildren()[2]);
		var state = SelectableTable.serialize();
		expect(state).toEqual({selectedRows: [0, 2]});
	});

	it('should restore the state of the table', function(){
		var SelectableTable = new HtmlTable({
			selectable: true,
			useKeyboard: false,
			rows: [[0],[1],[2]]
		});
		SelectableTable.restore({selectedRows: [0, 2]});
		expect(SelectableTable.getSelected()).toEqual($$([SelectableTable.body.getChildren()[0], SelectableTable.body.getChildren()[2]]));
	});


	it('should allow keyboard events to change selection', function(){
		var table = getTable().inject(document.body);

		var rows = table.body.getChildren();

		Syn.type('[down]', table.toElement());

		expect(table.isSelected(rows[0])).toEqual(true);
		Syn.type('[down]', table.toElement());
		expect(table.isSelected(rows[0])).toEqual(false);
		expect(table.isSelected(rows[1])).toEqual(true);
		Syn.type('[shift][up]', table.toElement());
		expect(table.isSelected(rows[0])).toEqual(true);
		expect(table.isSelected(rows[1])).toEqual(true);
		table.dispose();
	});

	it('should enable a table\'s keyboard', function(){
		var table1 = getTable().inject(document.body);
		var table2 = getTable().inject(document.body);
		table1.toElement().id = 'one';
		table2.toElement().id = 'two';

		var t1rows = table1.body.getChildren();
		var t2rows = table2.body.getChildren();

		Syn.type('[down]', table2.toElement());

		expect(table2.isSelected(t2rows[0])).toEqual(true);

		//can't get the click to work for some reason...
		//Syn.click({}, table1.toElement());
		//works fine if I activate it manually
		table1.keyboard.activate();

		Syn.type('[down]', table1.toElement());
		expect(table1.isSelected(t1rows[0])).toEqual(true);

		//and this should be deactivated, so no change
		Syn.type('[down]', table2.toElement());
		expect(table2.isSelected(t2rows[0])).toEqual(true);

		table1.dispose();
		table2.dispose();
		

	});


});
