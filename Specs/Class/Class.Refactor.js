/*
Script: Class.Refactor.js
	Specs for Class.Refactor.js

License:
	MIT-style license.
*/

(function(){
	var Test = new Class({
		options: {
			foo: 'bar',
			something: 'else'
		},
		untouched: function(){
			return 'untouched';
		},
		altered: function(){
			return 'altered';
		}
	});
	Test.static_method = function(){ return 'static';};
	Test = Class.refactor(Test, {
		options: { foo: 'rab' },
		altered: function(){
			return 'this is ' + this.parent();
		}
	});
	describe('Class.Refactor', {

		'should return an unaltered method': function(){
			value_of(new Test().untouched()).should_be('untouched');
		},

		'should return an altred method': function(){
			value_of(new Test().altered()).should_be('this is altered');
		},

		'should return an altered property': function(){
			value_of(new Test().options.foo).should_be('rab');
		},

		'should return an unaltered property': function(){
			value_of(new Test().options.something).should_be('else');
		}

	});
})();