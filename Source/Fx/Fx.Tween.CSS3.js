/*
---
name: Fx.Tween.CSS3
script: Fx.Tween.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Tween
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Fx.CSS3, Core/Fx.Tween]

provides: [Fx.Tween.CSS3]
...
*/
(function() {
	if(Fx.CSS3.features) {
		var tweenCSS2 = Fx.Tween;

		Fx.Tween = new Class({

			Extends: tweenCSS2,

			checkCSS3: function(property){
				return (Fx.CSS3.features && Fx.CSS3.animatable.contains(property));
			},

			start: function(property, from, to){
				var args = Array.flatten(arguments);
				this.property = this.options.property || args.shift();
				if ((this.css3Supported = this.checkCSS3(this.property))) {
					var parsed = this.prepare(this.element, this.property, args);
					return this.startCSS3([this.property], parsed.from, parsed.to);
				}
				return this.parent(property, from, to);
			},
		
			compute: function(from, to, delta){
				var computed;
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
			}
		});

		Fx.Tween.implement(Fx.CSS3);
		Fx.Tween.implement(Fx.CSS3Stop);

		Fx.Tween.CSS2 = tweenCSS2;
		Fx.Tween.CSS3 = Fx.Tween;
	}
})();