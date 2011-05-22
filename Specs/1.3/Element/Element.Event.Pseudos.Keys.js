
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Element.Event.Pseudos.Keys', function(){

	it('keys: should fire events for keyboard key combinations', function(){

		var callback = jasmine.createSpy(), called = false,
			callback2 = jasmine.createSpy(), called2 = false,
			callback3 = jasmine.createSpy(), called3 = false,
			callback4 = jasmine.createSpy(), called4 = false;

		document.body.addEvent('keydown:keys(shift+a)', callback);
		document.body.addEvent('keydown:keys(shift++)', callback2);
		document.body.addEvent('keydown:keys(shift+,)', callback3);
		document.body.addEvent('keydown:keys(,)', callback4);

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
		
		// shift+,
		simulateEvent('type', ['[shift],[shift-up]', document.body], function(){
			expect(callback3).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});
		
		// ,
		simulateEvent('type', [',', document.body], function(){
			expect(callback4).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});

	});
	
	
	it('keys: should support multiple keys separated by comma', function(){
		var callback = jasmine.createSpy(), called = false;
		
		document.body.addEvent('keydown:keys(shift++,delete, , , +)', callback);
		
		// shift++
		simulateEvent('type', ['[shift]+[shift-up]', document.body], function(){
			expect(callback).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});
		
		// delete
		simulateEvent('type', ['[delete]', document.body], function(){
			expect(callback).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});
		
		// ,
		simulateEvent('type', [',', document.body], function(){
			expect(callback).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});
		
		// +
		simulateEvent('type', ['+', document.body], function(){
			expect(callback).toHaveBeenCalled();
			document.body.eliminate('$moo:keys-pressed');
		});
		
	});

});
