Type: Element {#Element}
==========================

Extends the [Element][] Type with some basic shortcuts (like .hide and .show).

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/04-element/05-element.shortcuts)

Element Method: isDisplayed {#Element:isDisplayed}
----------------------------------------------

Returns the state of the display of the element.

### Syntax

	myElement.isDisplayed();

### Returns

* (*boolean*) true if display != "none", false if display == "none".

Element Method: isVisible {#Element:isVisible}
----------------------------------------------

Determines if an element is displayed using offset height/width. If both of these are zero it usually means the element is not displayed or one of its parent's is not.

### Syntax

	myElement.isVisible();

### Returns

* (*boolean*) true if visible, false if not visible.

Element Method: toggle {#Element:toggle}
----------------------------------------

Toggles the state of an element from hidden (display = none) to visible (display = what it was previously or else display = block)

### Syntax

	myElement.toggle();

### Returns

* (*element*) This Element.

Element Method: hide {#Element:hide}
------------------------------------

Hides an element (display = none).

### Example

	myElement.hide(); //same as $(id).setStyle('display', 'none');

### Returns

* (*element*) This Element.

Element Method: show {#Element:show}
------------------------------------

Shows an element.

### Syntax

	myElement.show(displayString);

### Arguments

1. displayString - (*string*) Display value; defaults to what it was previously if [Element:hide][] was called on the element, otherwise defaults to "block".

### Returns

* (*element*) This Element.

### Example

	$(id).show(); //same as $(id).setStyle('display', 'block');
	$(id).show('inline'); //same as $(id).setStyle('display','inline');

Element Method: swapClass {#Element:swapClass}
----------------------------------------------

Removes one class and adds the other. If the one to remove is not found the one to add is still added.

### Syntax

	myElement.swapClass(removeClass, addClass);

### Arguments

1. removeClass - (*string*) the css class to remove.
2. addClass - (*string*) the css class to add.

### Returns

* (*element*) This Element.

### Example

	$(id).swapClass('green', 'blue'); // removes green, adds blue


Static Method: document.clearSelection {#document:clearSelection}
----------------------------------------------

Removes any document selection (text selection). **Can only be called on document**.

### Syntax

	document.clearSelection();

### Returns

* nothing

[Element:hide]: #Element:hide
[Element]: /core/Element/Element
