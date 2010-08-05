/*
Script: Locale.js
	Specs for Locale.js

License:
	MIT-style license.
*/


describe('Locale', function(){

	// In the specs there is only english available
	Locale.define('fr-FR', 'Form.Validator', {
		required: 'Ce champ est obligatoire.'
	});


	it('should return english form validator message', function(){
		expect(Locale.get('Form.Validator', 'required')).toEqual('This field is required.');
	});
	
	it('should cascade through to english', function(){
		Locale.setCurrent('en-GB');
		expect(Locale.get('Form.Validator', 'required')).toEqual('This field is required.');
	});
	
	it('should return french form validator message', function(){
		var old = Locale.getCurrent();
		Locale.setCurrent('fr-FR');
	
		expect(Locale.get('Form.Validator', 'required')).toEqual('Ce champ est obligatoire.');
	
		Locale.setCurrent(old);
	});
	
	it('should test cascades set/get and cascades().* methods', function(){
	
		Locale.setCascades('fr-FR', ['nl-NL', 'en-GB']);
		
		var old = Locale.getCurrent();
		Locale.setCurrent('fr-FR');
	
		expect(Locale.getCascades()).toEqual(['nl-NL', 'en-GB']);
		
		Locale.cascades().push('ca-CA');
		expect(Locale.getCascades()).toEqual(['nl-NL', 'en-GB', 'ca-CA']);
	
		Locale.cascades().unshift('da-DK');
		expect(Locale.getCascades()).toEqual(['da-DK', 'nl-NL', 'en-GB', 'ca-CA']);

		Locale.setCurrent(old);
		
	});
	
	it('should return the right locale name', function(){
		var old = Locale.getCurrent();
		
		Locale.setCurrent('fr-FR');
		expect(Locale.getCurrent()).toEqual('fr-FR');
		Locale.setCurrent('non-existsing');
		expect(Locale.getCurrent()).toEqual('fr-FR');
		
		Locale.getCurrent(old);
	});

});
