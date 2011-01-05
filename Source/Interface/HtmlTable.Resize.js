/*
---

script: HtmlTable.Resize.js

name: HtmlTable.Resize

description: Builds a table with resizable columns with methods to add rows.

license: MIT-style license

authors:
  - Marcus McLaughlin

requires:
  - Core/Element.Dimensions
  - Core:1.2.4/Hash
  - /Class.refactor
  - /Element.Measure
  - /HtmlTable
  - /Drag

provides: [HtmlTable.Resize]

...
*/

if(!HtmlTable.prototype.serialize) { 
	HtmlTable.implement('serialize', function () {
		return {};
	});
}
if(!HtmlTable.prototype.restore) {
	HtmlTable.implement('restore', $empty); 
}

HtmlTable = Class.refactor(HtmlTable, {

	options: {
		// onColumnResize: $empty,
		classHandle: 'table-th-resizer',
		classResizableHeader: 'table-th-resizable',
		classResizable: 'table-resizable',
		classNoResize: 'table-th-noresize',
		resize: 'neighbor',
		setStylesOnStartup: 'true'
	},

	initialize: function () {
		this.previous.apply(this, arguments);
		if (this.options.resizable) {
			this._boundResizeMethods = {
				dragStart: this._dragStart.bind(this),
				drag: this._drag.bind(this),
				dragComplete: this._dragComplete.bind(this)
			};
			this._resizers = []; 
			this.enableResize();
			this.element.setStyle('table-layout', 'auto');
		}
	},

	build: function() {
		this.previous.apply(this, arguments);
		this.headerCells = $$(this.head.cells);
	},

	enableResize: function(){
		this.element.addClass(this.options.classResizable);
		this.wrapHeaders(); //wraps header contents in a div
		this._addResizeElems();
		this._attachResizers(true);
		this._resizeEnabled = true;
		return this;
	},

	disableResize: function(){
		this.element.removeClass(this.options.classResizable);
		this._resizers.each(function(span) { span.destroy(); });
		this._resizers.empty();
		this._attachResizers(false);
		this._resizeEnabled = false;
		return this;
	},

	serialize: function() {
		var previousSerialization = this.previous.apply(this, arguments);
		if(this.options.resizable && this._resizeWidths) {
			previousSerialization.resizeWidths = this._resizeWidths;
			previousSerialization.initialTableSize = this._initialTableSize;
			previousSerialization.currentTableSize = this.element.getWidth();
		}
		return previousSerialization;
	},

	restore: function(tableState) {
		if(this.options.resizable && tableState.resizeWidths) {
			this._resizeWidths = tableState.resizeWidths;
			this.headerCells.each( function(cell, index) {
				cell.setStyle('width', this._resizeWidths[index].curWidth);
			}.bind(this));
			this.element.setStyle('table-layout', 'fixed');
			this.element.setStyle('width', tableState.currentTableSize);
			this._initialTableSize = tableState.initialTableSize;
		}
		this.previous.apply(this, arguments);
	},

	/** PRIVATE METHODS **/


	_addResizeElems: function() {
		this._constraints = {};
		this.headerCells.each(function(cell, index) {
			if(!cell.hasClass(this.options.classNoResize)) {
				var resizeSpan = new Element('span', {'html': '&#160', 'class': this.options.classHandle});
				this._resizers.push(resizeSpan);

				cell.set({
					scope: 'col',
					styles: {
						padding: '0',
						whiteSpace: 'nowrap'
					}
				});
				cell.addClass(this.options.classResizableHeader);
				var contentDiv = this.headerWrappers[index];
				contentDiv.setStyles({
					overflow: 'hidden'
				});
				var thDiv = new Element('div', {styles:{
					position: 'relative',
					width: '100%',
					padding: '0 6px'
				}});
				resizeSpan.inject(thDiv);
				contentDiv.inject(thDiv);
				thDiv.inject(cell);
				if(this.options.setStylesOnStartup) {
					this.body.getElements('td').each(function(cell) {
						cell.setStyles({
							overflow: 'hidden',
							whiteSpace: 'nowrap'
						});
					});
				}
				this._constraints[index] = {
					 max: cell.getStyle('max-width') ? cell.getStyle('max-width').toInt() : null,
					 min: cell.getStyle('min-width') ? cell.getStyle('min-width').toInt() : null
				};
			}
		}.bind(this));

	},

	_getHeaderIndex: function(header) {
		return this.headerCells.indexOf(header);
	},

	_attachResizers: function(attach){
		this._resizers.each(function(resizer, index) {
			var resizeElem = resizer.getParent('th');
			var drag = resizer.retrieve('htmltable:resizeDrag');
			if (!drag) {
				drag = new Drag(resizeElem, {
					handle: resizer,
					style: false,
					preventDefault: true,
					snap: 1,
					onDrag: this._boundResizeMethods.drag,
					onStart: this._boundResizeMethods.dragStart,
					onComplete: this._boundResizeMethods.dragComplete
				});
				resizer.store('htmltable:resizeDrag', drag);
			}
			drag[attach ? 'attach' : 'detach']();
		}.bind(this));
	},

	_dragStart: function(header) {
		if (!this._initialTableSize) {
			if(!this._resizeWidths) this._resizeWidths = [];
			this.headerCells.each(function(cell, index) {
				var cellWidth = cell.getComputedSize().width;
				cell.setStyle('width', cellWidth);
				this._resizeWidths.push({initial:cellWidth, curWidth:cellWidth});
			}.bind(this)); 
			this.element.setStyle('table-layout', 'fixed');
			this._initialTableSize = this.element.getWidth();
			this.element.setStyle('width', this.element.getWidth());
		}
		if(header) this._dragStartHeaderSize = header.getComputedSize().width;
		this._dragStartTableSize = this.element.getWidth();
		return;
	},

	_dragComplete: function(header, e) {
		this._dragStarted = false;
		this._currentMax = null;
		this._currentMin = null;
		this._resizingNeighbor = null;
		this.headerCells.each(function(head, index) {
			this._resizeWidths[index].curWidth = head.getComputedSize().width;
		}.bind(this));
		this.fireEvent('columnResized');
		this.fireEvent('stateChanged');
		return;
	},


	_getResizableNeighbor: function(header, operation) {
		var index = this._getHeaderIndex(header);
		var next = this.headerCells[++index];
		while(next){
			if(next && this._canBeResized(next, operation)){
				return next; 
			}
			next = this.headerCells[++index];
		}
	},

	_canBeResized: function(header, operation) {
		var constraint = this._constraints[this._getHeaderIndex(header)];
		var currentSize = header.getComputedSize().width;
		var grow, shrink;
		if(header.hasClass(this.options.classNoResize)){
			return false;
		} else {
			grow = (!constraint.max || currentSize <= constraint.max);
			shrink = ((!constraint.min || currentSize > constraint.min + 1) && (currentSize > 1)); 
		}
		if (operation == 'grow') return grow;
		if (operation == 'shrink') return shrink;
		if (operation == 'both') return grow && shrink;
		if (operation == 'either') return grow || shrink;
	},

	_resizeHeader: function(header, newHeaderSize) {
		header.setStyles({
			width: newHeaderSize > 0 ? newHeaderSize : 0
		});
	},

	_resizeTable: function(header, dragDiff) {
		var newHeaderSize = this._dragStartHeaderSize + dragDiff;
		newTableSize = this._dragStartTableSize + dragDiff;
		this._resizeHeader(header, newHeaderSize);
		this.element.setStyles({
			width: newTableSize > 0 ? newTableSize : 1
		});
	},

	_resizeNeighbor: function(header, dragDiff, immediateDragDiff) {
		var newHeaderSize = this._dragStartHeaderSize + dragDiff;
		var headerOperation = immediateDragDiff > 0 ? 'grow' : 'shrink';
		var neighborOperation = immediateDragDiff > 0 ? 'shrink' : 'grow';
		if(!this._resizingNeighbor) {
			this._resizingNeighbor = this._getResizableNeighbor(header, neighborOperation);
			if(this._resizingNeighbor) {
				this._initialNeighborSize = this._resizingNeighbor.getComputedSize().width;
			}
		}
		if(this._resizingNeighbor && this._canBeResized(this._resizingNeighbor, neighborOperation)) {
			var newNeighborSize = this._initialNeighborSize - dragDiff;
			var constraintNeighbor = this._constraints[this._getHeaderIndex(this._resizingNeighbor)];
			var lowNeighborLimit = constraintNeighbor.min ? constraintNeighbor.min : 0;
			var constraintHeader = this._constraints[this._getHeaderIndex(header)];
			var lowHeaderLimit = constraintHeader.min ? constraintHeader.min : 0;
			var currentHeaderSize = header.getComputedSize().width;
			//Series of constraints -  only resize if the various constraints allow it.
			if (((!this._currentMax || newHeaderSize <= this._currentMax) && (!this._currentMin || newHeaderSize >= this._currentMin))
				 || ((!constraintNeighbor.max || newNeighborSize <= constraintNeighbor.max) && (!constraintNeighbor.min ||
				  newNeighborSize >= constraintNeighbor.min)) && (newHeaderSize > 0 || currentHeaderSize > 0)) {
				// Compensate for big drags.
				// If one can go further than the other, shorten the other's movement by the difference in movement allowed.
				if(newHeaderSize < lowHeaderLimit) {
					newNeighborSize += (lowHeaderLimit - newHeaderSize) * -1;
				}
				if(newNeighborSize < lowNeighborLimit) {
					newHeaderSize += (lowNeighborLimit - newNeighborSize) * -1;
				}
				this._resizingNeighbor.setStyles({
					width: newNeighborSize > lowNeighborLimit ? newNeighborSize : lowNeighborLimit 
				});
				this._resizeHeader(header, newHeaderSize);
			} 
		} else {
			//CurrentMax/Min store the maximum and minimum value of the currently resizing header given the surrounding constraints.
			if (headerOperation == 'grow' && !this._currentMax) this._currentMax = header.getComputedSize().width;
			if (headerOperation == 'shrink' && !this._currentMin) this._currentMin = header.getComputedSize().width;
		}  
	},

	_maintainChanges: function(header, dragDiff) {
		var newHeaderSize = this._dragStartHeaderSize + dragDiff;
		var resizableWidth = 0;
		var headerDiff;
		var newTableSize;
		var headerWidths = this._resizeWidths[this._getHeaderIndex(header)];
		if(newHeaderSize > headerWidths.initial) {
			headerDiff = headerWidths.initial - headerWidths.curWidth;
			newTableSize = this._dragStartTableSize + dragDiff;
			//If this drag started in the other state, subtract the distance dragged in the other state from the newTableSize
			if(headerWidths.curWidth < headerWidths.initial) newTableSize -= headerDiff;
			newTableSize = newTableSize >= this._initialTableSize ? newTableSize : this._initialTableSize;
			if(this._dragStartTableSize != this._initialTableSize) {
				this.element.setStyles({
					width: newTableSize > 0 ? newTableSize : 1
				});
			}
			//Reset all resized headers to their last measured width.  
			this.headerCells.each(function(head, index) {
				var width = this._resizeWidths[index];
				if(head != header && width.resized) head.setStyle('width', width.curWidth);
			}.bind(this));
			this._resizeHeader(header, newHeaderSize);
			headerWidths.resized = true;
		}
		if (newHeaderSize <= headerWidths.initial) {
			var cellShrinkage = headerWidths.curWidth - newHeaderSize;
			headerDiff = headerWidths.curWidth - headerWidths.initial;
			//If this drag started in the other state, subtract the distance dragged in the other state from the header's amount of shrinkage.
			if(headerWidths.curWidth > headerWidths.initial) cellShrinkage -= headerDiff; 
			newTableSize = this._dragStartTableSize;
			newTableSize = newTableSize >= this._initialTableSize ? newTableSize : this._initialTableSize; 
			//Calculate the total width of the resizable columns.
			this.headerCells.each(function(head, index) {
				var width = this._resizeWidths[index];
				if(!width.resized && head != header) {
					resizableWidth += width.curWidth;
				} 
			}.bind(this));
			//Resize every column.  If the column hasn't been resized, resize it by its proportion of the resizableWidth. Otherwise set it to its last measured width.
			this.headerCells.each(function(head, index) {
				var width = this._resizeWidths[index];
				if(head != header) {
					if(!width.resized) {
						var newWidth = cellShrinkage * (width.curWidth/resizableWidth) + width.curWidth;
						head.setStyle('width', newWidth.round());
					} else {
						head.setStyle('width', width.curWidth);
					}
				}
			}.bind(this));
			this._resizeHeader(header, newHeaderSize);
			headerWidths.resized = true;
		}
	},  

	_drag: function(header, e) {
		if(!this._dragStarted){
			this._dragStarted = true;
			this._dragStartPosition = e.client.x;
		} else {
			var dragDiff = e.client.x - this._dragStartPosition;
			var immediateDragDiff = dragDiff - this._lastDragDiff;
			if (immediateDragDiff == 0) return;
			this._lastDragDiff = dragDiff;
			var headerOperation = immediateDragDiff > 0 ? 'grow' : 'shrink'; 
			if(this._canBeResized(header, headerOperation)) {
				switch (this.options.resize) {
					case 'table':
						this._resizeTable(header, dragDiff);
						break;
					case 'neighbor':
						this._resizeNeighbor(header, dragDiff, immediateDragDiff);
						break;
					case 'maintainChanges':
						this._maintainChanges(header, dragDiff);
						break;
				}
			}
		}
	}

});
