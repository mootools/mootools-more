Type: Element {#Element}
========================
Extends the [Element][] Type to include the *pin* method useful for fixed positioning for elements.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/04-element/03-element.pin)


Element Method: pin {#Element:pin}
----------------------------------

Affixes an element at its current position, even if the window is scrolled.

### Arguments

1. pin - (*boolean*, optional) *true*: pins the element; *false*: unpins the element; defaults to *true*; See also [Element:unpin][].

### Syntax

	$('myElement').pin();

### Returns

* (*element*) This Element.

Element Method: unpin {#Element:unpin}
--------------------------------------

Un-pins an element at its current position (see [Element:pin][]).

### Syntax

	$('myElement').unpin();


### Returns

* (*element*) This Element.

Element Method: togglePin {#Element:togglepin}
----------------------------------------------

Toggles the pin state of the element.

### Syntax

	$('myElement').togglePin();

### Returns

* (*element*) This Element.

[Element:unpin]: #Element:unpin
[Element:pin]: #Element:pin
[Element]: /core/Element/Element
