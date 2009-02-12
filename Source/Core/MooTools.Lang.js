/*
Script: MooTools.Lang.js
	Provides methods for localization.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

(function(){

	var data = {
		language: 'usENG',
		languages: {
			usENG: {}
		},
		cascades: ['usENG']
	};

	MooTools.lang = new new Class({

		Implements: Events,

		setLanguage: function(lang){
			if (!data.languages[lang]) return;
			data.language = lang;
			this.fireEvent('langChange', lang);
			return this;
		},

		getCurrentLanguage: function(){
			return data.language;
		},

		addLanguage: function(lang){
			data.languages[lang] = data.languages[lang] || {};
			return this;
		},

		cascade: function(lang){
			var cascades = $A((data.languages[lang] || {}).cascades || data.cascades);
			cascades.erase(lang).push(lang);
			var langs = cascades.map(function(lng){
				return data.languages[this.getCurrentLanguage()];
			}, this);
			return $merge.apply(this, langs);
		},

		get: function(set){
			lang = data.languages[this.getCurrentLanguage()];
			return this.cascade(lang)[set];
		},

		set: function(lang, set, members){
			this.addLanguage(lang);
			langData = data.languages[lang];
			if (!langData[set]) langData[set] = {};
			$extend(langData[set], members);
			if (lang == this.getCurrentLanguage()) this.fireEvent('langChange', lang);
			return this;
		},

		list: function(){
			return $A(data.languages);
		}

	});

})();