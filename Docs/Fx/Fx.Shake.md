Class: Fx.Shake {#Fx-Shake}
=========================

Shakes an Element, typically from side to side or up and down. You can also use it to affect something other than the position of the element - any numerical css property.

### Extends

* [Fx.Tween][]

Fx.Shake Method: constructor {#Fx-Shake:constructor}
------------------------------------------------------

### Syntax:

	var myFx = new Fx.Shake(element[, options]);

### Arguments:

1. element - (*mixed*) A string of the id for an Element or an Element reference to shake.
2. options - (*object*, optional) All [Fx.Tween][] Options in addition to *times*.

Options:

* times     - (*integer*: defaults to *5*) the number of times to traverse from one extreme to the other.

### Returns:

* (*object*) A new Fx.Shake instance.

### Examples:

	var myFx = new Fx.Shake('myElement', {
		times: 10,
		property: 'top'
	}).start();

### Notes

* The *transition* argument for Fx.Shake doesn't work the same as with other effects. Fx.Shake has 3 phases where the element moves the distance you specify to one extreme, then transitions to the other extreme using a sinusoidal equation, and then transitions back to the origin. For instance, let's say you are shaking with the 'left' property for your element. The current location of the element is 50px. You shake 10px 5 times. This means the element will slide 10px to the right (to 60px) in phase one. In phase two the element slides from 60px to 40px (10px in either direction from 50px) 5 times and ends at 40px. In phase 3 it slides back to its origin (50px). Phase two will *always* use the sinusoidal curve, but phase one and three will use the transition you specify. The default is the default for [Fx][] - a linear equation. For best results it's recommended you leave this as it is.

Fx.Shake Method: start {#Fx-Shake:start}
------------------------------------------

Shakess the specified Element using the property, distance, and times defined.

### Syntax:

	myFx.start([property,] distance[, times]);

### Arguments:

1. property - (*string*, if not in options) The css property to tween. Omit this if you use the property option.
2. distance - (*integer*) The greatest offset from the origin. For instance, if you want to shake it 10px side to side (a total traversal of 20px, with the origin at the center), you'd pass in *10*.
3. times - (*integer*, optional) The number of traversals to make. How fast the element moves is a factor of this number and the duration of the effect. If not specified, uses the value in the options (defaults to *5*).

### Returns:

* (*object*) This Fx.Shake instance.

### Examples:

	var myElement = $(document.body);
	//shake 5 times from left to right with a total traversal of 20px:
	var myFx = new Fx.Shake(myElement).start('left', 10);

Hash: Element.Properties {#Element-Properties}
==============================================

see [Element.Properties](http://www.mootools.net/docs/Element/Element/#Element-Properties)

Element Property: shake {#Element-Properties:shake}
---------------------------------------------------

Sets and gets default options for the *Fx.Shake* instance of an Element.

### Setter:

#### Syntax:

	el.set('shake'[, options]);

#### Arguments:

* options - (*object*) the Fx.Shake options.

#### Returns:

* (*element*) This Element.

#### Examples:

	el.set('shake', {times: 10, duration: 1000});
	el.shake('top', 20);

### Getter:

#### Syntax:

	el.get('shake', [options]);

#### Arguments:

1. property - (*string*) the Fx.Shake property argument.
2. options  - (*object*) the Fx.Shake options.

#### Returns:

* (*object*) The Element's internal Fx.Shake instance.

#### Examples:

	el.get('shake', {property: 'left', duration: 'long'}).start(20);

### Notes:

- When initializing the Element's shake instance with Element:set, the property to shake SHOULD NOT be passed.
- The property must be specified in calls to Element:shake.
- When options are passed to either the setter or the getter, the instance will be recreated.
- As with the other Element shortcuts, the difference between a setter and a getter is that the getter returns the instance, while the setter returns the element (for chaining and initialization).



Native: Element {#Element}
==========================

Custom Native to allow all of its methods to be used with any DOM element via the dollar function [$][].



Element Method: shake {#Element:shake}
--------------------------------------

Element shortcut method which immediately transitions any single CSS property of an Element from one value to another.

### Syntax:

	myElement.shake(myFx.start([property,] distance[, times, options);

### Arguments:

See [Fx-Shake:start][] in addition to the options defined in the constructor.

### Returns:

* (*element*) This Element.

### Example:

    //shakes horizontally 20 pixels in either direction 5 (the default) times:
	$('myElement').shake('left', 20);
	//shakes vertically 20 pixels 10 times:
	$('myElement').shake('top', 20, 10);
	//shake horizontally 20 pixels over one second:
	$('myElement').shake('left', 20, {
		duration: 1000
	});

### See Also:

- [Fx.Tween][], [Fx][]

[Fx-Shake:start]: #Fx-Shake:start
[Fx]: http://www.mootools.net/docs/Fx/Fx
[Fx.Tween]: http://www.mootools.net/docs/Fx/Fx.Tween