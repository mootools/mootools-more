Class: HtmlTable.Sort {#HtmlTable}
==================================

Makes headers of HtmlTable clickable to sort the rows.

### Refactors

* [HtmlTable][]


HtmlTable Method: constructor
-----------------------------

### Syntax

	new HtmlTable([table, options]);

### Arguments

1. table - (*mixed*; optional) - a Table DOM element or it's id; if you do not specify one, one will be created.
2. options - (*object*; optional) a key/value set of options.

### Options

* all options defined by [HtmlTable][], plus:
* sortIndex - (*number*) the row to sort on startup; defaults to *0*. Set to *null* if you don't want to sort on startup.
* sortReverse - (*boolean*) if *true*, the initial sorted row will be sorted in reverse. Defaults to *false*.
* parsers - (*array*) a mapping of parsers for each column of data. See section on parsers below.
* defaultParser - (*string*) if no parsers are defined and they cannot be auto detected, which parser to use; defaults to 'string'
* classSortable - (*string*) the class to add to the table when sorting is enabled; defaults to 'table-sortable'
* classHeadSort - (*string*) the class to add to the th that has the current sort (applied when sort order is forward); defaults to 'table-th-sort'
* classHeadSortRev - (*string*) the class to add to the th that has the current sort (applied when sort order is reverse); defaults to 'table-th-sort-rev',
* classNoSort - (*string*) if a th has this class, it will not be sortable; defaults to 'table-th-nosort'
* classGroup - (*string*) class applied to td elements when more than one has the same value; defaults to 'table-tr-group',
* classGroupHead - (*string*) class applied to the *first* td in a group of td elements that have the same value; defaults to 'table-tr-group-head'
* classCellSort - (*string*) the class applied to td elements that are in the current sorted column. defaults to 'table-td-sort'
* classSortSpan - (*string*) the class applied to a span element injected into the th headers when sorting is enabled; useful for adding an arrow background for the sorted column to indicate the sort direction. defaults to 'table-th-sort-span'
* sortable - (*boolean*) enables the sortable feature on invocation. Defaults to *false*.
* thSelector - (*string* defaults to 'th') the string selector used in delegating sort events.

### Events

* sort - callback executed when a column is sorted; passed the *tbody* and the index of the column sorted.

### Note

Your Table must have a *thead* with *th* elements for each column (these are what the user clicks on to sort stuff). If your table doesn't have headers already, you can specify them with the *headers* option or use the *setHeaders* method.


HtmlTable Method: sort {#HtmlTable:sort}
----------------------------------------

Sorts a column.

### Syntax

	myHtmlTable.sort(index, reverse, prepare);

### Arguments

1. index - (*number*) the index of the column to sort
2. reverse - (*boolean*) reverses the sort if *true*; defaults to *false*
3. prepare - (*boolean*) if the sort has a secondary sort, set this value to *true* on the first sort, and *false* on the second. For example, if you sorted a directory list of files first by type and then secondly by file size, you would sort on type and pass *true* and then sort on size and pass *false*.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: enableSort {#HtmlTable:enableSort}
----------------------------------------------------

Enables the sortable features of the table.

### Syntax

	myTable.enableSort();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: disableSort {#HtmlTable:disableSort}
------------------------------------------------------

Disables the sortable features of the table.

### Syntax

	myTable.disableSort();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: reSort {#HtmlTable:reSort}
--------------------------------------------

Reapplies the current sort. Note that this is called whenever new rows are added.

### Syntax

	myTable.reSort();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: serialize {#HtmlTable:serialize}
----------------------------------------

Return an object storing the sort state of the table.

### Syntax

          myTable.serialize();

### Returns

* (*object*) Object containing sort state of the table. 


HtmlTable Method: restore {#HtmlTable:restore}
----------------------------------------

Restores the sort state of the table from an object passed in.

### Syntax

          myTable.restore(tableState);

### Arguments

1. tableState - Object created by HtmlTable.serialize() which contains the sort state of the table.


Object: HtmlTable.Parsers {#HtmlTable:Parsers}
==============================================

There are numerous parsers used by HtmlTable to determine the sort order of data. A column of numbers, for example, will be sorted numerically, while a column of dates will be sorted by their date order. The HtmlTable.Parsers object contains a group of objects each with a regular expression and a function applied when that expression matches the content.

### Example

	HtmlTable.Parsers.number = {
		match: /^\d+[^\d.,]*$/,
		convert: function() {
			return this.get('text').toInt();
		},
		number: true
	};

### Properties

* match - (*regular expression*) Used when autodetecting the type of a particular table value.
* convert - (*function*) Executed on a particular table cells to parse its value for sorting. The value returned by this function is the value sorted against. The context of this function refers to a particular table cell. This will not update your table cell's html.
* number - (*boolean*; optional) Numerical parsers should have this flag for proper sorting.

Included Parsers
----------------

* date - sorts for date formats that are matched by [Date.parse][]
* input-checked - sorts checkbox inputs into those that are checked and are not checked
* input-value - sorts based on the value inside text inputs
* number - sorts on integers
* numberLax - sorts on integer values that might be mixed with other data.
* float - sorts on float values
* floatLax - sorts on float values that might contain other data.
* string - an alpha sort
* title - sorts on the *title* property of the table data element

Array: HtmlTable.ParserPriority {#HtmlTable:ParserPriority}
-----------------------------------------------------------

HtmlTable.ParserPriority is an array of parser names which define the priority in which your table data is evaluated for sorting. By default it is defined to test from most specific parser to most general. The default ordering is:

	HtmlTable.ParserPriority = ['date', 'input-checked', 'input-value', 'float', 'number']; //if no match, defaults to string

Static Method: HtmlTable.defineParsers {#HtmlTable:defineParsers}
-----------------------------------------------------------------

Because HtmlTable.Parsers are run in the order defined by the HtmlTable.ParserPriority above, merely defining a custom parser on the HtmlTable.Parser object will produce no results. Therefore this is a static method which will both define your parser on the HtmlTable.Parser namespace as well as add your parser to the top of the HtmlTable.ParserPriority list.

### Syntax

	HtmlTable.defineParsers({
		foo: {
			match: /foo/,
			convert: function(){...},
			number: false
		}
	});

[HtmlTable]: /more/Interface/HtmlTable
[Date.parse]: /more/Types/Date#Date:parse
