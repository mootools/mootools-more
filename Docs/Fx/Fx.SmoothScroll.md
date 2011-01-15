Class: Fx.SmoothScroll {#Fx-SmoothScroll}
=========================================

Auto targets all the anchors in a page and display a smooth scrolling effect upon clicking them.

### Note

- *Fx.SmoothScroll* requires the page to be in [Standards Mode](http://hsivonen.iki.fi/doctype/).

### Extends

[Fx.Scroll][]

Fx.SmoothScroll Method: constructor
-----------------------------------

### Syntax

	var mySmoothScroll = new Fx.SmoothScroll([options[, win]]);

### Arguments

1. options - (*object*, optional) In addition to all the [Fx.Scroll][] options, *Fx.SmoothScroll* has links option incase you had a predefined links collection.
2. win     - (*object*, optional) The context of the *Fx.SmoothScroll*.

### Options

* links - (*mixed*) A collection of Elements or a string <Selector> of Elements that the *Fx.SmoothScroll* can use.
* axes - (*array* or *string*, defaults to `['x', 'y']`) Specify which axis to scroll on, can be 'x', 'y', or ['x', 'y'].

### Events

* scrolledTo - (*function*) callback executed when an element is scrolled to (after the scrolling). Passed the link clicked and the element scrolled to as arguments.

### Returns

* (*object*) A new *Fx.SmoothScroll* instance.

### Examples

	var mySmoothScroll = new Fx.SmoothScroll({
		links: '.smoothAnchors',
		wheelStops: false
	});

### See Also

- [Fx.Scroll][]

[Fx.Scroll]: /more/Fx/Fx.Scroll
