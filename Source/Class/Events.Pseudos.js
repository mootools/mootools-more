/*
---

name: Events.Pseudos

description: Adds the functionallity to add pseudo events

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Core/Class.Extras, Core/Slick.Parser, More/MooTools.More]
provides: [Events.Pseudos]

...
*/

Events.Pseudos = function(pseudosObj, addEvent, removeEvent){

	var getStorage = function(obj){
		
		var storeKey = 'monitorEvents:';
		obj.$monitorEvents = obj.$monitorEvents || {};
		
		return {
			store: obj.store ? function(key, value){
				obj.store(storeKey + key, value);
			} : function(key, value){
				obj.$monitorEvents[key] = value;
			},
			retrieve: obj.retrieve ? function(key, dflt){
				return obj.retrieve(storeKey + key, dflt);
			} : function(key, dflt){
				return obj.$monitorEvents[key] || dflt;
			}
		};
	};

	
	splitType = function(type){
		var parsed = Slick.parse(type).expressions[0][0],
			pseudos = parsed.pseudos;
		
		return (pseudos && typeof pseudosObj[pseudos[0].key] == 'function') ? {
			event: parsed.tag,
			selector: pseudos[0].value,
			pseudo: pseudos[0].key,
			original: type
		} : null;
	};

	
	return {
		
		addEvent: function(type, fn, internal){
			var split = type.indexOf(':') != -1 ? splitType(type) : false;
			if (!split || !fn) return addEvent.call(this, type, fn, internal);
			
			var storage = getStorage(this);
			var events = storage.retrieve(type, []);
					
			var self = this;
			var monitor = function(){
				pseudosObj[split.pseudo].call(self, split, fn, arguments);
			};
			
			events.include({event: fn, monitor: monitor});
			storage.store(type, events);
			
			return addEvent.call(this, split.event, monitor, internal);
		},
		
		removeEvent: function(type, fn){
			var split = type.indexOf(':') != -1 ? splitType(type) : false;
			if (!split) return removeEvent.call(this, type, fn);

			var storage = getStorage(this);
			var events = storage.retrieve(type);

			if (!events) return this;
			
			events.each(function(monitor, i){
				if (!fn || monitor.event == fn) removeEvent.call(this, split.event, monitor.monitor);
				delete events[i];
			}, this);				

			storage.store(type, events);
			return this;
		}
		
	};
	
};

(function(){

	var pseudos = {
		
		once: function(split, fn, args){
			fn.apply(this, args)
			this.removeEvent(split.original, fn);
		}
		
	};
	
	Events.definePseudo = function(key, fn){
		pseudos[key] = fn;
	};
	
	Events.implement(Events.Pseudos(pseudos, Events.prototype.addEvent, Events.prototype.removeEvent)); 

})();
