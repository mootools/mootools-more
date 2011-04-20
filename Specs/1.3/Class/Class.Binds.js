/*
---
name: Class.Binds Tests
requires: [More/Class.Binds]
provides: [Class.Binds.Tests]
...
*/
describe('Class.Binds', function(){

	it('should autobind methods', function(){

		var UnboundClass = new Class({
			context: function(){ return this; }
		});

		var BoundClass = new Class({
			Binds: ['context'],
			initialize: function(){},
			context: function(){ return this; }
		});

		var boundInstance = new BoundClass(),
			unboundInstance = new UnboundClass();

		expect(boundInstance.context.apply(false)).toEqual(boundInstance);
		expect(unboundInstance.context.apply(false)).not.toEqual(unboundInstance);

	});

	it('should work when initialize is not defined in class', function(){

		var BoundClassNoInit = new Class({
			Binds: ['context'],
			context: function(){ return this; }
		});

		var boundInstance = new BoundClassNoInit();
		expect(boundInstance.context.apply(false)).toEqual(boundInstance);

	});

	it('should work when Binds mutator is after initialize', function(){

		var BoundClass = new Class({
			initialize: function(){},
			context: function(){ return this; },
			Binds: ['context']
		});

		var boundInstance = new BoundClass();
		expect(boundInstance.context.apply(false)).toEqual(boundInstance);

	});

	it('should work with setOptions', function(){

		var BoundClass = new Class({
			Implements: [Options],
			Binds: ['getOption'],
			options: {option: false},
			initialize: function(options){ this.setOptions(options); },
			getOption: function(){ return this.options.option; }
		});

		expect(new BoundClass({option: true}).getOption.apply(false)).toEqual(true);

	});

	it('should retain binders from ancestors', function(){
		
		var Parent = new Class({
			Binds: ['foo'],
			fooValue: 'foo',
			foo: function(){
				return this.fooValue;
			}
		});
		
		var Child = new Class({
			Extends: Parent,
			Binds: ['bar'],
			barValue: 'bar',
			bar: function(){
				return this.barValue;
			}
		});
		expect(new Child().foo.apply(false)).toEqual('foo');
		expect(new Child().bar.apply(false)).toEqual('bar');
	});

});
