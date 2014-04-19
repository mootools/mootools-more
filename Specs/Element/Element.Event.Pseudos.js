/*
---
name: Element.Event.Pseudos Tests
requires: [More/Element.Event.Pseudos, Core/Request.JSON]
provides: [Element.Event.Pseudos.Tests]
...
*/
describe('Element.Event.Pseudos', function(){

	it('tests the DOMEvent.definePseudo function', function(){

		var eventFn =  function(){
			return 'bar';
		},
		eventArgs = ['one', 'two', 'three'];

		DOMEvent.definePseudo('test', function(split, fn, args){
			expect({
				event: split.event,
				value: split.value,
				pseudo: split.pseudo,
				original: split.original
			}).toEqual({
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
			var spy = jasmine.createSpy('click');
			var element = new Element('div');
			element.addEvent('click:once', spy);
			element.fireEvent('click');

			expect(spy.callCount).toEqual(1);
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

