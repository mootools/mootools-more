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
  - Arian Stolwijk

requires:
  - Core/Events
  - Core/Options
  - Core/Element.Event

provides: [Keyboard]

...
*/


(function(){

var active = null,
previous = null

Keyboard = this.Keyboard = new Class({
	
	Extends: Events,

	Implements: Options,

	events: {},

	options: {/*
		onActivate: function(){},
		onDeactivate: function(){},*/
		active: false,
		events: {},
		parent: null,
		nonParsedEvents: ['activate', 'deactivate', 'onactivate', 'ondeactivate']
	},

	initialize: function(options){
		this.uid = Keyboard.uniqueID();
		this.setOptions(options);
		this.setParent(this.options.parent);
		this.addEvents(this.options.events);
		if (this.options.active) this.activate();
	},
	
	addEvent: function(name, fn){
		if (this.options.nonParsedEvents.contains(name.toLowerCase())) return this.parent.apply(this, arguments);
		
		var event = this.events[name] = function(){
			if (this.isActive() || this.inActiveTrace()) fn.apply(this, arguments);
		}.bind(this);
		
		document.body.addEvent('keydown:keys(' + name + ')', event);
		
		return this;
	},
	
	removeEvent: function(name, fn){
		if (this.options.nonParsedEvents.contains(name)) return this.parent.apply(this, arguments);
		
		var event = this.events[name];
		if (event) document.body.removeEvent(this.options.eventType + ':keys(' + name + ')', event);
		
		return this;		
	},
	
	// Instances management
	
	activate: function(){
		Keyboard.activate(this);
	},
	
	deactivate: function(){
		Keyboard.activate(this.parent);
		this.fireEvent('deactivate');
	},
	
	toggleActive: function(){
		return this[this.isActive() ? 'deactivate' : 'activate']();
	},

	isActive: function(){
		return active == this;
	},
	
	setParent: function(parent){
		this.parent = parent;
	},
	
	//<1.2compat>
	manage: function(child){
		child.parent = this;
	},
	//</1.2compat>

	relinquish: function(){
		Keyboard.activate(previous);
	},
	
	trace: function(){
		return Keyboard.trace(this);
	},
	
	inActiveTrace: function(){
		return Keyboard.trace().some(function(instance){
			return instance.uid == this.uid; 
		}, this);
	}

});

// Instance Activation

Keyboard.activate = function(kb){
	previous = active;
	active = kb;
	if (kb) kb.fireEvent('activate');		
};

Keyboard.trace = function(kb){
	if (!kb) kb = active;
	var trace = [], parent = kb.parent;
	while (parent){
		trace.push(parent);
		parent = parent.parent;
	}
	return trace;
};

Keyboard.getActive = function(){
	return active;
};

var UID = Math.floor(Math.random() * 10e12);

Keyboard.uniqueID = function(){
	return (UID++).toString(36);
};


})();
