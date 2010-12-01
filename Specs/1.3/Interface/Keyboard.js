
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

	it('should bubble up the keyboard instances', function(){

		var callback = jasmine.createSpy(), called = false;

		var kb = new Keyboard({
			events: {']': callback},
			active: true
		});

		var kb2 = new Keyboard({
			manager: kb,
			active: true
		});

		var kb3 = new Keyboard({
			manager: kb2,
			active: true
		});

		expect(Keyboard.manager.instances.indexOf(kb3)).toBe(-1);

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

	it('drop a keyboard entirely', function(){

		var kb = new Keyboard();
		Keyboard.manager.drop(kb);
		expect(Keyboard.manager.instances.indexOf(kb)).toBe(-1);

	});


});
