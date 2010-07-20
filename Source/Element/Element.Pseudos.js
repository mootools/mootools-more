/*
---

name: Element.Delegation

description: Extends the Element native object to include the delegate method for more efficient event management.

license: MIT-style license

authors:
  - Aaron Newton
  - Daniel Steigerwald

requires: [Core/Element.Event, Event.Pseudos]
provides: [Element.Pseudos]

...
*/

(function(){

	var pseudos = {
		
		once: function(split, fn, args){
			fn.apply(this, args);
			this.removeEvent(split.original, fn);
		}
		
	};
	
	Event.definePseudo = function(key, fn){
		pseudos[key] = fn;
	};
	
	Element.implement(Events.Pseudos(pseudos, Element.prototype.addEvent, Element.prototype.removeEvent)); 

})();
