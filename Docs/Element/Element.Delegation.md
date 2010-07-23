Type: Element {#Element}
==========================

Extends the [Element][] type to include delegations in the addEvent and addEvents methods.

### Important

This library recreates in portion the functionality coming in MooTools 2.0 that supports event delegation and mirrors 2.0's syntax. Also note that this library does not support all custom events nor does it support *focus* and *blur* events. Also note that *mouseenter* and *mouseleave* aren't supported as delegation obviates the need for these custom events. Use *mouseover* and *mouseout* and specify your selector to get the same effect.

### Credits

Event checking based on the work of [Daniel Steigerwald](http://daniel.steigerwald.cz).

Element method: addEvent {#Element:addEvent}
--------------------------------------------

Delegates the methods of an element's children to the parent element for greater efficiency when a filter is provided. Otherwise works normally as [addEvent][] always does.

### Syntax

	myElement.addEvent(typeSelector, fn);

### Arguments

2. typeSelector - (*string*) An event name (click, mouseover, etc) that should be monitored paired with a selector (see example) to limit functionality to child elements.
3. fn - (*function*) The callback to execute when the event occurs (passed the event just like any other [addEvent][] usage and a second argument, the element that matches your selector that was clicked).


### Example

	$(element).addEvent('click:relay(a)', function(event, clicked){
		event.preventDefault(); //don't follow the link
		alert('you clicked a link!');
		//you can reference the element clicked with the second
		//argument passed to your callback
		clicked.setStyle('color', '#777'); 
	});

### Returns

* *element* - This element.

### Notes

* By delegating events to parent objects you can dramatically increase the efficiency of your pages. Consider the example above. You could attach events to every link on a page - which may be hundreds of DOM elements - or you can delegate the event to the document body, evaluating your code only when the user actually clicks a link (instead of on page load/domready).
* You can use any selector in combination with any event
* You cannot delegate the *blur* or *focus* events for elements. This is a limitation in how MooTools manages events internally (and prevents memory leaks) and these two events cannot be delegated until this code is refactored. Look for it in MooTools 2.0.
* Be wary of the cost of delegation; for example, mouseover/mouseout delegation on an entire document can cause your page to run the selector constantly as the user moves his or her mouse around the page. Delegation is not always the best solution.
* Delegation is especially useful if you are using AJAX to load content into your pages dynamically, as the contents of an element can change with new elements added or others removed and your delegated events need not change.
* In general it is always better to delegate to the closest parent to your elements as possible; delegate to an element in the page rather than the document body for example.

Element methods: addEvents {#Element:addEvents}
-----------------------------------------------------------------------------------------------------------------------

Delegates the events to the parent just as with addEvent above. Works as [addEvents][] does.

### Example

	myElement.addEvents({
		//monitor an element for mouseover
		mouseover: fn,
		//but only monitor child links for click
		'click:relay(a)': fn2
	});


Element method: removeEvent {#Element:removeEvent}
------------------------------------------------

Removes a method from an element as [removeEvent][] always does.

### Example

	var monitor = function(event, element){ alert('you clicked a link!')};
	$(element).addEvent('click:relay(a)', monitor);
	//link clicks are delegated to element
	//...now we remove the delegation:
	$(element).removeEvent('click:relay(a)', monitor);


Element method: removeEvents {#Element:removeEvents}
------------------------------------------------

Removes a series of methods from delegation if the functions were used for delegation or else works as [removeEvents][] always does. 

### Example

	var monitor = function(){
		alert('you clicked or moused over a link!');
	};
	$(element).addEvents({
		'mouseover:relay(a)': monitor,
		'click:relay(a)': monitor
	});
	//link clicks are delegated to element
	//...now we remove the delegation:
	$(element).removeEvents({
		'mouseover:relay(a)': monitor,
		'click:relay(a)': monitor
	});
	//or we could remove all click:relay(a) events
	$(element).removeEvents('click:relay(a)');


Pseudos {#Pseudos}
==================

`:relay` is called a pseudo. Because :relay needed to be implemented, there was the opportunity to add other useful pseudos as well.

Pseudo: once {#Pseudos:once}
----------------------------

The event will only fire once. The once pseudo will remove itself after the first excecution.

### Example

	var myElement = document.id('myElement');
	myElement.addEvent('click:once', function(){
		alert('you clicked me');
	});
	
	// If the user clicks the element twice, it will only once alert 'you clicked me'


Pseudo: relay {#Pseudos:relay}
------------------------------

:relay has been extensively discussed above already. This pseudo function will
look if the target element (the clicked element in most cases) satisfies the 
given selector.

### Example

	var myElement = document.id('myElement');
	myElement.addEvent('click:relay(a)', function(){
		alert("clicked a child element of myElement that's an 'a' element");
	});


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

	fn(element, split, fn, event){

1. element - (*element*) The element the event is added to
2. split - (*object*) a parsed object of the `event:pseudo(selector)` string
	- event - (*string*) the part before the `:`
	- selector - (*string*) between `(` and `)` if the event name looks like `event:pseudo(selector)`
	- pseudo - (*string*) between the `:` and `(` 
	- original - (*string*) the original event name, thus `event:pseudo(selector)`
3. fn - (*function*) This is the function that has been passed in the `addEvent` method. So it is the 'fn' in `myEvent.addEvent('event:pseudo', fn)`
3. event - (*array*) The [Event][] object

### Example

This is how the :once pseudo is implemented

	Event.definePseudo('once', function(element, split, fn, event){
		element.fireEvent(split.original, [event])
			.removeEvent(split.original, fn);
	});

[Element]: /core/Element/Element
[addEvent]: /core/Element/Element.Event#Element:addEvent
[addEvents]: /core/Element/Element.Event#Element:addEvents
[removeEvent]: /core/Element/Element.Event#Element:removeEvent
[removeEvents]: /core/Element/Element.Event#Element:removeEvents
[Event]: /core/Types/Event