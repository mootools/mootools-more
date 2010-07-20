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

requires: [/MooTools.More, /Event.Pseudos]
provides: [Element.Delegation]

...
*/

Event.definePseudo('relay', function(split, fn, args){
	var event = args[0];
	for (var target = event.target; target && target != this; target = target.parentNode){
		if (Slick.match(target, split.value)){
			var finalTarget = document.id(target);
			if (finalTarget) fn.apply(finalTarget, [event, finalTarget]);
			return;
		}
	}
	
});
