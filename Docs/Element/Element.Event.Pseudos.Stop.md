Element.Event.Pseudo.Stop {#Pseudos}
=====================================

Defines `:stopPropagation`, `:preventDefault` and `:stop` Element Event Pseudo.

### See Also

- [Element.Event.Pseudos][]
- [Element.Event.Pseudos.Keys][]

Pseudo: stopPropagation {#Pseudos:stopPropagation}
----------------------------

The event will fires normally and be already be prevented from propagating.

### Example

#### HTML:

	<div id="myElement">
		<div id="myChild"></div>
	</div>

#### JavaScript
	
	document.id('myElement').addEvent('click:stopPropagation', function(event){
		// we don't need to event.stopPropagation() anymore
		alert('myElement has been clicked');
	});
	
	document.id('myChild').addEvent('click:stopPropagation', function(event){
		alert('myChild has been clicked but myElement won't fire up');
	});

### See Also:

- [Event:stopPropagation][]


Pseudo: preventDefault {#Pseudos:preventDefault}
----------------------------

The event will fires normally and be already be prevented from running the default action of the event.

### Example

#### HTML:

	<form>
		<input id="myCheckbox" type="checkbox" />
	</form>

##### JavaScript

	document.id('myCheckbox').addEvent('click:preventDefault', function(event){
		// we don't need to event.preventDefault() anymore
		alert('The checkbox has been clicked but wont get checked');
	});

### See Also:

- [Event:preventDefault][]


Pseudo: stop {#Pseudos:stop}
----------------------------

The event will fires normally without the need of preventDefault and stopPropagation.

### Examples

	myTextarea.addEvent('keydown:stop', function(){
		console.log('Nothing I press appears in the textarea');
	});

	myLink.addEvent('click:stop', function(){
		alert('You clicked a link which is not redirecting.');
	});

### See Also:

- [Event:stop][]



[Element.Event.Pseudos]: /more/Element/Element.Event.Pseudos
[Element.Event.Pseudos.Keys]: /more/Element/Element.Event.Pseudos.Keys
[Event:stopPropagation]: /core/Types/Event#Event:preventDefault
[Event:preventDefault]: /core/Types/Event#Event:preventDefault
[Event:stop]: /core/Types/Event#Event:stop