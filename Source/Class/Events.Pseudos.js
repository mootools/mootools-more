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

		return pseudos ? parsedPseudos.map(function(item, index){
			return pseudos[parsedPseudos[index].key] ? {
				event: parsed.tag,
				value: parsedPseudos[index].value,
				pseudo: parsedPseudos[index].key,
				original: type
			} : null;
		}).clean() : null;
	};

	return {

		addEvent: function(type, fn, internal){
			var split = splitType(type);
			if (!split || !split.length) return addEvent.call(this, type, fn, internal);

			var storage = storageOf(this),
				events = storage.retrieve(type, []),
				options = Object.merge.apply(this, split.map(function(item){
					return pseudos[item.pseudo].options || {};
				}));

			var self = this,
				stack = fn;

			split.each(function(item, index){
				var pseudo = pseudos[item.pseudo],
					fn = stack;

				stack = function(){
					pseudo.listener.call(self, item, fn, arguments, monitor, pseudo.options);
				};
			});

			function monitor(){
				stack.apply(self, arguments);
			};

			events.include({event: fn, monitor: monitor});
			storage.store(type, events);

			var eventType = split[0].event,
				eventOptions = options[eventType] || {},
				args = Array.slice(arguments, 2);

			if (eventOptions.args) args.append(Array.from(eventOptions.args));
			if (eventOptions.base) eventType = eventOptions.base;

			addEvent.apply(this, [type, fn].concat(args));
			return addEvent.apply(this, [eventType, monitor].concat(args));
		},

		removeEvent: function(type, fn){
			var split = splitType(type);
			if (!split || !split.length) return removeEvent.call(this, type, fn);

			var storage = storageOf(this),
				events = storage.retrieve(type),
				options = Object.merge.apply(this, split.map(function(item){
					return pseudos[item.pseudo].options || {};
				}));

			if (!events) return this;

			var eventType = split[0].event,
				eventOptions = options[eventType] || {},
				args = Array.slice(arguments, 2);
			if (eventOptions.args) args.append(Array.from(eventOptions.args));

			if (eventOptions.base) eventType = eventOptions.base;

			removeEvent.apply(this, [type, fn].concat(args));
			events.each(function(monitor, i){
				if (!fn || monitor.event == fn) removeEvent.apply(this, [eventType, monitor.monitor].concat(args));
				delete events[i];
			}, this);

			storage.store(type, events);
			return this;
		}

	};

};

(function(global){

var pseudos = {

	once: {listener: function(split, fn, args, monitor){
		fn.apply(this, args);
		this.removeEvent(split.event, monitor)
			.removeEvent(split.original, fn);
	}}

};

Events.definePseudo = function(key, listener){
	pseudos[key] = Type.isFunction(listener) ? {listener: listener} : listener;
	return this;
};

var proto = Events.prototype;
Events.implement(Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent));

['Request', 'Fx'].each(function(klass){
	if (global[klass]) global[klass].implement(Events.prototype);
});

})(this);
