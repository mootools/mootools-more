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
  - Element.Measure

provides: [Element.Position]

...
*/

(function(original){

// Using a local variable seems to be faster than using `this`: http://jsperf.com/this-vs-var
var local = Element.Position = {

	options: {/*
		edge: false,
		returnPos: false,
		minimum: {x: 0, y: 0},
		maximum: {x: 0, y: 0},
		relFixedPosition: false,
		ignoreMargins: false,
		ignoreScroll: false,
		allowNegative: false,*/
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

	getOptions: function(element, options){
		var options = Object.merge({}, local.options, options);
		options.position = local.getPositionOption(options);
		options.edge = local.getEdgeOption(options);
		options.offset = local.getOffsetOption(element, options);
		options.dimensions = local.getDimensionsOption(element, options);
		return options;
	},

	getPositionOption: function(options){
		return local.getCoordinateFromValue(options.position);
	},

	getEdgeOption: function(options){
		var edgeOption = local.getCoordinateFromValue(options.edge);
		return edgeOption ? edgeOption :
			(options.position.x == 'center' && options.position.y == 'center') ? {x: 'center', y: 'center'} :
			{x: 'left', y: 'top'};
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

	getDimensionsOption: function(element){
		return element.getDimensions({
			computeSize: true,
			styles: ['padding', 'border', 'margin']
		});
	},

	getPosition: function(element, options){
		var position = {position: 'absolute'},
			options = local.getOptions(element, options),
			relativeTo = document.id(options.relativeTo) || document.body,
			calc = (relativeTo == document.body) ? window.getScroll() : relativeTo.getPosition(),
			top = calc.y,
			left = calc.x,
			offsetY = options.offset.y,
			offsetX = options.offset.x,
			winSize = window.getSize();

		// TODO: options.position in separate function?
		switch(options.position.x){
			case 'left': position.x = left + offsetX; break;
			case 'right': position.x = left + offsetX + relativeTo.offsetWidth; break;
			// center
			default: position.x = left + ((relativeTo == document.body ? winSize.x : relativeTo.offsetWidth) / 2) + offsetX; break;
		}

		switch(options.position.y){
			case 'top': position.y = top + offsetY; break;
			case 'bottom': position.y = top + offsetY + relativeTo.offsetHeight; break;
			// center
			default: position.y = top + ((relativeTo == document.body ? winSize.y : relativeTo.offsetHeight) / 2) + offsetY; break;
		}

		if (options.edge) local.toEdge(position, options);

		var offset = options.offset;
		position.left = ((position.x >= 0 || offset.parentPositioned || options.allowNegative) ? position.x : 0).toInt();
		position.top = ((position.y >= 0 || offset.parentPositioned || options.allowNegative) ? position.y : 0).toInt();

		local.toMinMax(position, options);

		if (options.relFixedPosition || relativeTo.getStyle('position') == 'fixed') local.toRelFixedPosition(relativeTo, position);
		if (options.ignoreScroll) local.toIgnoreScroll(relativeTo, position);
		if (options.ignoreMargins) local.toIgnoreMargins(position, options);

		position.left = Math.ceil(position.left);
		position.top = Math.ceil(position.top);

		return position;
	},

	toMinMax: function(position, options){
		var xy = {left: 'x', top: 'y'}, value;
		['minimum', 'maximum'].each(function(minmax){
			['left', 'top'].each(function(lr){
				value = options[minmax] ? options[minmax][xy[lr]] : null;
				if (value != null && ((minmax == 'minimum') ? position[lr] < value : position[lr] > value)) position[lr] = value;
			});
		});
	},

	toRelFixedPosition: function(relativeTo, position){
		var winScroll = window.getScroll();
		position.top += winScroll.y;
		position.left += winScroll.x;
	},

	toIgnoreScroll: function(relativeTo, position){
		var relScroll = relativeTo.getScroll();
		position.top -= relScroll.y;
		position.left -= relScroll.x;
	},

	toIgnoreMargins: function(position, options){
		position.left += options.edge.x == 'right' ? options.dimensions['margin-right'] :
			options.edge.x != 'center' ? -options.dimensions['margin-left'] :
			-options.dimensions['margin-left'] + ((options.dimensions['margin-right'] + options.dimensions['margin-left']) / 2);

		position.top += options.edge.y == 'bottom' ? options.dimensions['margin-bottom'] :
			options.edge.y != 'center' ? -options.dimensions['margin-top'] :
			-options.dimensions['margin-top'] + ((options.dimensions['margin-bottom'] + options.dimensions['margin-top']) / 2);
	},

	toEdge: function(position, options){
		var edgeOffset = {},
			dimensions = options.dimensions,
			edge = options.edge;

		switch(edge.x){
			case 'left': edgeOffset.x = 0; break;
			case 'right': edgeOffset.x = -dimensions.x - dimensions.computedRight - dimensions.computedLeft; break;
			// center
			default: edgeOffset.x = -(dimensions.totalWidth / 2); break;
		}

		switch(edge.y){
			case 'top': edgeOffset.y = 0; break;
			case 'bottom': edgeOffset.y = -dimensions.y - dimensions.computedTop - dimensions.computedBottom; break;
			// center
			default: edgeOffset.y = -(dimensions.totalHeight / 2); break;
		}

		position.x += edgeOffset.x;
		position.y += edgeOffset.y;
	},

	getCoordinateFromValue: function(option){
		if (typeOf(option) != 'string') return option;
		option = option.toLowerCase();

		var value = {x: 'center', y: 'center'};

		if (option.test('left')) value.x = 'left';
		else if (option.test('right')) value.x = 'right';

		if (option.test(/upper|top/)) value.y = 'top';
		else if (option.test('bottom')) value.y = 'bottom';

		return value;
	}

};

Element.implement({

	position: function(options){
		if (typeOf(options) == 'array') return (original ? original.apply(this, arguments) : this);
		var position = this.calculatePosition(options);
		return (options && options.returnPos) ? position : this.setStyles(position);
	},

	calculatePosition: function(options){
		return local.getPosition(this, options);
	}

});

})(Element.prototype.position);
