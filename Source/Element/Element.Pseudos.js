/*
---

name: Element.Pseudos

description: Adds the functionality to add pseudo events for Elements

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Core/Element.Event, Events.Pseudos]

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
	
	Event.definePseudo = function(key, fn, proxy){
		pseudos[key] = [fn, proxy];
	};
	
	Element.implement(Events.Pseudos(pseudos, Element.prototype.addEvent, Element.prototype.removeEvent));

})();
