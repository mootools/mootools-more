describe('HtmlTable.Zebra', function(){

	var getTable = function(){
		return new HtmlTable({
			rows: [[0],[1],[2]]
		});
	};

	it('should alternate the zebra class on/off', function(){
		var table = getTable();
		var rows = table.body.getChildren();
		expect(rows[0].hasClass('table-tr-odd')).toBeTruthy();
		expect(rows[1].hasClass('table-tr-odd')).toBeFalsy();
		expect(rows[2].hasClass('table-tr-odd')).toBeTruthy();
	});

	it('should update the zebras on row add/remove', function(){
		var table = getTable();
		table.push([3]);
		table.push([4]);
		var rows = table.body.getChildren();
		expect(rows[3].hasClass('table-tr-odd')).toBeFalsy();
		expect(rows[4].hasClass('table-tr-odd')).toBeTruthy();
		
		rows[3].dispose();
		table.updateZebras();
		expect(rows[3].hasClass('table-tr-odd')).toBeFalsy();
	});

	it('should ignore hidden rows for zebra classes', function(){
		var table = getTable();
		var rows = table.body.getChildren();
		rows[1].setStyle('display','none');
		table.updateZebras();
		expect(rows[0].hasClass('table-tr-odd')).toBeTruthy();
		expect(rows[2].hasClass('table-tr-odd')).toBeFalsy();
	});

});
