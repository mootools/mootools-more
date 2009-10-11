/*
Script: Drag.Move.js
	A Drag extension that provides support for the constraining of draggables to containers and droppables.

	License:
		MIT-style license.

	Authors:
		Valerio Proietti
		Tom Occhinno
		Jan Kassens*/

Drag.Move = new Class({

	Extends: Drag,

	options: {/*
		onEnter: $empty(thisElement, overed),
		onLeave: $empty(thisElement, overed),
		onDrop: $empty(thisElement, overed, event),*/
		droppables: [],
		container: false,
		precalculate: false,
		includeMargins: true,
		checkDroppables: true
	},

	initialize: function(element, options){
		this.parent(element, options);
		this.droppables = $$(this.options.droppables);
		this.container = document.id(this.options.container);
		if (this.container && $type(this.container) != 'element') this.container = document.id(this.container.getDocument().body);

		var position = this.element.getStyle('position');
		if (position=='static') position = 'absolute';
		if ([this.element.getStyle('left'), this.element.getStyle('top')].contains('auto')) this.element.position(this.element.getPosition(this.element.offsetParent));
		this.element.setStyle('position', position);

		this.addEvent('start', this.checkDroppables, true);

		this.overed = null;
	},

	start: function(event){
		if (this.container){
			var offsetParent = this.element.getOffsetParent();
			var containerCoordinates = this.container.getCoordinates(offsetParent),
					containerBorder = {},
					elementMargin = {},
					elementBorder = {},
					containerMargin = {},
					offsetParentPadding = {};
			var position = this.element.getStyle('position');

			['top', 'right', 'bottom', 'left'].each(function(pad){
				containerBorder[pad] = this.container.getStyle('border-' + pad).toInt();
				elementBorder[pad] = this.element.getStyle('border-' + pad).toInt();
				elementMargin[pad] = this.element.getStyle('margin-' + pad).toInt();
				containerMargin[pad] = this.container.getStyle('margin-' + pad).toInt();
				offsetParentPadding[pad] = offsetParent.getStyle('padding-' + pad).toInt();
			}, this);

			var width = this.element.offsetWidth + elementMargin.left + elementMargin.right;
			var height = this.element.offsetHeight + elementMargin.top + elementMargin.bottom;
			var zeroMargin = {};
			$each(elementMargin, function(value, key) {
				zeroMargin[key] = 0;
			});
			if (position == 'absolute') {
				if (this.options.includeMargins) elementMargin = zeroMargin;
				if (this.container == offsetParent) {
					//container is offsetParent, element position absolute
					this.options.limit = {
						x: [
							0 - elementMargin.left,
							containerCoordinates.right - containerBorder.left - containerBorder.right - width + elementMargin.right
						],
						y: [
							0 - elementMargin.top,
							containerCoordinates.bottom - containerBorder.top - containerBorder.bottom - height + elementMargin.bottom
						]
					};
				} else {
					//container is not offsetParent, element position absolute
					this.options.limit = {
						x: [
							containerCoordinates.left + containerBorder.left - elementMargin.left,
							containerCoordinates.right - containerBorder.right - width + elementMargin.right
						],
						y: [
							containerCoordinates.top + containerBorder.top - elementMargin.top,
							containerCoordinates.bottom - containerBorder.bottom - height + elementMargin.bottom
						]
					};
				}
			} else {
				var pos = {
					x: this.element.getStyle('left').toInt(),
					y: this.element.getStyle('top').toInt()
				};
				var coords = this.element.getCoordinates(offsetParent);
				if (this.container == offsetParent) {
					//container is offsetParent, element position relative
					this.options.limit = {
						x: [
							pos.x - coords.left + containerBorder.left + (this.options.includeMargins ? elementMargin.left : 0),
							containerCoordinates.right + pos.x - coords.left - width + elementMargin.left + elementMargin.right - containerBorder.right
								- (this.options.includeMargins ? elementMargin.right : 0)
						],
						y: [
							pos.y - coords.top + containerBorder.top + (this.options.includeMargins ? elementMargin.top : 0),
							containerCoordinates.bottom + pos.y - coords.top - height + elementMargin.top + elementMargin.bottom - containerBorder.bottom
								- (this.options.includeMargins ? elementMargin.bottom : 0)
						]
					};
				} else {
					//container is not offsetParent, element position relative
					if (!this.options.includeMargins) elementMargin = zeroMargin;
					this.options.limit = {
						x: [
							pos.x - coords.left + containerMargin.left + offsetParentPadding.left + containerBorder.left + elementMargin.left,
							containerCoordinates.right - coords.right + pos.x - containerBorder.right - elementMargin.right
						],
						y: [
							pos.y - coords.top + containerBorder.top + elementMargin.top + offsetParentPadding.top + (Browser.Engine.trident4 ? 0 :  + containerMargin.top),
							containerCoordinates.bottom - coords.bottom + pos.y - containerBorder.bottom - elementMargin.bottom
						]
					};
				}
			}
		}
		if (this.options.precalculate){
			this.positions = this.droppables.map(function(el) {
				return el.getCoordinates();
			});
		}
		this.parent(event);
	},

	checkAgainst: function(el, i){
		el = (this.positions) ? this.positions[i] : el.getCoordinates();
		var now = this.mouse.now;
		return (now.x > el.left && now.x < el.right && now.y < el.bottom && now.y > el.top);
	},

	checkDroppables: function(){
		var overed = this.droppables.filter(this.checkAgainst, this).getLast();
		if (this.overed != overed){
			if (this.overed) this.fireEvent('leave', [this.element, this.overed]);
			if (overed) this.fireEvent('enter', [this.element, overed]);
			this.overed = overed;
		}
	},

	drag: function(event){
		this.parent(event);
		if (this.options.checkDroppables && this.droppables.length) this.checkDroppables();
	},

	stop: function(event){
		this.checkDroppables();
		this.fireEvent('drop', [this.element, this.overed, event]);
		this.overed = null;
		return this.parent(event);
	}

});

Element.implement({

	makeDraggable: function(options){
		var drag = new Drag.Move(this, options);
		this.store('dragger', drag);
		return drag;
	}

});
