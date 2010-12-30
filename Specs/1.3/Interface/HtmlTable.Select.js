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

});
