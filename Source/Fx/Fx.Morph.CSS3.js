/*
---
name: Fx.Morph.CSS3
script: Fx.Morph.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Morph
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Fx.CSS3Funcs, Core/Fx.Morph]

provides: [Fx.Morph.CSS3]
...
*/
(function() {
	
	var morphCSS2 = Fx.Morph;
	
	function isEqual(a, b) {
		// Check object identity.
		if (a === b) return true;
		// Different types?
		var atype = typeOf(a), btype = typeOf(b);
		if (atype != btype) return false;
		// Basic equality test (watch out for coercions).
		if (a == b) return true;
		// One is falsy and the other truthy.
		if ((!a && b) || (a && !b)) return false;
		// One of them implements an isEqual()?
		if (a.isEqual) return a.isEqual(b);
		if (b.isEqual) return b.isEqual(a);
		// Both are NaN?
		if ((a !== a) && (b !== b)) return false;
		// Check dates' integer values.
		if (atype == 'date') return a.getTime() === b.getTime();
		if (atype == 'function') return true;
		// Compare regular expressions.
		if (atype == 'regexp')
		  return a.source     === b.source &&
		         a.global     === b.global &&
		         a.ignoreCase === b.ignoreCase &&
		         a.multiline  === b.multiline;
		// If a is not an object by this point, we can't handle it.
		if (atype !== 'object' && atype !== 'array') return false;
		// Check for different array lengths before comparing contents.
		if (a.length && (a.length !== b.length)) return false;
		// Nothing else worked, deep compare the contents.
		var aKeys = Object.keys(a), bKeys = Object.keys(b);
		// Different object sizes?
		if (aKeys.length != bKeys.length) return false;
		// Recursive comparison of contents.
		for (var key in a) if (!(key in b) || !isEqual(a[key], b[key])) return false;
		return true;
	}

	Fx.Morph = new Class({

		Extends: morphCSS2,

		checkCSS3: function(properties){
			return (Fx.CSS3Funcs.css3Features && Fx.CSS3Funcs.animatable.containsArray(Object.keys(properties)));
		},

		start: function(properties){
			if ((this.css3Supported = this.checkCSS3(properties))) {
				if(this.boundComplete) return this;
				if (typeof properties == 'string') properties = this.search(properties);
				var from = {}, to = {};
				for (var p in properties){
					var parsed = this.prepare(this.element, p, properties[p]);
					from[p] = parsed.from;
					to[p] = parsed.to;
				}
				if(!isEqual(from, to)) {
					var incomplete = Object.map(properties, function() { return false; });
					this.boundComplete = function(event){
						incomplete[event.getPropertyName()] = true;
						if(Object.every(incomplete, function(v) { return v; })) {
							this.element.removeEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete);
							this.boundComplete = null;
							this.fireEvent('complete', this);
						}
					}.bind(this);

					this.element.addEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete);
				
					var trans = function(){
						var transStyles = {};
						transStyles[Fx.CSS3Funcs.css3Features.transitionProperty] = Object.keys(properties).reduce(function(a, b) { return a + ', '  + b; });
						transStyles[Fx.CSS3Funcs.css3Features.transitionDuration] = this.options.duration + 'ms';
						transStyles[Fx.CSS3Funcs.css3Features.transitionTimingFunction] = 'cubic-bezier(' + Fx.CSS3Funcs.transitionTimings[this.options.transition] + ')';
						this.element.setStyles(transStyles);
						this.set(this.compute(from, to, 1));
					}.bind(this);
					this.element.setStyle(Fx.CSS3Funcs.css3Features.transitionProperty, 'none');
					this.set(this.compute(from, to, 0));
					trans.delay(0.1);
					this.fireEvent('start', this);
				}
				else {
					this.fireEvent('start', this);
					this.fireEvent('complete', this);
				}
				return this;
			}
			return this.parent(properties);
		}
	});

	Fx.Morph.implement(Fx.CSS3Funcs);

	Fx.Morph.CSS2 = morphCSS2;
	Fx.Morph.CSS3 = Fx.Morph;
	
})();