/*
---
name: Fx.Morph.CSS3
script: Fx.Morph.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Morph
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Fx.CSS3Funcs, Object.Extras, Core/Fx.Morph]

provides: [Fx.Morph.CSS3]
...
*/
(function() {
	
	var morphCSS2 = Fx.Morph;
	
	Fx.Morph = new Class({

		Extends: morphCSS2,

		checkCSS3: function(properties){
			return (Fx.CSS3Funcs.css3Features && Fx.CSS3Funcs.animatable.containsArray(Object.keys(properties)));
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
		}
	});

	Fx.Morph.implement(Fx.CSS3Funcs);
	Fx.Morph.implement(Fx.CSS3Stop);

	Fx.Morph.CSS2 = morphCSS2;
	Fx.Morph.CSS3 = Fx.Morph;
	
})();