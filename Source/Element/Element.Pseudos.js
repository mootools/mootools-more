/*
---

name: Element.Pseudos

description: Adds the functionallity to add pseudo events for Elements

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Core/Element.Event, Events.Pseudos]
provides: [Element.Pseudos]

...
*/

(function(){

	var keysStoreKey = '$moo:keys-pressed',
		keysKeyupStoreKey = '$moo:keys-keyup';

	var pseudos = {
		
		once: function(split, fn, args){
			fn.apply(this, args);
			this.removeEvent(split.original, fn);
		},
		
		
		keys: function(split, fn, args){
			if (split.event != 'keydown') return;
			
			var event = args[0],
				keys = split.value.split('+'),
				pressed = this.retrieve(keysStoreKey, []);
			
			pressed.include(event.key);
			
			if (keys.every(function(key){
				return pressed.contains(key);
			})) fn.apply(this, args);
			
			this.store(keysStoreKey, pressed);
			
			
			if (!this.retrieve(keysKeyupStoreKey)){
				var keyup = function(){
					this.store(keysStoreKey, []);
				};
				this.store(keysKeyupStoreKey, keyup).addEvent('keyup', keyup);
			}
			
		}
		
	};
	
	Event.definePseudo = function(key, fn){
		pseudos[key] = fn;
	};
	
	Element.implement(Events.Pseudos(pseudos, Element.prototype.addEvent, Element.prototype.removeEvent)); 

})();
