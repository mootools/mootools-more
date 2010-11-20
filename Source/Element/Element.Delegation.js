/*
---

script: Element.Delegation.js

name: Element.Delegation

description: Extends the Element native object to include the delegate method for more efficient event management.

credits:
  - "Event checking based on the work of Daniel Steigerwald. License: MIT-style license. Copyright: Copyright (c) 2008 Daniel Steigerwald, daniel.steigerwald.cz"

license: MIT-style license

authors:
  - Aaron Newton
  - Daniel Steigerwald

requires: [/MooTools.More, Element.Event.Pseudos]

provides: [Element.Delegation]

...
*/

(function(){

var eventListenerSupport = !!document.addEventListener;

Event.definePseudo('relay', function(split, fn, args, options){
	var event = args[0];
	var check = options.condition;

	for (var target = event.target; target && target != this; target = target.parentNode){
		var finalTarget = document.id(target);
		if (Slick.match(target, split.value) && (!check || check.call(finalTarget, event))){
			if (finalTarget) fn.call(finalTarget, event, finalTarget);
			return;
		}
	}

}, {
	mouseenter: {
		base: 'mouseover',
		condition: Element.Events.mouseenter.condition
	},
	mouseleave: {
		base: 'mouseout',
		condition: Element.Events.mouseleave.condition
	},
	focus: {
		base: 'focus' + (eventListenerSupport ? '' : 'in'),
		args: [true]
	},
	blur: {
		base: eventListenerSupport ? 'blur' : 'focusout',
		args: [true]
	}
});

Object.append(Element.NativeEvents, {
	'focusin': 2, 'focusout': 2
});

})();
