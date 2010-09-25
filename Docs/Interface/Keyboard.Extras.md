Class: Keyboard {#Keyboard}
===========================

Adds some methods for creating shortcuts to the [Keyboard][] Class.

Keyboard Method: addShortcut {#Keyboard:addShortcut}
----------------------------------------

Associates a event handler with a name and description.

### Syntax

	myKeyboard.addShortcut('save', {
		'keys': 'ctrl+s',
		'description': 'Save the current document',
		'handler': doSaveFunc
	});

### Arguments

1. name - (*string*) The name of the shortcut.
2. shortcut - (*object*)
	- keys - (*string (optional)*) Same as the argument that you would pass to addEvent. If not passed it will not automatically add it as an event on the Keyboard.
  - description - (*string*) A brief description of the functionality.
  - handler - (*function*) The event handler function.

### Returns

* (*object*) A new instance of [Keyboard][]


Keyboard Method: addShortcuts {#Keyboard:addShortcuts}
----------------------------------------

Same as addShortcut but can send many as key, value pairs.

### Syntax

	myKeyboard.addShortcut({
		'save', {
	    	'keys': 'ctrl+s',
	    	'description': 'Save the current document',
	    	'handler': doSaveFunc
		},
		'open', {
			'keys': 'ctrl+o',
			'description': 'Open a document',
			'handler': doOpenFunc
		}
	});

### Arguments

* obj - (*object*) An object of key value pairs to be sent to addShortcut.

### Returns

* (*object*) A new instance of [Keyboard][]


Keyboard Method: getShortcuts {#Keyboard:getShortcuts}
----------------------------------------

Gets all shortcuts on the Keyboard instance.

### Syntax

	myKeyboard.getShortcuts();

### Returns

* (*array*) An array of shortcuts on the Keyboard.


Keyboard Method: getShortcut {#Keyboard:getShortcut}
----------------------------------------

Get a shortcut with the name passed in.

### Syntax

	myKeyboard.getShortcut('save');

### Arguments

* name - (*string*) The name of the shortcut to lookup.

### Returns

* (*object* or *null*) The shortcut with the name if found.


Static Method: Keyboard.rebind {#Keyboard:rebind}
------------------------------------

Unbinds the shortcuts passed in and rebinds them to the keys that are passed in.

### Syntax

	myKeyboard.rebind('shift+s', shortcutObjs);

### Arguments

* keys - (*string*) The new shortcut for the shortcuts.
* shortcuts - (*object* or *array[object]*) One or more shortcuts to rebind.


Static Method: Keyboard.getActiveShortcuts {#Keyboard:getActiveShortcuts}
------------------------------------

Gets all active shortcuts using the passed in Keyboard or Keyboard.manager as a starting point.

### Syntax

	myKeyboard.getActiveShortcuts();

### Arguments

* keyboard - (*object*: optional) The Keyboard object used to start looking. Keyboard.manager by default.

### Returns

* (*array*) An array containing all of the active shortcuts.


Static Method: Keyboard.getShortcut {#Keyboard:getShortcut}
------------------------------------

Goes through all active keyboards using the passed in keyboard or Keyboard.manager as a starting point and attempts to find a shortcut with the name passed in.

### Syntax

	Keyboard.getShortcut('save');

### Arguments

* name - (*string*) The name of the shortcut to lookup.
* keyboard - (*object (optional)*) The keyboard to start looking on.

### Returns

* (*object* or *null*) The shortcut with the name if found.


Static Method: Keyboard.getShortcuts {#Keyboard:getShortcuts}
------------------------------------

Same as Keyboard.getShortcut but gets all that match the name.

### Syntax

	myKeyboard.getShortcuts('save');

### Arguments

* name - (*string*) The name of the shortcut to lookup.
* keyboard - (*object (optional)*) The keyboard to start looking on.

### Returns

* (*array*) An array of shortcuts with the name passed in.

[Keyboard]: /more/Interface/Keyboard
