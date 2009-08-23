/*
Script: HtmlTable.Zebra.js
	Builds a stripy table with methods to add rows.

	License:
		MIT-style license.

	Authors:
		Harald Kirschner
		Aaron Newton
*/

HtmlTable = Class.refactor(HtmlTable, {

	options: {
		classZebra: 'table-tr-odd',
		zebra: true
	},

	initialize: function () {
		this.previous.apply(this, arguments);
		if (this.occluded) return this.occluded;
		if (this.options.zebra) this.updateZebras();
	},

	updateZebras: function() {
		Array.each(this.body.rows, this.zebra, this);
	},

	zebra: function(row, i) {
		if (i % 2) row.removeClass(this.options.classZebra);
		else row.addClass(this.options.classZebra);
		return row;
	},

	push: function(){
		var pushed = this.previous.apply(this, arguments);
		if (this.options.zebra) this.updateZebras();
		return pushed;
	}

});