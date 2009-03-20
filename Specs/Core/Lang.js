/*
Script: Lang.js
	Specs for Lang.js

License:
	MIT-style license.
*/

// In the specs there is only english available
MooTools.lang.set('fr-FR', 'FormValidator', {
	required: 'Ce champ est obligatoire.'
});

describe('Lang', {

	'should return english form validator message': function(){
		value_of(MooTools.lang.get('FormValidator', 'required')).should_be('This field is required.');
	},
	
	'should cascade through to english': function(){
		MooTools.lang.setLanguage('en-GB');
		value_of(MooTools.lang.get('FormValidator', 'required')).should_be('This field is required.');
	},
	
	'should return french form validator message': function(){
		MooTools.lang.setLanguage('fr-FR');
		value_of(MooTools.lang.get('FormValidator', 'required')).should_be('Ce champ est obligatoire.');
	}

});