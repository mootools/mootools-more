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
	addDescriptor: function(lookup, descriptor) {
		descriptor.keyboard = this;
		descriptor.lookup = lookup;
		this.descriptorIndex[lookup] = descriptor;
		this.descriptors.push(descriptor);
		if(descriptor.keys) this.addEvent(descriptor.keys, descriptor.handler);
		return this;
	},

	addDescriptors: function(obj){
		for(var lookup in obj) this.addDescriptor(lookup, obj[lookup]);
		return this;
	},

	getDescriptors: function(){
		return this.descriptors;
	},

	getDescriptor: function(lookup){
		return this.descriptorIndex[lookup];
	}

});

Keyboard.rebind = function(newKeys, descriptors){
		$splat(descriptors).each(function(descriptor){
			descriptor.keyboard.removeEvent(descriptor.keys, descriptor.handler);
			descriptor.keyboard.addEvent(newKeys, descriptor.handler);
			descriptor.keys = newKeys;
			Keyboard.manager.handle({keyboard: descriptor.keyboard}, descriptor.keyboard.options.defaultEventType + ':rebound');
		});
};


Keyboard.activeShortcuts = function(keyboard) {
	var activeKBS = [], activeSCS = [];
	Keyboard.each(keyboard, [].push.bind(activeKBS));
	activeKBS.each(function(kb){ activeSCS.extend(kb.getDescriptors()); });
	return activeSCS;
};

Keyboard.getDescriptor = function(lookup, opts){
	opts = opts || {};
	var descriptors = opts.many ? [] : null,
		set = opts.many ? function(kb){ 
				var descriptor = kb.getDescriptor(lookup);
				if(descriptor) descriptors.push(descriptor);
			} : function(kb) { 
				if(!descriptors) descriptors = kb.getDescriptor(lookup);
			};
	Keyboard.each(opts.keyboard, set);
	return descriptors;
};

Keyboard.getDescriptors = function(lookup, opts) {
	return Keyboard.getDescriptor(lookup, $merge(opts, { many: true }));
};
