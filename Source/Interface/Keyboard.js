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
	
	var parse = function(type){
		if (parsed[type]) return parsed[type];
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
		return (parsed[type] = match + key);
	};

	var Manager = new Class({

		manage: function(instance) {
			if (instance.manager) instance.manager.drop(instance);
			this.instances.push(instance);
			instance.manager = this;
			if (!this.enabled) this.enable(instance);
			else this._disable(instance);
		},

		enable: function(instance) {
			this.enabled = instance.fireEvent('activate');
		},

		_disable: function(instance) {
			if (this.enabled == instance) this.enabled = null;
		},

		drop: function(instance) {
			this._disable(instance);
			this.instances.erase(instance);
		},

		instances: []

	});

	var rootMgr = new Manager();
	window.rootMgr = rootMgr;
	rootMgr._handle = function(event){
		if (rootMgr.enabled) rootMgr.enabled.handle(event);
	};
	window.addEvents({
		'keyup': rootMgr._handle,
		'keydown': rootMgr._handle
	});

	this.Keyboard = new Class({

		Extends: Events,

		Implements: [Options, Manager],

		options: {
			/*
			onActivate: $empty,
			onDeactivate: $empty,
			preventDefault: false,
			caseSensitive: false,
			*/
			eventType: 'keyup',
			active: false,
			events: {}
		},

		initialize: function(options){
			this.setOptions(options);
			this.addEvents(this.options.events);
			rootMgr.manage(this);
			if (this.options.active) this.activate();
		},

		handle: function(e){
			if (!this.active || e.type != this.options.eventType) return;
			if (this.enabled) this.enabled.handle(e);

			var key = (e.shift && this.options.caseSensitive) ? e.key.toUpperCase() : e.key;
			var mods = '';
			modifiers.each(function(mod){
				if (e[mod] && (mod != 'shift' || !this.options.caseSensitive)) mods += mod + '+';
			}, this);

			if (this.$events[mods + key]) {
				if (this.options.preventDefault) e.preventDefault();
				this.fireEvent(mods + key, e);
			}
		},

		addEvent: function(type, fn, internal) {
			return this.parent(parse(type), fn, internal);
		},

		removeEvent: function(type, fn) {
			return this.parent(parse(type), fn);
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
			if (instance) this.enabled = instance.fireEvent('activate');
			else this.manager.enable(this);
			return this;
		}

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
