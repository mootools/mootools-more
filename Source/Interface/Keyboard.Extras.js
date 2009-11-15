Keyboard = Class.refactor(Keyboard, {

	descriptors: [],

	addEvent: function(type, fn, internal) {
		if($type(fn) === 'object') {
			var descripObj = { keys: type, description: fn.description, keyboard: this, fn: fn.fn };
			this.descriptors.push(descripObj);
			this.previous(type, fn.fn, internal);
		}
		else this.previous.apply(this, arguments);
	},

	//Need to do the same for removal... 
	//Also may want to move this into the Keyboard file so can use the parsed type....

	getDescriptions: function(){
		return this.descriptors;
	},

	rebind: function(type, descriptor){
		descriptor.keyboard.removeEvent(descriptor.keys, descriptor.fn);
		descriptor.keyboard.addEvent(type, descriptor.fn);
		descriptor.keys = type;
		Keyboard.manager.handle({keyboard: descriptor.keyboard}, descriptor.keyboard.options.defaultEventType + ':rebound');
	}

});

Keyboard.activeKeyboards = function(fn) {
	var current = Keyboard.manager;
	while(current){
		fn.run(current);
		current = current.activeKB;
	}
}

Keyboard.activeShortcuts = function() {
	var activeKBS = [], activeSCS = [];
	Keyboard.activeKeyboards([].push.bind(activeKBS));
	activeKBS.each(function(kb){ activeSCS.extend(kb.getDescriptions()); });
	return activeSCS;
}
