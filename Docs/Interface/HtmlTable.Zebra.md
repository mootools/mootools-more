Class: HtmlTable.Zebra {#HtmlTable:Zebra}
=========================================

Adds stripes to an instance of HtmlTable.

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
* zebra - (*boolean*) if *true* adds the *classZebra* value to odd numbered rows.

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
		zebra: true
	});
	myTable.inject($('someContainer'));

HtmlTable Method: updateZebras {#HtmlTable:updateZebras}
--------------------------------------------------------

Updates the rows, reapplying the odd class names.

### Syntax

	myHtmlTable.updateZebras();


### Returns

* (*object*) an object containing the tr and td tags.

### Example of Object Returned

	{tr: theTableRow, tds: [td, td, td]}

HtmlTable method: empty {#HtmlTable:empty}
------------------------------------------

Empties the *tbody* of the table.

### Syntax

	myTable.empty();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: setHeaders {#HtmlTable:setHeaders}
----------------------------------------------------

Sets the contents of the *thead* with *th* tags.

### Syntax

	myTable.setHeaders(headers);

### Arguments

1. headers - (*array*) an array of header information; same as the row data sent to [HtmlTable.push][]

### Returns

* (*object*) This instance of HtmlTable.

[HtmlTable]: /more/Interface/HtmlTable
[HtmlTable.push]: /more/Interface/HtmlTable#HtmlTable:push

