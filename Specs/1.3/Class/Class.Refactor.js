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
			return 'this is ' + this.previous();
		}
	});
	var Test2 = new Class({
		altered: function(){
			return 'altered';
		}
	});
	Test2 = Class.refactor(Test2, {
		altered: function(){
			return 'this is ' + this.previous();
		}
	});
	Test2 = Class.refactor(Test2, {
		altered: function(){
			return this.previous() + ' for reals.';
		}
	});
	var Test3 = new Class({
	});
	Test3.prototype.origin = function(){
		return "original origin";
	};
	Test3 = Class.refactor(Test3, {
		origin: function(){
			return "refactored origin " + this.previous();
		}
	});

	describe('Class.Refactor', {

		'should return a method that has been altered twice': function(){
			expect(new Test2().altered()).toEqual('this is altered for reals.');
		},

		'should return an unaltered method': function(){
			expect(new Test().untouched()).toEqual('untouched');
		},

		'should return an altred method': function(){
			expect(new Test().altered()).toEqual('this is altered');
		},

		'should return an altered property': function(){
			expect(new Test().options.foo).toEqual('rab');
		},

		'should return an unaltered property': function(){
			expect(new Test().options.something).toEqual('else');
		},

		'should return the original origin': function(){
			expect(new Test3().origin()).toEqual('refactored origin original origin');
		}

	});
})();
