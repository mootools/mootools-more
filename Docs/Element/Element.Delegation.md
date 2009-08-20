Native: Element {#Element}
==========================

Extends the [Element][] native object to include delegations in the addEvent and addEvents methods.

### Note

This library recreates in portion the functionality coming in MooTools 2.0 that supports event delegation and mirrors 2.0's syntax. Also note that this library does not support all custom events nor does it support *focus* and *blur* events.

### Credits

Event checking based on the work of [Daniel Steigerwald](http://daniel.steigerwald.cz) found here [originally](http://gist.github.com/9989).
License: MIT-style license.
Copyright: Copyright (c) 2008 Daniel Steigerwald, [daniel.steigerwald.cz](http://daniel.steigerwald.cz)

Element method: addEvent {#Element:addEvent}
--------------------------------------------

Delegates the methods of an element's children to the parent element for greater efficiency when a filter is provided. Otherwise works normally as [addEvent][] always does.

### Syntax

	myElement.addEvent(typeSelector, fn);

### Arguments

2. typeSelector - (*string*) An event name (click, mouseover, mouseenter, etc) that should be monitored paired with a selector (see example) to limit functionality to child elements.
3. fn - (*function*) The callback to execute when the event occurs (passed the event just like any other [addEvent][] usage).


### Example

	$(element).addEvent('click:relay(a)', function(){
		alert('you clicked a link!');
	});

### Returns

* *element* - This element.

### Notes

* By delegating events to parent objects you can dramatically increase the efficiency of your pages. Consider the example above. You could attach events to every link on a page - which may be hundreds of DOM elements - or you can delegate the event to the document body, evaluating your code only when the user actually clicks a link (instead of on page load/domready).
* Include [Selectors.js][] to use more complex selectors.
* You can use any selector in combination with any event
* You cannot delegate the *blur* or *focus* events for elements. This is a limitation in how MooTools manages events internally (and prevents memory leaks) and these two events cannot be delegated until this code is refactored. Look for it in MooTools 2.0.

Element method: addEvents {#Element:addEvents}
------------------------------------------------

Delegates the events to the parent just as with addEvent above.

### Syntax

	myElement.addEvents(events);

### Arguments

1. events - (*events*) A key/value set of event names and methods to attach as event listeners

### Example


	myElement.addEvents({
		//monitor an element for mouseover
		mouseover: fn,
		//but only monitor child links for click
		'click:relay(a)':fn2
	});

Element method: removeEvent {#Element:removeEvent}
------------------------------------------------

Removes a method from an element as [removeEvent][] always does. Provided here just for clarity.

### Syntax

	myElement.removeEvent(type, fn);

### Arguments

1. type - (*string*) An event name (*click*, *click:relay(selector)*, etc) that should was originally added.
3. fn - (*function*; optional) A pointer to the original call back passed when the event was originally added.

### Example

	var monitor = function(){ alert('you clicked a link!')};
	$(element).addEvent('click:relay(a)', monitor);
	//link clicks are delegated to element
	//...now we remove the delegation:
	$(element).removeEvent('click:relay(a)', monitor);

### Returns

* *element* - This element.

### Notes

This syntax is *exactly* the same as [removeEvent][] always works. If your method was used to delegate that event previously, the delegation will be removed.

Element method: removeEvents {#Element:removeEvents}
------------------------------------------------

Removes a series of methods from delegation if the functions were used for delegation or else works as [removeEvents][] always does. Provided here for clarity.

### Syntax

	myElement.removeEvents(events, fn);

### Arguments

1. events - (*mixed*) If a string (like 'click' or 'click:relay(a)'), all click events are removed as [removeEvents][] normally works. Otherwise each method defined in the key/value set of event types/functions is removed. If the method was used for delegation, the delegation is removed.
3. fn - (*function*) A pointer to the original call back passed when the event was originally added.

### Example

	var monitor = function(){ alert('you clicked or moused over a link!')};
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

### Returns

* *element* - This element.

### Notes

This syntax is *exactly* the same as [removeEvents][] always works. If your methods were used to delegate those events previously, the delegations will be removed.

Element method: set {#Element:set}
----------------------------------

Adds delegation when you pass in an object with selector/events pairs, otherwise works normally as *element.set({events...})* always does.

### Examples

	//same as MooTools events with set always work:
	myElement.set({
		events: {
			click: function1,
			mouseover: function2
		}
	});
	//delegation:
	myElement.set({
		events: {
			'click:relay(a)': function1,
			'mouseover:relay(a)': function2
		}
	});
	//mixed
	myElement.set({
		events: {
			'click:relay(a)': function1,
			mouseover: function2
		}
	});



[Element]: http://mootools.net/docs/Element/Element
[addEvent]: http://mootools.net/docs/Element/Element.Event#Element:addEvent
[addEvents]: http://mootools.net/docs/Element/Element.Event#Element:addEvents
[removeEvent]: http://mootools.net/docs/Element/Element.Event#Element:removeEvent
[removeEvents]: http://mootools.net/docs/Element/Element.Event#Element:removeEvents
[Selectors.js]: http://mootools.net/docs/Utilities/Selectors