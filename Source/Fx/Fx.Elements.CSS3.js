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
				if(this.count != 0) return this;
				this.count = 0;
				var complete = function() {
					if(this.count-- == 0) {
						this.fireEvent('complete', this);
					}
				}.bind(this);

				Object.each(obj, function(properties, key) {
					if(properties && this.elements[key]) {
						this.count++;
						new Fx.Morph(this.elements[key], Object.merge({}, this.options, {
							onComplete: complete
						})).start(properties);
					}
				}, this);

				this.fireEvent('start', this);
				return this;
			}
			return this.parent(obj);
		}
	});

	Fx.Elements.implement(Fx.CSS3Funcs);

	Fx.Elements.CSS2 = elementsCSS2;
	Fx.Elements.CSS3 = Fx.Elements;

})();