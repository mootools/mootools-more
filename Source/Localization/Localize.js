(function(){
	var Localizer = new Class({
		Implements: Events,
		setLanguage: function(lang) {
			if (!MooTools.local.contains(language)) return;
			MooTools.local.language = lang;
			this.fireEvent('onLangChange', lang);
		},
		addLanguage: function(lang) {
			this.languages.include(lang);
		}
		language: 'enUS',
		languages: ['enUS']
	});
	MooTools.local = new Localizer();
});