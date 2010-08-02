/*
---

script: MooTools.Lang.js

name: MooTools.Lang

description: Provides methods for localization.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Events
  - /MooTools.More

provides: [Lang]

...
*/

(function(){

	var currentLanguage = 'en-US',
	
	languagesData = {
		'en-US': {}
	};

	var MooLanguage = MooTools.lang = {
		
		// Everything should be define
		defineLanguageSet: function(lang, name, data){
			languagesData[lang] = languagesData[lang] || {};
			languagesData[lang][name] = Object.merge(languagesData[lang][name] || {}, data);
		},
		
		// setCurrentLanguage makes more sense than setLanguage imo
		setCurrentLanguage: function(lang){
			if (languagesData[lang]) currentLanguage = lang;
			this.fireEvent('langChange', lang);
		},
		
		getCurrentLanguage: function(){
			return currentLanguage;
		},
		
		get: function(set, key, args){
			/*<1.2compat>*/ // this method should only get the strings/functions and not whole sets. 
			if (!key) return this.getLanguageSet(set);
			/*<1.2compat>*/
			var currentLanguageData = languagesData[currentLanguage],
				languageData, value,
				languages = [currentLanguage];
				
			if (currentLanguageData.cascade) languages.extend(currentLanguageData.cascades);
			languages.include('en-US'); // default fallback
			
			for(var i = 0; i < languages.length; i++){
				languageData = languagesData[languages[i]];
				if (languageData[set] && languageData[set][key]){
					value = languageData[set][key];
					return typeof value == 'function' ? value.apply(null, Array.from(args)) : value; 
				}
			}
			
			return null;			
		},
		
		set: function(lang, name, key){
			if (typeOf(key) == 'object') return this.defineLanguageSet(lang, name, key);
			if (languageData[lang]) languageData[lang][name] = key;
		},
		
		getLanguageSet: function(set){
			return languagesData[currentLanguage][set];
		}
		
	};

	// easy way to 'mess' with the cascades... i would see another name for 'cascades'. 
	// makes less sense to me (A Dutch person)
	var getCascadeMethods = function(){
		var cascadeMethods = {}, 
			currentCascades = languagesData[currentLanguage].cascades || [];
			
		['slice', 'erase', 'include', 'reverse', 'sort'].each(function(method){
			cascadeMethods[method] = function(){
				languagesData[currentLanguage].cascades = Array[method].apply(currentCascades, arguments);
			};
		});
		
		return cascadeMethods;
	};

	MooLanguage.cascades = function(){
		return getCascadeMethods();
	};

	// for the one fireEvent
	Object.append(MooLanguage, new Events());
	
	/*<1.2compat>*/
	MooLanguage.setLanguage = MooLanguage.setCurrentLanguage;
	/*</1.2compat>*/

})();
