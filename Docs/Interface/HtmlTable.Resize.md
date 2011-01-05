Class: HtmlTable.Resize {#HtmlTable.Resize}
=============================

Makes headers of HtmlTable columns resizable to resize the rows.

### Refactors

* [HtmlTable][]

### Syntax

	new HtmlTable([table, options]);

### Arguments

1. table - (*mixed*; optional) - a Table DOM element or it's id; if you do not specify one, one will be created.
1. options - (*object*; optional) a key/value set of options.

### Options

* all options defined by [HtmlTable][], plus:
* classHandle - (*string*) the class applied to the created resize handles. Defaults to 'table-th-resizer'.
* classResizableHeader - (*string*) the class applied to the headers of resizable columns. Defaults to 'table-th-resizable'.
* classResizable - (*string*) the class applied to tables which contain resizable columns. Defaults to 'table-resizable'.
* classNoResize - (*string*) class given to columns that should not be user resizable.  Defaults to 'table-th-noresize'.
* resize - (*string*) the resizing method to use.  Three choices:
    -- 'maintainChanges' (default) - Prioritizes maintaining changes that have been made by the user and maintaining the table's width as a minimum width.  If a column is resized to a width larger than its original width, the table grows along with it.  However, the table will never be smaller than its original width.
    -- 'table' - Resizes the table to the same extent that the column being resized has been resized.  Results in a variable width table.
    -- 'neighbor' - Attempt to resize a neighbor to the right to compensate for the resizing of a column.  If no column to the right can be resized, the column can not be resized.  Results in a fixed width table that will always resize at the user's mouse movement.
* setStylesOnStartup - (*boolean*) - set styles of table cells on startup.  Defaults to true. 
### Events

* onColumnResize - function executed when a column is resized;

HtmlTable Method: enableResize {#HtmlTable:enableResize}
----------------------------------------

Enables the resizing features of the table.

### Syntax

          myTable.enableResize();

### Returns

* (*object*) This instance of HtmlTable.


HtmlTable Method: disableResize {#HtmlTable:disableResize}
----------------------------------------

Disables the resizing features of the table.

### Syntax

          myTable.disableResize();

### Returns

* (*object*) This instance of HtmlTable.


HtmlTable Method: serialize {#HtmlTable:serialize}
----------------------------------------

Return an object storing the resize state of the table.

### Syntax

          myTable.serialize();

### Returns

* (*object*) Object containing resize state of the table. 


HtmlTable Method: restore {#HtmlTable:restore}
----------------------------------------

Restores the resize state of the table from an object passed in.

### Syntax

          myTable.restore(tableState);

### Arguments

1. tableState - Object created by HtmlTable.serialize() which contains the resize state of the table.


[HtmlTable]: /more/Interface/HtmlTable




