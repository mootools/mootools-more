Class: HtmlTable.Select {#HtmlTable}
====================================

Adds the ability to select rows in a table.

### Refactors

* [HtmlTable][]


HtmlTable Method: constructor
-----------------------------

### Syntax

	new HtmlTable([table, options]);

### Arguments

1. table - (*mixed*; optional) - a Table DOM element or it's id; if you do not specify one, one will be created.
1. options - (*object*; optional) a key/value set of options.

### Options

* all options defined by [HtmlTable][], plus:
* classZebra - (*string*) the class added to odd numbered rows; defaults to 'table-tr-odd'
* useKeyboard - (*boolean*) if *true* (the default) allows for the use of arrows to navigate rows and *enter* to select them.
* classRowSelected - (*string*) the class to add to the tr that is selected; defaults to 'table-tr-selected'
* classRowHovered - (*string*) the class to add to the tr that is hovered over by the mouse or has focus with the keyboard; defaults to 'table-tr-hovered'
* classSelectable - (*string*) the class to add to the table when selection is enabled; defaults to 'table-selectable'
* selectable - (*boolean*) if *true* the rows will be selectable. Defaults to *false*.
* allowMultiSelect - (*boolean*) if *true* (the default) the user can select more than one row at a time.
* shiftForMultiSelect - (*boolean*) enables support for holding shift to multi-select files (defaults to *false*). If *false* (and `allowMultiSelect` is *true*), clicking any row selects it.
* selectHiddenRows - (*boolean*) if *false* (the default), the selection logic ignores hidden rows, as if they were not in the DOM.

### Events

* rowFocus - callback to execute when a row is selected; passed the *tr* of the selected row, and the collection of selected rows
* rowUnfocus - callback to execute when a row is deselected; passed the *tr* of the unselected row, and the collection of selected rows

### Example

	var myTable = new HtmlTable({
		properties: {
			border: 1,
			cellspacing: 3
		},
		rows: [
			['apple', 'red'],
			['lemon', 'yellow']
		],
		selectable: true
	});
	myTable.inject($('someContainer'));

HtmlTable method: enableSelect {#HtmlTable:enableSelect}
------------------------------------------

Enables selection of rows.

### Syntax

	myTable.enableSelect();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: disableSelect {#HtmlTable:disableSelect}
------------------------------------------

Disables selection of rows.

### Syntax

	myTable.disableSelect();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: toggleRow {#HtmlTable:toggleRow}
------------------------------------------

Toggles the selected state of a row.

### Syntax

	myTable.toggleRow(trElement);

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: selectRow {#HtmlTable:selectRow}
------------------------------------------

Selects a row.

### Syntax

	myTable.selectRow(trElement);

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: deselectRow {#HtmlTable:deslectRow}
------------------------------------------

Selects a row.

### Syntax

	myTable.deselectRow(trElement);

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: isSelected {#HtmlTable:isSelected}
------------------------------------------

Returns the selected state of a row element.

### Syntax

	myTable.isSelected(trElement);

### Returns

* (*boolean*) *true* if the row is selected.

HtmlTable method: getSelected {#HtmlTable:getSelected}
------------------------------------------

Returns an array of rows that are selected.

### Syntax

	myTable.getSelected();

### Returns

* (*array*) an array of TR elements that are selected.


HtmlTable method: selectRange {#HtmlTable:selectRange}
------------------------------------------

Selects a group of rows.

### Syntax

	myTable.selectRange(startRow, endRow);

### Arguments

* startRow - (*mixed*) the TR element that starts the selection or an integer of its index in the rows in the table body.
* endRow - (*mixed*) the TR element that ends the selection or an integer of its index in the rows in the table body.

### Note

The actual order of the start and end rows doesn't matter. The range is selected even if the end row is before the start row.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: deselectRange {#HtmlTable:deselectRange}
------------------------------------------

Deselects a group of rows.

### Syntax

	myTable.deselectRange(startRow, endRow);

### Arguments

* startRow - (*element*) the TR element that starts the deselection.
* endRow - (*element*) the TR element that ends the deselection.

### Note

The actual order of the start and end rows doesn't matter. The range is deselected even if the end row is before the start row.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: selectAll {#HtmlTable:selectAll}
--------------------------------------------------

Selects all rows

### Syntax

	myHtmlTable.selectAll();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: selectNone {#HtmlTable:selectNone}
--------------------------------------------------

Deselects all rows

### Syntax

	myHtmlTable.selectNone();

### Returns

* (*object*) This instance of HtmlTable.


HtmlTable Method: serialize {#HtmlTable:serialize}
----------------------------------------

Return an object storing the select state of the table.

### Syntax

          myTable.serialize();

### Returns

* (*object*) Object containing select state of the table. 


HtmlTable Method: restore {#HtmlTable:restore}
----------------------------------------

Restores the select state of the table from an object passed in.

### Syntax

          myTable.restore(tableState);

### Arguments

1. tableState - Object created by HtmlTable.serialize() which contains the select state of the table.

[HtmlTable]: /more/Interface/HtmlTable
