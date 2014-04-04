/*
---
name: Events.Pseudos Tests
requires: [More/Events.Pseudos]
provides: [Events.Pseudos.Tests]
...
*/

describe('Events.Pseudos', function(){

	it('should implement DOMEvent.Psuedos in already existing classes defined in core', function(){
		var callback = jasmine.createSpy('complete'),
			fx = new Fx();

		fx.addEvent('complete:once', callback);
		fx.fireEvent('complete').fireEvent('complete');

		expect(callback).toHaveBeenCalled();
		expect(callback.callCount).toEqual(1);
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

	describe(':throttle pseudo', function(){

		it('should only fire once in a certain timespan', function(){
			//adding this extra pause here as otherwise this test fails intermittently when run with other tests for some reason - aaron
			waits(100);
			runs(function(){
			var fn1 = jasmine.createSpy(':throttle pseudo one'),
				fn2 = jasmine.createSpy(':throttle pseudo two'),
				events = new Events();

			events.addEvents({
				'scroll:throttle': fn1,
				'scroll:throttle(500)': fn2
			});

			for (var i = 20; i--;) events.fireEvent('scroll');

			// They should fire directly
			expect(fn1.callCount).toEqual(1);
			expect(fn2.callCount).toEqual(1);

			waits(375);

			runs(function(){

				// default time is 250, so firing scroll after 250 ms would fire the fist event
				for (var i = 20; i--;) events.fireEvent('scroll');

				expect(fn1.callCount).toEqual(2);
				expect(fn2.callCount).toEqual(1);

			});

			waits(500);

			runs(function(){

				// After another 500 ms all timeouts are cleared so both events will get called
				for (var i = 20; i--;) events.fireEvent('scroll');

				expect(fn1.callCount).toEqual(3);
				expect(fn2.callCount).toEqual(2);

			});
			});

		});

	});

	describe(':pause pseudo', function(){

		var events = new Events(),
			fn = jasmine.createSpy('pause event');

		it('should pause the event for 200 ms', function(){
			events.addEvent('code:pause(200)', fn);
			events.fireEvent('code', 1);
			events.fireEvent('code', 2);
			events.fireEvent.delay(400, events, 'code');

			expect(fn).not.toHaveBeenCalled();

			waits(300);

			runs(function(){
				expect(fn).toHaveBeenCalledWith(2);
				expect(fn.callCount).toEqual(1);
			});

			waits(400);

			runs(function(){
				// the delayed event should have fired
				expect(fn.callCount).toEqual(2);
			});

		});
	});

	describe('Events.definePseudo', function(){

		it('should call Pseudo function with split, fn, and args', function(){

			var eventFn =  function(){ return 'bar'; },
				eventArgs = ['one', 'two', 'three'],
				e = new Events();

			Events.definePseudo('test', function(split, fn, args){
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
				expect(this).toEqual(e);
			});

			e.addEvent('e:test(foo)', eventFn);
			e.fireEvent('e', eventArgs);

		});

	});

	describe('Multiple simultaneous pseudos', function(){

		var spy,
			myMonitor,
			order = [],
			e = new Events(),
			spies = {
			first: jasmine.createSpy(),
			second: jasmine.createSpy(),
			org: jasmine.createSpy()
		};

		it('should support adding events', function(){
			spy = function (split, fn, args, monitor){
				if (!split) spies.org();
				else spies[split.pseudo]();
				order.push(split ? split.pseudo : 'org');
				if (monitor) myMonitor = monitor;
				if (fn) fn.apply(this, args);
			};

			Events.definePseudo('first', spy);
			Events.definePseudo('second', spy);
			e.addEvent('test:first(org):second', spy).fireEvent('test');

			expect(spies.first).toHaveBeenCalled();
			expect(spies.second).toHaveBeenCalled();
			expect(spies.org).toHaveBeenCalled();

			expect(spies.first.callCount).toEqual(1);
			expect(spies.second.callCount).toEqual(1);
			expect(spies.org.callCount).toEqual(1);
		});

		it('should execute pseudos from left to right', function(){
			expect(order).toEqual(['first', 'second', 'org']);
		});

		it('should not remove event if inexact event string is provided', function(){
			e.removeEvent('test:first(org)', spy);
			expect(e.$events['test:first(org):second'][0]).toEqual(spy);
			expect(e.$events['test'][0]).toEqual(myMonitor);
		});

		it('should remove event only if exact event string is provided', function(){
			e.removeEvent('test:first(org):second', spy);
			expect(e.$events['test:first(org):second'][0]).not.toEqual(spy);
			expect(e.$events['test'][0]).not.toEqual(myMonitor);
		});

	});

});
