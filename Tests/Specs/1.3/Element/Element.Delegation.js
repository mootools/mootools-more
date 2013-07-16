/*
---
name: Element.Delegation Tests
requires: [Core/Element.Delegation]
provides: [Element.Delegation.Tests]
...
*/
describe('Elements.Delegation', function(){

	// Only run this spec in browsers other than IE6-8 because they can't properly simulate bubbling events
	if (window.addEventListener) it('A parent Element should delegate a child element', function(){

		var callback = jasmine.createSpy('relay');

		var elements = {};

		elements.wrapper = new Element('div').inject(document.body);
		elements.child = new Element('div').inject(elements.wrapper);

		elements.wrapper.addEvent('click:relay(div)', callback);

		Syn.trigger('click', {}, elements.child);
		expect(callback).toHaveBeenCalled();

		for (var i in elements) $(elements[i]).destroy();

	});

});
