Class: Keyboard {#Keyboard}
=================================

Class takes out the need to have logic in key events to check which buttons are pressed.  The class fires individual events for keys (Individual key events are referred to as subevents in this documentation).  Modifiers are allowed. Provides methodology to disable and enable the listeners assigned to a Keyboard instance.

### Implements

* [Options][], [Events][]

### Syntax

	var myKeyboardEvents = new Keyboard([[options], [element]]);

### Arguments

1. options - (*object*, optional) The options for the class detailed below.
2. element - (*element*, optional) The element that the events will be applied to. Defaults to window.

### Options

* caseSensitive:  - (*boolean*; defaults to *false*) Specifies whether a difference between upper case and lower case letters.  When set to true shift+h and H are the same.
* eventType:      - (*string*; defaults to 'keyup') The event type that should trigger the subevents.
* active:         - (*boolean*; defaults to *true*) When not active the subevents will be surpressed.
* preventDefault: - (*boolean*; defaults to *false*) Tells whether the main event should prevent default.
* events:         - (*object*; defaults to *{}*) object keys are event names values should be the function to fire. Same as calling addEvents({...}) on the instance after creation

### Events

* onActivate - (*function*) callback executed when the keyboard is activated.
* onDeactivate - (*function*) callback executed when the keyboard is deactivated.

### Examples

	var myKeyboardEvents = new Keyboard({
		eventType: 'keyup', 
		events: { 
			'shift+h': fn1, 
			'ctrl+shift+h': fn2, 
			'shift+ctrl+h': fn3,
			'h': fn4
		}
	});

	var myKeyboardEvents1 = new Keyboard({eventType: 'keydown'});
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

[Keyboard]: #Keyboard
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
