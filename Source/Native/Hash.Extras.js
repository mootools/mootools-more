/*
---

script: Hash.Extras.js

description: Extends the Hash native object to include getFromPath which allows a path notation to child elements.

license: MIT-style license

authors:
- Aaron Newton
- Christopher Pitt

requires:
- core:1.2.4/Hash.base
- /MooTools.More

provides: [Hash.Extras]

...
*/

Hash.implement({

	getFromPath: function(notation){
		var source = this.getClean();
		notation.replace(/\[([^\]]+)\]|\.([^.[]+)|[^[.]+/g, function(match){
			if (!source) return null;
			var prop = arguments[2] || arguments[1] || arguments[0];
			source = (prop in source) ? source[prop] : null;
			return match;
		});
		return source;
	},

	cleanValues: function(method){
		for (key in this)
		{
			if (this.has(key) && !(method || nil)(value))
			{
				this.erase(key);
			}
		}
		return this;
	},

	run: function(){
		var args = arguments;
		this.each(function(v, k){
			if (typeOf(v) == 'function') v.run(args);
		});
	}

});