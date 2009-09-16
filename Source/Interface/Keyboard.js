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

		Implements: Options,

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
			if (bubbles && this.activeKB) this.activeKB.handle(e);
			if (e.preventKeyboardPropagation) return;

			var key = (e.shift && this.options.caseSensitive) ? e.key.toUpperCase() : e.key;
			var mods = '';
			modifiers.each(function(mod){
				if (e[mod] && (mod != 'shift' || !this.options.caseSensitive)) mods += mod + '+';
			}, this);
			var event = e.type + ':' + mods + key;
			if (this.$events[event]) this.fireEvent(event, e);
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
			this.enable();
			return this;
		},

		deactivate: function(){
			this.active = false;
			this.fireEvent('deactivate');
			return this;
		},

		toggleActive: function(){
			return this[this.active ? 'deactivate' : 'activate']();
		},

		enable: function(instance){
			if (instance) this.activeKB = instance.fireEvent('activate');
			//root manager has no manager
			else if (this.manager) this.manager.enable(this);
			return this;
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

		instances: []

	});

	Keyboard.stop = function(event) {
		event.preventKeyboardPropagation = true;
	};

	Keyboard.manager = new this.Keyboard();
	Keyboard.manager.active = true;
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
