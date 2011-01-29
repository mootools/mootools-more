/*
---

script: Slider.js

name: Slider

description: Class for creating horizontal and vertical slider controls.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Element.Dimensions
  - /Class.Binds
  - /Drag
  - /Element.Measure

provides: [Slider]

...
*/

var Slider = new Class({

	Implements: [Events, Options],

	Binds: ['clickedElement', 'draggedKnob', 'scrolledElement'],

	options: {/*
		onTick: function(intPosition){},
		onChange: function(intStep){},
		onComplete: function(strStep){},*/
		onTick: function(position, knob){
			this.setKnobPosition(position, knob.retrieve('slider:drag'));
		},
		initialStep: 0,
		snap: false,
		offset: 0,
		range: false,
		wheel: false,
		steps: 100,
		mode: 'horizontal',
		zIndex: 2
	},

	initialize: function(element, knobs, options){
		this.setOptions(options);
		options = this.options;
		
		this.element = document.id(element);
		if(!{relative:1, absolute:1}[this.element.getStyle('position')]) this.element.setStyle('position', 'relative');
		
		this.knobs = $$(knobs);
		this.measured = false;
		
		var limit = {},
			modifiers = {x: false, y: false};
		
		Object.append(this, ((options.mode == 'vertical') ? ['y', 'top', 'offsetHeight'] : ['x', 'left', 'offsetWidth']).associate(['axis', 'property', 'offset']));
		
		this.setSliderDimensions();
		this.setRange(options.range);
		
		modifiers[this.axis] = this.property;
		limit[this.axis] = [-options.offset, this.full - options.offset];
		
		this.dragOptions = {
			snap: 0,
			limit: limit,
			modifiers: modifiers,
			onDrag: this.draggedKnob,
			onStart: this.draggedKnob,
			onBeforeStart: function(knob){
				this.isDragging = true;
				this.raiseKnob(knob);
			}.bind(this),
			onCancel: function(){
				this.isDragging = false;
			}.bind(this),
			onComplete: function(knob){
				this.isDragging = false;
				this.draggedKnob(knob);
				this.end(knob.retrieve('slider:drag'));
			}.bind(this)
		};
		
		if (options.snap) this.setSnap(this.dragOptions);
		
		if(this.knobs.length){
			this.knobs.each(this.addKnob, this);
			this.attach();
		}
	},
	
	addKnob: function(knob, step){
		var drag = new Drag(knob, this.dragOptions);
			drag.step = drag.previousChange = drag.previousEnd = step || this.options.initialStep;
			
		knob.setStyle('position', 'absolute')
			.setStyle(this.property, -this.options.offset)
			.store('slider:drag', drag)
			.inject(this.element);
		
		this.raiseKnob(knob).set(drag.step, knob);
		this.knobs.include(knob);
		
		if (this.knobs.length == 2) this.detach(true);
		
		return this;
	},
	
	removeKnob: function(knob){
		this.knobs.erase(knob);
		knob.destroy();
		if(this.knobs.length == 1) this.attach();
		return this;
	},
	
	raiseKnob: function(knob){
		this.knobs.invoke('setStyle', 'z-index', this.options.zIndex - 1);
		knob.setStyle('z-index', this.options.zIndex);
		return this;
	},
	
	attach: function(){
		this.element.addEvent('mousedown', this.clickedElement);
		if (this.options.wheel) this.element.addEvent('mousewheel', this.scrolledElement);
		this.knobs.retrieve('slider:drag').invoke('attach');
		return this;
	},

	detach: function(knobs){
		if(!knobs){
			this.element.removeEvent('mousedown', this.clickedElement);
			this.retrieve('slider:drag').invoke('detach');
		}
		this.element.removeEvent('mousewheel', this.scrolledElement);
		return this;
	},

	autosize: function(){
		var drag = this.knobs[0].retrieve('slider:drag');
		this.setSliderDimensions()
			.setKnobPosition(this.toPosition(drag.step), drag);
		this.dragOptions.limit[this.axis] = [-this.options.offset, this.full - this.options.offset];
		if (this.options.snap) this.setSnap();
		return this;
	},

	setSnap: function(options){
		if (!options) options = this.drag.options;
		options.grid = Math.ceil(this.stepWidth);
		options.limit[this.axis][1] = this.full;
		return this;
	},

	setKnobPosition: function(position, drag){
		if (this.options.snap) position = this.toPosition(drag.step);
		drag.element.setStyle(this.property, position);
		return this;
	},

	setSliderDimensions: function(){
		this.full = this.element.measure(function(){
			this.half = this.knobs[0][this.offset] / 2;
			return this.element[this.offset] - this.knobs[0][this.offset] + (this.options.offset * 2);
		}.bind(this));
		return this;
	},

	set: function(step, knob){
		var knob = typeOf(knob) == 'element' ? knob : this.knobs[knob],
			drag = knob.retrieve('slider:drag');
			
		if (!((this.range > 0) ^ (step < this.min))) step = this.min;
		if (!((this.range > 0) ^ (step > this.max))) step = this.max;

		drag.step = Math.round(step);
		return this.checkStep(drag)
			.fireEvent('tick', [this.toPosition(drag.step), drag.element])
			.end(drag);
	},

	setRange: function(range, pos){
		this.min = Array.pick([range[0], 0]);
		this.max = Array.pick([range[1], this.options.steps]);
		this.range = this.max - this.min;
		this.steps = this.options.steps || this.full;
		this.stepSize = Math.abs(this.range) / this.steps;
		this.stepWidth = this.stepSize * this.full / Math.abs(this.range);
		if (range) this.set(Array.pick([pos, -1]).floor(this.min).max(this.max));
		return this;
	},

	clickedElement: function(event){
		if (this.isDragging || !this.knobs.contains(event.target) && event.target != this.element || event.target == this.element && this.knobs.length > 1) return;

		var dir = this.range < 0 ? -1 : 1,
			drag = this.knobs[0].retrieve('slider:drag'),
			position = event.page[this.axis] - this.element.getPosition()[this.axis] - this.half;
		
		position = position.limit(-this.options.offset, this.full - this.options.offset);
		drag.step = Math.round(this.min + dir * this.toStep(position));

		this.checkStep(drag)
			.fireEvent('tick', [position, drag.element])
			.end(drag);
	},

	scrolledElement: function(event){
		var mode = (this.options.mode == 'horizontal') ? (event.wheel < 0) : (event.wheel > 0);
		this.set(this.knobs[0].retrieve('slider:drag').step + (mode ? -1 : 1) * this.stepSize, this.knobs[0]);
		event.stop();
	},

	draggedKnob: function(knob){
		var dir = this.range < 0 ? -1 : 1,
			drag = knob.retrieve('slider:drag'),
			position = drag.value.now[this.axis];

		position = position.limit(-this.options.offset, this.full -this.options.offset);
		drag.step = Math.round(this.min + dir * this.toStep(position));
		
		this.checkStep(drag);
	},

	checkStep: function(drag){
		if (drag.previousChange != drag.step) this.fireEvent('change', [drag.step, drag.element]);
		drag.previousChange = drag.step;
		return this;
	},

	end: function(drag){
		if (drag.previousEnd != drag.step) this.fireEvent('complete', [drag.step + '', drag.element]);
		drag.previousEnd = drag.step;
		return this;
	},

	toStep: function(position){
		var step = (position + this.options.offset) * this.stepSize / this.full * this.steps;
		return this.options.steps ? Math.round(step -= step % this.stepSize) : step;
	},

	toPosition: function(step){
		return (this.full * Math.abs(this.min - step)) / (this.steps * this.stepSize) - this.options.offset;
	}

});