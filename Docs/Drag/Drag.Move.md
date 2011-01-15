Class: Drag.Move {#Drag-Move}
=============================

An extension to the base Drag class with additional functionality for dragging an Element.  Supports snapping and droppables.
Inherits methods, properties, options and events from [Drag][].

### Demos

* [Drag.Cart](http://mootools.net/demos/?demo=Drag.Cart)
* [Drag.Drop](http://mootools.net/demos/?demo=Drag.Drop)
* [Drag.Move](http://mootools.net/demos/?demo=Drag.Move)


### Note

Drag.Move requires the page to be in [Standards Mode](http://hsivonen.iki.fi/doctype/).


Drag.Move Method: constructor
-----------------------------

### Syntax

	var myMove = new Drag.Move(myElement[, options]);

### Arguments

1. el      - (*element*) The Element to apply the drag to.
2. options - (*object*, optional) The options object. See below.

### Options

All the base Drag options, plus:

* container  - (*element*) If an Element is passed, drag will be limited to the passed Element's size and position.
* droppables - (*array*) The Elements that the draggable can drop into. The class's drop, enter, and leave events will be fired in conjunction with interaction with one of these elements.
* precalculate - (*boolean*; defaults to *false*) If *true*, the class will calculate the locations and dimensions of the droppables which will increase performance. If the droppables are likely to change shape, size, or location it is best to leave this as *false*.
* includeMargins - (*boolean*; defaults to *true*) This option only applies when the container option is set. If *true* (the default) the margins are included in the calculations for the bounding box of the draggable item. This means that if you have a margin on your draggable then the border of the draggable can never touch the edge of the container. Setting it to false ignores this margin.
* checkDroppables - (*boolean*; defaults to *true*) Checks against the droppables on drag if *true*.

### Events

* drop  - Executed when the element drops. Passes as argument the element and the element dropped on and the event. If dropped on nothing, the second argument is null.
* leave - Executed when the element leaves one of the droppables.
* enter - Executed when the element enters one of the droppables.

### Example

	var myDrag = new Drag.Move('draggable', {

		droppables: '.droppable',

		onDrop: function(element, droppable, event){
			if (!droppable) console.log(element, ' dropped on nothing');
			else console.log(element, 'dropped on', droppable, 'event', event);
		},

		onEnter: function(element, droppable){
			console.log(element, 'entered', droppable);
		},

		onLeave: function(element, droppable){
			console.log(element, 'left', droppable);
		}

	});

### Notes

- Drag.Move requires the page to be in [Standards Mode](http://hsivonen.iki.fi/doctype/).
- Drag.Move supports either position absolute or relative. If no position is found, absolute will be set.

### See Also

- [Drag][]


Drag.Move Method: stop {#Drag-Move:stop}
-------------------------------------------------

Fires the 'drop' event and calls the Drag Class stop method.

### Syntax

	myMove.stop();

### Example

	var myMove = new Drag.Move(myElement, {
		onSnap: function(){ // due to MooTool's inheritance, all [Drag][]'s Events are also available.
			this.moved = this.moved || 0;
			this.moved++;
			if (this.moved > 1000){
				alert("You've gone far enough.");
				this.stop();
			}
		}
	});

### See Also

- [Drag:stop][]



Type: Element {#Element}
==========================

Custom Type to allow all of its methods to be used with any DOM element via the dollar function [$][].



Element Method: makeDraggable {#Element:makeDraggable}
------------------------------------------------------

Adds drag-to-move behavior to an Element using supplied options.

### Syntax

	var myDrag = myElement.makeDraggable([options]);

### Arguments

1. options - (*object*, optional) See [Drag][] and [Drag.Move](#Drag-Move) for acceptable options.

### Returns

* (*object*) The Drag.Move instance that was created.

### Example

	var myDrag = $('myElement').makeDraggable({
		onComplete: function(){
			alert('done dragging');
		}
	});

### See Also

- [Drag][], [Drag.Move](#Drag-Move)



[$]: /core/Element/Element/#dollar
[Drag]: /more/Drag/Drag/#Drag
[Drag:stop]: /more/Drag/Drag/#Drag:stop
[Element:getPosition]: /core/Element/Element.Dimensions/#Element:getPosition
