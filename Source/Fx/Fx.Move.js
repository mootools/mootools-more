/*
---

script: Fx.Move.js

name: Fx.Move

description: Defines Fx.Move, a class that works with Element.Position.js to transition an element from one location to another.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Fx.Morph
  - /Element.Position

provides: [Fx.Move]

...
*/

Fx.Move = new Class({

	Extends: Fx.Morph,

	options: {
		relativeTo: document.body,
		position: 'center',
		edge: false,
		offset: {x: 0, y: 0}
	},

	start: function(destination){
		var topLeft = this.element.getStyles('top', 'left');
		if (topLeft.top == 'auto' || topLeft.left == 'auto') {
			var op;
			if (!Browser.Engine.trident){
				var parent = this.element.getParent();
				op = (parent.getComputedStyle('position') != 'static' ? parent : parent.getOffsetParent());
			}
			var current = this.element.getPosition(op);
			var margin = this.element.getStyles('margin-top', 'margin-left');
			if (topLeft.top == 'auto') this.element.setStyle('top', current.y - margin['margin-top'].toInt());
			if (topLeft.left == 'auto') this.element.setStyle('left', current.x - margin['margin-left'].toInt());
		}
		return this.parent(this.element.position($merge(this.options, destination, {returnPos: true})));
	}

});

Element.Properties.move = {

	set: function(options){
		var morph = this.retrieve('move');
		if (morph) morph.cancel();
		return this.eliminate('move').store('move:options', $extend({link: 'cancel'}, options));
	},

	get: function(options){
		if (options || !this.retrieve('move')){
			if (options || !this.retrieve('move:options')) this.set('move', options);
			this.store('move', new Fx.Move(this, this.retrieve('move:options')));
		}
		return this.retrieve('move');
	}

};

Element.implement({

	move: function(options){
		this.get('move').start(options);
		return this;
	}

});
