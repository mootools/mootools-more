/*
Script: MooTools.Lang.js
	Specs for MooTools.Lang.js

License:
	MIT-style license.
*/
describe('MooTools.Lang', {

	'should return english form validator message': function(){
		value_of(MooTools.lang.get('FormValidator', 'required')).should_be('This field is required.');
	},
	
	'should cascade through to english': function(){
		MooTools.lang.setLanguage('gbENG');
		value_of(MooTools.lang.get('FormValidator', 'required')).should_be('This field is required.');
	},
	
	'should return french form validator message': function(){
		MooTools.lang.setLanguage('FR');
		value_of(MooTools.lang.get('FormValidator', 'required')).should_be('Ce champ est obligatoire.');
	}

});