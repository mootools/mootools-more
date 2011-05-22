
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Element.Event.Pseudos.Stop', function(){
	
	it('stop: should prevent propagating events', function(){

		var callback = jasmine.createSpy(), called = false;
		
		var inputs = {
			pseudo: new Element('input[value=limonata]').inject(document.body),
			normal: new Element('input[value=limonata]').inject(document.body)
		};

		inputs.pseudo.addEvent('keydown:stop', function(){});
		inputs.normal.addEvent('keydown', function(){});
		
		simulateEvent('type', ['#', inputs.pseudo], function(){
			expect(inputs.pseudo.get('value')).toEqual('limonata');
			$(inputs.pseudo).destroy();
		});
		
		simulateEvent('type', ['#', inputs.normal], function(){
			expect(inputs.normal.get('value')).toEqual('limonata#');
			$(inputs.normal).destroy();
		});

	});
	
});
