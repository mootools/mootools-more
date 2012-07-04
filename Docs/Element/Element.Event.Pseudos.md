Element.Event.Pseudos {#Pseudos}
================================

Defines pseudo events like `:once` or `:throttle' as well as the `definePseudo` method to create your own.

### Demo

* [Element.Event.Pseudos](http://mootools.net/demos/?demo=Element.Event.Pseudos)

Pseudo: once {#Pseudos:once}
----------------------------

The event will only fire once. The once pseudo will remove itself after the first excecution.

### Example:

	myElement.addEvent('click:once', function(){
		alert('you clicked me');
	});

	// If the user clicks the element twice, it will only once alert 'you clicked me'

### Note:

This is exactly the same as the [Events.Pseudos :once][] pseudo event.


Pseudo: throttle {#Pseudos:throttle}
------------------------------------

Makes sure the event is not fired more than once in a certain timespan.
This is especially useful for events that might fire a lot, like the scroll, resize
or keydown events. To get better performance instead of executing a heavy function,
like Request a lot of times, the event only fired once in, for example, 250 milliseconds.

The default timespan is *250* milliseconds.

### Example:

	$('myElement').addEvent('scroll:throttle', function(){
		// Will only fire once every 250 ms
	});

	window.addEvent('resize:throttle(400)', function(){
		// Will only fire once every 400 ms
	});

### Note:

This is exactly the same as the [Events.Pseudos :throttle][] pseudo event.


Pseudo: pause {#Pseudos:pause}
------------------------------

The event is only fired when the original event is not fired again in the given
time. So when the first event is fired, and a second after 100 ms, the first
event is cancelled and only the second is fired. This is useful for example with
field autocompletion which uses Request.

The default pausetime is *250* milliseconds.

### Example:

	$('myElement').addEvent('keydown:pause', function(){
		// Default time is 250 ms
	});

	$('myElement').addEvent('keydown:pause(100)', function(){
		// The pause time is now 100 ms.
	});


### Note:

This is exactly the same as the [Events.Pseudos :pause][] pseudo event.


DOMEvent {#DOMEvent}
====================

Function: DOMEvent.definePseudo {#DOMEvent:DOMEvent-definePseudo}
-----------------------------------------------------------------

It's possible to define your own pseudos with DOMEvent.definePseudo

### Syntax
	DOMEvent.definePseudo(name, fn);

### Arguments:
1. name - (*string*) The pseudo name, for example `once` will become `click:once`
2. fn - (*function*) The function that will get fired when the event is fired. This function should decide what will happen with the event, for example execute the event and remove the event

#### Signature:

	fn(split, fn, args){

1. split - (*object*) a parsed object of the `event:pseudo(value)` string
	- event - (*string*) the part before the `:`
	- value - (*string*) between `(` and `)`
	- pseudo - (*string*) between the `:` and `(`
	- original - (*string*) the original event name, thus `event:pseudo(value)`
2. fn - (*function*) This is the function that has been passed in the `addEvent` method. So it is the 'fn' in `myEvent.addEvent('event:pseudo', fn)`
3. args - (*array*) An array with arguments. The [DOMEvent][] object is in most cases the first element.

The `this` variable refers to the Element where the event is added to.

### Example

This is how the :once pseudo is implemented

	DOMEvent.definePseudo('once', function(split, fn, args){
		fn.apply(this, args);
		this.removeEvent(split.original, fn);
	});


[DOMEvent]: /core/Types/DOMEvent
[Element.Delegation]: /core/Element/Element.Delegation
[Events.Pseudos :once]: /more/Class/Events.Pseudos#Pseudos:once
[Events.Pseudos :throttle]: /more/Class/Events.Pseudos#Pseudos:throttle
[Events.Pseudos :pause]: /more/Class/Events.Pseudos#Pseudos:pause


