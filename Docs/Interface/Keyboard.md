Class: Keyboard {#Keyboard}
=================================

Class takes out the need to have logic in key events to check which buttons are pressed.  The class fires individual events for keys (Individual key events are referred to as subevents in this documentation).  Modifiers are allowed. Provides methodology to disable and enable the listeners assigned to a Keyboard instance.
Keyboard instances are nodes of a tree based heirarchy (think of the DOM) to allow complex keyboard driven functionality. The root node of the tree is generally Keyboard.manager.  When a key event is fired the root node keyboard (Generally Keyboard.manager) gets a chance to handle the event.  The event is then propagated from the currently active leafnode back towards the root.

### Extends

* [Events][]

### Implements

* [Options][], [Log][]

Keyboard Method: constructor {#Keyboard:constructor}
----------------------------------------

### Syntax

	var myKeyboardEvents = new Keyboard([options]);

### Arguments

1. options - (*object*, optional) The options for the class detailed below.

#### Options

* defaultEventType:      - (*string*; defaults to 'keyup') The event type that should trigger the subevents.
* active:         - (*boolean*; defaults to *false*) When not active the subevents will be surpressed.
* events:         - (*object*; defaults to *{}*) object keys are event names values should be the function to fire. Same as calling addEvents({...}) on the instance after creation

### Returns

* (*object*) A new instance of [Keyboard][].

### Events

* onActivate - (*function*) callback executed when the keyboard is activated.
* onDeactivate - (*function*) callback executed when the keyboard is deactivated.

### Examples

	var myKeyboardEvents = new Keyboard({
		defaultEventType: 'keyup', 
		events: { 
			'shift+h': fn1, 
			'ctrl+shift+h': fn2, 
			'shift+ctrl+h': fn3,
			'h': fn4,
			'keydown:shift+d': fn5
		}
	});

	var myKeyboardEvents1 = new Keyboard({defaultEventType: 'keydown'});
	myKeyBoardEvents1.addEvents({
		'shift+h': fn1,
		'ctrl+shift+h': fn2,
		'shift+ctrl+h': fn3,
		'h': fn4
	});

### Notes:

* In Example both myKeyboardEvents and myKeyboardEvents1 achieve the same ends.
* The order of key modifiers does not matter. ctrl+shift+h and shift+ctrl+h are the same.
* In Example pressing 'ctrl+shift+h' will *not* trigger 'shift+h' or 'h'. Likewise with 'shift+h' will not trigger 'h'.
* The example 'keydown:shift+d' shows how to override the defaultEventType options. You can do this technique on any addEvent type methods.


Keyboard: stop {#Keyboard:stop}
------------------------------------

Stops propagation of the passed in event to other keyboard instances.

### Syntax

	Keyboard.stop(event)

### Methods

Keyboard Method: activate {#Keyboard:activate}
------------------------------------

Activates the events managed by this instance.

### Syntax

	myKeyboard.activate()

### Returns

* (*object*) This instance of [Keyboard][]

Keyboard Method: deactivate {#Keyboard:deactivate}
------------------------------------

Deactivates the events managed by this instance.

### Syntax

	myKeyboard.deactivate()

### Returns

* (*object*) This instance of [Keyboard][]

Keyboard Method: toggleActive {#Keyboard:toggleActive}
------------------------------------

Toggles the active state of the events managed by the keyboard.

### Syntax

	myKeyboard.toggleActive()

### Returns

* (*object*) This instance of [Keyboard][]

Keyboard Method: relenquish {#Keyboard:relenquish }
------------------------------------

Attempts to give control to the previously active keyboard. Will not do anything if there is no previously active keyboard.

### Syntax

	myKeyboard.relenquish()


Keyboard Method: manage {#Keyboard:manage}
------------------------------------

The keyboard will become the parent of the passed in keyboard.  (Analogous to Element.grab)

### Syntax

	myKeyboard.manage(otherKeyboard)

### Note

When otherKeyboard is active otherKeyboard will receive the event first then as long as otherKeyboard did not call Keyboard.stop(event) then the event will bubble up to myKeyboard.


[Keyboard]: #Keyboard
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
