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

	it('tests if the already existing classes, defined in core, also implemented Events.Pseudos', function(){
		var callback = jasmine.createSpy('complete');
		var fx = new Fx();
		fx.addEvent('complete:once', callback);
		fx.fireEvent('complete');
		expect(callback).toHaveBeenCalled();
	});

	it('should test the options of Events.Pseudos', function(){
		var addEvent = jasmine.createSpy('addEvent');
		var removeEvent = jasmine.createSpy('removeEvent');
		var clickPseudoFn = jasmine.createSpy('clickPseudoFn');

		var myEvents = new Class({
			addEvent: addEvent,
			removeEvent: removeEvent
		});

		var pseudos = {
			pseudoFn: [function(){}, {
				click: {
					base: 'mouse',
					args: [2, 3, 4]
				}
			}]
		};

		var proto = myEvents.prototype;
		myEvents.implement(Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent));

		events = new myEvents();
		events.addEvent('click:pseudoFn', clickPseudoFn, 1);

		// Fired original event (click:speudoFn)
		var origTypeArgs = addEvent.argsForCall[0];
		expect(addEvent.callCount).toEqual(2);
		expect(origTypeArgs[0]).toEqual('click:pseudoFn');
		expect(origTypeArgs[1]).toEqual(clickPseudoFn);
		expect(origTypeArgs.slice(2)).toEqual([1, 2, 3, 4]);

		// Fired event with monitor
		var pseudoArgs = addEvent.argsForCall[1];
		expect(pseudoArgs[0]).toEqual('mouse');
		expect(pseudoArgs.slice(2)).toEqual([1, 2, 3, 4]);


		events.removeEvent('click:pseudoFn', clickPseudoFn, 1);

		// Fired original event (click:speudoFn)
		var removeOrigArgs = removeEvent.argsForCall[0];
		expect(removeEvent.callCount).toEqual(2);
		expect(removeOrigArgs[0]).toEqual('click:pseudoFn');
		expect(removeOrigArgs[1]).toEqual(clickPseudoFn);
		expect(removeOrigArgs.slice(2)).toEqual([1, 2, 3, 4]);

		// Fired event with monitor
		var removePseudoArgs = removeEvent.argsForCall[1];
		expect(removePseudoArgs[0]).toEqual('mouse');
		expect(removePseudoArgs.slice(2)).toEqual([1, 2, 3, 4]);

	});

});
