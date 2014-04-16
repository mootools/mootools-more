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


	it('should return the selected row(s)', function(){
		var table = getTable();

		var rows = table.body.getChildren();
		table.selectRow(rows[0]);
		var selected = table.getSelected();
		expect(selected[0]).toEqual(rows[0]);
		expect(selected.length).toEqual(1);

		table.selectRow(rows[1]);
		selected = table.getSelected();
		expect(selected[1]).toEqual(rows[1]);
		expect(selected.length).toEqual(2);
	});


	it('should skip hidden rows when selecting rows', function(){
		var table = getTable();

		var rows = table.body.getChildren();
		rows[1].setStyle('display', 'none');
		table.selectRange(rows[0], rows[2]);
		var selected = table.getSelected();
		expect(selected.length).toEqual(2);
		expect(selected[0]).toEqual(rows[0]);
		expect(selected[1]).toEqual(rows[2]);
	});

	it('should select all and select none', function(){
		var table = getTable();
		var rows = table.body.getChildren();

		table.selectAll();
		var selected = table.getSelected();

		expect(selected.length).toEqual(3);
		expect(selected[0]).toEqual(rows[0]);
		expect(selected[1]).toEqual(rows[1]);
		expect(selected[2]).toEqual(rows[2]);
		expect(selected[0].hasClass('table-tr-selected')).toBeTruthy();

		table.selectNone();
		selected = table.getSelected();
		expect(selected.length).toEqual(0);
		expect(rows[0].hasClass('table-tr-selected')).toBeFalsy();
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


	if (window.addEventListener) it('should allow keyboard events to change selection', function(){
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

	if (window.addEventListener) it('should enable a table\'s keyboard', function(){
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

  it('should not step on prior this.bind declarations', function () {
    var table = new HtmlTable();
    expect(table.bound.clickRow).not.toEqual(null);
    expect(table.bound.mouseleave).not.toEqual(null);
    expect(table.bound.activateKeyboard).not.toEqual(null);
  });

});
