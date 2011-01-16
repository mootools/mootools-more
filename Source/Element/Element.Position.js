/*
---

script: Element.Position.js

name: Element.Position

description: Extends the Element native object to include methods useful positioning elements relative to others.

license: MIT-style license

authors:
  - Aaron Newton
  - Jacob Thornton

requires:
  - Core/Options
  - Core/Element.Dimensions
  - /Element.Measure

provides: [Element.Position]

...
*/

(function(){

Element.Position = {

  options: {/*
		edge: false,
		returnPos: false,
		minimum: { x: 0, y: 0 },
		maximum: { x: 0, y: 0},
		relFixedPosition: false,
		ignoreMargins: false,
		ignoreScroll: false,
		allowNegative: false*/
		relativeTo: document.body,
		position: {
			x: 'center', //left, center, right
			y: 'center' //top, center, bottom
		},
		offset: {
			 x: 0,
			 y: 0
		}
	},

	place: function(element, options){
		var options = this.getOptions(element, options),
			position = this.getPosition(element, options);

		if (options.returnPos) return position;
		return element.setStyles(position);
	},

	getOptions: function(element, options){
		var options = Object.merge({}, this.options, options);
		options.position = this.getPositionOption(options);
		options.edge = this.getEdgeOption(options);
		options.offset = this.getOffsetOption(element, options);
		options.dimensions = this.getDimensionsOption(element, options);
		return options;
	},

	getPositionOption: function(options){
		return this.getCoordinateFromValue(options.position);
	},

	getEdgeOption: function(options){
		var edgeOption = this.getCoordinateFromValue(options.edge);
		if (edgeOption) return edgeOption;
		return options.position.x == 'center' && options.position.y == 'center' ? {x: 'center', y: 'center'} : {x: 'left', y: 'top'};
	},

	getOffsetOption: function(element, options){
		var parentOffset = {x: 0, y: 0},
			offsetParent = element.measure(function(){
				return document.id(this.getOffsetParent());
			}),
			parentScroll = offsetParent.getScroll();

		if (!offsetParent || offsetParent == element.getDocument().body) return;

		parentOffset = offsetParent.measure(function(){
			var position = this.getPosition();
			if (this.getStyle('position') == 'fixed'){
				var scroll = window.getScroll();
				position.x += scroll.x;
				position.y += scroll.y;
			}
			return position;
		});

		return {
			parentPositioned: offsetParent != document.id(options.relativeTo),
			x: options.offset.x - parentOffset.x + parentScroll.x,
			y: options.offset.y - parentOffset.y + parentScroll.y
		}
	},

	getDimensionsOption: function(element, options){
		return element.getDimensions({
			computeSize: true,
			styles:['padding', 'border', 'margin']
		});
	},

	getPosition: function(element, options){
		var position = {},
			relativeTo = document.id(options.relativeTo) || document.body,
			calc = relativeTo == document.body ? window.getScroll() : relativeTo.getPosition(),
			top = calc.y,
			left = calc.x,
			offsetY = options.offset.y,
			offsetX = options.offset.x,
			winSize = window.getSize();

		switch(options.position.x){
			case 'left':
				position.x = left + offsetX;
				break;
			case 'right':
				position.x = left + offsetX + relativeTo.offsetWidth;
				break;
			default: //center
				position.x = left + ((relativeTo == document.body ? winSize.x : relativeTo.offsetWidth) / 2) + offsetX;
				break;
		}

		switch(options.position.y){
			case 'top':
				position.y = top + offsetY;
				break;
			case 'bottom':
				position.y = top + offsetY + relativeTo.offsetHeight;
				break;
			default: //center
				position.y = top + ((relativeTo == document.body ? winSize.y : relativeTo.offsetHeight) / 2) + offsetY;
				break;
		}

		position = this.toEdge(position, options);

		position = {
			position: 'absolute',
			left: ((position.x >= 0 || options.offset.parentPositioned || options.allowNegative) ? position.x : 0).toInt(),
			top: ((position.y >= 0 || options.offset.parentPositioned || options.allowNegative) ? position.y : 0).toInt()
		};

		position = this.toMinimumMaximum(position, options);
		position = this.toRelFixedPosition(relativeTo, position, options);
		position = this.toIgnoreScroll(relativeTo, position, options);
		position = this.toIgnoreMargins(position, options);

		position.left = Math.ceil(position.left);
		position.top = Math.ceil(position.top);
		return position;
	},

	toMinimumMaximum: function(position, options){
		var xy = {left: 'x', top: 'y'};
		['minimum', 'maximum'].each(function(minmax){
			['left', 'top'].each(function(lr){
				var value = options[minmax] ? options[minmax][xy[lr]] : null;
				if (value != null && ((minmax == 'minimum') ? position[lr] < value : position[lr] > value)) position[lr] = value;
			}, this);
		}, this);
		return position;
	},

	toRelFixedPosition: function(relativeTo, position, options){
		if (relativeTo.getStyle('position') != 'fixed' && !options.relFixedPosition) return position;
		var winScroll = window.getScroll();
		position.top += winScroll.y;
		position.left += winScroll.x;
		return position;
	},

	toIgnoreScroll: function(relativeTo, position, options){
		if (!options.ignoreScroll) return position;
		var relScroll = relativeTo.getScroll();
		position.top -= relScroll.y;
		position.left -= relScroll.x;
		return position;
	},

	toIgnoreMargins: function(position, options){
		if (!options.ignoreMargins) return position;
		position.left += (
			options.edge.x == 'right' ? options.dimensions['margin-right'] :
			options.edge.x == 'center' ? -options.dimensions['margin-left'] + ((options.dimensions['margin-right'] + options.dimensions['margin-left'])/2) :
				- options.dimensions['margin-left']
		);
		position.top += (
			options.edge.y == 'bottom' ? options.dimensions['margin-bottom'] :
			options.edge.y == 'center' ? -options.dimensions['margin-top'] + ((options.dimensions['margin-bottom'] + options.dimensions['margin-top'])/2) :
				- options.dimensions['margin-top']
		);
		return position;
	},

	toEdge: function(position, options){
		if (!options.edge) return position;

		var edgeOffset = {};

		switch(options.edge.x){
			case 'left':
				edgeOffset.x = 0;
				break;
			case 'right':
				edgeOffset.x = -options.dimensions.x - options.dimensions.computedRight - options.dimensions.computedLeft;
				break;
			default: //center
				edgeOffset.x = -(options.dimensions.totalWidth/2);
				break;
		}

		switch(options.edge.y){
			case 'top':
				edgeOffset.y = 0;
				break;
			case 'bottom':
				edgeOffset.y = -options.dimensions.y - options.dimensions.computedTop - options.dimensions.computedBottom;
				break;
			default: //center
				edgeOffset.y = -(options.dimensions.totalHeight/2);
				break;
		}

		position.x += edgeOffset.x;
		position.y += edgeOffset.y;
		return position;
	},

	getCoordinateFromValue: function(option){
		if (typeOf(option) != 'string') return option;
		]option = option.toLowerCase();

		var value = {};

		if (option.test('left')){
			value.x = 'left';
		} else if (option.test('right')){
			value.x = 'right';
		} else {
			value.x = 'center';
		}

		if (option.test('upper') || option.test('top')){
			value.y = 'top';
		} else if (option.test('bottom')){
			value.y = 'bottom';
		} else {
			value.y = 'center';
		}
		return value;
	}

};

var original = Element.prototype.position;

Element.implement({
	position: function(options){
		if (typeOf(options) == 'array') return position.original ? position.original.apply(this.element, arguments) : this;
		return Element.Position.place(this, options);
	}
});

})();
