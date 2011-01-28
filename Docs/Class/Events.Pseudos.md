Events.Pseudos
==============

Defines the `:once` pseudo event for classes that have implemented the [Events][] class as well as the `definePseudos` method for adding your own.

Pseudo Events {#Pseudos}
========================

Like [Element.Event.Pseudos][] for Elements, you can use pseudos for Class Events.
An event pseudo looks the same as a CSS pseudo: `event:pseudo(value)`.
`event` is the eventname you used to use, and `pseudo` is the name
of the pseudo.

Pseudo: once {#Pseudos:once}
----------------------------

The event will only fire once.

### Example:

	var database = new Class({

		Implements: Events,

		connect: function(){
			this.fireEvent('connect');
		}

	});

	var db = new database();
	db.addEvent('connect:once', function(){
		alert('i am connected');
	});

	db.connect(); // will alert 'i am connected'
	db.connect(); // nothing will happen


Pseudo: throttle {#Pseudos:throttle}
------------------------------------

Makes sure the event is not fired more than once in a certain timespan.
This is especially useful for events that might fire a lot, but it isn't really
necessary to execute a heavy function, like sending requests.

The default timespan is *250* milliseconds.

### Example:

	myClass.addEvent('scroll:throttle', function(){
		// Will only fire once every 250 ms
	});

	myClass.fireEvent('scroll'); // is fired
	myClass.fireEvent('scroll'); // throttled
	myClass.fireEvent.delay(300, myClass, 'scroll'); // after 250 ms, so it's fired

	myClass.addEvent('resize:throttle(400)', function(){
		// Will only fire once every 400 ms
	});


Pseudo: pause {#Pseudos:pause}
------------------------------

The event is only fired when the original event is not fired again in the given
time. So when the first event is fired, and a second after 100 ms, the first
event is cancelled and only the second is fired.

The default pausetime is *250* milliseconds.

### Example:

	myClass.addEvent('keydown:pause', function(){
		// Default time is 250 ms
	});
	myClass.fireEvent('keydown'); // The first event is cancelled
	myClass.fireEvent('keydown'); // this one will fired
	myClass.fireEvent.delay(1000, myClass, 'keydown'); // This one is after 250 ms, so the previous is not cancelled

	myClass.addEvent('keydown:pause(100)', function(){
		// The pause time is now 100 ms.
	});

Events {#Events}
================


Function: Events.definePseudo {#Events:Events-definePseudo}
---------------------------------------------------------

This function defines a new pseudo.

### Syntax:
	Events.definePseudo(name, fn);

### Arguments:
1. name - (*string*) The pseudo name, for example `once` will become `click:once`
2. fn - (*function*) The function that will get fired when the event is fired. This function should decide what will happen with the event, for example execute the event and remove the event

#### Signature:

	fn(split, fn, args)

1. split - (*object*) A parsed object of the string passed in addEvent: `event:pseudo(value)`
	- event - (*string*) the part before the `:`
	- value - (*string*) between `(` and `)`
	- pseudo - (*string*) between the `:` and `(`
	- original - (*string*) the original event name, thus `event:pseudo(value)`
2. fn - (*function*) This is the function that has been passed in the `addEvent` method. So it is the 'fn' in `myClass.addEvent('event:pseudo', fn)`
3. args - (*array*) The arguments that are passed into the 'fireEvent' method.

### Example:

This is how the :once pseudo is implemented

	Events.definePseudo('once', function(split, fn, args){
		fn.apply(this, args)
		this.removeEvent(split.original, fn);
	});


[Events]: /core/Class/Class.Extras#Events
[Element.Event.Pseudos]: /more/Element/Element.Event.Pseudos
