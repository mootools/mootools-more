/*
---

script: HtmlTable.Tree.js

name: HtmlTable.Tree

description: Adds support for tables with expand/collapse functionality.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - /HtmlTable
  - /Class.refactor
  - Core/Element.Style
  - Core/Selectors
  - Core/DomReady
  - /Element.Delegation
  - /Table

provides: [HtmlTable.Tree]

...
*/

(function(){

	HtmlTable = Class.refactor(HtmlTable, {

		options: {
/*
			onAddRowToTree: $empty(row),
			onRemoveRowToTree: $empty(row),
			onHideRow: $empty(row),
			onShowRow: $empty(row),
			onExpandSection: $empty(row),
			onCloseSection: $empty(row),
*/
			enableTree: false,
			injectExpandLinks: true,
			expandClass: 'expand',
			baseIndentPadding: 10,
			indentPadding: 15,
			writeTreeCSS: true,
			useKeyboard: true,
			build: true
		},

		initialize: function(){
			this.previous.apply(this, arguments);
			if (this.options.writeTreeCSS) this.writeCss();
			this.tree = new Table();
			if (this.options.enableTree) this.enableTree();
			this.addEvent('refresh', function(){
				this.buildTree(true, false);
				if (this.options.zebra) this.updateZebras();
			}.bind(this));
		},

		enableTree: function(){
			if (this.options.build) this.buildTree();
			if (!this.treeBound) {
				this.treeBound = {
					toggleExpand: this.toggleExpandHandler.bind(this),
					activateKeyboard: function() {
						if (this.keyboard) this.keyboard.activate();
					}.bind(this),
					keyExpand: function(){
						if (this.focused) this.expandSection(this.focused);
					}.bind(this),
					keyClose: function(){
						var row = this.focused;
						if (row) {
							if (this.isRowParent(row) && this.isExpanded(row)) {
									this.closeSection(row);
							} else if (this.selectEnabled){
								this.deselectRow(row);
								this.selectRow(this.getParentRow(row));
							}
						}
					}.bind(this)
				};
			}
			this.element.addEvent('click:relay(a.' + this.options.expandClass + ')', this.treeBound.toggleExpand);
			this.element.addEvent('click', this.treeBound.activateKeyboard);
			if (this.options.useKeyboard) {
				if (!this.keyboard) this.keyboard = new Keyboard();
				console.log('adding keyboard shortcuts');
				this.keyboard.addShortcuts({
					'Expand Section': {
						keys: 'right',
						shortcut: 'right arrow',
						handler: this.treeBound.keyExpand,
						description: 'Expand the current row.'
					},
					'Close Section': {
						keys: 'left',
						shortcut: 'left arrow',
						handler: this.treeBound.keyClose,
						description: 'Close the current row.'
					}
				});
			}
			return this;
		},

		disableTree: function(){
			this.element.removeEvent('click:relay(a.' + this.options.expandClass + ')', this.treeBound.toggleExpand);
			this.element.removeEvent('click', this.bound.activateKeyboard);
			return this;
		},

		addRowToTree: function(row, parent, updateDisplay){
			updateDisplay = updateDisplay == null ? true : false;
			this.makeRowParent(parent);
			var rowData = this.getRowData(row),
			    parentRowData = this.getRowData(parent),
			    depth = this.getRowDepth(row);
			if (rowData.parent && rowData.parent != parent) this.removeRowFromTree(row);
			if (!this.isExpanded(parent) && updateDisplay) {
				row.setStyle('display', 'none');
				rowData.hidden = true;
			}
			if (!parentRowData.children) this.getChildRows(parent);
			else parentRowData.children.push(row);
			rowData.parent = parent;
			row.addClass('table-depth-' + depth);
			this.fireEvent('addRowToTree', row);
			return this;
		},

		removeRowFromTree: function(row){
			var rowData = this.getRowData(row);
			row.removeClass('table-depth-' + rowData.depth);
			this.getRowData(rowData.parent).children.erase(row);
			delete rowData.parent;
			this.fireEvent('removeRowFromTree', row);
			return this;
		},

		toggleExpand: function(row){
			if (this.isExpanded(row)) this.closeSection(row);
			else this.expandSection(row);
			return this;
		},

		expandSection: function(row){
			if (this.isExpanded(row)) return this;
			row.addClass('table-expanded');
			this.getChildRows(row).each(function(child){
				this.showSection(child, true);
				if (this.isExpanded(child)) this.expandSection(child);
			}, this);
			if (this.options.zebra) this.updateZebras();
			this.fireEvent('expandSection', row);
			return this;
		},

		closeSection: function(row){
			if (!this.isExpanded(row)) return this;
			row.removeClass('table-expanded');
			this.getChildRows(row).each(function(child){
				this.hideSection(child);
			}, this);
			if (this.options.zebra) this.updateZebras();
			this.fireEvent('closeSection', row);
			return this;
		},

		isExpanded: function(row){
			return row.hasClass('table-expanded');
		},

		isRowParent: function(row){
			return row.hasClass('table-folder');
		},

		getChildRows: function(row){
			var rowData = this.getRowData(row);
			if (rowData.children) return rowData.children;
			rowData.children = [];
			if (!this.isRowParent(row)) return rowData.children;
			var depth = rowData.depth,
			    nextAtDepth = row.getAllNext('tr.table-depth-' + depth),
			    potentialChildren = row.getAllNext('tr.table-depth-' + (depth + 1)),
			    index = 0;
			while (potentialChildren[index]) {
				var kidData = this.getRowData(potentialChildren[index], null, true);
				rowData.children.push(potentialChildren[index]);
				var next = potentialChildren[index].getNext();
				if (next && nextAtDepth.contains(next)) break;
				index++;
			}
			return rowData.children;
		},

		getParentRow: function(row){
			return this.getRowData(row).parent;
		},

		getRowDepth: function(row){
			var depth = row.retrieve('htmltable:depth');
			if (depth != null) return depth;
			var match = row.className.match(/table\-depth\-(\d+)/);
			if (!match) depth = 0;
			else depth = match[1].toInt();
			row.store('htmltable:depth', depth);
			return depth;
		},

		/* private methods */

		injectChild: function(row, rowProperties, parent, injectAfter){
			var data = this.push(row, rowProperties, injectAfter || parent, 'td', 'after');
			this.addRowToTree(data.tr, parent);
			if (this.options.zebra) this.updateZebras();
			return this;
		},

		hideSection: function(row, doNotHideChildren){
			var rowData = this.getRowData(row);
			if (rowData.hidden) return this;
			row.setStyle('display', 'none');
			rowData.hidden = true;
			if (!doNotHideChildren){
				this.getChildRows(row).each(function(child){
					this.hideSection(child);
				}, this);
			}
			this.fireEvent('hideRow', row);
			return this;
		},

		showSection: function(row, showChildren){
			var rowData = this.getRowData(row);
			if (showChildren == undefined) showChildren = true;
			if (rowData.hidden === false) return this;
			row.setStyle('display', 'table-row');
			rowData.hidden = false;
			if (showChildren && this.isExpanded(row)) {
				this.getChildRows(row).each(function(child){
					this.showSection(child);
				}, this);
			}
			this.fireEvent('showRow', row);
			return this;
		},

		toggleExpandHandler: function(event, element){
			var tr = element.getParent('tr');
			event.preventDefault();
			this.toggleExpand(tr);
		},

		refresh: function(){
			this.fireEvent('refresh');
			return this;
		},

		buildTree: function(force, updateDisplay, startRow){
			updateDisplay = updateDisplay == null ? true : false;
			if (this.treeBuilt && !force) return;
			this.treeBuilt = true;
			
			var makeRowData = function(row){
				if (this.tree.get(row)) return this.tree.get(row);
				var rowData = {
					row: row,
					depth: this.getRowDepth(row)
				};
				this.tree.set(row, rowData);

				if (rowData.depth > 0) {
					var parent, previous = row;
					do {
						previous = previous.getPrevious();
						var prevRowData = this.tree.get(previous);
						if (prevRowData) {
							if (prevRowData.depth < rowData.depth) parent = previous;
							else if (prevRowData.depth == rowData.depth) parent = prevRowData.parent;
						}
						if (!parent && !previous.hasClass('html-table-tree-ignore')
							  && this.getRowDepth(previous) < rowData.depth) parent = previous;
					} while (previous && !parent);
					this.addRowToTree(row, parent, updateDisplay);
				}
				return rowData;
			}.bind(this);

			var rowSetup = function(row){
				if (row.hasClass('html-table-tree-ignore')) return;
				var rowData = this.tree.get(row);
				if (!rowData) rowData = makeRowData(row);
				if (rowData.depth > 0) {
					if (updateDisplay) row.setStyle('display','none');
					rowData.hidden = row.getStyle('display') == 'none';
				}
			}.bind(this);
			if (!startRow) Array.each(this.body.rows, rowSetup);
			else makeRowData(startRow);
		},

		getRowData: function(row){
			var rowData = this.tree.get(row);
			if (rowData) {
				return rowData;
			} else {
				this.buildTree(true, false, row);
				return this.tree.get(row);
			}
		},

		makeRowParent: function(row){
			if (row.hasClass('table-folder')) return;
			row.addClass('table-folder');
			var td = row.getFirst('td');
			if (this.options.injectExpandLinks && td && !td.getElement('a.expand')) {
				new Element('a', {'class':'expand'}).inject(td, 'top');
			}
		},

		writeCss: function(){
			window.addEvent('domready', function(){
				var id = 'htmltableIndentationStyles-' + this.options.baseIndentPadding + '-' + this.options.indentPadding;
				if (document.id(id)) return;
				var css = "",
				    styles =".table-depth-{%depth%}>td:first-child { padding-left: {%offset%}px; }\n";
				(100).times(function(depth){
					css += styles.substitute({
						depth: depth,
						offset: ((depth) * this.options.indentPadding) + this.options.baseIndentPadding
					}, parsePercentSquiggles);
				}.bind(this));

				var style = new Element('style', {id: id}).inject($$('head')[0]);
				if (Browser.Engine.trident) style.styleSheet.cssText = css;
				else style.set('text', css);
			}.bind(this));
		}

	});
	//this regex is used in the _writeCSS method above. It finds {%variable%} matches for
	//string substitution
	var parsePercentSquiggles = /\\?\{%([^}]+)%\}/g;

})();