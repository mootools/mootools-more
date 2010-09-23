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

Events.Pseudos = function(pseudos, addEvent, removeEvent, fireEvent){

	var storeKey = 'monitorEvents:';

	var getStorage = function(object){

		return {
			store: object.store ? function(key, value){
				object.store(storeKey + key, value);
			} : function(key, value){
				(object.$monitorEvents || (object.$monitorEvents = {}))[key] = value;
			},
			retrieve: object.retrieve ? function(key, dflt){
				return object.retrieve(storeKey + key, dflt);
			} : function(key, dflt){
				if (!object.$monitorEvents) return dflt;
				return object.$monitorEvents[key] || dflt;
			}
		};
	};


	var splitType = function(type){
		if (type.indexOf(':') == -1) return null;

		var parsed = Slick.parse(type).expressions[0][0],
			parsedPseudos = parsed.pseudos;

		return (pseudos && pseudos[parsedPseudos[0].key]) ? {
			event: parsed.tag,
			value: parsedPseudos[0].value,
			pseudo: parsedPseudos[0].key,
			original: type
		} : null;
	};


	return {

		addEvent: function(type, fn, internal){
			var split = splitType(type);
			if (!split) return addEvent.call(this, type, fn, internal);

			var storage = getStorage(this),
				events = storage.retrieve(type, []),
				pseudoArgs = Array.from(pseudos[split.pseudo]);

			var self = this;
			var monitor = function(){
				pseudoArgs[0].call(self, split, fn, arguments, pseudoArgs[1]);
			};

			events.include({event: fn, monitor: monitor});
			storage.store(type, events);

			var eventType = split.event;
			if (pseudoArgs[1] && pseudoArgs[1][eventType]) eventType = pseudoArgs[1][eventType].base;

			return addEvent.call(this, eventType, monitor, internal);
		},

		removeEvent: function(type, fn){
			var split = splitType(type);
			if (!split) return removeEvent.call(this, type, fn);

			var storage = getStorage(this),
				events = storage.retrieve(type),
				pseudoArgs = Array.from(pseudos[split.pseudo]);

			if (!events) return this;

			var eventType = split.event;
			if (pseudoArgs[1] && pseudoArgs[1][eventType]) eventType = pseudoArgs[1][eventType].base;

			events.each(function(monitor, i){
				if (!fn || monitor.event == fn) removeEvent.call(this, eventType, monitor.monitor);
				delete events[i];
			}, this);

			storage.store(type, events);
			return this;
		},

		fireEvent: function(type, args, delay){
			var split = splitType(type);
			if (!split) return fireEvent.call(this, type, args, delay);

			var storage = getStorage(this),
				events = storage.retrieve(type),
				pseudoArgs = Array.from(pseudos[split.pseudo]);

			if (!events) return this;

			var eventType = split.event;
			if (pseudoArgs[1] && pseudoArgs[1][eventType]) eventType = pseudoArgs[1][eventType].base;

			args = Array.from(args);

			events.each(function(monitor, i){
				var fn = monitor.event;
				if (delay) fn.delay(delay, this, args);
				else fn.apply(this, args);
			}, this);

			return this;
		}

	};

};

(function(){

var pseudos = {

	once: function(split, fn, args){
		fn.apply(this, args);
		this.removeEvent(split.original, fn);
	}

};

Events.definePseudo = function(key, fn){
	pseudos[key] = fn;
};

var proto = Events.prototype;
Events.implement(Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent,	proto.fireEvent));

})();
