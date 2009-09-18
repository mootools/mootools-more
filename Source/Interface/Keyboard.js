/*
Script: Keyboard.js
	KeyboardEvents used to intercept events on a class for keyboard and format modifiers in a specific order so as to make
	alt+shift+c the same as shift+alt+c.

	License:
		MIT-style license.

	Authors:
		Perrin Westrich
		Aaron Newton
		Scott Kyle
*/

(function(){

	var parsed = {};
	var modifiers = ['shift', 'control', 'alt', 'meta'];
	var regex = /^shift|control|ctrl|alt|meta$/;
	
	var parse = function(type, defaultEventType){
		if (parsed[type]) return parsed[type];
		eventType = defaultEventType;
		['keyup', 'keydown'].each(function(t) {
			if (type.contains(t)) eventType = t;
		});
		var match, key = '', mods = {};
		type.split('+').each(function(part){
			if ((match = part.toLowerCase().match(regex))) mods[match[0]] = true;
			else key = part;
		});
		mods.control = mods.control || mods.ctrl; // allow both control and ctrl
		match = '';
		modifiers.each(function(mod){
			if (mods[mod]) match += mod + '+';
		});
		parsed[type] = match + key;
		return eventType + ':' + parsed[type];
	};

	this.Keyboard = new Class({

		Extends: Events,

		Implements: [Options, Log],

		options: {
			/*
			onActivate: $empty,
			onDeactivate: $empty,
			caseSensitive: false,
			*/
			defaultEventType: 'keyup',
			active: false,
			events: {}
		},

		initialize: function(options){
			this.setOptions(options);
			this.addEvents(this.options.events);
			//if this is the root manager, nothing manages it
			if (Keyboard.manager) Keyboard.manager.manage(this);
			if (this.options.active) this.activate();
		},

		handle: function(e){
			//Keyboard.stop(event) prevents key propagation
			if (!this.active || e.preventKeyboardPropagation) return;
			
			var bubbles = !!this.manager;
			if (bubbles && this.activeKB){
				this.activeKB.handle(e);
				if (e.preventKeyboardPropagation) return;
			}
			
			var mods = '', caseSensitive = this.options.caseSensitive;
			modifiers.each(function(mod){
				if (e[mod] && (mod != 'shift' || !caseSensitive)) mods += mod + '+';
			});
			
			var key = (e.shift && caseSensitive) ? e.key.toUpperCase() : e.key;
			this.fireEvent(e.type + ':' + mods + key, e);
			
			if (!bubbles && this.activeKB) this.activeKB.handle(e);
		},

		addEvent: function(type, fn, internal) {
			return this.parent(parse(type, this.options.defaultEventType), fn, internal);
		},

		removeEvent: function(type, fn) {
			return this.parent(parse(type, this.options.defaultEventType), fn);
		},

		activate: function(){
			this.active = true;
			return this.enable();
		},

		deactivate: function(){
			this.active = false;
			return this.fireEvent('deactivate');
		},

		toggleActive: function(){
			return this[this.active ? 'deactivate' : 'activate']();
		},

		enable: function(instance){
			if (instance) {
				//if we're stealing focus, store the last keyboard to have it so the relenquish command works
				if (instance != this.activeKB) this.previous = this.activeKB;
				//if we're enabling a child, assign it so that events are now passed to it
				this.activeKB = instance.fireEvent('activate');
			} else if (this.manager) {
				//else we're enabling ourselves, we must ask our parent to do it for us
				this.manager.enable(this);
			}
			return this;
		},

		relenquish: function(){
			if (this.previous) this.enable(this.previous);
		},

		//management logic
		manage: function(instance) {
			if (instance.manager) instance.manager.drop(instance);
			this.instances.push(instance);
			instance.manager = this;
			if (!this.activeKB) this.enable(instance);
			else this._disable(instance);
		},

		_disable: function(instance) {
			if (this.activeKB == instance) this.activeKB = null;
		},

		drop: function(instance) {
			this._disable(instance);
			this.instances.erase(instance);
		},

		instances: [],

		trace: function(){
			var item = this;
			this.log('the following items have focus: ');
			while (item) {
				this.log(document.id(item.widget) || item.widget || item);
				item = item.activeKB;
			}
		}

	});

	Keyboard.stop = function(event) {
		event.preventKeyboardPropagation = true;
	};

	Keyboard.manager = new this.Keyboard({
		active: true
	});
	
	var handler = Keyboard.manager.handle.bind(Keyboard.manager);
	window.addEvents({
		'keyup': handler,
		'keydown': handler
	});

	Event.Keys.extend({
		'pageup': 33,
		'pagedown': 34,
		'end': 35,
		'home': 36,
		'capslock': 20,
		'numlock': 144,
		'scrolllock': 145
	});

})();
