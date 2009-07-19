/*
Script: Keyboard.js
	KeyboardEvents used to intercept events on a class for keyboard and format modifiers in a specific order so as to make
	alt+shift+c the same as shift+alt+c.

	License:
		MIT-style license.

	Authors:
		Perrin Westrich
		Aaron Newton
*/
(function(){
	var modifier_regex = /^(shift|ctrl|alt|meta)$/;

	this.Keyboard = new Class({

		Extends: Events,

		Implements: Options,

		options: {
/*			onActivate: $empty,
			onDeactivate: $empty,
			preventDefault: false,
			caseSensitive: false, */
			eventType: 'keydown',
			active: true,
			events: {}
		},

		initialize: function(){
			params = Array.link(arguments, {elem: Element.type, options: Object.type});
			this.setOptions(params.options);
			this.active = this.options.active;
			this.addEvents(this.options.events);
			this.boundHandle = this.handle.bind(this);
			this.attach();
		},

		addEvent: function(type, fn, internal){
			var modifiers = $H();
			var parts = type.split('+');
			var mainKey = '';
			parts.each(function(part){
				if (match = modifier_regex.exec(part)) modifiers.set(match[1], true);
				else mainKey = part;
			});
			var modType = '';
			this.Modifiers.each(function(mod){
				if (modifiers.has(mod)) modType += mod + '+';
			});
			modType += mainKey;
			return this.parent(modType, fn, internal);
		},

		Modifiers: ['shift', 'ctrl', 'alt', 'meta'],


		attach: function(attach) {
			(params.elem || window)[$pick(attach, true) ? 'addEvent' : 'removeEvent'](this.options.eventType, this.boundHandle);
		},

		handle: function(e){
			if (!this.active) return;
			if (this.options.preventDefault) e.preventDefault();
			if (this.options.caseSensitive) key = e.shift ? e.key.toUpperCase() : e.key;
			else key = e.key;
			if (Event.Keys.hasValue(e.key)) key = Event.Keys.keyOf(e.key);
			key = ''+key;
			var modKey = '';
			if (e.shift && !this.options.caseSensitive) modKey += 'shift+';
			if (e.ctrl) modKey += 'ctrl+';
			if (e.alt) modKey += 'alt+';
			if (e.meta) modKey += 'meta+';
			this.fireEvent(modKey + key, e);
		},

	/* Perhaps should move these to a subclass? */
		activate: function(){
			this.active = true;
			this.fireEvent('activate');
			return this;
		},

		deactivate: function(){
			this.active = false;
			this.fireEvent('deactivate');
			return this;
		},

		toggleActive: function(){
			return this[this.active ? 'deactivate' : 'activate']();
		}


	});

})();