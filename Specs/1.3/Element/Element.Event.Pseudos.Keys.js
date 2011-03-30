
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Element.Event.Pseudos.Keys', function(){

	it('keys: should fire events for keyboard key combinations', function(){

		var callback = jasmine.createSpy('shift+a'),
			callback2 = jasmine.createSpy('shift++'),
			callback3 = jasmine.createSpy('ctrl+c'),
			callback4 = jasmine.createSpy('control+c'),
			callback5 = jasmine.createSpy('shift+c');

		document.body.addEvent('keydown:keys(shift+a)', callback);
		document.body.addEvent('keydown:keys(shift++)', callback2);
		document.body.addEvent('keydown:keys(ctrl+c)', callback3);
		document.body.addEvent('keydown:keys(control+c)', callback4);
		
		document.body.addEvent('keydown:keys(shift+c)', callback5);

		// shift+a
		waits(2);
		runs(function() {
			simulateEvent('type', ['[shift]a[shift-up]', document.body], function(){
				expect(callback).toHaveBeenCalled();
				document.body.eliminate('$moo:keys-pressed');
			});
		});

		// shift++
		waits(2);
		runs(function() {
			simulateEvent('type', ['[shift]+[shift-up]', document.body], function(){
				expect(callback2).toHaveBeenCalled();
				document.body.eliminate('$moo:keys-pressed');
			});
		});

		// ctrl+c and control+c
		waits(2);
		runs(function() {
			simulateEvent('type', ['[ctrl]c[ctrl-up]', document.body], function(){
				expect(callback3).toHaveBeenCalled();
				expect(callback4).toHaveBeenCalled();
				document.body.eliminate('$moo:keys-pressed');
			});
		});
		
		waits(2);
		runs(function() {
			expect(callback5).not.toHaveBeenCalled();
		})

	});
	
	it('keys: should fire events for pipe-separated combinations', function(){

		var callback = jasmine.createSpy(),
			callback2 = jasmine.createSpy(),
			callback3 = jasmine.createSpy();

		document.body.addEvent('keydown:keys(j|e|shift+i)', function(e) {
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
