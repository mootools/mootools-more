/*
---

script: HtmlTable.Select.js

name: HtmlTable.Select

description: Builds a stripy, sortable table with methods to add rows. Rows can be selected with the mouse or keyboard navigation.

license: MIT-style license

authors:
  - Harald Kirschner
  - Aaron Newton

requires:
  - /Keyboard.Extras
  - /HtmlTable
  - /Class.refactor
  - /Element.Delegation
  - /Element.Shortcuts

provides: [HtmlTable.Select]

...
*/

HtmlTable = Class.refactor(HtmlTable, {

	options: {
		/*onRowFocus: $empty,
		onRowUnfocus: $empty,*/
		useKeyboard: true,
		classRowSelected: 'table-tr-selected',
		classRowHovered: 'table-tr-hovered',
		classSelectable: 'table-selectable',
		shiftForMultiSelect: true,
		allowMultiSelect: true,
		selectable: false,
		selectHiddenRows: false
	},

	initialize: function(){
		this.previous.apply(this, arguments);
		if (this.occluded) return this.occluded;
		this._selectedRows = new Elements();
		this._bound = {
			mouseleave: this._mouseleave.bind(this),
			clickRow: this._clickRow.bind(this),
			activateKeyboard: function() {
				if (this.keyboard && this._selectEnabled) this.keyboard.activate();
			}.bind(this)
		};
		if (this.options.selectable) this.enableSelect();
	},

	enableSelect: function(){
		this._selectEnabled = true;
		this._attachSelects();
		this.element.addClass(this.options.classSelectable);
	},

	disableSelect: function(){
		this._selectEnabled = false;
		this._attachSelects(false);
		this.element.removeClass(this.options.classSelectable);
	},

	push: function(){
		var ret = this.previous.apply(this, arguments);
		this._updateSelects();
		return ret;
	},

	toggleRow: function(row){
		return this.isSelected(row) ? this.deselectRow.apply(this, arguments) : this.selectRow.apply(this, arguments);
	},

	selectRow: function(row, _nocheck){
		//private variable _nocheck: boolean whether or not to confirm the row is in the table body
		//added here for optimization when selecting ranges
		if (this.isSelected(row) || (!_nocheck && !this.body.getChildren().contains(row))) return;
		if (!this.options.allowMultiSelect) this.selectNone();

		if (!this.isSelected(row)) {
			this._selectedRows.push(row);
			row.addClass(this.options.classRowSelected);
			this.fireEvent('rowFocus', [row, this._selectedRows]);
		}
		this._focused = row;
		document.clearSelection();
		return this;
	},
	
	isSelected: function(row){
		return this._selectedRows.contains(row);
	},

	getSelected: function(){
		return this._selectedRows;
	},

	deselectRow: function(row, _nocheck){
		if (!this.isSelected(row) || (!_nocheck && !this.body.getChildren().contains(row))) return;
		this._selectedRows.erase(row);
		row.removeClass(this.options.classRowSelected);
		this.fireEvent('rowUnfocus', [row, this._selectedRows]);
		return this;
	},

	selectAll: function(selectNone){
		if (!selectNone && !this.options.allowMultiSelect) return;
		this.selectRange(0, this.body.rows.length, selectNone);
		return this;
	},

	selectNone: function(){
		return this.selectAll(true);
	},

	selectRange: function(startRow, endRow, _deselect){
		if (!this.options.allowMultiSelect && !_deselect) return;
		var method = _deselect ? 'deselectRow' : 'selectRow',
		    rows = $A(this.body.rows);

		if ($type(startRow) == 'element') startRow = rows.indexOf(startRow);
		if ($type(endRow) == 'element') endRow = rows.indexOf(endRow);
		endRow = endRow < rows.length - 1 ? endRow : rows.length - 1; 

		if (endRow < startRow) {
			var tmp = startRow;
			startRow = endRow;
			endRow = tmp;
		}

		for(var i = startRow; i <= endRow; i++) {
			if (this.options.selectHiddenRows || rows[i].isDisplayed()) this[method](rows[i], true);
		}

		return this;
	},

	deselectRange: function(startRow, endRow){
		this.selectRange(startRow, endRow, true);
	},
/*
	Private methods:
*/

	_enterRow: function(row){
		if (this._hovered) this._hovered = this._leaveRow(this._hovered);
		this._hovered = row.addClass(this.options.classRowHovered);
	},

	_leaveRow: function(row){
		row.removeClass(this.options.classRowHovered);
	},

	_updateSelects: function(){
		Array.each(this.body.rows, function(row){
			var binders = row.retrieve('binders');
			if ((binders && this._selectEnabled) || (!binders && !this._selectEnabled)) return;
			if (!binders){
				binders = {
					mouseenter: this._enterRow.bind(this, [row]),
					mouseleave: this._leaveRow.bind(this, [row])
				};
				row.store('binders', binders).addEvents(binders);
			} else {
				row.removeEvents(binders);
			}
		}, this);
	},

	_shiftFocus: function(offset, event){
		if (!this._focused) return this.selectRow(this.body.rows[0], event);
		var to = this._getRowByOffset(offset, this.options.selectHiddenRows);
		if (to === null || this._focused == this.body.rows[to]) return this;
		this.toggleRow(this.body.rows[to], event);
	},

	_clickRow: function(event, row){
		var selecting = (event.shift || event.meta || event.control) && this.options.shiftForMultiSelect;
		if (!selecting && !(event.rightClick && this.isSelected(row) && this.options.allowMultiSelect)) this.selectNone();
		if (event.rightClick) this.selectRow(row);
		else this.toggleRow(row);
		if (event.shift) {
			this.selectRange(this._rangeStart || this.body.rows[0], row, this._rangeStart ? !this.isSelected(row) : true);
			this._focused = row;
		}
		this._rangeStart = row;
	},

	_getRowByOffset: function(offset, includeHiddenRows){
		if (!this._focused) return 0;
		var index = Array.indexOf(this.body.rows, this._focused);
		if ((index == 0 && offset < 0) || (index == this.body.rows.length -1 && offset > 0)) return null;
		if (includeHiddenRows) {
			index += offset;
		} else {
			var limit = 0,
			    count = 0;
			if (offset > 0) {
				while (count < offset && index < this.body.rows.length -1) {
					index++;
					if (this.body.rows[index].isDisplayed()) count++;
				}
			} else {
				while (count > offset && index > 0) {
					index--;
					if (this.body.rows[index].isDisplayed()) count--;
				}
			}
		}
		return index;
	},

	_attachSelects: function(attach){
		attach = $pick(attach, true);
		var method = attach ? 'addEvents' : 'removeEvents';
		this.element[method]({
			mouseleave: this._bound.mouseleave,
			click: this._bound.activateKeyboard
		});
		this.body[method]({
			'click:relay(tr)': this._bound.clickRow,
			'contextmenu:relay(tr)': this._bound.clickRow
		});
		if (this.options.useKeyboard || this.keyboard){
			if (!this.keyboard) this.keyboard = new Keyboard();
			if (!this._selectKeysDefined) {
				this._selectKeysDefined = true;
				var timer, held;
				var move = function(offset){
					var mover = function(e){
						$clear(timer);
						e.preventDefault();
						var to = this.body.rows[this._getRowByOffset(offset, this.options.selectHiddenRows)];
						if (e.shift && to && this.isSelected(to)) {
							this.deselectRow(this._focused);
							this._focused = to;
						} else {
							if (to && (!this.options.allowMultiSelect || !e.shift)) {
								this.selectNone();
							}
							this._shiftFocus(offset, e);
						}
						if (held) {
							timer = mover.delay(100, this, e);
						} else {
							timer = (function(){
								held = true;
								mover(e);
							}).delay(400);
						}
					}.bind(this);
					return mover;
				}.bind(this);
				
				var clear = function(){
					$clear(timer);
					held = false;
				};
				
				this.keyboard.addEvents({
					'keydown:shift+up': move(-1),
					'keydown:shift+down': move(1),
					'keyup:shift+up': clear,
					'keyup:shift+down': clear,
					'keyup:up': clear,
					'keyup:down': clear
				});
				
				var shiftHint = '';
				if (this.options.allowMultiSelect && this.options.shiftForMultiSelect && this.options.useKeyboard) {
					shiftHint = " (Shift multi-selects).";
				}
				
				this.keyboard.addShortcuts({
					'Select Previous Row': {
						keys: 'up',
						shortcut: 'up arrow',
						handler: move(-1),
						description: 'Select the previous row in the table.' + shiftHint
					},
					'Select Next Row': {
						keys: 'down',
						shortcut: 'down arrow',
						handler: move(1),
						description: 'Select the next row in the table.' + shiftHint
					}
				});
			}
			this.keyboard[attach ? 'activate' : 'deactivate']();
		}
		this._updateSelects();
	},

	_mouseleave: function(){
		if (this._hovered) this._leaveRow(this._hovered);
	}

});