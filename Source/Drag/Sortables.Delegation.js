/*
---

script: Sortables.Delegation.js

name: Sortables.Delegation

description: Class for delegating sortables.

license: MIT-style license

authors:
  - Jacob Thornton

requires:
  - Element.Delegation
  - Drag.Move
  - Sortables

provides: [Sortables.Delegation]

...
*/

Sortables.Delegation = new Class({

	Extends: Sortables,

	options: {
		relay: '*'
	},

	initialize: function(lists, options){
		this.parent(lists, options);
	},

	addLists: function(){
		Array.flatten(arguments).each(function(list){
			this.lists.push(list);
			if (!this.relay) this.relay = this.options.relay + (this.options.handle ? ' ' + this.options.handle : '');
			var start = list.retrieve('sortables:start', this.start.bind(this));
			list.addEvent('mousedown:relay(' + this.relay + ')', start);
		}, this);
		return this;
	},

	start: function(event, element){
		var match;
		while (!match){
			match = this.lists.contains(element.getParent());
			if (!match) element = element.getParent(this.relay);
		}
		this.parent(event, element);
	},

	removeLists: function(){
		return $$(Array.flatten(arguments).map(function(list){
			this.lists.erase(list);
			list.removeEvent('mousedown:relay(' + this.relay + ')', list.retrieve('sortables:start'));
			return list;
		}, this));
	}

});
