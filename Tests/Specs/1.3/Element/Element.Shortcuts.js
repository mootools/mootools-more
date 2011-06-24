/*
---
name: Element.Shortcuts Tests
requires: [More/Element.Shortcuts]
provides: [Element.Shortcuts.Tests]
...
*/
(function(){

	var elements;
	window.addEvent('domready', function(){

		elements = new Elements([
			new Element('div', {
				styles: {
					display: 'none'
				}
			}),
			new Element('div', {
				styles: {
					display: 'block'
				}
			}),
			new Element('div', {
				styles: {
					width: 0,
					height: 0,
					overflow: 'hidden'
				}
			}),
			new Element('div', {
				'class': 'testClass'
			})
		]);

		elements.inject(new Element('div').inject(document.body));

	});
	describe('Element.isDisplayed', {

		'element display should be false': function(){
			expect(elements[0].isDisplayed()).toBeFalsy();
		},


		'element display should be true': function(){
			expect(elements[1].isDisplayed()).toBeTruthy();
		}

	});

	describe('Element.isVisible', {

		'is the element visible (width == 0 and height == 0)': function(){
			expect(elements[2].isVisible()).toBeFalsy();
		}

	});

	describe('Element.toggle', {

		'toggle the display of an element': function(){
			expect(elements[1].hide().toggle().isDisplayed()).toBeTruthy();
		}

	});

	describe('Element.hide', {

		'hide an element': function(){
			expect(elements[1].hide().isDisplayed()).toBeFalsy();
		}

	});

	describe('Element.show', {

		'show the element': function(){
			expect(elements[0].show().isDisplayed()).toBeTruthy();
		}

	});

	describe('Element.swapClass', {

		'should add and remove a clas to the class attribute': function(){
			var el = elements[3].swapClass('testClass', 'newClass');
			expect(el.hasClass('newClass') && !el.hasClass('testClass')).toBeTruthy();
		}

	});

})();
