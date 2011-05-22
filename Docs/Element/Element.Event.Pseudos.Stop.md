Element.Event.Pseudo :stop {#Pseudos}
=====================================

Defines the `:stop` Element Event Pseudo. It stops the Event from propagating and also executes preventDefault.

### See Also

- [Element.Event.Pseudos][]
- [Element.Event.Pseudos.Keys][]

Pseudo: stop {#Pseudos:stop}
----------------------------

The event will fires normally and be already be prevented from propagating.

### Examples

	myTextarea.addEvent('keydown:stop', function(){
		console.log('Nothing I press appears in the textarea');
	});
	
	myLink.addEvent('click:stop', function(){
		alert('You clicked a link which is not redirecting.');
	});




[Element.Event.Pseudos]: /more/Element/Element.Event.Pseudos
[Element.Event.Pseudos.Keys]: /more/Element/Element.Event.Pseudos.Keys
