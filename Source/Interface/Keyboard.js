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
		mods.control = mods.control || mods.ctrl;	// allow both control and ctrl
		match = '';
		modifiers.each(function(mod){
			if (mods[mod]) match += mod + '+';
		});
		return (parsed[type] = match + key);
	};
	
	this.Keyboard = new Class({

		Extends: Events,

		Implements: Options,

		options: {
			/*
			onActivate: $empty,
			onDeactivate: $empty,
			preventDefault: false,
			caseSensitive: false,
			*/
			eventType: 'keyup',
			active: true,
			events: {}
		},

		initialize: function(){
			var params = Array.link(arguments, {element: Element.type, options: Object.type});
			this.setOptions(params.options);
			this.addEvents(this.options.events);
			this.boundHandle = this.handle.bind(this);
			this.element = params.element || window;
			if (this.options.active) this.attach();
		},

		addEvent: function(type, fn, internal){
			return this.parent(parse(type), fn, internal);
		},
		
		removeEvent: function(type, fn){
			return this.parent(parse(type), fn);
		},

		attach: function(attach){
			this.active = $pick(attach, true);
			this.element[this.active ? 'addEvent' : 'removeEvent'](this.options.eventType, this.boundHandle);
			return this;
		},

		handle: function(e){
			if (this.options.preventDefault) e.preventDefault();
			var key = (e.shift && this.options.caseSensitive) ? e.key.toUpperCase() : e.key;
			var mods = '';
			modifiers.each(function(mod){
				if (e[mod] && (mod != 'shift' || !this.options.caseSensitive)) mods += mod + '+';
			}, this);
			this.fireEvent(mods + key, e);
		},

		activate: function(){
			return this.attach(true).fireEvent('activate');
		},

		deactivate: function(){
			return this.attach(false).fireEvent('deactivate');
		},

		toggleActive: function(){
			return this[this.active ? 'deactivate' : 'activate']();
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