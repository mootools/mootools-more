/*
---

script: MooTools.Lang.js

name: MooTools.Lang

description: Provides methods for localization.

license: MIT-style license

authors:
  - Aaron Newton
  - Arian Stolwijk

requires:
  - Core/Events
  - /Object.Extras
  - /MooTools.More

provides: [Lang, Locale]

...
*/

(function(){

	var current = 'en-US',
	
	data = {
		'en-US': {}
	},
	
	cascades = [],

	cascadeMethods = {};
	
	['erase', 'include', 'reverse', 'sort', 'unshift', 'push', 'extend', 'include'].each(function(method){
		cascadeMethods[method] = function(){
			cascades[method].apply(cascades, arguments);
		};
	});

	var Locale = this.Locale = {
		
		define: function(name, set, key, value){
			/*<1.2compat>*/
			if(set == 'cascades') return this.setCascades(key);
			/*</1.2compat>*/

			data[name] = data[name] || {set: {}};
			if (typeOf(key) == 'object'){
				data[name][set] = Object.merge(data[name][set] || {}, key);
			} else {
				data[name][set][key] = value;
			}
		},
		
		setCurrent: function(name){
			if (data[name]) current = name;
			this.fireEvent('change', name)/*<1.2compat>*/.fireEvent('langChange', name)/*</1.2compat>*/;
		},
		
		getCurrent: function(){
			return current;
		},
		
		get: function(set, key, args){
			
			key = (set.indexOf('.') < 0 && key) ? (set + '.' + key) : set;
					
			var value, localeData,
				locales = Array.clone(cascades).include('en-US');
			locales.unshift(current);
			
			for(var i = 0; i < locales.length; i++){
				var currentData = data[locales[i]];
				value = currentData ? Object.getFromPath(currentData, key) : null;
				if (value != null || value == 0) return typeof value == 'function' ? value.apply(null, Array.from(args)) : value;
			}
			
			return null;			
		},
		
		setCascades: function(value){
			cascades = Array.from(value);
		},
		
		cascades: function(){
			return cascadeMethods;
		},
		
		list: function(){
			return Object.keys(data);
		}
		
	};

	Object.append(Locale, new Events());	
	
	/*<1.2compat>*/
	Locale.setLanguage = Locale.setCurrentLocale;
	Locale.set = Locale.define;
	Locale.setlanguage = Locale.setCurrent;
	MooTools.lang = Locale;
	/*</1.2compat>*/

})();
