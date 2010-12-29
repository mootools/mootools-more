/*
Script: Events.Pseudos.js
	Specs for Events.Pseudos.js

License:
	MIT-style license.
*/

describe('Events.Pseudos', function(){

	it('should implement Event.Pseudos in already existing classes defined in core', function(){
		var callback = jasmine.createSpy('complete'),
			fx = new Fx();

		fx.addEvent('complete:once', callback);
		fx.fireEvent('complete');
		expect(callback).toHaveBeenCalled();
	});

	describe('Multiple simultaneous pseudos', function(){

		var spy,
			e = new Events(),
			spies = {
			first: jasmine.createSpy(),
			second: jasmine.createSpy(),
			org: jasmine.createSpy()
		};

		it('should support adding events', function(){

			spy = function (split, fn, args){
				if (!split) {
					spies.org()
				} else {
					spies[split.pseudo]();
					if (split.value == 'org') fn.apply(this, args);
				}
			}

			Events.definePseudo('first', spy);
			Events.definePseudo('second', spy);
			e.addEvent('test:first(org):second', spy).fireEvent('test');

			expect(spies.first).toHaveBeenCalled();
			expect(spies.second).toHaveBeenCalled();
			expect(spies.org).toHaveBeenCalled();
		});

		it('should support removing events', function(){
			e.removeEvent('test:first(org):second', spy).fireEvent('test');
			expect(spies.first.callCount).toEqual(1);
			expect(spies.second.callCount).toEqual(1);
			expect(spies.org.callCount).toEqual(1);
		});

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

	describe(':once pseudo', function(){

		it('should only fire once', function(){
			var fn1 = jasmine.createSpy('once pseudo one'),
				fn2 = jasmine.createSpy('once pseudo two');

			var e = new Events();
			e.addEvent('connect:once', fn1).addEvent('connect:once', fn2);
			e.fireEvent('connect', 4);
			e.fireEvent('connect', 3);
			e.fireEvent('connect', 2);

			expect(fn1).toHaveBeenCalledWith(4);
			expect(fn1).not.toHaveBeenCalledWith(3);
			expect(fn1).not.toHaveBeenCalledWith(2);

			expect(fn2).toHaveBeenCalledWith(4);
			expect(fn2).not.toHaveBeenCalledWith(3);
			expect(fn2).not.toHaveBeenCalledWith(2);

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
				expect(this).toEqual(e);
			});

			e.addEvent('e:test(foo)', eventFn);
			e.fireEvent('e', eventArgs);

		});

		it('should call Pseudo function with split, fn, args, monitor and options', function(){

			var eventFn =  function(){ return 'bar'; },
				eventArgs = ['one', 'two', 'three'],
				options = {
					connect: {base: 'attach', args: [1, 2, 3]}
				},
				e = new Events();

			Events.definePseudo('test2', {
				listener: function(split, fn, args, monitor, options){
					expect(options).toEqual(options);
					console.log(this.$events, split.original);
					expect(this.$events[split.original][0]).toEqual(fn);
					expect(this.$events['attach'][0]).toEqual(monitor);
				},
				options: options
			});

			e.addEvent('connect:test2', eventFn);
			e.fireEvent('attach', eventArgs);

		});

	});

});
