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
			if (name == 'cascades'){
				this.setCascades(set);
				return this;
			}
			/*</1.2compat>*/

			data[name] = data[name] || {};
			data[name][set] = data[name][set] || {};
			if (typeOf(key) == 'object'){
				data[name][set] = Object.merge(data[name][set] || {}, key);
			} else {
				data[name][set][key] = value;
			}
			
			return this;
		},
		
		setCurrent: function(name){
			if (data[name]) current = name;
			this.fireEvent('change', name)/*<1.2compat>*/.fireEvent('langChange', name)/*</1.2compat>*/;
		},
		
		getCurrent: function(){
			return current;
		},
		
		get: function(key, args){
			var locales = cascades.clone().include('en-US');
			locales.unshift(current);

			for (var i = 0; i < locales.length; i++){
				var dataSet = data[locales[i]];
				if (!dataSet) continue;

				var value = Object.getFromPath(dataSet, key);
				if (value != null) return (typeof value == 'function') ? value.apply(null, Array.from(args)) : value;
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
	var lang = MooTools.lang = {};
	lang.setLanguage = Locale.setCurrent;
	lang.getCurrentLanguage = Locale.getCurrent;
	lang.set = Locale.define;
	for (var key in Locale) lang[key] = Locale[key];
	
	lang.get = function(set, key, args){
		if (key) set += '.' + key;

		return Locale.get(set, args);
	};
	/*</1.2compat>*/

})();
