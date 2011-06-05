
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Element.Event.Pseudos.Stop', function(){
	
	it('stop: should prevent propagating events', function(){

		var called = false, called2 = false;
		
		var inputs = {
			pseudo: new Element('input[value=limonata]').inject(document.body),
			normal: new Element('input[value=limonata]').inject(document.body)
		},
		checkboxes = {
			pseudo: new Element('input[type=checkbox]').inject(document.body),
			normal: new Element('input[type=checkbox]').inject(document.body)
		},
		divs = {
			pseudo: {
				element: new Element('div').inject(document.body),
				child: new Element('div').inject(document.body)
			},
			normal: {
				element: new Element('div').inject(document.body),
				child: new Element('div').inject(document.body)
			}
		};
		
		// stop
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
		
		// preventDefault
		checkboxes.pseudo.addEvent('click:preventDefault', function(){});
		checkboxes.normal.addEvent('click', function(){});
		
		simulateEvent('click', [{}, checkboxes.pseudo], function(){
			expect(checkboxes.pseudo.get('checked')).toBe(false);
			$(checkboxes.pseudo).destroy();
		});
		
		simulateEvent('click', [{}, checkboxes.normal], function(){
			expect(checkboxes.normal.get('checked')).toBe(true);
			$(checkboxes.normal).destroy();
		});
		
		// stopPropagation
		divs.pseudo.child.inject(divs.pseudo.element);
		divs.normal.child.inject(divs.normal.element);
		
		divs.pseudo.element.addEvent('click:stopPropagation', function(){ called = true; });
		divs.pseudo.child.addEvent('click:stopPropagation', function(){});
		divs.normal.element.addEvent('click', function(){ called2 = true; });
		divs.normal.child.addEvent('click', function(){});
		
		simulateEvent('click', [{}, divs.pseudo.child], function(){
			expect(called).toBe(false);
			$(divs.pseudo.element).destroy();
		});
		
		simulateEvent('click', [{}, divs.normal.child], function(){
			expect(called2).toBe(true);
			$(divs.normal.element).destroy();
		});

	});
	
});
