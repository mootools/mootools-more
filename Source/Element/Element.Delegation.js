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

	var getType = function(type){
		var custom = Element.Events.get(type);
		return custom ? custom.base : type;
	};

	var checkOverOut = function(el, e){
		if (el == e.target || el.hasChild(e.target)){
			var related = e.relatedTarget;
			if (related == undefined) return true;
			if (related === false) return false;
			return ($type(el) != 'document' && related != el && related.prefix != 'xul' && !el.hasChild(related));
		}
	};

	var check = function(e, test){
		var target = e.target;
		var isOverOut = /^(mouseover|mouseout)$/.test(e.type);
		var els = this.getElements(test);
		var match = els.indexOf(target);
		if (match >= 0) return els[match];
		for (var i = els.length; i--; ){
			var el = els[i];
			if (el == target || el.hasChild(target)){
				return (!isOverOut || checkOverOut(el, e)) ? el : false;
			}
		}
	};

	var splitType = function(type){
		if (type.test(/^.*?\(.*?\)$/)){
			return {
				event: type.match(/.*?(?=\()/),
				selector: type.replace(/^.*?\((.*)\)$/, "$1")
			};
		}
		return {event: type};
	};

	var oldAddEvent = Element.prototype.addEvent,
		oldAddEvents = Element.prototype.addEvents,
		oldRemoveEvent = Element.prototype.removeEvent,
		oldRemoveEvents = Element.prototype.removeEvents;
	Element.implement({
		//use as usual (this.addEvent('click', fn))
		//or for delegation
		//this.addEvent('click(div.foo)', fn)
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
					//i.e. this.fireEvent('click:div.foo')
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
				if (!events[type] || (fn && !events[type].contains(fn))) return this;
				//if a fn is defined, remove it from the events
				if (fn) events[type].erase(fn);
				//else empty all the events of this type
				else events[type].empty();
				//if there are none left, we remove the monitor, too
				if (events[type].length == 0){
					//get the monitors we've created
					var monitors = this.retrieve('$moo:delegateMonitors', {});
					//remove the monitor
					oldRemoveEvent(splitted.event, monitors[type]);
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