/*
---
name: Element.Event.Pseudos.Keys Tests
requires: [More/Element.Event.Pseudos.Keys]
provides: [Element.Event.Pseudos.Keys.Tests]
...
*/
// Only run this spec in browsers other than IE6-8 because they can't properly simulate key events
if (window.addEventListener) describe('Element.Event.Pseudos.Keys', function(){

	it('keys: should fire events for keyboard key combinations', function(){

		var callback = jasmine.createSpy(),
			callback2 = jasmine.createSpy(),
			callback3 = jasmine.createSpy();

		document.body.addEvent('keydown:keys(shift+a)', callback);
		document.body.addEvent('keydown:keys(shift++)', callback2);
		document.body.addEvent('keydown:keys(+)', callback3);

		// shift+a
		Syn.type('[shift]a[shift-up]', document.body);

		expect(callback).toHaveBeenCalled();
		document.body.eliminate('$moo:keys-pressed');

		// shift++
		Syn.type('[shift]+[shift-up]', document.body);

		expect(callback2).toHaveBeenCalled();
		document.body.eliminate('$moo:keys-pressed');

		// +
		Syn.type('+', document.body);

		expect(callback3).toHaveBeenCalled();
		document.body.eliminate('$moo:keys-pressed');

	});

});
