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
			console.log(lang);
			var cascades = (data.languages[lang] || {}).cascades || [];
			cascades.combine(data.cascades);
			cascades.erase(lang).push(lang);
			console.log('cascades: ', cascades);
			var langs = cascades.map(function(lng){
				return data.languages[lng];
			}, this);
			console.log('cascade langs: ', langs);
			return $merge.apply(this, langs);
		},

		lambda: function(set) {
			(set||{}).get = function(key, args) {
				var key = arguments[0];
				return $lambda(set[key]).apply(this, $splat(args));
			};
			return set;
		},

		get: function(set, key){
			var lang = data.languages[this.getCurrentLanguage()];
			var cascaded = this.lambda(this.cascade(this.getCurrentLanguage())[set]);
			console.log('set: ', set, cascaded);
			if (key) return cascaded.get(key);
			return cascaded;
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