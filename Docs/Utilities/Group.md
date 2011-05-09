Class: Group {#Group}
=====================

This class is for grouping Classes or Events. The Event added to the Group will fire when all of the events of the items of the group are fired.

Group Method: constructor
-------------------------

### Syntax

	var myGroup = new Group(class[, arrays[, class2[, ... ]]]);

### Arguments

Any number of Class instances, or arrays containing class instances.

### Returns

* (*object*) A new Group instance.

### Examples

	var xhr1 = new Request({url: 'data.js', evalScripts: true});
	var xhr2 = new Request({url: 'abstraction.js', evalScripts: true});
	var xhr3 = new Request({url: 'template.js', evalScripts: true});

	var group = new Group(xhr1, xhr2, xhr3);
	group.addEvent('complete', function(){
		alert('All Scripts loaded');
	});

	xhr1.send();
	xhr2.send();
	xhr3.send();



Group Method: addEvent {#Group:addEvent}
----------------------------------------

Adds an Event to the stack of Events of the Class instances.

### Syntax

	myGroup.addEvent(type, fn);

### Arguments

1. type - (*string*) The event name (e.g. 'complete') to add.
2. fn   - (*function*) The callback function to execute when all instances fired this event.

### Returns

* (*object*) This Group instance.

### Examples

	var myElements = $('myForm').getElements('input, textarea, select');
	myElements.addEvent('click', function(){
		alert('an individual click');
	});

	var myGroup = new Group(myElements);
	myGroup.addEvent('click', function(){
		alert('all form elements clicked');
	});



### See Also

* [Element.addEvent][]


[Element.addEvent]: /core/Element/Element.Event#Element:addEvent
