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

	it('keyboard events should change selection', function(){
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

	it('table should enable its keyboard', function(){
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
