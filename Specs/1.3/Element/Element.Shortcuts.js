/*
Script: Element.Shortcuts.js
	Specs for Element.Shortcuts.js

License:
	MIT-style license.
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
					width: 0
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
			value_of(elements[0].isDisplayed()).should_be_false();
		},


		'element display should be true': function(){
			value_of(elements[1].isDisplayed()).should_be_true();
		}

	});

	describe('Element.isVisible', {

		'is the element visible (width == 0 and height == 0)': function(){
			value_of(elements[2].isVisible()).should_be_false();
		}

	});

	describe('Element.toggle', {

		'toggle the display of an element': function(){
			value_of(elements[1].hide().toggle().isDisplayed()).should_be_true();
		}

	});

	describe('Element.hide', {

		'hide an element': function(){
			value_of(elements[1].hide().isDisplayed()).should_be_false();
		}

	});

	describe('Element.show', {

		'show the element': function(){
			value_of(elements[0].show().isDisplayed()).should_be_true();
		}

	});

	describe('Element.swapClass', {

		'should add and remove a clas to the class attribute': function(){
			var el = elements[3].swapClass('testClass', 'newClass');
			value_of(el.hasClass('newClass') && !el.hasClass('testClass')).should_be_true();
		}

	});

})();