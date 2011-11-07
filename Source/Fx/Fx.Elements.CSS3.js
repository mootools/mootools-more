/*
---
name: Fx.Elements.CSS3
script: Fx.Elements.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Elements
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Fx.CSS3Funcs, Fx.Morph.CSS3, Fx.Elements]

provides: [Fx.Elements.CSS3]
...
*/
(function() {
	
	var elementsCSS2 = Fx.Elements;

	Fx.Elements = new Class({
		Extends: elementsCSS2,
		
		initializeCSS3: function(elements, options){
			this.morphers = elements.map(function(element) {
				return new Fx.Morph(element, Object.merge({}, options, {
					onComplete: this._complete.bind(this),
					onCancel: this._cancel.bind(this)
				}));
			}.bind(this));
		},
		
		_complete: function() {
			if(--this.count == 0) {
				this.fireEvent('complete', this.subject);
				if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
			}
		},
		
		_cancel: function() {
			if(--this.count == 0) {
				this.fireEvent('cancel', this.subject);
				this.clearChain();
			}
		},

		checkCSS3: function(obj){
			return (Fx.CSS3Funcs.css3Features && Object.every(obj, function(properties, key) {
				if(properties && this.elements[key]) {
					return Fx.CSS3Funcs.animatable.containsArray(Object.keys(properties));
				}
				return true;
			}, this));
		},
		
		count: 0,

		start: function(obj){
			if ((this.css3Supported = this.checkCSS3(obj))) {
				if(!this.check()) return this;
				this.count = 0;

				Object.each(obj, function(properties, key) {
					if(properties && this.elements[key]) {
						this.count++;
						this.morphers[key].start(properties);
					}
				}, this);

				this.fireEvent('start', this);
				return this;
			}
			return this.parent(obj);
		},
		
		stop: function() {
			if(this.css3Supported) {
				Object.each(this.morphers, function(morph) {
					morph.stop();
				});
				return this;
			}
			return this.parent();
		},
		
		cancel: function() {
			if(this.css3Supported) {
				Object.each(this.morphers, function(morph) {
					morph.cancel();
				});
				return this;
			}
			return this.parent();
		},
		
		isRunning: function() {
			if(this.css3Supported) {
				return this.count != 0;
			}
			return this.parent();
		}
	});

	Fx.Elements.implement(Fx.CSS3Funcs);

	Fx.Elements.CSS2 = elementsCSS2;
	Fx.Elements.CSS3 = Fx.Elements;

})();