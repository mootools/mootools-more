/*
---

script: Keyboard.js

name: Keyboard

description: KeyboardEvents used to intercept events on a class for keyboard and format modifiers in a specific order so as to make alt+shift+c the same as shift+alt+c.

license: MIT-style license

authors:
  - Perrin Westrich
  - Aaron Newton
  - Scott Kyle

requires:
  - Core/Events
  - Core/Options
  - Core/Element.Event
  - /Log

provides: [Keyboard]

...
*/

(function(){
	
	var Keyboard = this.Keyboard = new Class({

		Extends: Events,

		Implements: [Options, Log],

		options: {
			/*
			onActivate: $empty,
			onDeactivate: $empty,
			*/
			defaultEventType: 'keydown',
			active: false,
			manager: null,
			events: {},
			nonParsedEvents: ['activate', 'deactivate', 'onactivate', 'ondeactivate', 'changed', 'onchanged']
		},

		initialize: function(options){
			if (options && options.manager) {
				this.manager = options.manager;
				delete options.manager;
			}
			this.setOptions(options);
			this.setup();
		}, 
		setup: function(){
			this.addEvents(this.options.events);
			//if this is the root manager, nothing manages it
			if (Keyboard.manager && !this.manager) Keyboard.manager.manage(this);
			if (this.options.active) this.activate();
		},

		handle: function(event, type){
			//Keyboard.stop(event) prevents key propagation
			if (event.preventKeyboardPropagation) return;
			
			var bubbles = !!this.manager;
			if (bubbles && this.activeKB){
				this.activeKB.handle(event, type);
				if (event.preventKeyboardPropagation) return;
			}
			this.fireEvent(type, event);
			
			if (!bubbles && this.activeKB) this.activeKB.handle(event, type);
		},

		addEvent: function(type, fn, internal){
			return this.parent(Keyboard.parse(type, this.options.defaultEventType, this.options.nonParsedEvents), fn, internal);
		},

		removeEvent: function(type, fn){
			return this.parent(Keyboard.parse(type, this.options.defaultEventType, this.options.nonParsedEvents), fn);
		},

		toggleActive: function(){
			return this[this.active ? 'deactivate' : 'activate']();
		},

		activate: function(instance){
			if (instance) {
				if (instance.isActive()) return this;
				//if we're stealing focus, store the last keyboard to have it so the relinquish command works
				if (this.activeKB && instance != this.activeKB) {
					this.previous = this.activeKB;
					this.previous.fireEvent('deactivate');
				}
				//if we're enabling a child, assign it so that events are now passed to it
				this.activeKB = instance.fireEvent('activate');
				Keyboard.manager.fireEvent('changed');
			} else if (this.manager) {
				//else we're enabling ourselves, we must ask our parent to do it for us
				this.manager.activate(this);
			}
			return this;
		},

		isActive: function(){
			return this.manager ? this.manager.activeKB == this :  Keyboard.manager == this;
		},

		deactivate: function(instance){
			if (instance) {
				if(instance === this.activeKB) {
					this.activeKB = null;
					instance.fireEvent('deactivate');
					Keyboard.manager.fireEvent('changed');
				}
			} else if (this.manager) {
				this.manager.deactivate(this);
			}
			return this;
		},

		relinquish: function(){
			if (this.isActive() && this.manager && this.manager.previous) this.manager.activate(this.manager.previous);
		},

		//management logic
		manage: function(instance){
			if (instance.manager && instance.manager != Keyboard.manager && this != Keyboard.manager) instance.manager.drop(instance);
			this.instances.push(instance);
			instance.manager = this;
			if (!this.activeKB) this.activate(instance);
		},

		_disable: function(instance){
			if (this.activeKB == instance) this.activeKB = null;
		},

		drop: function(instance){
			this._disable(instance);
			this.instances.erase(instance);
			Keyboard.manager.manage(instance);
			if (this.activeKB == instance && this.previous && this.instances.contains(this.previous)) this.activate(this.previous);
		},

		instances: [],

		trace: function(){
			Keyboard.trace(this);
		},

		each: function(fn){
			Keyboard.each(this, fn);
		}

	});
	
	var parsed = {};
	var modifiers = ['shift', 'control', 'alt', 'meta'];
	var regex = /^(?:shift|control|ctrl|alt|meta)$/;
	
	Keyboard.parse = function(type, eventType, ignore){
		if (ignore && ignore.contains(type.toLowerCase())) return type;
		
		type = type.toLowerCase().replace(/^(keyup|keydown):/, function($0, $1){
			eventType = $1;
			return '';
		});

		if (!parsed[type]){
			var key, mods = {};
			type.split('+').each(function(part){
				if (regex.test(part)) mods[part] = true;
				else key = part;
			});

			mods.control = mods.control || mods.ctrl; // allow both control and ctrl
			
			var keys = [];
			modifiers.each(function(mod){
				if (mods[mod]) keys.push(mod);
			});
			
			if (key) keys.push(key);
			parsed[type] = keys.join('+');
		}

		return eventType + ':' + parsed[type];
	};

	Keyboard.each = function(keyboard, fn){
		var current = keyboard || Keyboard.manager;
		while (current){
			fn.run(current);
			current = current.activeKB;
		}
	};

	Keyboard.stop = function(event){
		event.preventKeyboardPropagation = true;
	};

	Keyboard.manager = new Keyboard({
		active: true
	});
	
	Keyboard.trace = function(keyboard){
		keyboard = keyboard || Keyboard.manager;
		keyboard.enableLog();
		keyboard.log('the following items have focus: ');
		Keyboard.each(keyboard, function(current){
			keyboard.log(document.id(current.widget) || current.wiget || current);
		});
	};
	
	var handler = function(event){
		var keys = [];
		modifiers.each(function(mod){
			if (event[mod]) keys.push(mod);
		});
		
		if (!regex.test(event.key)) keys.push(event.key);
		Keyboard.manager.handle(event, event.type + ':' + keys.join('+'));
	};
	
	document.addEvents({
		'keyup': handler,
		'keydown': handler
	});

	Event.Keys.extend({
		'shift': 16,
		'control': 17,
		'alt': 18,
		'capslock': 20,
		'pageup': 33,
		'pagedown': 34,
		'end': 35,
		'home': 36,
		'numlock': 144,
		'scrolllock': 145,
		';': 186,
		'=': 187,
		',': 188,
		'-': Browser.Engine.gecko ? 109 : 189,
		'.': 190,
		'/': 191,
		'`': 192,
		'[': 219,
		'\\': 220,
		']': 221,
		"'": 222
	});

})();
