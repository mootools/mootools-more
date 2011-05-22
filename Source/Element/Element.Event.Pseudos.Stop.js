/*
---

name: Element.Event.Pseudos.Stop

description: Adds the functionality to preventDefault and stopPropagation on events

license: MIT-style license

authors:
  - Djamil Legato

requires: [Element.Event.Pseudos]

provides: [Element.Event.Pseudos.Stop]

...
*/

(function(){

Event.definePseudo('stop', function(split, fn, args){
	var event = args[0];

	event.stop();

 	fn.apply(this, args);
});

})();