/*
---

script: Element.Delegation.js

name: Element.Delegation

description: Extends the Element native object to include the delegate method for more efficient event management.

credits:
  - "Event checking based on the work of Daniel Steigerwald. License: MIT-style license.	Copyright: Copyright (c) 2008 Daniel Steigerwald, daniel.steigerwald.cz"

license: MIT-style license

authors:
  - Aaron Newton
  - Daniel Steigerwald

requires:
  - Core/Element.Event
  - Core/Selectors
  - /MooTools.More

provides: [Element.Delegation]

...
*/

(function(addEvent, removeEvent){

	var EventPseudos = {
		
		relay: function(element, event, split){
			for (var target = event.target; target && target != element; target = target.parentNode){
				if (Slick.match(target, split.selector)){
					var finalTarget = document.id(target);
					if (finalTarget) element.fireEvent(split.original, [event, finalTarget], 0, finalTarget);
					return;
				}
			}
		},
		
		once: function(element, event, split, fn){
			element.fireEvent(split.original, [event])
				.removeEvent(split.original, fn);
		}
		
	};
	
	Event.definePseudo = function(key, fn){
		EventPseudos[key] = fn;
	};

	var key = 'delegation:_delegateMonitors',
		splitType = function(type){
			var parsed = Slick.parse(type).expressions[0][0],
				pseudos = parsed.pseudos;
			
			return (pseudos && typeof EventPseudos[pseudos[0].key] == 'function') ? {
				event: parsed.tag,
				selector: pseudos[0].value,
				pseudo: pseudos[0].key,
				original: type
			} : null;
		};

	Element.implement({

		addEvent: function(type, fn){
			var split = splitType(type);
			if (split){
				var monitors = this.retrieve(key, {});
				if (!monitors[type]){
					var element = this;
					var monitor = function(event){
						EventPseudos[split.pseudo](element, event, split, fn);
					};
					monitors[type] = monitor;
					addEvent.call(this, split.event, monitor);
				}
			}
			return addEvent.call(this, type, fn);
		},

		removeEvent: function(type, fn){
			var split = splitType(type);
			if (!split) return removeEvent.apply(this, arguments);

			var events = this.retrieve('events');
			if (!events || !events[type] || (fn && !events[type].keys.contains(fn))) return this;

			if (fn) removeEvent.call(this, type, fn);
			else removeEvent.call(this, type);

			if (events && events[type] && !events[type].keys.length){
				var monitors = this.retrieve(key, {});
				removeEvent.call(this, split.event, monitors[type]);
				delete monitors[type];
			}
			return this;
		},

		fireEvent: function(type, args, delay, bind){
			var events = this.retrieve('events');
			if (!events || !events[type]) return this;
			if (!bind) bind = this;

			events[type].keys.each(function(fn){
				if (delay) fn.delay(delay, bind, args);
				else fn.apply(bind, args);
			});
			return this;
		}

	});
	
})(Element.prototype.addEvent, Element.prototype.removeEvent);

