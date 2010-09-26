/*
Script: Events.Pseudos.js
	Specs for Events.Pseudos.js

License:
	MIT-style license.
*/

describe('Events.Pseudos', function(){

	it('tests the :once pseudo', function(){

		var fn = jasmine.createSpy('once pseudo');

		var e = new Events();
		e.addEvent('connect:once', fn);
		e.fireEvent('connect', 4);
		e.fireEvent('connect', 3);
		e.fireEvent('connect', 2);

		expect(fn).toHaveBeenCalledWith(4);
		expect(fn).not.toHaveBeenCalledWith(3);
		expect(fn).not.toHaveBeenCalledWith(2);

	});

	it('tests the Events.definePseudo function', function(){

		var eventFn =  function(){
			return 'bar';
		},
		eventArgs = ['one', 'two', 'three'];

		Events.definePseudo('test', function(split, fn, args){
			expect(split).toEqual({
				event: 'e',
				value: 'foo',
				pseudo: 'test',
				original: 'e:test(foo)'
			});
			expect(fn).toEqual(eventFn);
			expect(Array.from(args)).toEqual(eventArgs);
		});

		var e = new Events();
		e.addEvent('e:test(foo)', eventFn);
		e.fireEvent('e', eventArgs);

	});

	it('test for the fireEvent of the original function', function(){

		var fn = jasmine.createSpy('original event');

		var e = new Events();
		e.addEvent('click:once', fn);
		e.fireEvent('click:once', 'foo');

		expect(fn).toHaveBeenCalledWith('foo');

	});

});
