/*
---
name: Fx.Morph.CSS3
script: Fx.Morph.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Morph
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Fx.CSS3, Object.Extras, Core/Fx.Morph]

provides: [Fx.Morph.CSS3]
...
*/
(function() {
	if(Fx.CSS3.features) {
		var morphCSS2 = Fx.Morph;
	
		Fx.Morph = new Class({

			Extends: morphCSS2,

			checkCSS3: function(properties){
				return (Fx.CSS3.features && Fx.CSS3.animatable.containsArray(Object.keys(properties)));
			},
		
			start: function(properties){
				if ((this.css3Supported = this.checkCSS3(properties))) {
					if (typeof properties == 'string') properties = this.search(properties);
					var from = {}, to = {}, usedProps = [];
					for (var p in properties){
						var parsed = this.prepare(this.element, p, properties[p]);
						if(!Object.isEqual(parsed.from, parsed.to)) {
							from[p] = parsed.from;
							to[p] = parsed.to;
							usedProps.push(p);
						}
					}
					return this.startCSS3(usedProps, from, to);
				}
				return this.parent(properties);
			},
		
			compute: function(fromX, toX, delta){
				return Object.map(fromX, function(from, prop) {
					var computed;
					var to = toX[prop];
					if(delta == 0) {
						computed = from;
					}
					else if(delta == 1) {
						computed = to;
					}
					else {
						computed = [];
						(Math.min(from[p].length, to.length)).times(function(i){
							computed.push({value: from[i].parser.compute(from[i].value, to[i].value, delta), parser: from[i].parser});
						});
					}
					computed.$family = Function.from('fx:css:value');
					return computed;
				});
			}
		});

		Fx.Morph.implement(Fx.CSS3);
		Fx.Morph.implement(Fx.CSS3Stop);

		Fx.Morph.CSS2 = morphCSS2;
		Fx.Morph.CSS3 = Fx.Morph;
	}
})();