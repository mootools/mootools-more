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
		if (topLeft.top == 'auto' || topLeft.left == 'auto'){
			var op;
			if (!Browser.ie){
				var parent = this.element.getParent();
				op = (parent.getComputedStyle('position') != 'static' ? parent : parent.getOffsetParent());
			}
			var current = this.element.getPosition(op);
			var margin = this.element.getStyles('margin-top', 'margin-left');
			if (topLeft.top == 'auto') this.element.setStyle('top', current.y - margin['margin-top'].toInt());
			if (topLeft.left == 'auto') this.element.setStyle('left', current.x - margin['margin-left'].toInt());
		}
		return this.parent(this.element.position(Object.merge(this.options, destination, {returnPos: true})));
	}

});

Element.Properties.move = {

	set: function(options){
		this.get('move').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var move = this.retrieve('move');
		if (!move){
			move = new Fx.Move(this, {link: 'cancel'});
			this.store('move', move);
		}
		return move;
	}

};

Element.implement({

	move: function(options){
		this.get('move').start(options);
		return this;
	}

});
