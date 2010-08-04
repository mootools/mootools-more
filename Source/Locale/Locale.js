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
	
	['erase', 'include', 'reverse', 'sort', 'unshift', 'push', 'append', 'include'].each(function(method){
		cascadeMethods[method] = function(){
			cascades[method].apply(cascades, arguments);
		};
	});

	var Locale = this.Locale = {
		
		define: function(name, set, key, value){
			/*<1.2compat>*/
			if (name == 'cascades') return this.setCascades(set);
			/*</1.2compat>*/

			data[name] = data[name] || {};
			data[name][set] = data[name][set] || {};
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
			
			var value, localeData,
				locales = cascades.clone().include('en-US');
			locales.unshift(current);
			
			for(var i = 0; i < locales.length; i++){
				var currentData = data[locales[i]];
				if (key && currentData[set]){
					value = currentData ? Object.getFromPath(currentData[set], key) : null;
					if (value != null || value == 0) return (typeof value == 'function') ? value.apply(null, Array.from(args)) : value;
				} else if (currentData[set]){
					return currentData[set];
				}
			}
			
			return null;			
		},
		
		setCascades: function(value){
			cascades = Array.from(value);
		},
		
		getCascades: function(){
			return cascades;
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
	Locale.setLanguage = Locale.setCurrent;
	Locale.getCurrentLanguage = Locale.getCurrent;
	Locale.set = Locale.define;
	MooTools.lang = Locale;
	/*</1.2compat>*/

})();
