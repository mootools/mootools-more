Class: Events.Extras {#Events}
=====================

Extends the [Events][] class.

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

1. split - (*object*)
	- event - (*string*) the part before the `:`
	- selector - (*string*) between `(` and `)` if the event name looks like `event:pseudo(selector)`
	- pseudo - (*string*) between the `:` and `(` 
	- original - (*string*) the original event name, thus `event:pseudo(selector)`
2. fn - (*function*) This is the function that has been passed in the `addEvent` method. So it is the 'fn' in `myClass.addEvent('event:pseudo', fn)`
3. args - (*array*) The arguments that are passed into the 'fireEvent' method.

### Example

This is how the :once pseudo is implemented

	Events.definePseudo('once', function(split, fn, args){
		fn.apply(this, args)
		this.removeEvent(split.original, fn);
	});

Event Pseudos {#Pseudos}
========================

Like [Element.Delegation][] you can use pseudos for Class Events.
An event pseudo looks the same as a CSS pseudo: `event:pseudoName`
event is the event name you used to use, and pseudoName is the name
of the pseudo.

Pseudo: once {#Pseudos:once}
----------------------------

The event will only fire once.

### Example

	var database = new Class({
		
		implements: Events,
		
		connect: function(){
			this.fireEvent('connect');
		}
		
	});
	
	var db = new database();
	db.addEvent('connect:once', function(){
		alert('i am connected');
	});
	
	db.connect(); // will alert 'i am connected'
	db.connect(); // the event won't be fired
	

[Events]: /core/Class/Class.Extras#Events
[Element.Delegation]: /more/Element/Element.Delegation