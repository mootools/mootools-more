HtmlTable.Zebra = new Class({

	Extends: HtmlTable,

	options: {
		classZebra: 'table-tr-odd',
		grouped: 1
	},

	/**
	 * Constructor
	 *
	 * @param		Element Table
	 * @param		Object options
	 */
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
		this.parent.apply(this, arguments);
		this.update();
	}

});
