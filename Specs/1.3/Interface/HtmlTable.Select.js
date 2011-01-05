describe('HtmlTable.Select', function(){

	it('should clear selections when emptying a table', function(){
		var SelectableTable = new HtmlTable({
			selectable: true,
			useKeyboard: false,
			rows: [[0],[1],[2]]
		});

		var row = SelectableTable.body.getChildren()[0];
		SelectableTable.selectRow(row);
		SelectableTable.empty();
		expect(SelectableTable.isSelected(row)).toEqual(false);
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


});
