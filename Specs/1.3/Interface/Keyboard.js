
describe('Keyboard', function(){
	
	it('should deactivate and reactivate', function(){

		var onActivate = jasmine.createSpy(),
		onDeactivate = jasmine.createSpy(),
		
		kb = new Keyboard({
			onActivate: onActivate,
			onDeactivate: onDeactivate
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
	
	xit('should fire events for the given key combinations', function(){
		
		var callback = jasmine.createSpy(), called = false;
		
		var kb = new Keyboard({
			events: {
				';': callback
			},
			active: true
		});
		
		Syn.key(';', document.body, function(){
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
	
	xit('should fire the event on the onkeyup', function(){ // does not work yet
		
		var callback = jasmine.createSpy(), called;
		
		var kb = new Keyboard({
			events: {
				']': callback
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
