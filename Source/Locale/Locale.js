/*
---

script: Locale.js

name: Locale

description: Provides methods for localization.

license: MIT-style license

authors:
  - Aaron Newton
  - Arian Stolwijk

requires:
  - Core/Events
  - /Object.Extras
  - /MooTools.More

provides: [Locale]

...
*/

(function(){

var current = 'en-US',
	data = {},
	locales = {},
	inherits = {};

var Locale = this.Locale = {
	
	define: function(name, set, key, value){
		
		if (!data[name]) data[name] = {};
		
		if (!locales[name]) locales[name] = {
			
			define: function(set, key, value){
				var defineData = data[name][set];
				if (!defineData) defineData = {};
				
				if (key){
					if (typeOf(key) == 'object')
						defineData = Object.merge(defineData, key);
					else
						defineData[key] = value;
				}
				data[name][set] = defineData;
				
				return this;
			},
			
			get: function(key, args){
				var index = key.indexOf('.'),
					set = index < 0 ? key : key.substr(0, index),
					locales = getInheritedList(name, set).include('en-US');
				locales.unshift(name);
				
				for (var i = 0, l = locales.length; i < l; i++){
					var dataSet = data[locales[i]];
					if (!dataSet) continue;
	
					var value = Object.getFromPath(dataSet, key);
					if (value != null) return Type.isFunction(value) ? value.apply(null, Array.from(args)) : value;
				}
				return null;
			},
			
			inherit: function(locales, set){
				locales = Array.from(locales);
				
				if (!inherits[name]) inherits[name] = {
					locales: [],
					sets: {}
				};
				
				if (set && !inherits[name].sets[set]) inherits[name].sets[set] = [];
				
				var l = locales.length;
				while (l--) (set ? inherits[name].sets[set] : inherits[name].locales).unshift(locales[l]);
				
				return this;
			}
			
		};

		/*<1.2compat>*/
		if (set == 'cascade') return Locale.inherit(name, key);
		/*</1.2compat>*/
		
		if (set) locales[name].define(set, key, value);
		
		return locales[name];
	},
	
	use: function(name){
		if (locales[name]) current = name;
		this.fireEvent('change', name);

		/*<1.2compat>*/
		this.fireEvent('langChange', name);
		/*</1.2compat>*/
		
		return this;
	},
	
	getCurrent: function(){
		return current;
	},
	
	get: function(key, args){
		var locale = locales[current];
		return (locale) ? locale.get(key, args) : null;
	},
	
	inherit: function(name, inherits, set){
		var locale = locales[name];
		return (locale) ? locale.inherit(inherits, set) : null;
	},
	
	list: function(){
		return Object.keys(data);
	}
	
};

Object.append(Locale, new Events);	

var getInheritedList = function(name, set, _base){
	if (!_base) _base = [];
	var locales = Array.clone(_base),
		inherit = inherits[name];
	
	if (inherit){
		if (inherit.sets[set]) locales.combine(inherit.sets[set])
		locales.combine(inherit.locales);			
	}
	
	for (var i = 0, l = locales.length; i < l; i++) if(!_base.contains(locales[i])){
		locales.combine(getInheritedList(locales[i], set, locales));
	}
	
	return locales;		
};

/*<1.2compat>*/
var lang = MooTools.lang = {};
lang.setLanguage = Locale.use;
lang.getCurrentLanguage = Locale.getCurrent;
lang.set = Locale.define;
for (var key in Locale) lang[key] = Locale[key];

lang.get = function(set, key, args){
	if (key) set += '.' + key;

	return Locale.get(set, args);
};
/*</1.2compat>*/

})();
