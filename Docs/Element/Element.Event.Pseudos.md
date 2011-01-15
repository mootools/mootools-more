Element.Event.Pseudos {#Pseudos}
================================

Defines a useful pseudo event: `:once` as well as the `definePseudo` method to create your own. See also the `:relay` pseudo in [Element.Delegation][].

### Demo

* [Element.Event.Pseudos](http://mootools.net/demos/?demo=Element.Event.Pseudos)

Pseudo: once {#Pseudos:once}
----------------------------

The event will only fire once. The once pseudo will remove itself after the first excecution.

### Example

	myElement.addEvent('click:once', function(){
		alert('you clicked me');
	});

	// If the user clicks the element twice, it will only once alert 'you clicked me'


Event {#Event}
=============

Function: Event.definePseudo {#Event:Event-definePseudo}
----------------------------------------------------------

It's possible to define your own pseudos with Event.definePseudo

### Syntax
	Event.definePseudo(name, fn);

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
3. args - (*array*) An array with arguments. The [Event][] object is in most cases the first element.

The `this` variable refers to the Element where the event is added to.

### Example

This is how the :once pseudo is implemented

	Event.definePseudo('once', function(split, fn, args){
		fn.apply(this, args);
		this.removeEvent(split.original, fn);
	});


[Event]: /core/Types/Event
[Element.Delegation]: /more/Element/Element.Delegation


