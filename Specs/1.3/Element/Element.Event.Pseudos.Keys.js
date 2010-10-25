
// Syn doesn't work really great in IE yet, needs a fix sometime
if (!Browser.ie) describe('Element.Event.Pseudos.Keys', function(){

	it('keys: should fire events for keyboard key combinations', function(){

		var callback = jasmine.createSpy(), called = false,
			callback2 = jasmine.createSpy(), called2 = false;

		document.body.addEvent('keydown:keys(shift+a)', callback);
		document.body.addEvent('keydown:keys(shift++)', callback2);

		// shift+a
		simulateEvent('type', ['[shift]a[shift-up]', document.body], function(){
			expect(callback).toHaveBeenCalled();
		});

		// shift++
		simulateEvent('type', ['[shift]+[shift-up]', document.body], function(){
			expect(callback2).toHaveBeenCalled();
		});

	});

});
