/*
Script: Locale.js
	Specs for Locale.js

License:
	MIT-style license.
*/

// In the specs there is only english available
Locale.define('fr-FR', 'FormValidator', {
	required: 'Ce champ est obligatoire.'
});

describe('Lang', {

	'should return english form validator message': function(){
		if (MooTools.lang) expect(MooTools.lang.get('FormValidator', 'required')).toEqual('This field is required.');
		
		expect(Locale.get('FormValidator.required')).toEqual('This field is required.');
	},
	
	'should cascade through to english': function(){
		Locale.setCurrent('en-GB');
		expect(Locale.get('FormValidator.required')).toEqual('This field is required.');
	},
	
	'should return french form validator message': function(){
		Locale.setCurrent('fr-FR');
		expect(Locale.get('FormValidator.required')).toEqual('Ce champ est obligatoire.');
	}

});