/*
Script: Element.Delegation.js
	Extends the Element native object to include the delegate method for more efficient event management.

	Event checking based on the work of Daniel Steigerwald.
	License: MIT-style license.
	Copyright: Copyright (c) 2008 Daniel Steigerwald, daniel.steigerwald.cz

	License:
		MIT-style license.

	Authors:
		Aaron Newton
		Daniel Steigerwald

*/
(function(){
	
	var check = function(e, test){
		// walk up tree from event target, testing against selector
		for (var t = e.target; t && t != this; t = t.parentNode)
			if (Element.match(t, test)) return document.id(t);
	};
	
	var regs = {
		match: /(.*?):relay\(([^)]+)\)$/,
		warn: /^.*?\(.*?\)$/
	};
	
	var splitType = function(type){
		var bits = type.match(regs.match);
		if (bits){
			return {
				event: bits[1],
				selector: bits[2]
			};
		}
		if (regs.warn.test(type) && window.console && console.warn){
			console.warn('The selector ' + type + ' could not be delegated; the syntax has changed. Check the documentation.');
		}		
		return {event: type};
	};

	var oldAddEvent = Element.prototype.addEvent,
		oldRemoveEvent = Element.prototype.removeEvent;
	Element.implement({
		//use as usual (this.addEvent('click', fn))
		//or for delegation
		//this.addEvent('click:relay(div.foo)', fn)
		addEvent: function(type, fn){
			var splitted = splitType(type);
			//if the type has a selector
			if (splitted.selector){
				//get the delegates and the monitors
				var monitors = this.retrieve('$moo:delegateMonitors', {});
				//if there's not a delegate for this type already
				if (!monitors[type]){
					//create a monitor that will fire the event when it occurs
					var monitor = function(e){
						var el = check.call(this, e, splitted.selector);
						if (el) this.fireEvent(type, [e, el], 0, el);
					}.bind(this);
					monitors[type] = monitor;
					//add the monitor to the element
					//translates to this.addEvent('click', monitor);
					//monitor just looks for clicks that match the selector
					//and fires the event
					//we only create one monitor for a given selector and all it does
					//is calls fireEvent for that selector
					//i.e. this.fireEvent('click:relay(div.foo)')
					oldAddEvent.call(this, splitted.event, monitor);
				}
			}
			return oldAddEvent.apply(this, arguments);
		},
		removeEvent: function(type, fn){
			//if we're removing an event with a selector
			var splitted = splitType(type);
			if (splitted.selector){
				var events = this.retrieve('events');
				//if there are no events with this type or
				//if a specific fn is being removed but isn't attached, return
				if (!events || !events[type] || (fn && !events[type].keys.contains(fn))) return this;
				//if a fn is defined, remove it from the events
				if (fn) oldRemoveEvent.apply(this, [type, fn]);
				//else empty all the events of this type
				else oldRemoveEvent.apply(this, type);
				//if there are none left, we remove the monitor, too
				var events = this.retrieve('events');
				if (events && events[type] && events[type].length == 0){
					//get the monitors we've created
					var monitors = this.retrieve('$moo:delegateMonitors', {});
					//remove the monitor
					oldRemoveEvent.apply(this, [splitted.event, monitors[type]]);
					//delete the monitor from the monitors list
					delete monitors[type];
				}
				return this;
			}
			//otherwise do what you normally do and remove the event (no selector involved)
			return oldRemoveEvent.apply(this, arguments);
		},
		//fireEvent is changed to allow a bind argument so that we can bind
		//the method to the element in our monitor above
		fireEvent: function(type, args, delay, bind){
			var events = this.retrieve('events');
			if (!events || !events[type]) return this;
			events[type].keys.each(function(fn){
				//added the bind||this
				fn.create({'bind': bind||this, 'delay': delay, 'arguments': args})();
			}, this);
			return this;
		}
	});

})();