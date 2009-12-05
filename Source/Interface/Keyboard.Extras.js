Keyboard = Class.refactor(Keyboard, {

	descriptors: [],

	descriptorIndex: {},

	addEvent: function(type, fn, internal) {
		if($type(fn) === 'object') {
			type = 
			var descripObj = { keys: type, description: fn.description, keyboard: this, fn: fn.fn };
			if(fn.lookup) this.descriptorIndex[fn.lookup] = descripObj;
			this.descriptors.push(descripObj);
			this.previous(type, fn.fn, internal);
		}
		else this.previous.apply(this, arguments);
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
			descriptor.keyboard.removeEvent(descriptor.keys, descriptor.fn);
			descriptor.keyboard.addEvent(newKeys, descriptor.fn);
			descriptor.keys = newKeys;
			Keyboard.manager.handle({keyboard: descriptor.keyboard}, descriptor.keyboard.options.defaultEventType + ':rebound');
		});
};


Keyboard.activeShortcuts = function(keyboard) {
	var activeKBS = [], activeSCS = [];
	Keyboard.activeKeyboards([].push.bind(activeKBS), keyboard);
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
	Keyboard.activeKeyboards(set, opts.keyboard);
	return descriptors;
};

Keyboard.getDescriptors = function(lookup, opts) {
	return Keyboard.getDescriptor(lookup, $merge(opts, { many: true }));
}
