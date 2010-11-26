/*
Script: Element.Pseudos.js
	Specs for Element.Pseudos.js

License:
	MIT-style license.
*/

describe('Element.Event.Pseudos', function(){

	it('tests the Event.definePseudo function', function(){

		var eventFn =  function(){
			return 'bar';
		},
		eventArgs = ['one', 'two', 'three'];

		Event.definePseudo('test', function(split, fn, args){
			expect(split).toEqual({
				event: 'e',
				value: 'foo',
				pseudo: 'test',
				original: 'e:test(foo)'
			});
			expect(fn).toEqual(eventFn);
			expect(Array.from(args)).toEqual(eventArgs);
		});

		var element = new Element('div');
		element.addEvent('e:test(foo)', eventFn);
		element.fireEvent('e', eventArgs);

	});

	describe('pseudos', function(){

		it('once: should fire the event once', function(){

			var i = 0;

			var database = new Class({
				Implements: Events,

				connect: function(){
					return this.fireEvent('connect');
				}
			});

			var db = new database();
			db.addEvent('connect:once', function(){
				i++;
			});
			db.connect().connect();

			expect(i).toEqual(1);

		});

	});

	// Test if Events.Pseudos is implemented in Fx.Tween and Request.JSON
	it('should test if Events.Pseudos is implemented in Fx.Tween and Request.JSON', function(){
		var reqComplete = jasmine.createSpy('requestComplete');
		var req = new Request.JSON().addEvent('complete:once', reqComplete);
		req.fireEvent('complete');
		expect(reqComplete).toHaveBeenCalled();
	});

});

