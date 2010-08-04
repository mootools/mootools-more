/*
Script: Locale.js
	Specs for Locale.js

License:
	MIT-style license.
*/

// In the specs there is only english available
Locale.define('fr-FR', 'Form.Validator', {
	required: 'Ce champ est obligatoire.'
});

describe('Lang', {

	'should return english form validator message': function(){
		value_of(Locale.get('Form.Validator', 'required')).should_be('This field is required.');
	},
	
	'should cascade through to english': function(){
		Locale.setCurrent('en-GB');
		value_of(Locale.get('Form.Validator', 'required')).should_be('This field is required.');
	},
	
	'should return french form validator message': function(){
		Locale.setCurrent('fr-FR');
		value_of(Locale.get('Form.Validator', 'required')).should_be('Ce champ est obligatoire.');
	}

});