Class: HtmlTable.Select {#HtmlTable.Select}
===========================================

Adds the ability to select rows in a table.

### Refactors

* [HtmlTable][]

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
* allowMultiSelect - (*boolean*) if *true* (the default) the user can select more than one row at a time.
* selectable - (*boolean*) if *true* the rows will be selectable. Defaults to *false*.

### Events

* onRowFocus - callback to execute when a row is selected.
* onRowUnfocus - callback to execute when a row is deselected.

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

[HtmlTable]: /more/Interface/HtmlTable