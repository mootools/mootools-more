Class: Keyboard {#Keyboard}
=================================

Class takes out the need to have logic in key* events to check which buttons are pressed.  The class fires individual events for keys (Individual key events are referred to as subevents in this documentation).  Modifiers are allowed.


### Syntax:

	var myKeyboardEvents = new Keyboard([[options] [element]]);

### Arguments:

1. element - (*element*, optional) The element that the events will be applied to. Defaults to window.
2. options - (*object*, optional) The options for the class detailed below.

### Options:

* caseSensitive:  - (*boolean* defaults to false) Specifies whether a difference between upper case and lower case letters.  When set to true shift+h and H are the same.
* eventType:      - (*string* defaults to 'keydown') The event type that should trigger the subevents.
* active:         - (*boolean* defaults to true) When not active the subevents will be surpressed.
* preventDefault: - (*boolean* defaults to false) Tells whether the main event should prevent default.
* events:         - (*object* defaults to {}) object keys are event names values should be the function to fire. Same as calling addEvents({...}) on the instance after creation

### Examples:

	var myKeyboardEvents = new Keyboard({eventType: 'keyup', events: { 'shift+h': fn1, 'ctrl+shift+h: fn2, 'shift+ctrl+h': fn3 'h': fn4});

	var myKeyboardEvents1 = new Keyboard({eventType: 'keyup'});
	myKeyBoardEvents1.addEvents({ 'shift+h': fn1, 'ctrl+shift+h: fn2, 'shift+ctrl+h': fn3 'h': fn4});

### Notes:

* In Example both myKeyboardEvents and myKeyboardEvents1 achieve the same ends.
* The order of key modifiers does not matter. ctrl+shift+h and shift+ctrl+h are the same.
* In Example pressing 'ctrl+shift+h' will *not* trigger 'shift+h' or 'h'. Likewise with 'shift+h' will not trigger 'h'.

 
