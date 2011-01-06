/*
Script: Element.Pin.js
	Specs for Element.Pin.js

License:
	MIT-style license.
*/

describe("Element.Pin", function(){

	describe("togglePin", function(){

		it("should toggle the pinning of the element", function(){
			var div = new Element('div').inject(document.body);
			expect(div.togglePin().retrieve('pin:_pinned')).toEqual(true);
			expect(div.togglePin().retrieve('pin:_pinned')).toEqual(false);
			div.destroy();
		});

	});

	describe("pin", function(){

		var div;

		window.addEvent('domready', function(){
			div = new Element('div').inject(document.body);
		});

		it("should not toggle pin state if element's display is none", function(){
			div.setStyle('display', 'none');
			expect(div.pin().retrieve('pin:_pinned')).not.toEqual(true);
			div.setStyle('display', 'block');
		});

		it("should return the element", function(){
			expect(div.pin()).toEqual(div);
			div.setStyle('display', 'none');
			expect(div.pin()).toEqual(div);
			div.setStyle('display', 'block');
		});

		it("should update 'pin:_pinned' state on the element as true", function(){
			expect(div.pin().retrieve('pin:_pinned')).toEqual(true);
		});

		it("should store 'pin:_scrollFixer' on the element", function(){
			div.unpin();
			expect(typeOf(div.pin(true, true).retrieve('pin:_scrollFixer'))).toEqual('function');
			div.destroy();
		});

	});

	describe('unpin', function(){

		var div;

		beforeEach(function(){
			div = div || new Element('div').inject(document.body);
			div.pin(true, true);
		});

		it("should not toggle pin state if element's display is none", function(){
			div.setStyle('display', 'none');
			expect(div.unpin().retrieve('pin:_pinned')).toEqual(true);
			div.setStyle('display', 'block');
		});

		it("should exit if 'pin:_pinned' is falsy", function(){
			div.store('pin:_pinned', null);
			expect(div.unpin().retrieve('pin:_pinned')).not.toEqual(false);
		});

		it("should return the element", function(){
			expect(div.unpin()).toEqual(div);
			div.setStyle('display', 'none');
			expect(div.unpin()).toEqual(div);
			div.setStyle('display', 'block');
		});

		it("should update 'pin:_pinned' state on the element to false", function(){
			expect(div.unpin().retrieve('pin:_pinned')).toEqual(false);
		});

		it("should remove 'pin:_scrollFixer' on the element if present", function(){
			expect(div.unpin().retrieve('pin:_scrollFixer')).toEqual(null);
			div.destroy();
		});

	});

	describe("_scrollFixer", function(){

		var div;

		window.addEvent('domready', function(){
			div = new Element('div').inject(document.body);
		});

		it("should not setStyles if element's 'pin:_pinned' is false", function(){
			div.pin(true, true);
			div.store('pin:_pinned', false);
			spyOn(div, 'setStyle');
			div.retrieve('pin:_scrollFixer')();
			expect(div.setStyle).not.toHaveBeenCalled();
		});

		it("should setStyles if element is pinned", function(){
			spyOn(div, 'setStyle');
			div.pin(true, true).retrieve('pin:_scrollFixer')();
			expect(div.setStyle).toHaveBeenCalled();
		});

	});

});
