
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Element.Event.Pseudos.Keys', function(){

	it('keys: should fire events for keyboard key combinations', function(){

		var callback = jasmine.createSpy(), called = false,
			callback2 = jasmine.createSpy(), called2 = false;

		document.body.addEvent('keydown:keys(shift+a)', callback);
		document.body.addEvent('keydown:keys(shift++)', callback2);

		// shift+a
		simulateEvent('type', ['[shift]a[shift-up]', document.body], function(){
			expect(callback).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});

		// shift++
		simulateEvent('type', ['[shift]+[shift-up]', document.body], function(){
			expect(callback2).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});

	});
	
	it('keys: should fire events for comma-separated combinations', function(){

		var callback = jasmine.createSpy(), called = false,
			callback2 = jasmine.createSpy(), called2 = false,
			callback3 = jasmine.createSpy(), called3 = false;

		document.body.addEvent('keydown:keys(j,e,shift+i)', function(e) {
			if (e.key == 'j') callback();
			if (e.key == 'e') callback2();
			if (e.key == 'i' && e.shift) callback3();
		});

		// j
		simulateEvent('type', ['j', document.body], function(){
			expect(callback).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});

		// e
		simulateEvent('type', ['e', document.body], function(){
			expect(callback2).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});
		
		// shift+i
		simulateEvent('type', ['[shift]i[shift-up]', document.body], function(){
			expect(callback3).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});

	});

});
