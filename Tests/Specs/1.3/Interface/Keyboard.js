/*
---
name: Keyboard Tests
requires: [More/Keyboard]
provides: [Keyboard.Tests]
...
*/
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Keyboard', function(){

	it('should deactivate and reactivate', function(){

		var onActivate = jasmine.createSpy(),
		onDeactivate = jasmine.createSpy(),

		kb = new Keyboard({
			onActivate: onActivate,
			onDeactivate: onDeactivate,
			active: true
		});

		// events

		kb.deactivate();
		expect(onDeactivate).toHaveBeenCalled();

		kb.activate();
		expect(onActivate).toHaveBeenCalled();

		expect(kb.isActive()).toEqual(true);

		// toggle

		kb.toggleActive();

		expect(kb.isActive()).toEqual(false);

		// options

		var kb2 = new Keyboard({
			active: true
		});

		expect(kb2.isActive()).toEqual(true);

	});

	it('should fire events for the given key combinations', function(){

		var callback = jasmine.createSpy(), called = false;

		var kb = new Keyboard({
			events: {
				'shift+;': callback
			},
			active: true
		});

		Syn.type('[shift];[shift-up]', document.body, function(){
			called = true;
		});

		waitsFor(2, function(){
			return called;
		});

		runs(function(){
			expect(callback).toHaveBeenCalled();
		});

	});

	it('should fire events for the + key', function(){

		var callback = jasmine.createSpy();

		var kb = new Keyboard({
			events: {
				'+': callback
			},
			active: true
		});

		Syn.type('+', document.body);

		expect(callback).toHaveBeenCalled();

	});

	xit('should bubble up the keyboard instances', function(){

		var callback = jasmine.createSpy(), called = false;

		var kb = new Keyboard({
			events: {']': callback}
		});

		var kb2 = new Keyboard({
			parent: kb
		});

		var kb3 = new Keyboard({
			parent: kb2,
			active: true
		});

		Syn.key(']', document.body, function(){
			called = true;
		});

		waitsFor(2, function(){
			return called;
		});

		runs(function(){
			expect(callback).toHaveBeenCalled();
		});

	});

	it('should fire the event on the onkeyup', function(){

		var callback = jasmine.createSpy(), called;

		var kb = new Keyboard({
			events: {
				'keyup:]': callback
			},
			active: true
		});

		Syn.key(']', document.body, function(){
			called = true;
		});

		waitsFor(2, function(){
			return called;
		});

		runs(function(){
			expect(callback).toHaveBeenCalled();
		});

	});


});
