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
  - Element.Event.Pseudos.Keys

provides: [Keyboard]

...
*/

(function(){

	var Keyboard = this.Keyboard = new Class({

		Extends: Events,

		Implements: [Options],

		options: {/*
			onActivate: function(){},
			onDeactivate: function(){},*/
			defaultEventType: 'keydown',
			active: false,
			manager: null,
			events: {},
			nonParsedEvents: ['activate', 'deactivate', 'onactivate', 'ondeactivate', 'changed', 'onchanged']
		},

		initialize: function(options){
			if (options && options.manager){
				this._manager = options.manager;
				delete options.manager;
			}
			this.setOptions(options);
			this._setup();
		},

		addEvent: function(type, fn, internal){
			return this.parent(Keyboard.parse(type, this.options.defaultEventType, this.options.nonParsedEvents), fn, internal);
		},

		removeEvent: function(type, fn){
			return this.parent(Keyboard.parse(type, this.options.defaultEventType, this.options.nonParsedEvents), fn);
		},

		toggleActive: function(){
			return this[this.isActive() ? 'deactivate' : 'activate']();
		},

		activate: function(instance){
			if (instance){
				if (instance.isActive()) return this;
				//if we're stealing focus, store the last keyboard to have it so the relinquish command works
				if (this._activeKB && instance != this._activeKB){
					this.previous = this._activeKB;
					this.previous.fireEvent('deactivate');
				}
				//if we're enabling a child, assign it so that events are now passed to it
				this._activeKB = instance.fireEvent('activate');
				Keyboard.manager.fireEvent('changed');
			} else if (this._manager){
				//else we're enabling ourselves, we must ask our parent to do it for us
				this._manager.activate(this);
			}
			return this;
		},

		isActive: function(){
			return this._manager ? (this._manager._activeKB == this) : (Keyboard.manager == this);
		},

		deactivate: function(instance){
			if (instance){
				if (instance === this._activeKB){
					this._activeKB = null;
					instance.fireEvent('deactivate');
					Keyboard.manager.fireEvent('changed');
				}
			} else if (this._manager){
				this._manager.deactivate(this);
			}
			return this;
		},

		relinquish: function(){
			if (this.isActive() && this._manager && this._manager.previous) this._manager.activate(this._manager.previous);
			else this.deactivate();
			return this;
		},

		//management logic
		manage: function(instance){
			if (instance._manager) instance._manager.drop(instance);
			this._instances.push(instance);
			instance._manager = this;
			if (!this._activeKB) this.activate(instance);
			return this;
		},

		drop: function(instance){
			instance.relinquish();
			this._instances.erase(instance);
			if (this._activeKB == instance){
				if (this.previous && this._instances.contains(this.previous)) this.activate(this.previous);
				else this._activeKB = this._instances[0];
			}
			return this;
		},

		trace: function(){
			Keyboard.trace(this);
		},

		each: function(fn){
			Keyboard.each(this, fn);
		},

		/*
			PRIVATE METHODS
		*/

		_instances: [],

		_disable: function(instance){
			if (this._activeKB == instance) this._activeKB = null;
		},

		_setup: function(){
			this.addEvents(this.options.events);
			//if this is the root manager, nothing manages it
			if (Keyboard.manager && !this._manager) Keyboard.manager.manage(this);
			if (this.options.active) this.activate();
			else this.relinquish();
		},

		_handle: function(event, type){
			//Keyboard.stop(event) prevents key propagation
			if (event.preventKeyboardPropagation) return;

			var bubbles = !!this._manager;
			if (bubbles && this._activeKB){
				this._activeKB._handle(event, type);
				if (event.preventKeyboardPropagation) return;
			}
			this.fireEvent(type, event);

			if (!bubbles && this._activeKB) this._activeKB._handle(event, type);
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

		return eventType + ':keys(' + parsed[type] + ')';
	};

	Keyboard.each = function(keyboard, fn){
		var current = keyboard || Keyboard.manager;
		while (current){
			fn.run(current);
			current = current._activeKB;
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
		var hasConsole = window.console && console.log;
		if (hasConsole) console.log('the following items have focus: ');
		Keyboard.each(keyboard, function(current){
			if (hasConsole) console.log(document.id(current.widget) || current.wiget || current);
		});
	};

	var handler = function(event){
		var keys = [];
		modifiers.each(function(mod){
			if (event[mod]) keys.push(mod);
		});

		if (!regex.test(event.key)) keys.push(event.key);
		Keyboard.manager._handle(event, event.type + ':keys(' + keys.join('+') + ')');
	};

	document.addEvents({
		'keyup': handler,
		'keydown': handler
	});

})();
