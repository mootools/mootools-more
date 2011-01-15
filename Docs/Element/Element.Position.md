Type: Element {#Element}
==========================
Extends the [Element][] Type with the method *position* which sets the location of an element relative to another.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/04-element/04-element.position)


Element Method: position {#Element:position}
--------------------------------------------------

Sets the location of an element relative to another (defaults to the document body).

### Syntax

	myElement.position(options);

###	Arguments

1. options - (*object*) a key/value object with options

### Options

* relativeTo - (*element*) the element relative to which to position this one; defaults to *document.body*.
* position - (*string* OR *object*) the aspect of the relativeTo element that this element should be positioned. See position section below.
* edge - (*string* OR *object*) the edge of the element to set relative to the relative element's corner; this way you can specify to position this element's upper right corner to the bottom left corner of the relative element. This is optional; the default behavior positions the element's upper left corner to the relative element unless position == center, in which case it positions the center of the element to the center of the relative element. See position section below.
* offset - (*object*) x/y coordinates for the offset (i.e. {x: 10, y:100} will move it down 100 and to the right 10). Negative values are allowed.
* returnPos - (*boolean*) don't move the element, but instead just return the position object ({top: '#', left: '#'}); defaults to *false*
* relFixedPosition - (*boolean*) *true*: adds the scroll position of the window to the location to account for a fixed position relativeTo item; defaults to *false*
* ignoreMargins - (*boolean*) you can have the position calculate the offsets added margins if you like; defaults to *false*. If *true*, the corner of the element will be used EXCLUDING the margin.
* ignoreScroll - (*boolean*) if *true*, the scroll offset of the parent is ignored. defaults to *false*.
* allowNegative - (*boolean*) if *true* (the default), AND the element is not a descendent of an element that is positioned (relative or absolute), then the position will not allow negative values.
* minimum - (*object*) *x* and *y* values (*number*) for hard minimum limits on the position. Unlike allowNegative, these are not conditional; if you give zero values for the x/y values, they will be obeyed regardless of any other setting.
* maximum - (*object*) *x* and *y* values (*number*) for hard maximum limits on the position.

### Position & Edge Options

There are two ways to specify the position: strings and objects. The strings are combinations of "left", "right", and "center" with "top" (or "upper"), "bottom", and "center". These are case insensitive. These translate to:

* upperLeft, topLeft (same thing) - or upperleft, leftupper, LEFTUPPER etc.
* bottomLeft
* centerLeft
* upperRight, topRight (same thing)
* bottomRight
* centerRight
* centerTop
* centerBottom
* center

Alternatively, you can be a little more expicit by using an object with x and y values. Acceptable values for the x axis are "left", "right", and "center", and for y you can use "top", "bottom" and "center".

* {x: 'left', y: 'top'} // same as "upperLeft" or "topLeft"
* {x: 'left', y: 'bottom'} // same as "bottomLeft"
* etc.

Using these options you can specify a position for each corner of the relativeTo object as well as the points between those corners (center, left, top, right, bottom and the center of the entire object).

### Returns

* (*element* or *object*) This Element *unless* the option *returnPos* is set to true, in which case an object is returned with top and left values that can be passed to *Element.setStyle* (example: ({top: '200px', left: '100px'})).

### Example

	$('myElement').position(); //centered to the middle of the window
	$('myElement').position({relativeTo: 'myDiv'}); //element is in the center of myDiv
	$('myElement').position({
		relativeTo: $('myDiv'),
		position: 'upperLeft',
		edge: 'upperRight'
	}); //myElement's upper right corner is against myDiv's upper left corner

### Notes

* The element must be absolutely positioned (if it isn't, this method will set it to be).

[Element]: /core/Element/Element
