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

Events.Pseudos = function(pseudos, addEvent, removeEvent){

	var storeKey = 'monitorEvents:';

	var storageOf = function(object){

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

                return (pseudos && pseudos[parsedPseudos[0].key]) ? parsedPseudos.map(function(e, i){
                    return {
                        event: parsed.tag,
                        value: parsedPseudos[i].value,
                        pseudo: parsedPseudos[i].key,
                        original: type
                    }
                }) : null;
	};

        var stackPseudos = function(pseudo, fn, args){
            return function(){
                pseudos[pseudo.pseudo][0].call(this, pseudo, fn, args, pseudos[pseudo.pseudo][1])
            }
        }

	return {

		addEvent: function(type, fn, internal){
			var split = splitType(type);
			if (!split) return addEvent.call(this, type, fn, internal);

			var storage = storageOf(this),
				events = storage.retrieve(type, []),
				proxy = Array.from(pseudos[split[0].pseudo])[1];

			var self = this;
			var monitor = function(){
                            var stack = fn,
                                last = split.getLast(),
                                i = split.length;
                            while (i--) stack = stackPseudos(split[i], stack, arguments);
                            stack.call(self, last, stack, arguments);
			};

			events.include({event: fn, monitor: monitor});
			storage.store(type, events);

			var eventType = split[0].event;
			if (proxy && proxy[eventType]) eventType = proxy[eventType].base;

			addEvent.call(this, type, fn, internal);
			return addEvent.call(this, eventType, monitor, internal);
		},

		removeEvent: function(type, fn){
			var split = splitType(type);
			if (!split) return removeEvent.call(this, type, fn);

			var storage = storageOf(this),
				events = storage.retrieve(type),
				proxy = Array.from(pseudos[split[0].pseudo])[1];

			if (!events) return this;

			var eventType = split[0].event;
			if (proxy && proxy[eventType]) eventType = proxy[eventType].base;

			removeEvent.call(this, type, fn);
			events.each(function(monitor, i){
				if (!fn || monitor.event == fn) removeEvent.call(this, eventType, monitor.monitor);
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
		fn.apply(this, args);
		this.removeEvent(split.original, fn);
	}

};

Events.definePseudo = function(key, fn){
	pseudos[key] = fn;
};

var proto = Events.prototype;
Events.implement(Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent));

})();
