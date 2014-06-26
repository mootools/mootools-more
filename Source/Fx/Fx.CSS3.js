/*
---
name: Fx.CSS3
script: Fx.CSS3.js
license: MIT-style license.
description: Provides the base functionality of the CSS3 Fx classes
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Core/Class.Extras, Core/Element.Event, Core/Element.Style, Core/Fx, Array.Extras]

provides: [Fx.CSS3]
...
*/

(function() {
	
	var css3Features = (function(){

		var prefix = (function(){
			var prefixes = ['ms', 'O', 'Moz', 'webkit'],
				style = document.documentElement.style;
			for (var l = prefixes.length; l--;){
				var prefix = prefixes[l];
				if (typeof style[prefix + 'Transition'] != 'undefined') return prefix;
			}
			return false;
		})();
		
		if(prefix) {
			var hasTransform = typeof document.documentElement.style[prefix + 'Transform'] != 'undefined';
			prefix = prefix.toLowerCase();
			return {
				transition: '-' + prefix + '-transition',
				transitionProperty: '-' + prefix + '-transition-property',
				transitionDuration: '-' + prefix + '-transition-duration',
				transitionTimingFunction : '-' + prefix + '-transition-timing-function',
				transitionend: (prefix == 'moz') ? 'transitionend' : prefix + 'TransitionEnd',
				transform: hasTransform ? '-' + prefix + '-transform' : null
			}
		}
		return false;
	})();
		
	Element.NativeEvents[css3Features.transitionend] = 2;
	
	DOMEvent.implement({
		getPropertyName: function(){
			return this.event.propertyName;
		},

		getElapsedTime: function(nativeTime){
			return nativeTime ? this.event.elapsedTime : (this.event.elapsedTime * 1000).toInt();
		}
	});

	var transitionTimings = {
		'linear'		: '0,0,1,1',
		'expo:in'		: '0.71,0.01,0.83,0',
		'expo:out'		: '0.14,1,0.32,0.99',
		'expo:in:out'	: '0.85,0,0.15,1',
		'circ:in'		: '0.34,0,0.96,0.23',
		'circ:out'		: '0,0.5,0.37,0.98',
		'circ:in:out'	: '0.88,0.1,0.12,0.9',
		'sine:in'		: '0.22,0.04,0.36,0',
		'sine:out'		: '0.04,0,0.5,1',
		'sine:in:out'	: '0.37,0.01,0.63,1',
		'quad:in'		: '0.14,0.01,0.49,0',
		'quad:out'		: '0.01,0,0.43,1',
		'quad:in:out'	: '0.47,0.04,0.53,0.96',
		'cubic:in'		: '0.35,0,0.65,0',
		'cubic:out'		: '0.09,0.25,0.24,1',
		'cubic:in:out'	: '0.66,0,0.34,1',
		'quart:in'		: '0.69,0,0.76,0.17',
		'quart:out'		: '0.26,0.96,0.44,1',
		'quart:in:out'	: '0.76,0,0.24,1',
		'quint:in'		: '0.64,0,0.78,0',
		'quint:out'		: '0.22,1,0.35,1',
		'quint:in:out'	: '0.9,0,0.1,1'
	};

	Array.implement({
		containsArray: function(array) {
			return array.every(function(v) {
				return this.contains(v);
			}, this);
		}
	});

	var animatable = ['background-color', 'border-bottom-width', 'border-left-width', 'border-right-width',
		'border-spacing', 'border-top-width', 'border-width', 'bottom', 'color', 'font-size', 'font-weight',
		'height', 'left', 'letter-spacing', 'line-height', 'margin-bottom', 'margin-left', 'margin-right',
		'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'opacity', 'outline-color', 'outline-offset',
		'outline-width', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'right', 'text-indent', 
		'top', 'vertical-align', 'visibility', 'width', 'word-spacing', 'z-index', css3Features.transform];

	/*
	This is a list of properties listed by w3c but that are currently largely unsupported
	http://www.w3.org/TR/css3-transitions/#animatable-properties-
	http://www.opera.com/docs/specs/presto29/css/transitions/
	
	There is also some infomation here
	http://oli.jp/2010/css-animatable-properties
	
	It causes problems when trying to animate none animate able properities because the transitionend event wont ever be called.
	
	var unsupported = ['background-image', 'background-position', 'border-bottom-color', 'border-color', 'border-left-color',
		'border-right-color', 'border-top-color', 'crop', 'grid-*', 'text-shadow', 'zoom']
	*/

	Fx.CSS3 = {
		features: css3Features,
		transitionTimings: transitionTimings,
		animatable: animatable,
		
		initialize: function(element, options){
			if(css3Features) {
				options = options || {};
				if(!options.transition || !transitionTimings[options.transition]) {
					options.transition = 'sine:in:out';
				}
				if(this.initializeCSS3) {
					this.initializeCSS3(element, options);
				}
			}
			this.parent(element, options);
		},
		
		startCSS3: function(properties, from, to) {
			if(!this.check()) return this;
			
			if(!Object.isEqual(from, to)) {
				this.preTransStyles = this.element.getStyles(Fx.CSS3.features.transitionProperty,
					Fx.CSS3.features.transitionDuration,
					Fx.CSS3.features.transitionTimingFunction);
				
				var incomplete = {};
				properties.each(function(p) {
					incomplete[p] = false;
				});
				
				this.animatingProperties = properties;
				
				this.boundComplete = function(e) {
					incomplete[e.getPropertyName()] = true;
					if(Object.every(incomplete, function(v) { return v; })) {
						this.element.removeEvent(Fx.CSS3.features.transitionend, this.boundComplete);
						this.element.setStyles(this.preTransStyles);
						this.boundComplete = null;
						this.fireEvent('complete', this.subject);
						if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
					}
				}.bind(this);

				this.element.addEvent(Fx.CSS3.features.transitionend, this.boundComplete);
				
				var trans = function(){
					var transStyles = {};
					transStyles[Fx.CSS3.features.transitionProperty] =
						properties.reduce(function(a, b) { return a + ', '  + b; });
					transStyles[Fx.CSS3.features.transitionDuration] = this.options.duration + 'ms';
					transStyles[Fx.CSS3.features.transitionTimingFunction] = 
						'cubic-bezier(' + Fx.CSS3.transitionTimings[this.options.transition] + ')';
					this.element.setStyles(transStyles);
					this.set(this.compute(from, to, 1));
				}.bind(this);
				
				this.element.setStyle(Fx.CSS3.features.transitionProperty, 'none');
				this.set(this.compute(from, to, 0));
				trans.delay(1);
				this.fireEvent('start', this.subject);
			}
			else {
				this.fireEvent('start', this.subject);
				this.fireEvent('complete', this.subject);
			}
			return this;
		},

		pause: function() {
			if (this.css3Supported){
				return this;
			}
			return this.parent();
		},

		resume: function() {
			if (this.css3Supported){
				return this;
			}
			return this.parent();
		},

		isRunning: function() {
			if (this.css3Supported){
				return !!this.boundComplete;
			}
			return this.parent();
		},
		
		parse: function(value){
			value = Function.from(value)();
			value = (typeof value == 'string' && !value.test(/(^(rotate|matrix|scale|rgb|rgba))|gradient/)) ? value.split(' ') : Array.from(value);
			return value.map(function(val){
				val = String(val);
				var found = false;
				Object.each(parsers, function(parser, key){
					if (found) return;
					var parsed = parser.parse(val);
					if (parsed || parsed === 0) found = {value: parsed, parser: parser};
				});
				found = found || {value: val, parser: Fx.CSS.Parsers.String};
				return found;
			});
		}
	};
	
	Fx.CSS3Stop = {
		cancel: function(){
			if (this.css3Supported){
				if(this.isRunning()) {
					this.element.removeEvent(Fx.CSS3.features.transitionend, this.boundComplete);
					this.element.setStyles(this.preTransStyles);
					this.boundComplete = null;
					this.fireEvent('cancel', this.subject);
					this.clearChain();
				}
				return this;
			}
			return this.parent();
		},

		stop: function() {
			if (this.css3Supported){
				if(this.isRunning()) {
					this.element.removeEvent(Fx.CSS3.features.transitionend, this.boundComplete);
					this.element.setStyles(this.preTransStyles);
					this.boundComplete = null;
					this.fireEvent('complete', this.subject);
					if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
				}
				return this;
			}
			return this.parent();
		}
	};
	
	var parsers = {
		Matrix: {
			parse: function(val){
				if(typeof val != 'string') {
					return false;
				}
				var value = val.match(/rotate\((\d+(?:\.\d+)?)(deg|grad|rad|turn)\)/);
				if(value) {
					var th;
					switch(value[2]) {
						case 'deg':
							th = (parseFloat(value[1]) / 180) * Math.PI;
							break;
						case 'grad':
							th = (parseFloat(value[1]) / 200) * Math.PI;
							break;
						case 'turn':
							th = parseFloat(value[1]) * Math.PI * 2;
							break;
						case 'rad':
							th = parseFloat(value[1]);
							break;
					}
					return {matrix: [Math.cos(th), -Math.sin(th), Math.sin(th), Math.cos(th), 0, 0], text: val};
				}
				value = val.match(/scale\((\d+(?:\.\d+)?)\)/);
				if(value) {
					return {matrix: [parseFloat(value[1]), 0, 0, parseFloat(value[1]), 0, 0], text: val};
				}
				value = val.match(/matrix\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
				if(value) {
					return {matrix: value.splice(1, 6).map(parseFloat), text: val};
				}
				return false;
			},
			compute: function(from, to, delta){
				if(delta == 0) {
					return from
				}
				else if(delta == 1) {
					return to;
				}
				var v = {
					matrix: from.matrix.map(function(v, k) {
						return Fx.compute(v, to[k], delta).toFixed(2);
					})
				};
				v.text = 'matrix(' + v.matrix.join(', ') + ')';
			},
			serve: function(value) {
				return value ? value.text || value : null;
			}
		},
		Color: {
			parse: function(value){
				var match;
				if (value.match(/^#[0-9a-f]{3,6}$/i)) { match = value.hexToRgb(true); match.push(1); return match };
				if (match = value.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)/)) return [match[1], match[2], match[3], parseFloat(match[4])];
				return ((match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)/))) ? [match[1], match[2], match[3], 1] : false;
			},
			compute: function(from, to, delta){
				return from.map(function(value, i){
					var tmp = Fx.compute(from[i], to[i], delta);
					if(i < 3) {
						return Math.round(tmp);
					}
					return tmp.toFixed(2);
				});
			},
			serve: function(value){
				return 'rgba(' + value.map(Number).join(',') + ')';
			}
		},
		Number: Fx.CSS.Parsers.Number,
		String: {
			parse: Function.from(false),
			compute: function(zero, one, delta){
				return delta == 0 ? zero : one;
			},
			serve: function(zero){
				return zero;
			}
		}
	};
})();