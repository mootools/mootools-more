/*
Script: Validation.js
	Specs for Validation.js

License:
	MIT-style license.
*/

describe('Validation', function(){

	it('should do a simple validation', function(){
		var validation = new Validation('required');
		expect(validation.validate('')).toBeFalsy();
		expect(validation.validate('Moo!!')).toBeTruthy();
	});

	it('should add a rule', function(){
		var validation = new Validation();
		validation.addRule('empty');
		expect(validation.rules.length).toEqual(1);
	});

	it('should define, add and validate a rule with options', function(){
		var spy = jasmine.createSpy('MyTestingRuleWithOptions');
		Validation.defineRule('MyTestingRuleWithOptions', spy);

		var value = 'MyTestValue', options = {first: 1, second: 2, third: 3};
		var validation = new Validation({
			name: 'MyTestingRuleWithOptions',
			options: options
		});
		validation.validate(value);

		expect(spy).toHaveBeenCalledWith(value, options);
	});

	it('should fire the failure event with the failed rules', function(){
		Validation.defineRules({
			MyErrorNamesTest1: Function.from(false),
			MyErrorNamesTest2: Function.from(false),
			MyErrorNamesTest3: Function.from(false),
			MyErrorNamesTest4: Function.from(false)
		});

		var ruleNames = [
			'MyErrorNamesTest1',
			'MyErrorNamesTest2',
			'MyErrorNamesTest3',
			'MyErrorNamesTest4'
		];

		var testOption = {foo: 'testOption'};

		var val = new Validation(ruleNames.slice(0, 3));
		val.addRule('MyErrorNamesTest4', testOption);

		var errors = [];
		val.addEvent('failure', function(rules){
			errors = rules;
		});

		var res = val.validate('foo');

		expect(res).toEqual(false);

		errors.each(function(error, i){
			expect(error.name).toEqual(ruleNames[i]);
			expect(error.value).toEqual('foo');
		});

		expect(errors[3].options).toEqual(testOption);
	});

	it('should test the Validation.validate shortcut', function(){
		expect(Validation.validate({
			name: 'between',
			options: {min: 3, max: 6}
		}, 5)).toBeTruthy();
		expect(Validation.validate('empty', '')).toBeTruthy();
		expect(Validation.validate('empty', 'asdf')).toBeFalsy();
	});

	it('should validate when a defined rule returns a object', function(){
		var returnedErrors = [1, 2, 3];
		Validation.defineRule('ObjectRule', function(){
			return {passed: false, errors: returnedErrors};
		});

		// Shortcut function
		expect(Validation.validate('ObjectRule', 'moo')).toBeFalsy();

		// using the Validation Class
		var val = new Validation('ObjectRule');
		expect(val.validate('moo')).toBeFalsy();

		// Checking the errors
		val.getErrors().each(function(error, i){
			expect(error.error).toEqual(returnedErrors[i]);
			expect(error.name).toEqual('ObjectRule');
			expect(error.value).toEqual('moo');
		});
	});

	describe('Async Rules', function(){

		Validation.defineAsyncRule('async1', function(value, options, progress){
			progress.delay(2, null, options.val && value == options.val);
		});
		Validation.defineAsyncRule('async2', function(value, options, progress){
			progress.delay(2, null, options.res);
		});

		it('should validate the asyn rules', function(){

			var success = jasmine.createSpy('success'),
				failure = jasmine.createSpy('failure'),
				progress = jasmine.createSpy('progress');

			Validation.validate([
				{name: 'async1', options: {val: 'foo'}},
				{name: 'async2', options: {res: true}}
			], 'foo', success, failure, progress);

			waits(30);

			runs(function(){
				expect(success).toHaveBeenCalled();
				expect(failure).not.toHaveBeenCalled();
				expect(progress.callCount).toEqual(2);
			});

		});

	});

	describe('Default Rules', function(){

		it('should test the empty rule', function(){
			var val = new Validation('empty');
			expect(val.validate('')).toBeTruthy();
			expect(val.validate('meh')).toBeFalsy();
		});

		it('should test the required rule', function(){
			var val = new Validation('required');
			expect(val.validate('foo')).toBeTruthy();
			expect(val.validate('')).toBeFalsy();
		});

		it('should test the equals rule', function(){
			var val = new Validation();
			val.addRule('equals', {equals: 'mootools'});
			expect(val.validate('mootools')).toBeTruthy();
			expect(val.validate('moo')).toBeFalsy();
		});

		it('should test the between rule', function(){
			var validation = new Validation();
			validation.addRule('between', {min: 1, max: 5});
			expect(validation.validate(3)).toBeTruthy();
			expect(validation.validate(0.5)).toBeFalsy();
			expect(validation.validate(7)).toBeFalsy();
		});

		it('should test the minLength rule', function(){
			var validation = new Validation();
			validation.addRule('minLength', {minLength: 4});
			expect(validation.validate('mooing')).toBeTruthy();
			expect(validation.validate('moo')).toBeFalsy();
		});

		it('should test the maxLength rule', function(){
			var validation = new Validation();
			validation.addRule('maxLength', {maxLength: 4});
			expect(validation.validate('moo')).toBeTruthy();
			expect(validation.validate('mooing')).toBeFalsy();
		});

	});

});
