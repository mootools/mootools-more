Class: HtmlTable.Tree {#HtmlTable.Tree}
=============================

Turns a tree into a set of nested, expandable/collapsible rows.

### Refactors

* [HtmlTable][]

### Syntax

	new HtmlTable([table, options]);

### Arguments

1. table - (*mixed*; optional) - a Table DOM element or its id; if you do not specify one, one will be created.
1. options - (*object*; optional) a key/value set of options.

### Options

* all options defined by [HtmlTable][], plus:
* enableTree - (*boolean*) if *true* (defaults to *false*) the following options will be used to instantiate a tree view table.
* injectExpandLinks - (*boolean*) if *true*, the default, link tags will be inserted into the first TD of each TR that is a parent. This option is ignored if the *noBuild* option is *true*.
* expandClass - (*string*) the classname of the elements that, when clicked, expand a section; defaults to 'expand'.
* baseIndentPadding - (*number*) the padding applied to the left of root nodes; defaults to 10 (px). This option is ignored if the *writeTreeCSS* option is *false*.
* indentPadding - (*number*) the padding applied to the left of each child node multiplied by its depth plus the base indent padding. E.g. if the base padding is 10, and the indent padding is 15 (the defaults), then the first children are 25 pixels in, the second order children are 40 pixels in and so on. This option is ignored if the *writeTreeCSS* option is *false*.
* writeTreeCSS - (*boolean*) if *true*, the default, HtmlTable will write a CSS *style* tag with 40 indentation rules based on the indentPadding and the baseIndentPadding options. This is more efficient than adding a style property to every row. This tag will be injected into the document.head.
* build - (*boolean*) if *true* (the default), the table is not parsed on startup, the *table-folder* class is not added to rows that are parents, and the expand links are not injected. This assumes that the HTML is already in a state where these classes are present and the non-root nodes are hidden already. This greatly improves the startup costs and is useful when dealing with large tables or when you want to avoid the table being entirely visible on startup and then collapsing when the instance is finished parsing it.


### Events

* onAddRowToTree - function executed when a row is added to the tree. Passed the row.
* onRemoveRowToTree - function executed when a row is removed from the tree. Passed the row.
* onHideRow - function executed when when a row is hidden. Passed the row.
* onShowRow - function executed when when a row is shown. Passed the row.
* onExpandSection - function executed when a row is expanded, meaning that all its children are now visible. Passed the row.
* onCloseSection - function executed when a row is collapsed, meaning that all its children are now hidden. Passed the row.

### Notes

* All TR nodes for tree view instances should have a CSS class defining their depth as 'table-depth-{integer}'. So the root nodes need 'table-depth-0' and each root node's children need 'table-depth-1' and so on.
* If you wish to avoid startup costs, you must hide all the rows that are not meant to be visible on startup yourself (typically all rows except the root nodes), add the expand links (by default, a simple anchor tag with the class name "expand"), and the folder class name (typically 'table-folder'). Then this class will lazily map out child nodes only when the user clicks to expand a section.
* Typically the expand link is styled to be a block style element with a plus or triangle icon.
* When a row is expanded, it is given the CSS class name 'table-expanded'. You can style the expand icon to change state based on this selector ('tr.table-expanded a.expand').
* An example HTML and CSS styles can be found in [the Tests directory on github](http://github.com/mootools/mootools-more/blob/master/Tests/Interface/HtmlTable.Tree.html).

HtmlTable Method: enableTree {#HtmlTable:enableTree}
----------------------------------------

Attaches the click behaviors to the expand links (defaults to elements with the css class 'expand'; see the *expandClass* option). Also enables the keyboard shortcuts if the *useKeyboard* option is true.

### Syntax

	myHtmlTable.enableTree();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: disableTree {#HtmlTable:disableTree}
----------------------------------------

Detaches the click behaviors from the expand links and disables the keyboard if there is one.

### Syntax

	myHtmlTable.disableTree();

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: injectChild {#HtmlTable:injectChild}
----------------------------------------

Injects a row into the table as a child of another row.

### Syntax

	myHtmlTable.injectChild(row, rowProperties, parent, injectAfter);

### Arguments

1. row - (*array* or *element*) the data for the row or *TR* element.
2. rowProperties - (*object*) the properties for the row (class, id, styles, etc)
3. parent - (*element*) the TR that will be the parent of the new row. This row must already be in the table.
4. injectAfter - (*element*; optional) used for specifying where to put the row, which is injected after it. If not specified, the new row is added after the parent, putting it at the top of the section.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: addRowToTree {#HtmlTable:addRowToTree}
----------------------------------------

Identifies a row to be the child of a parent. Does not move the location of the row in the DOM in any way.

### Syntax

	myHtmlTable.addRowToTree(row, parent);

### Arguments

1. row - (*element*) the TR that is the child.
2. parent - (*element*) the TR that is the parent.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: removeRowFromTree {#HtmlTable:removeRowFromTree}
----------------------------------------

Removes a row from the tree. Does not alter its location in the DOM in any way. This only has the effect of making it act like a root node in the display.

### Syntax

	myHtmlTable.removeRowFromTree(row);

### Arguments

1. row - (*element*) the TR element to remove from the tree.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: toggleExpand {#HtmlTable:toggleExpand}
----------------------------------------

Toggles the expanded state of a row, displaying or hiding its children.

### Syntax

	myHtmlTable.toggleExpand(row);

### Arguments

1. row - (*element*) the TR element to toggle.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: expandSection {#HtmlTable:expandSection}
----------------------------------------

Expands a row, displaying its children.

### Syntax

	myHtmlTable.expandSection(row);

### Arguments

1. row - (*element*) the TR element to expand.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: closeSection {#HtmlTable:closeSection}
----------------------------------------

Closes a row, hiding its children.

### Syntax

	myHtmlTable.closeSection(row);

### Arguments

1. row - (*element*) the TR element to close.

### Returns

* (*object*) This instance of HtmlTable.

HtmlTable Method: isExpanded {#HtmlTable:isExpanded}
----------------------------------------

Returns *true* if the row is in its expanded state.

### Syntax

	myHtmlTable.isExpanded(row);

### Arguments

1. row - (*element*) the TR element to check.

### Returns

* (*boolean*) *true* if the node is expanded.

HtmlTable Method: isRowParent {#HtmlTable:isRowParent}
----------------------------------------

Returns *true* if the row has children.

### Syntax

	myHtmlTable.isRowParent(row);

### Arguments

1. row - (*element*) the TR element to check.

### Returns

* (*boolean*) *true* if the row is a parent.

HtmlTable Method: getChildRows {#HtmlTable:getChildRows}
----------------------------------------

Returns the rows that are child rows of the one passed in. Note that it does NOT return grandchildren.

### Syntax

	myHtmlTable.getChildRows(row);

### Arguments

1. row - (*element*) the TR element to check.

### Returns

* (*array*) An array of TR elements that are children of the specified row.

HtmlTable Method: getParentRow {#HtmlTable:getParentRow}
----------------------------------------

Returns the parent node of the one passed in. Root nodes return *undefined*.

### Syntax

	myHtmlTable.getParentRow(row);

### Arguments

1. row - (*element*) the row to get the parent of.

### Returns

* (*element*) the TR element that is the parent of the specified row.

HtmlTable Method: getRowDepth {#HtmlTable:getRowDepth}
----------------------------------------

Returns the depth of the row in the tree (i.e. root nodes are 0, their children are 1, etc.)

### Syntax

	myHtmlTable.getRowDepth(row);

### Arguments

1. row - (*element*) the row to get the depth of.

### Returns

* (*number*) the depth value for the specified row.


[HtmlTable]: /more/Interface/HtmlTable
