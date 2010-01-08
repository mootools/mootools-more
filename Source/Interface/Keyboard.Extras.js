Keyboard.implement({

	descriptors: [],

	descriptorIndex: {},

	/*
		Descriptor should be in the format of:
		{
			'keys': 'shift+s', // the default to add as an event.
			'description': 'blah blah blah', // a brief description of the functionality.
			'handler': function(){} // the event handler to run when keys are pressed.
		}
	*/
	addDescriptor: function(name, descriptor) {
		descriptor.getKeyboard = $lambda(this);
		descriptor.name = name;
		this.descriptorIndex[name] = descriptor;
		this.descriptors.push(descriptor);
		if(descriptor.keys) this.addEvent(descriptor.keys, descriptor.handler);
		return this;
	},

	addDescriptors: function(obj){
		for(var name in obj) this.addDescriptor(name, obj[name]);
		return this;
	},

	getDescriptors: function(){
		return this.descriptors;
	},

	getDescriptor: function(name){
		return this.descriptorIndex[name];
	}

});

Keyboard.rebind = function(newKeys, descriptors){
	$splat(descriptors).each(function(descriptor){
		descriptor.getKeyboard().removeEvent(descriptor.keys, descriptor.handler);
		descriptor.getKeyboard().addEvent(newKeys, descriptor.handler);
		descriptor.keys = newKeys;
		Keyboard.manager.handle({keyboard: descriptor.getKeyboard()}, descriptor.getKeyboard().options.defaultEventType + ':rebound');
	});
};


Keyboard.getActiveShortcuts = function(keyboard) {
	var activeKBS = [], activeSCS = [];
	Keyboard.each(keyboard, [].push.bind(activeKBS));
	activeKBS.each(function(kb){ activeSCS.extend(kb.getDescriptors()); });
	return activeSCS;
};

Keyboard.getDescriptor = function(name, keyboard, opts){
	opts = opts || {};
	var descriptors = opts.many ? [] : null,
		set = opts.many ? function(kb){ 
				var descriptor = kb.getDescriptor(name);
				if(descriptor) descriptors.push(descriptor);
			} : function(kb) { 
				if(!descriptors) descriptors = kb.getDescriptor(name);
			};
	Keyboard.each(keyboard, set);
	return descriptors;
};

Keyboard.getDescriptors = function(name, keyboard) {
	return Keyboard.getDescriptor(name, keyboard, { many: true });
};
