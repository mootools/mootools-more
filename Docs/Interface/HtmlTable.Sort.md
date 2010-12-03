Class: HtmlTable.Sort {#HtmlTable}
==================================

Makes headers of HtmlTable clickable to sort the rows.

### Refactors

* [HtmlTable][]

### Syntax

	new HtmlTable([table, options]);

### Arguments

1. table - (*mixed*; optional) - a Table DOM element or it's id; if you do not specify one, one will be created.
1. options - (*object*; optional) a key/value set of options.

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
------------------------------------------

Enables the sortable features of the table.

### Syntax

	myTable.enableSort();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: disableSort {#HtmlTable:disableSort}
------------------------------------------

Disables the sortable features of the table.

### Syntax

	myTable.disableSort();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable method: reSort {#HtmlTable:reSort}
------------------------------------------

Reapplies the current sort. Note that this is called whenever new rows are added.

### Syntax

	myTable.reSort();

### Returns

* (*object*) This instance of HtmlTable.

Hash: HtmlTable.Parsers {#HtmlTable:Parsers}
======================================

There are numerous parsers used by HtmlTable to determine the sort order of data. A column of numbers, for example, will be sorted numerically, while a column of dates will be sorted by their date order. The *HtmlTable.Parsers* hash contains a group of objects each with a regular expression and a function applied when that expression matches the content. For example, here is the parser for number:

	HtmlTable.Parsers.number = {
		match: /^\d+[^\d.,]*$/,
		convert: function() {
			return this.get('text').toInt();
		},
		number: true
	};

You'll note that there's also a *number* value. Numerical parsers should have this flag for proper sorting. Also note that "this" is bound to the table cell.

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

Static Method: HtmlTable.defineParsers {#HtmlTable:defineParsers}
-----------------------------------------------------------

Because these parsers in the list above are run in order, adding a custom parser is likely to produce no results, as your table contents will eventually match one of the items above. Therefore there is a static method for adding your own parsers that will put your parser at the top of this list. Example:

	HtmlTable.defineParsers({
		foo: {
			match: /foo/,
			convert: function(){...},
			number: false
		}
	});

[HtmlTable]: /more/Interface/HtmlTable
[Date.parse]: /more/Types/Date#Date:parse
