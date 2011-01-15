Class: Keyboard {#Keyboard}
===========================

Keyboard takes out the need to have logic in key events to check which buttons are pressed.  The class fires individual events for keys (individual key events are referred to as sub-events in this documentation) and provides methodology to disable and enable the listeners assigned to a Keyboard instance. Modifiers are allowed.

### Extends

* [Events][]

### Implements

* [Options][]

### Simple Usage

Keyboard has both a simple and advanced use cases. The advanced usage is intended for situations where more than one Keyboard instance is required (see next section). But for simple direct usage, you can just create an instance, attach events, and that's all. If you need more than one instance, it gets more complicated.

### Advanced Usage

Keyboard instances are nodes of a tree based hierarchy (similar to the DOM) that allow complex keyboard driven functionality. The root node of the tree is Keyboard.manager, an instance of Keyboard itself.  When a key event is fired the root node keyboard (Keyboard.manager) gets a chance to handle the event.  The event is then propagated from the currently active leaf node back towards the root.

For example. Let's say you have the following application:

	Desktop UI = Keyboard.manager*
	|------------------------------|
	v                              v
	Window 1 w/ hotkeys*           Window 2 w/ hotkeys
	|                              |--------------------------------|
	v                              v                                v
	HTML Editor w/ hotkeys*        Slideshow w/ hotkeys*    Tagging UI w/ hotkeys

(* = active)

When the user hits a key command, Keyboard.manager gets the first option to handle it. If the user hits Command+Tab you might, for instance, switch window focus (this is just an analogy to a desktop UI; obviously in the real world the operating system would handle this key combo before it got to the browser). If the Keyboard.manager does not handle the event and stop it with [Keyboard.stop][], the event is passed to the deepest instance that has focus (the editor). If the user hits Command+B you might bold the text and stop the event from going further (with [Keyboard.stop][]). If the user hits Command+W the event would go to Keyboard.manager, then to the editor, and when neither of them stop the event, the Window UI instance would have the option of handling it. It might, for example, close the window.

Keyboards are enabled and disabled with their [enable][] method. So if the user were to switch focus to Window 2 in the diagram above, that instance would call its *enable* method, stealing focus from Window 1. If the Keyboard for Slideshow is enabled, it will automatically receive events from the Window 2 manager. This nesting can go as deep as is required. No two siblings can be enabled at a time, and if a Keyboard's parent is not enabled, it will not receive events.

In the diagram above, you can see that Slideshow's Keyboard instance is active, but because it's parent (Window 2) is not, it does not receive events. This allows for a nested state. So if the user switches to Window 2, the Slideshow will start receiving events. If the user focuses on the Tagging UI and your code enables the Tagging Keyboard, stealing from SlideShow, the event order will be Desktop UI > Tagging UI > Window 2. Switching back to Window 1 will restore Desktop UI > HTML Editor > Window 1. The point is that focus is always stolen from siblings, and the state of children remains even when the parent looses that focus.

As an additional note, this means you can add keyboard events to Keyboard.manager. This is how you add "top level" events.

Keyboard Method: constructor
----------------------------

### Syntax

	var myKeyboardEvents = new Keyboard([options]);

### Arguments

1. options - (*object*, optional) The options for the class detailed below.

#### Options

* defaultEventType: - (*string*; defaults to 'keydown') The event type that should trigger the subevents (this can be changed per key rule, so this is only the default).
* active: - (*boolean*; defaults to *false*) When not active the events will be suppressed.
* events: - (*object*; defaults to *{}*) object keys are event names, values should be the function to fire. Same as calling addEvents({...}) on the instance after creation

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

	var myKeyboardEvents1 = new Keyboard({
		defaultEventType: 'keydown'
	});
	myKeyBoardEvents1.addEvents({
		'shift+h': fn1,
		'ctrl+shift+h': fn2,
		'shift+ctrl+h': fn3,
		'h': fn4
	});

### Notes

* In Example both myKeyboardEvents and myKeyboardEvents1 achieve the same ends.
* The order of key modifiers does not matter. ctrl+shift+h and shift+ctrl+h are the same.
* In Example pressing 'ctrl+shift+h' will *not* trigger 'shift+h' or 'h'. Likewise with 'shift+h' will not trigger 'h'.
* The example 'keydown:shift+d' shows how to override the defaultEventType options. You can do this technique on any addEvent type methods.

Keyboard Method: activate {#Keyboard:activate}
------------------------------------

Activates the events managed by this instance. Note that this steals focus from any sibling keyboard, effectively deactivating it and its children.

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

Keyboard Method: relinquish {#Keyboard:relinquish}
------------------------------------

Attempts to give control to the previously active keyboard. Will not do anything if there is no previously active keyboard.

### Syntax

	myKeyboard.relinquish()

### Returns

	* (*object*) This instance of [Keyboard][]


Keyboard Method: isActive {#Keyboard:isActive}
------------------------------------

Returns *true* if the instance is active.

### Syntax

	myKeyboard.isActive()

### Returns

	* (*boolean*) *true* if the instance is active.


Keyboard Method: manage {#Keyboard:manage}
------------------------------------

The keyboard will become the parent of the passed in keyboard. By default the manager is the Keybard.manager instance.

### Syntax

	myKeyboard.manage(childKeyboard)


### Arguments

	1. childKeyboard - (*object*) an instance of Keyboard that this instance should manage.

### Returns

	* (*object*) This instance of [Keyboard][]

### Note

When myKeyboard is active childKeyboard will receive the event first then as long as childKeyboard did not call Keyboard.stop(event) then the event will bubble up to myKeyboard. If myKeyboard manages more than one Keyboard instance, which ever one is active will receive the events as they bubble.


Keyboard Method: drop {#Keyboard:drop}
------------------------------------

Drops an instance of a keyboard from being managed.

### Syntax

	myKeyboard.drop(childKeyboard)

### Arguments

1. childKeyboard - (*object*) an instance of Keyboard managed by this instance.

### Returns

	* (*object*) This instance of [Keyboard][]

### Note

The result

Static Method: Keyboard.stop {#Keyboard:stop}
------------------------------------

Stops propagation of the passed in event to other keyboard instances. Note this is not a method on an instance of Keyboard; it is a static method on the Keyboard namespace.

### Syntax

	Keyboard.stop(event)

### Returns

* nothing.

[Keyboard.stop]: #Keyboard:stop
[enable]: #Keyboard:enable
[Keyboard]: #Keyboard
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
