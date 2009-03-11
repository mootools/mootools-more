Native: Element {#Element}
==========================

Extends the [Element][] native object to include methods useful in managing inputs.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/04-element/00-element.forms

Element Method: tidy {#Element:tidy}
------------------------------------

Uses [String:tidy][] to clean up common special characters with their ASCII counterparts (smart quotes, elipse characters, stuff from MS Word, etc.).

### Syntax

	$('myInput').tidy();

### Returns

* (*element*) This Element.

Element Method: getTextInRange {#Element:getTextInRange}
--------------------------------------------------------

Returns the text of an input within a range.

### Syntax

	$('myInput').getTextInRange(start, end);

###	Arguments

1. start - (*integer*) beginning select position
2. end - (*integer*) end position

### Returns

* (*string*) the text in the specified range

### Notes

- If the range specified is out of bounds (for instance, if the text is "123" and you query for the range 2-10) the text that is found within the bounds is returned. If no text falls within the bounds, an empty string is returned.

Element Method: getSelectedText {#Element:getSelectedText}
----------------------------------------------------------

Get the text selected in an input, returns a range (see [Element:getTextInRange][]).

### Syntax

	$('myInput').getSelectedText();

### Returns

* (*string*) The text that is selected

### Notes

- If no text is selected, an empty string is returned.

Element Method: getSelectionStart {#Element:getSelectionStart}
--------------------------------------------------------------

Returns the index of start of the selected text.

### Syntax

	$('myInput').getSelectionStart();

### Returns

* (*number*) The numerical index of the start of the selection.

Element Method: getSelectionEnd {#Element:getSelectionEnd}
--------------------------------------------------------------

Returns the index of end of the selected text.

### Syntax

	$('myInput').getSelectionEnd();

### Returns

* (*number*) The numerical index of the end of the selection.

### Notes

- If there is no selection, this value will be equal to [Element:getSelectionStart][]

Element Method: getSelectedRange {#Element:getSelectedRange}
------------------------------------------------------------

Returns the range of what is selected within the element.

### Syntax

	$('myInput').getSelectionRange();

###	Returns

* (*object*) start and end values (each an *integer*).

###	Example return
	{start: 2, end: 12}

Element Method: setCaretPosition {#Element:setCaretPosition}
------------------------------------------------------------

Sets the caret at the given position.

### Syntax

	$('myInput').setCaretPosition(pos);

### Arguments

1. pos - (*integer*) the location to place the caret OR "end" to place it at the end.

### Returns

* (*element*) This Element.

### Example

	$('myInput').setCaretPosition(3);
	$('myInput').setCaretPosition("end");

Element Method: getCaretPosition {#Element:getCaretPosition}
------------------------------------------------------------

Returns the caret position.

### Syntax

	$('myInput').getCaretPosition();

### Returns

* (*integer*) The caret position.

Element Method: selectRange {#Element:selectRange}
--------------------------------------------------

Selects text within a given range.

### Syntax

	$('myInput').selectRange(start, end);

###	Arguments

1. start - (*integer*) starting integer
2. end - (*integer*) ending integer

### Returns

* (*element*) This Element.

### Example

	$('myInput').selectRange(2, 4);

	<input id="test" value="012345" />
	$('test').selectRange(2, 4); //selects "23"

Element Method: insertAtCursor {#Element:insertAtCursor}
--------------------------------------------------------

Inserts a value at the cursor location; if text is selected, it replaces this text.

### Syntax

	$('myInput').insertAtCursor(value[, selectText]);

### Arguments

1. value - (*string*) value to insert.
2. selectText - (*boolean*) selects the text after it's been inserted

### Returns

* (*element*) This Element.

### Example

	$('myInput').insertAtCursor("<br />");
	$('myInput').insertAtCursor("type something here", true);

Element Method: insertAroundCursor
----------------------------------

Inserts two strings around the selected text.

### Syntax

	$('myInput').insertAroundCursor(options);

### Arguments

1. options - (*object*) key/value set of options.

### Options

1. before - (*string*) the prefix to insert before the selected text
2. after - (*string*) the suffix to insert after the selected text
3. defaultMiddle - (*string*) value to insert between the prefix and the suffix if no text was selected (defaults to "SOMETHING HERE")

### Returns

* (*element*) This Element.

### Example

	<input id="test" value="ninjas are the most dangerous thing in the world" />
	//let's assume that the user selects the word "ninjas"
	$('test').insertAroundCursor({before: "<", after: ">", defaultMiddle: "tag-name"});
	//value is now:
	//<ninjas> are the most dangerous thing in the world



[String:tidy]: /docs/more/Native/String.Extras#String:tidy
[Element:getTextInRange]: #Element:getTextInRange
[Element:getSelectionStart]: #Element:getSelectionStart
[Element]: /docs/core/Element/Element
[Element:get]: /docs/core/Element/Element#Element:get
[Element:set]: /docs/core/Element/Element#Element:set
[Element:erase]: /docs/core/Element/Element#Element:erase
[Hash]: /docs/core/Native/Hash
