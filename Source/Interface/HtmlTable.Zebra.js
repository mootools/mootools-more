/*
Script: HtmlTable.Zebra.js
	Builds a stripy table with methods to add rows.

	License:
		MIT-style license.

	Authors:
		Harald Kirschner
		Aaron Newton
*/

HtmlTable.Zebra = new Class({

	Extends: HtmlTable,

	options: {
		classZebra: 'table-tr-odd',
		grouped: 1
	},

	initialize: function () {
		this.parent.apply(this, arguments);
		this.update();
	},

	update: function() {
		Array.each(this.body.rows, this.zebra, this);
	},

	zebra: function(row, i) {
		if (i % 2) row.removeClass(this.options.classZebra)
		else row.addClass(this.options.classZebra);
		return row;
	},

	push: function(){
		var pushed = this.parent.apply(this, arguments);
		this.update();
		return pushed;
	}

});