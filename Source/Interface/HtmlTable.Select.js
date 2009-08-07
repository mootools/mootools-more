/*
Script: HtmlTable.Select.js
	Builds a stripy, sortable table with methods to add rows. Rows can be selected with the mouse or keyboard navigation.

	License:
		MIT-style license.

	Authors:
		Harald Kirschner
		Aaron Newton
*/

HtmlTable.Select = new Class({

	Extends: HtmlTable.Sort,

	options: {/*
		onRowSelect: $empty,
		onRowUnselect: $empty, */
		useKeyboard: true,
		classRowSelected: 'table-tr-selected',
		classRowHovered: 'table-tr-hovered',
		classRowFocused: 'table-tr-focused',
		allowMultiSelect: true
	},

	initialize: function () {
		this.parent.apply(this, arguments);
		this.selectedRows = new Elements();
	},

	attach: function(){
		this.parent();
		this.table.addEvent('mouseleave', function() {
			if (this.hover) this.leaveRow(this.hover);
		}.bind(this));
		this.body.addEvents({
			'click:relay(tr)':this.focusRow.bind(this)
		});
		if (this.options.useKeyboard) {
			this.keyboard = new Keyboard({
				events: {
					down: function(e) {
						e.preventDefault();
						this.shiftFocus(1);
					}.bind(this),
					up: function(e) {
						e.preventDefault();
						this.shiftFocus(-1);
					}.bind(this),
					enter: function(e) {
						e.preventDefault();
						if (this.hover) this.focusRow(this.hover);
					}.bind(this)
				},
				active: true
			});
		}
	},

	focus: function(){
		if (this.keyboard) this.keyboard.activate();
	},

	blur: function(){
		if (this.keyboard) this.keyboard.deactivate();
	},

	update: function(){
		Array.each(this.body.rows, function(row, i) {
			if (row.$tableSort) return;
			row.addEvents({
				'mouseenter': this.enterRow.bind(this, [row]),
				'mouseleave': this.leaveRow.bind(this, [row])
			});
			row.$tableSort = true;
		}, this);
		this.parent();
	},

	enterRow: function(row) {
		if (this.hover) this.hover = this.leaveRow(this.hover);
		this.hover = row.addClass(this.options.classRowHovered);
	},

	shiftFocus: function(offset){
		if (!this.hover) return this.enterRow(this.body.rows[0]);
		var to = Array.indexOf(this.body.rows, this.hover) + offset;
		if (to < 0) to = 0;
		if (to >= this.body.rows.length) to = this.body.rows.length - 1;
		if (this.hover == this.body.rows[to]) return this;
		this.enterRow(this.body.rows[to])
	},

	leaveRow: function(row) {
		row.removeClass(this.options.classRowHovered);
	},

	focusRow: function() {
		var row = arguments[1] || arguments[0]; //delegation passes the event first
		var unfocus = function(row){
			this.selectedRows.erase(row);
			row.removeClass(this.options.classRowSelected);
			this.fireEvent('onRowUnfocus', [row, this.selectedRows]);
		}.bind(this);
		if (!this.options.allowMultiSelect) this.selectedRows.each(unfocus);
		if (!this.selectedRows.contains(row)) {
			this.selectedRows.push(row);
			row.addClass(this.options.classRowSelected);
			this.fireEvent('onRowFocus', [row, this.selectedRows]);
		} else {
			unfocus(row);
		}
		return false;
	},

	selectAll: function(status) {
		if (!status) {
			this.selectedRows.removeClass(this.options.classRowSelected).empty();
		} else {
			this.selectedRows.combine(this.body.rows).addClass(this.options.classRowSelected);
		}
	}

});