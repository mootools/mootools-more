Native: Element {#Element}
==========================

Extends the [Element][] native object with some basic shortcuts (like .hide and .show).

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/04-element/05-element.shortcuts

Element Method: isDisplayed {#Element:isDisplayed}
----------------------------------------------

Returns the state of the display of the element.

### Syntax

	myElement.isDisplayed();

### Returns

* (*boolean*) true = visible, false = not visible.

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

Adds one class and removes the other. If the one to remove is not found the one to add is still added.

### Syntax

	myElement.swapClass(addClass, removeClass);

### Arguments

1. addClass - (*string*) the css class to add.
2. removeClass - (*string*) the css class to remove.

### Returns

* (*element*) This Element.

### Example

	$(id).swapClass('green', 'blue'); //adds green, removes blue

[Element:hide]: #Element:hide
[Element]: /docs/core/Element/Element
