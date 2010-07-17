/*
---

script: Events.Extras.js

name: Events.Extras

description: Adds useful stuff to the Events class

license: MIT-style license

authors:
  - Arian Stolwijk

requires: 
  - Core/Class.Extras
  - Core/Element.Event
  - More/MooTools.More

provides: Events.Extras

...
*/

(function(addEvent, removeEvent){

var splitType = function(type){
	var parsed = Slick.parse(type).expressions[0][0],
		pseudos = parsed.pseudos;
	
	return (pseudos && typeof Events.Pseudos[pseudos[0].key] == 'function') ? {
		event: parsed.tag,
		selector: pseudos[0].value,
		pseudo: pseudos[0].key,
		original: type
	} : null;
};
	


Events.implement({
	
	$eventMonitors: {},
	
	addEvent: function(type, fn, internal){
		var split = splitType(type);
		if (!split) return addEvent.call(this, type, fn, internal);
		
		var monitor = this.$eventMonitors[type];
		if (!monitor){
			monitor = function(){
				Events.Pseudos[split.pseudo].apply(this, [split, fn, arguments]);
			};
			this.$eventMonitors[type] = monitor;
			return addEvent.call(this, split.event, monitor, internal);
		}
	},
	
	removeEvent: function(type, fn){
		var split = splitType(type);
		if (!split) return removeEvent.call(this, type, fn);
		
		var monitor = this.$eventMonitors[type];
		if (monitor) return removeEvent.call(this, split.event, monitor);
	}
	
});

})(Events.prototype.addEvent, Events.prototype.removeEvent);

Events.Pseudos = {
	
	flash: function(split, fn, args){
		fn.apply(this, args)
		this.removeEvent(split.original, fn);
	}
	
};
