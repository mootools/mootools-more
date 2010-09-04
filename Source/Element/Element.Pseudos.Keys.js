/*
---

name: Element.Pseudos

description: Adds functionallity fire events if certain keycombinations are pressed

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Element.Pseudos]

provides: [Element.Pseudos.Keys]

...
*/

Event.definePseudo('keys', function(split, fn, args){

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
		
});
