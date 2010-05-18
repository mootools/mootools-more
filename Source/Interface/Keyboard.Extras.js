/*
---

script: Keyboard.Extras.js

name: Keyboard.Extras

description: Enhances Keyboard by adding the ability to name and describe keyboard shortcuts, and the ability to grab shortcuts by name and bind the shortcut to different keys.

license: MIT-style license

authors:
  - Perrin Westrich

requires:
  - /Keyboard
  - /MooTools.More

provides: [Keyboard.Extras]

...
*/
Keyboard.prototype.options.nonParsedEvents.combine(['rebound', 'onrebound']);

Keyboard.implement({

	/*
		shortcut should be in the format of:
		{
			'keys': 'shift+s', // the default to add as an event.
			'description': 'blah blah blah', // a brief description of the functionality.
			'handler': function(){} // the event handler to run when keys are pressed.
		}
	*/
	addShortcut: function(name, shortcut) {
		this.shortcuts = this.shortcuts || [];
		this.shortcutIndex = this.shortcutIndex || {};
		
		shortcut.getKeyboard = $lambda(this);
		shortcut.name = name;
		this.shortcutIndex[name] = shortcut;
		this.shortcuts.push(shortcut);
		if(shortcut.keys) this.addEvent(shortcut.keys, shortcut.handler);
		return this;
	},

	addShortcuts: function(obj){
		for(var name in obj) this.addShortcut(name, obj[name]);
		return this;
	},

	removeShortcut: function(name) {
		var shortcut = this.getShortcut(name);
		if (shortcut && shortcut.keys) {
			this.removeEvent(shortcut.keys, shortcut.handler);
			delete this.shortcutIndex[name];
			this.shortcuts.erase(shortcut);
		}
		return this;
	},

	removeShortcuts: function(names) {
		names.each(this.removeShortcut, this);
		return this;
	},

	getShortcuts: function(){
		return this.shortcuts || [];
	},

	getShortcut: function(name){
		return (this.shortcutIndex || {})[name];
	}

});

Keyboard.rebind = function(newKeys, shortcuts){
	$splat(shortcuts).each(function(shortcut){
		shortcut.getKeyboard().removeEvent(shortcut.keys, shortcut.handler);
		shortcut.getKeyboard().addEvent(newKeys, shortcut.handler);
		shortcut.keys = newKeys;
		shortcut.getKeyboard().fireEvent('rebound');
	});
};


Keyboard.getActiveShortcuts = function(keyboard) {
	var activeKBS = [], activeSCS = [];
	Keyboard.each(keyboard, [].push.bind(activeKBS));
	activeKBS.each(function(kb){ activeSCS.extend(kb.getShortcuts()); });
	return activeSCS;
};

Keyboard.getShortcut = function(name, keyboard, opts){
	opts = opts || {};
	var shortcuts = opts.many ? [] : null,
		set = opts.many ? function(kb){
				var shortcut = kb.getShortcut(name);
				if(shortcut) shortcuts.push(shortcut);
			} : function(kb) { 
				if(!shortcuts) shortcuts = kb.getShortcut(name);
			};
	Keyboard.each(keyboard, set);
	return shortcuts;
};

Keyboard.getShortcuts = function(name, keyboard) {
	return Keyboard.getShortcut(name, keyboard, { many: true });
};
