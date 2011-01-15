Class: Fx.Move {#Fx-Move}
=========================

Moves an element to another location (relative to another element) with a transition.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/05-fx/01-fx.move)

### Extends

- [Fx.Morph][]


Fx.Move Method: constructor
---------------------------

### Syntax

	new Fx.Move(element[, options]);

### Arguments

1. element - (*mixed*) A string of the id for an Element or an Element reference to relocate
2. options - (*object*, optional) An object with options for the effect. See below.

### Options

* relativeTo - (*mixed*) a string of the id for an Element or an Element reference relative to which to position this one; defaults to *document.body.*
* position - (*string*) the aspect of the relativeTo element that this element should be positioned. Options are 'upperRight', 'upperLeft', 'bottomLeft', 'bottomRight', and 'center' (the default). With the exception of center, all other options will make the upper right corner of the positioned element = the specified corner of the relativeTo element. 'center' will make the center point of the positioned element = the center point of the relativeTo element.
* edge - (*string*) the edge of the element to set relative to the relative elements corner; this way you can specify to position this element's upper right corner to the bottom left corner of the relative element. this is optional; the default behavior positions the element's upper left corner to the relative element unless position == center, in which case it positions the center of the element to the center of the relative element. Acceptable values here are the same as those in the 'position' option.
* offset - (*object*) x/y coordinates for the offset (i.e. {x: 10, y:100} will move it down 100 and to the right 10). Negative values are allowed.

### Returns

* (*object*) A new instance of [Fx.Move][].

### Examples

	var mover = new Fx.Move($('myelement'), {
		relativeTo: $('someOtherElement'),
		position: 'upperRight',
		edge: 'upperLeft',
		offset: {x: 10, y: 100}
	});
	mover.start(); //moves to the new location
	mover.start({
		relativeTo: document.body,
		position: 'center',
		edge: false,
		offset: {x:0,y:0}
	}); //move it to the center of the window

### See Also

- [Fx.Morph][]

Fx.Move Method: start {#Fx-Move:start}
--------------------------------------

Moves the element to provided destination or the destination specified in the options.

### Syntax

	myFxMove.start(options); //options are not required

### Arguments

1. destination - (*object*, optional) an object of key/value options specifying a new position for the element; if not provided the values in the options set at initialization will be used.

### Destination

* See all the arguments defined in the options above for the key/value options in the destination object.

### Returns

* (*object*) This [Fx.Move][] instance.

### Notes

- If you want to pass in a destination, you must pass in ALL of the options (relativeTo, position, edge, and offset x & y) unless you want to use those already defined in the options at initialization. In other words, if you only pass in one of these options, the rest will be filled in from the options defined at initialization.
- You can always set new defaults using *setOptions*.

Type: Element {#Element}
==========================

Extends the Element Type with [Fx.Move][] methods.

Element Property: move {#Element:move}
-------------------------------------------------

### Setter

Sets a default [Fx.Move][] instance for an Element.

#### Syntax

	el.set('move'[, options]);

#### Arguments

1. options - (*object*, optional) The [Fx.Move][] options.

#### Returns

* (*element*) This Element.

#### Examples

	el.set('move', {duration: 'long', transition: 'bounce:out'});
	el.move(); //centers on the screen

### Getter

Gets the default [Fx.Move][] instance for the Element.

#### Syntax

	el.get('move');

#### Returns

* (*object*) The Element's internal [Fx.Move][] instance.

#### Examples

	el.set('move', {duration: 'long', transition: 'bounce:out'});
	el.move({relativeTo:$('myDiv'));
	el.get('move'); //The Fx.Move instance.

Type: Element {#Element}
==========================

Adds [Fx.Move][] shortcuts to the [Element][] class.

Element Method: move {#Element:move}
-------------------------------------

Creates a new instance of [Fx.Move][] and calls its *start* method.

### Syntax

	$(element).move(options);

### Arguments

* options - (*object*) a key/value set of options. See [Fx.Move:options][].

### Returns

* (*element*) This Element.

### Example

	$(element).move({relativeTo: $('myDiv')});

[Fx.Move]: #Fx-Move
[Fx.Move:options]: #Fx-Move:options
[Fx.Morph]: /core/Fx/Fx.Morph
[Element]: /core/Element/Element
