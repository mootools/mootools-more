/*
Script: Events.Pseudos.js
	Specs for Events.Pseudos.js

License:
	MIT-style license.
*/

describe('Events.Pseudos', function(){

	it('should implement Event.Psuedos in already existing classes defined in core', function(){
		var callback = jasmine.createSpy('complete'),
			fx = new Fx();

		fx.addEvent('complete:once', callback);
		fx.fireEvent('complete');
		expect(callback).toHaveBeenCalled();
	});

	describe('Options', function(){

		var addEvent = jasmine.createSpy('addEvent'),
			removeEvent = jasmine.createSpy('removeEvent'),
			clickPseudoFn = jasmine.createSpy('clickPseudoFn');

		var myEvents = new Class({
				addEvent: addEvent,
				removeEvent: removeEvent
		});

		var pseudos = {
			pseudoFn: {
				listener: function(){},
				options: {
					click: {
						base: 'mouse',
						args: [2, 3, 4]
					}
				}
			}
		};

		var proto = myEvents.prototype;
		myEvents.implement(Events.Pseudos(pseudos, proto.addEvent, proto.removeEvent));
		var events = new myEvents();

		describe('addEvent', function(){

			it('should fire original event (click:pseudoFn)', function(){
				events.addEvent('click:pseudoFn', clickPseudoFn, 1);

				var origTypeArgs = addEvent.argsForCall[0];
				expect(addEvent.callCount).toEqual(2);
				expect(origTypeArgs[0]).toEqual('click:pseudoFn');
				expect(origTypeArgs[1]).toEqual(clickPseudoFn);
				expect(origTypeArgs.slice(2)).toEqual([1, 2, 3, 4]);
			});

			it('should fire event with monitor', function(){
				var pseudoArgs = addEvent.argsForCall[1];
				expect(pseudoArgs[0]).toEqual('mouse');
				expect(pseudoArgs.slice(2)).toEqual([1, 2, 3, 4]);
			});

		});

		describe('removeEvent', function(){

			it('should fire original event (click:pseudoFn)', function(){
				events.removeEvent('click:pseudoFn', clickPseudoFn, 1);

				var removeOrigArgs = removeEvent.argsForCall[0];
				expect(removeEvent.callCount).toEqual(2);
				expect(removeOrigArgs[0]).toEqual('click:pseudoFn');
				expect(removeOrigArgs[1]).toEqual(clickPseudoFn);
				expect(removeOrigArgs.slice(2)).toEqual([1, 2, 3, 4]);
			});

			it('should fire event with monitor', function(){
				var removePseudoArgs = removeEvent.argsForCall[1];
				expect(removePseudoArgs[0]).toEqual('mouse');
				expect(removePseudoArgs.slice(2)).toEqual([1, 2, 3, 4]);
			});

		});

	});

	describe(':once pseudo', function(){

		it('should only fire once', function(){
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

		it('should call the original event callback', function(){
			var fn = jasmine.createSpy('original event'),
				e = new Events();

			e.addEvent('click:once', fn);
			e.fireEvent('click:once', 'foo');

			expect(fn).toHaveBeenCalledWith('foo');
		});

	});

	describe('Events.definePseudo', function(){

		it('should call Pseudo function with split, fn, and args', function(){

			var eventFn =  function(){ return 'bar'; },
				eventArgs = ['one', 'two', 'three'],
				e = new Events();

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

			e.addEvent('e:test(foo)', eventFn);
			e.fireEvent('e', eventArgs);

		});

	});

});
