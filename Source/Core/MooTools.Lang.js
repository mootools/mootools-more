(function(){

	//language data is protected so that access must be achieved through the methods in MooTools.lang
	var data = {
		//the current language
		language: 'usENG',
		//available languages
		languages: {
			usENG: {}
		},
		//default cascade order, cannot be modified by the user
		cascades: ['usENG']
	};

	MooTools.lang = new new Class({

		Implements: Events,

		//set the current language
		setLanguage: function(lang){
			//if there is no language for the one specified, return
			if (!data.languages[lang]) return;
			//set the language
			data.language = lang;
			//fire the event
			this.fireEvent('langChange', lang);
			return this;
		},

		//returns the current setting
		getCurrentLanguage: function(){
			return data.language;
		},

		//adds a new language system if not present
		addLanguage: function(lang){
			data.languages[lang] = data.languages[lang] || {};
			return this;
		},

		//takes the members of a language and fills in the missing parts with those present
		//in the cascade setting in that language or, if not defined, the default cascade
		//this ensures that language files that are incomplete have values for all settings
		cascade: function(lang){
			//the cascades are either the current language's casades or the
			//default global cascades
			var cascades = $A((data.languages[lang] || {}).cascades || data.cascades);
			//make sure the language specified is the last, so it's members gain preference
			cascades.erase(lang).push(lang);
			//get the sets for each language
			var langs = cascades.map(function(lng){
				return data.languages[this.getCurrentLanguage()];
			}, this);
			//merge them all and return them
			return $merge.apply(this, langs);
		},

		//gets a set for the current lang
		get: function(set){
			//returns a set of language values for the current language
			lang = data.languages[this.getCurrentLanguage()];
			//unlink the returned set to prevent any changes to the language data
			//return $unlink(this.cascade(lang)[set]);
			return this.cascade(lang)[set];
		},

		//set the values for a language set
		//lang = string, set = string, members = obj
		set: function(lang, set, members){
			//ensure the language exists in the data
			this.addLanguage(lang);
			//get the object
			langData = data.languages[lang];
			//i.e. MooTools.lang.set('enUs', 'Date', { <values> })
			//retreive the set so we can extend it
			if (!langData[set]) langData[set] = {};
			$extend(langData[set], members);
			//if the language altered is the current language, fire onLangChange so that
			//classes can update their local version, i.e.
			//MooTools.lang.addEvent('langChange', function(){
			//	Date.lang = MooTools.lang.get('Date');
			//});
			if (lang == this.getCurrentLanguage()) this.fireEvent('langChange', lang);
			return this;
		},

		list: function(){
			return $A(data.languages);
		}

	});

})();