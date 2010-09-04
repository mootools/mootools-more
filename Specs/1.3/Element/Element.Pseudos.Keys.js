
describe('Element.Pseudos.Keys', function(){

	it('keys: should fire events for keyboard key cobinations', function(){
		
		var callback = jasmine.createSpy(), called = false,
			callback2 = jasmine.createSpy(), called2 = false;
		
		document.body.addEvent('keydown:keys(shift+a)', callback);
		document.body.addEvent('keydown:keys(shift+b)', callback2);
		
		Syn.type('[shift]a[shift-up]', document.body, function(){
			called = true;
		});
		
		Syn.type('[shift]b[shift-up]', document.body, function(){
			called2 = true;
		});

		waitsFor(2, function(){
			return called && called2;
		});
		
		runs(function(){
			expect(callback).toHaveBeenCalled();
			expect(callback2).toHaveBeenCalled();
		});	
	
	});

});
