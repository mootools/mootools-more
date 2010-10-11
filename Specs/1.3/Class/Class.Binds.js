/*
Script: Class.Binds.js
	Specs for Class.Binds.js

License:
	MIT-style license.
*/
(function(){
	var Tester = new Class({
		Binds: 'getFoo',
		initialize: function(foo){
			this.foo = foo;
		},
		getFoo: function(){
			return this.foo;
		},
		test: function(){
			return [0].map(this.getFoo)[0];
		}
	});

	var Tester2 = new Class({
		initialize: function(foo){
			this.foo = foo;
		},
		getFoo: function(){
			return this.foo;
		},
		test: function(){
			return [0].map(this.getFoo)[0];
		}
	});

	var Tester3 = new Class({
		Implements: Options,
		Binds: ["getFoo"],
		initialize: function(foo){
			this.foo = foo;
			this.setOptions({a: 'b'});
		},
		getFoo: function(){
			return this.foo;
		},
		test: function(){
			return [0].map(this.getFoo)[0];
		}
	});

	var tester = new Tester('test');
	var tester2 = new Tester2('test');
	var tester3 = new Tester3('test');
	describe('Class.Binds', {

		'tests the autobinding functionality in the Binds Mutator': function(){
			expect(tester.test()).toEqual(tester.foo);
		},
		'verifies that the autobinding mutator is needed for the previous test to pass': function(){
			expect(tester2.test()).toNotEqual(tester2.foo);
		},
		'verfies that the setOptions invocation works properly': function(){
			expect(tester3.test()+tester3.options.a).toEqual(tester3.foo+'b');
		}


	});

})();


