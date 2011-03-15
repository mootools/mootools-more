/*
---

script: Slider.Extra.js

name: Slider.Extra

description: Class for creating horizontal and vertical slider controls.

license: MIT-style license

authors:
  - Daniel Buchner

requires:
  - Core/Element.Dimensions
  - /Class.Binds
  - /Drag
  - /Element.Measure
  - /Slider

provides: [Slider.Extra]

...
*/

Slider.Extra = new Class({
	
	Binds: ['setLast', 'startResize', 'endResize'],
	
	Implements: [Events, Options],
	
	options: {
		collision: false,
		rangeBackground: '#64992C',
		initialStep: 0,
		snap: false,
		offset: 0,
		range: false,
		steps: 100,
		mode: 'horizontal'
	},
	
	initialize: function(element, options){
		this.setOptions(options);
		
		this.element = $(element);
		this.sliders = [];
		this.bands = [];
		this.mode = (this.options.mode == 'horizontal') ? ['100%', 'auto', 'right', 'x'] : ['auto', '100%', 'bottom', 'y'];
		
		if (this.element.getStyle('position') == 'static') this.element.setStyle('position', 'relative');
	},
	
	setLast: function(slider, event, useExisting){
		var last = slider.last;
		
		last.value = slider.drag.value.now[slider.axis];
		last.style = slider.knob.getStyle(slider.property).toInt();
		last.direction = last.direction || 0;
		last.bounds = this.getBounds(slider);
		
		return this;
	},
	
	getBounds: function(slider){
		var bounds = { '-1': undefined, '1': undefined },
			last = slider.last;
			
		this.sliders.each(function(e){
			if(e.options.collision && e.knob != slider.knob || e.relatedSlider && e.relatedSlider.knob == slider.knob){
				var style = e.knob.getStyle(e.property).toInt();
				if (style < last.style || style == last.style && last.direction == -1) bounds['-1'] = (style > bounds['-1']) ? style : bounds['-1'] || style;
				if (style > last.style || style == last.style && last.direction == 1) bounds['1'] = (style < bounds['1']) ? style : bounds['1'] || style;
			}
		});
		
		return bounds;
	},
	
	detectCollision: function(slider, event){
		var value = slider.drag.value.now[slider.axis],
			last = slider.last,
			diff = value - last.value,
			direction = (Math.abs(diff) == diff) ? 1 : -1,
			bound = last.bounds[direction];
		
		if (direction == 1 && value >= bound || direction == -1 && value <= bound) {
			slider.knob.setStyle(slider.property, bound);
			last.direction = direction;
			
			var boundStep = slider.toStep(bound);
			if(slider.step != boundStep){
				slider.step = boundStep;
				slider.checkStep();
			}
		}
		else {
			slider.draggedKnob();
			last.value = value;
		}
		
		return this;
	},
	
	addKnob: function(knob, options, internal){
		var self = this,
			slider = new Slider(
				this.element,
				knob.setStyles({ 'position': 'absolute', 'z-index': 3 }).inject(this.element),
				Object.merge({}, this.options, options || {}, {
					wheel: false,
					mode: this.options.mode,
					onBeforeStart: function(knob, event){
						self.raiseKnob(knob);
						self.setLast(this, event);
					},
					onStart: function(knob, event){
						this.draggedKnob();
						self.setLast(this, event);
					},
					onDrag: function(knob, event){
						self.detectCollision(this, event);
					},
					onComplete: function(){
						this.step = this.toStep(this.knob.getStyle(this.property).toInt());
					}
				})
			).detach();
			
		slider.last = {};
		slider.drag.attach().removeEvents('complete').addEvent('complete', function(knob, event){
			slider.isDragging = false;
			self.detectCollision(slider, event);
			slider.end()
		});
		
		knob.store('slider', slider);
		this.sliders.push(slider);
		
		return (internal) ? slider : slider.knob;
	},
	
	addRange: function(start, end, options){
		var options = this.getRangeOptions(options),
			start = this.addKnob(start, options.start, true),
			end = this.addKnob(end, options.end, true),
			band = new Element('div', Object.merge({
				styles: {
					position: 'absolute',
					height: this.mode[0],
					width: this.mode[1],
					background: this.options.rangeBackground,
					zIndex: 1
				}
			}, options.band || {})),
			range = {
				'band': band,
				'knobs': {
					'start': start.knob,
					'end': end.knob
				},
				'sliders': {
					'start': start,
					'end': end
				}
			};
		
		start.relatedSlider = end;
		end.relatedSlider = start;
		
		this.attachResize(range);
		$$(start.knob, end.knob, band).store('range', range);
		
		this.bands.push(band.inject(this.element));
		
		return this;
	},
	
	raiseKnob: function(knob){
		this.sliders.each(function(e){ e.knob.setStyle('z-index', 3) });
		knob.setStyle('z-index', 4);
		
		var range = knob.retrieve('range');
		if(range){
			this.bands.each(function(band){ band.setStyle('z-index', 1) });
			range.band.setStyle('z-index', 2);
		}
		
		return this;
	},
	
	getRangeOptions: function(options){
		var options = options || { start: {}, end: {}, band: {} };
		
		Object.merge(options.start, options);
		Object.merge(options.end, options);
		
		if(options.end.initialStep < options.start.initialStep) options.end.initialStep = options.start.initialStep;
		
		return options;
	},
	
	attachResize: function(range){
		['start', 'end'].each(function(knob, i){
			var resize = this[knob + 'Resize'].pass([range.sliders[knob], range.band]);
			range.sliders[knob].drag.addEvent('drag', resize);
			resize();	
		}, this);
		
		return this;
	},
	
	startResize: function(slider, band){
		band.setStyle(slider.property, slider.knob.getStyle(slider.property));
		return this;
	},
	
	endResize: function(slider, band){
		band.setStyle(this.mode[2], this.element.getSize()[this.mode[3]] - slider.knob.getCoordinates(this.element)[this.mode[2]]);
		return this;
	}

});
