Class: HtmlTable {#HtmlTable}
=============================

Builds table elements with methods to add rows quickly.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/08-layout/00-htmltable

### Implements

* [Options][]

### Syntax

	new HtmlTable(options);

### Arguments

1. options - (*object*) a key/value set of options

### Options

* properties - (*object*) a set of properties for the Table element; defaults to *{cellpadding:0, cellspacing:0, border:0}*
* rows - (*array*) an array of row objects (see [HtmlTable:push][])

### Properties

* element - (*element*) the table DOM element

### Example

	var myTable = new HtmlTable({
	  properties: {
	    border: 1,
	    cellspacing: 3
	  },
	  rows: [
	    ['apple', 'red'],
	    ['lemon', 'yellow']
	  ]
	});
	myTable.inject($('someContainer'));

HtmlTable Method: push {#HtmlTable:push}
----------------------------------------

Inserts a new table row.

### Syntax

	myHtmlTable.push(row);	

### Arguments

1. row - (*array*) the data for the row.

### Row data

Row data can be in either of two formats.

* simple - (*array*) an array of strings that will be inserted into each table data

**OR**

* detailed - (*array*) an array of objects with definitions for content and properties for each table data

### Examples

	//example of 'simple' rows
	myTable.push(['value 1', 'value 2', 'value 3']); //new row
	//detailed rows
	myTable.push([
		{
			content: 'value 4',
			properties: {
				colspan: 2,
				className: 'doubleWide',
				style: '1px solid blue'
		},
		{
			content: 'value 5'
		}
	]);
	//RESULT:
	<table cellpadding="0" cellspacing="0" border="0">
		<tr>
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

HtmlTable response: $ {#HtmlTable:Dollar}
-----------------------------------------

When *$* is called on this class the table is returned.

### Example

	$(myHtmlTable) == myHtmlTable.table

HtmlTable methods: Element methods {#HtmlTable:Element-Methods}
---------------------------------------------------------------

This class implements the following element methods:

* adopt
* inject
* wraps
* grap
* replaces
* empty
* dispose

These will execute these methods on the table element.

### Example:

	myHtmlTable.table.inject(document.body);
	//same as:
	myHtmlTable.inject(document.body);
	//same as:
	$(myHtmlTable).inject(document.body);

Native: Element {#Element}
==========================

Extends the native Element object with a reference to its [HtmlTable][] instance.

Element property: HtmlTable {#Element:HtmlTable}
--------------------------------------

### Syntax

	myElement.retrieve('HtmlTable'); //the instance of HtmlTable for the element



[HtmlTable]: #HtmlTable
[HtmlTable:push]: #HtmlTable:push
[Options]: http://www.mootools.net/docs/core/Class/Class.Extras#Options
