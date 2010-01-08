Class: Keyboard {#Keyboard}
=============================
 

### Added Methods

Keyboard Method: addDescriptor {#Keyboard:addDescriptor}
----------------------------------------

Associates a event handler with a name and description. 

### Syntax

	myKeyboard.addDescriptor('save', {
		'keys': 'ctrl+s',
		'description': 'Save the current document',
		'handler': doSaveFunc
	});

### Arguments

1. name - (*string*) The name of the descriptor.
2. descriptor - (*object*)
	- keys - (*string (optional)*) Same as the argument that you would pass to addEvent. If not passed it will not automatically add it as an event on the Keyboard.
  - description - (*string*) A brief description of the functionality.
  - handler - (*function*) The event handler function.

### Returns

* (*object*) A new instance of [Keyboard][]


Keyboard Method: addDescriptors {#Keyboard:addDescriptors}
----------------------------------------

Same as addDescriptor but can send many as key, value pairs.

### Syntax

	myKeyboard.addDescriptor({
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

* obj - (*object*) An object of key value pairs to be sent to addDescriptor.

### Returns

* (*object*) A new instance of [Keyboard][]


Keyboard Method: getDescriptors {#Keyboard:getDescriptors}
----------------------------------------

Gets all descriptors on the Keyboard instance.

### Syntax

	myKeyboard.getDescriptors();

### Returns

* (*array*) An array of descriptors on the Keyboard.


Keyboard Method: getDescriptor {#Keyboard:getDescriptor}
----------------------------------------

Get a descriptor with the name passed in.

### Syntax

	myKeyboard.getDescriptor('save');

### Arguments

* name - (*string*) The name of the descriptor to lookup.

### Returns

* (*object | null *) The descriptor with the name if found.


Static Method: Keyboard.rebind {#Keyboard:rebind}
------------------------------------

Unbinds the descriptors passed in and rebinds them to the keys that are passed in.

### Syntax

  myKeyboard.rebind('shift+s', descriptorObjs);

### Arguments

* keys - (*string*) The new shortcut for the descriptors.
* descriptors - (*object | array[object]*) One or more descriptors to rebind.


Static Method: Keyboard.getActiveShortcuts {#Keyboard:getActiveShortcuts}
------------------------------------

Gets all active shortcuts using the passed in Keyboard or Keyboard.manager as a starting point.

### Syntax

  myKeyboard.getActiveShortcuts();

### Arguments

* keyboard - (*object (optional)*) The Keyboard object used to start looking. Keyboard.manager by default.

### Returns

* (*array*) An array containing all of the active shortcuts.


Static Method: Keyboard.getDescriptor {#Keyboard:getDescriptor}
------------------------------------

Goes through all active keyboards using the passed in keyboard or Keyboard.manager as a starting point and attempts to find a descriptor with the name passed in.

### Syntax

  Keyboard.getDescriptor('save');

### Arguments

* name - (*string*) The name of the descriptor to lookup.
* keyboard - (*object (optional)*) The keyboard to start looking on.

### Returns

* (*object | null *) The descriptor with the name if found.


Static Method: Keyboard.getDescriptors {#Keyboard:getDescriptors}
------------------------------------

Same as Keyboard.getDescriptor but gets all that match the name.

### Syntax

  myKeyboard.getDescriptors('save');

### Arguments

* name - (*string*) The name of the descriptor to lookup.
* keyboard - (*object (optional)*) The keyboard to start looking on.

### Returns

* (*array*) An array of descriptors with the name passed in.

