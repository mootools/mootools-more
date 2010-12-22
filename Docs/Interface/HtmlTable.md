Class: HtmlTable {#HtmlTable}
=============================

Builds table elements with methods to add rows quickly.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/08-layout/00-htmltable

### Implements

* [Options][], [Events][], [Class.Occlude][]

### Syntax

	new HtmlTable([table, options]);

### Arguments

1. table - (*mixed*; optional) - a Table DOM element or it's id; if you do not specify one, one will be created.
1. options - (*object*; optional) a key/value set of options.

### Options

* properties - (*object*) a set of properties for the Table element; defaults to *{cellpadding:0, cellspacing:0, border:0}*
* rows - (*array*) an array of row objects (see [HtmlTable.push][])
* headers - (*array*) a row that is injected in the *thead*; required for sorting.

### Example

	var myTable = new HtmlTable({
		properties: {
			border: 1,
			cellspacing: 3
		},
		headers: ['fruits', 'colors'],
		rows: [
			['apple', 'red'],
			['lemon', 'yellow']
		]
	});
	myTable.inject($('someContainer'));

	//ALSO

	var myTable = new HtmlTable($('existingTable'));
	myTable.push(['data','goes','here']);

HtmlTable Method: push {#HtmlTable:push}
----------------------------------------

Inserts a new table row.

### Syntax

	myHtmlTable.push(row, rowProperties);

### Arguments

1. row - (*array* or *element*) the data for the row or *TR* element.
2. rowProperties - (*object*) the properties for the row (class, id, styles, etc)

### Row data

Row data can be in either of two formats. Note that they can be mixed and matched.

* simple - (*array*) an array of strings, elements and element collections that will be inserted into each table data

**OR**

* detailed - (*array*) an array of objects with definitions for content and properties for each table data

Note that it can also be an actual *TR* element.

### Examples

	//example of 'simple' rows
	myTable.push(['value 1', 'value 2', 'value 3'], {
		'class': 'tableRowClass'
	}); //new row


	//detailed rows
	myTable.push([
		{ //can specify data AND properties
			content: 'value 4',
			properties: {
				colspan: 2,
				'class': 'doubleWide',
				style: '1px solid blue'
			}
		},
		'value 5' //can just be data; mixing and the two in the same row is fine
	]);


	//RESULT:
	<table cellpadding="0" cellspacing="0" border="0">
		<tr class="tableRowClass">
			<td>value 1</td>
			<td>value 2</td>
			<td>value 3</td>
		</tr>
		<tr>
			<td colspan="2" class="doubleWide" style="1px solid blue">value 4</td>
			<td>value 5</td>
		</tr>
	</table>

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

HtmlTable method: set {#HtmlTable:set}
----------------------------------------------------

Sets the contents of the header or footer.

### Syntax

	myTable.set(what, rowArray);

### Arguments

1. what - (*string*) either 'headers' or 'footers'
2. rowArray - (*array*) an array of header information; same as the row data sent to [HtmlTable.push][]

### Returns

* (*object*) The row data (same as returned by the *push* method).


HtmlTable method: toElement {#HtmlTable:toElement}
-----------------------------------------

If you pass an instance of HtmlTable into the `$` or `document.id` function
it will return the actual table Element.

### Examples

	document.id(myHtmlTable).setStyle('color', 'blue');

	$(myHtmlTable) == myHtmlTable.table; // true

HtmlTable methods: Element methods {#HtmlTable:Element-Methods}
---------------------------------------------------------------

This class implements the following [Element][] methods:

* adopt
* inject
* wraps
* grab
* replaces
* empty
* dispose

These will execute these methods on the table element.

### Arguments

Each method accepts exactly the same arguments as the [Element][] equivalent.

### Returns

* (*object*) This instance of HtmlTable.

### Example

	myHtmlTable.inject(document.body);
	//same as:
	document.id(myHtmlTable).inject(document.body);

Type: Element {#Element}
==========================

Extends the Element Type with a reference to its [HtmlTable][] instance.

Element property: HtmlTable {#Element:HtmlTable}
--------------------------------------

### Syntax

	myElement.retrieve('HtmlTable'); //the instance of HtmlTable for the element

[HtmlTable]: #HtmlTable
[HtmlTable.push]: #HtmlTable:push
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Class.Occlude]: /more/Class/Class.Occlude
[Element]: /core/Element/Element
