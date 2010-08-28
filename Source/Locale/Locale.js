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
	locales = {},
	inherits = {};

var Locale = this.Locale = {
	
	define: function(locale, set, key, value){
		
		if (instanceOf(locale, Locale.Set)){
			var name = locale.name;
			locales[name] = locale;
		} else {
			var name = locale;
			if (!locales[name]) locale = locales[name] = new Locale.Set(name);
			if (set) locales[name].define(set, key, value);
		}

		/*<1.2compat>*/
		if (set == 'cascade') return Locale.inherit(name, key);
		/*</1.2compat>*/
		
		return locale;
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
		return (locale) ? locale.get(key, args) : '';
	},
	
	getSet: function(){
		return locales[current];
	},
	
	inherit: function(name, inherits, set){
		var locale = locales[name];
		if (locale) locale.inherit(inherits, set);
		return Locale;
	},
	
	list: function(){
		return Object.keys(data);
	}
	
};

Object.append(Locale, new Events);	

Locale.Set = new Class({

	sets: {},
	
	inherits: {
		locales: [],
		sets: {}
	},

	initialize: function(name){
		this.name = name;
	},

	define: function(set, key, value){
		var defineData = this.sets[set];
		if (!defineData) defineData = {};
		
		if (key){
			if (typeOf(key) == 'object') defineData = Object.merge(defineData, key);
			else defineData[key] = value;
		}
		this.sets[set] = defineData;
		
		return this;
	},
	
	get: function(key, args, _base){
		var value = Object.getFromPath(this.sets, key);
		if (value != null) return Type.isFunction(value) ? value.apply(null, Array.from(args)) : value;
		
		// get value of inherited locales
		var index = key.indexOf('.'),
			set = index < 0 ? key : key.substr(0, index),
			names = (this.inherits.sets[set] || []).combine(this.inherits.locales).include('en-US');
		
		for (var i = 0, l = names.length; i < l; i++){
			if (_base.contains(names[i])) continue;
			_base.include(names[i]);
			
			var locale = locales[names[i]];
			if (!locale) continue;
			
			var value = locale.get(key, args, _base);
			if (value != null) return value;
		}
		
		return '';
	},
	
	inherit: function(names, set){
		names = Array.from(names);
		
		if (set && !this.inherits.sets[set]) this.inherits.sets[set] = [];
		
		var l = names.length;
		while (l--) (set ? this.inherits.sets[set] : this.inherits.locales).unshift(names[l]);
		
		return this;
	}
			
});

/*<1.2compat>*/
var lang = MooTools.lang = {
	setLanguage: Locale.use,
	getCurrentLanguage: Locale.getCurrent,
	set: Locale.define
};

Object.append(lang, Locale);

lang.get = function(set, key, args){
	if (key) set += '.' + key;

	return Locale.get(set, args);
};
/*</1.2compat>*/

})();
