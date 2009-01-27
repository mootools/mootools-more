/*
Script: Element.Forms.js
	Specs for Element.Forms.js

License:
	MIT-style license.
*/
(function(){
	var input, selectList, multiselect, radio, radio2, checkbox, textarea;
	window.addEvent('domready', function(){
		(function(){
			var container = new Element('div', {
				styles: {
					height: 0,
					overflow: "hidden"
				}
			}).inject($('log'));
			input = new Element('input', {
				type: 'text',
				value: '0123456789'
			}).inject(container);
			textarea = new Element('textarea', {
				value: '0123456789'
			}).inject(container);
			selectList = new Element('select', {
			}).inject(container);
			(3).times(function(i) {
				var opt = new Element('option', {
					text: i+'_txt'
				}).inject(selectList);
				if (i>0) opt.set('value', i+'_val');
			});
			multiselect = selectList.clone(true).inject(container);
			multiselect.set('multiple', true);
			radio = new Element('input', {
				type: 'radio',
				name: 'radio',
				value: 'radioValue1'
			}).inject(container);
			radio2 = new Element('input', {
				type: 'radio',
				name: 'radio',
				checked: true,
				value: 'radioValue2'
			}).inject(container);
			checkbox = new Element('input', {
				type: 'checkbox',
				name: 'checkbox',
				value: 'checkboxValue'
			}).inject(container);
		}).delay(1000);
	});
	describe('Element.getTextInRange', {
	
		'should get text in a specific range from an input': function(){
			value_of(input.getTextInRange(2,5)).should_be('234');
		},
	

		'should get a partial match on text in range where the range is outside the bounds of the text': function(){
			value_of(input.getTextInRange(8,20)).should_be('89');
		}
	
	});

	describe('Element.selectRange', {

		'should select range of text in an input': function(){
			value_of(input.selectRange(2,5).getSelectedRange()).should_be({start: 2, end: 5});
		}
	
	});

	describe('Element.getSelectedText', {
	
		'should return selected text in an input': function(){
			value_of(input.selectRange(0,10).getSelectedText()).should_be('0123456789');
		}
	
	});

	describe('Element.getSelectionStart', {
		
		'should get the selection start': function(){
			value_of(input.selectRange(2,5).getSelectionStart()).should_be(2);
		}
	
	});

	describe('Element.getSelectionEnd', {

		'should get the selection end': function(){
			value_of(input.selectRange(2,5).getSelectionEnd()).should_be(5);
		}
	
	});

	describe('Element.setCaretPosition, Element.getCaretPosition', {

		'should set the caret position': function(){
			value_of(input.setCaretPosition(3).getCaretPosition()).should_be(3);
		}
	
	});

	describe('Element.getSelectionStart', {

		'should compare the caret position to the selection start': function(){
			value_of(input.setCaretPosition(3).getSelectionStart()).should_be(3);
		}
	
	});

	describe('Element.insertAtCursor', {

		'should insert at cursor': function(){
			value_of(input.setCaretPosition(3).insertAtCursor('test').get('value')).should_be('012test3456789');
		}
	
	});

	describe('Element.insertAroundCursor', {

		'should insert around cursor': function(){
			value_of(input.set('value', '0123456789').selectRange(2,5).insertAroundCursor({
				before: '{',
				after: '}'
			}).get('value')).should_be('01{234}56789');
		},
	

		'should insert around cursor w/o selection': function(){
			value_of(input.set('value', '0123456789').setCaretPosition(2).insertAroundCursor({
				before: '{',
				after: '}',
				defaultMiddle: 'X'
			}).get('value')).should_be('01{X}23456789');
		}
	
	});
	
	describe('Element.get(inputValue)', {
		
		'should get the text of an input': function() {
			input.set('value', '0123456789');
			value_of(input.get('inputValue')).should_be('0123456789');
		},
		
		'should get the text of a textarea': function(){
			value_of(textarea.get('inputValue')).should_be('0123456789');
		},
		
		'should get the selected value of a select list': function(){
			var opts = selectList.getElements('option');
			opts[1].set('selected', true);
			value_of(selectList.get('inputValue')).should_be('1_val');
		},
		
		'should get the text value of a selected option with no value set': function(){
			var opts = selectList.getElements('option');
			opts[0].set('selected', true);
			value_of(selectList.get('inputValue')).should_be('0_txt');
		},
		
		'should get an array of values from a multiselect': function(){
			var opts = multiselect.getElements('option');
			opts[0].set('selected', true);
			opts[1].set('selected', true);
			value_of(multiselect.get('inputValue')).should_be(['0_txt','1_val']);
		},
		
		'should get the value of a selected radio input when called on a deslected radio': function(){
			radio2.set('checked', true);
			value_of(radio.get('inputValue')).should_be('radioValue2');
		},

		'should get the value of a selected radio input': function(){
			radio.set('checked', true);
			value_of(radio.get('inputValue')).should_be('radioValue1');
		},
		
		'should get the value of a deselected radio input': function(){
			radio.set('checked', false);
			value_of(radio.get('inputValue')).should_be(null);
		},
		
		'should get the value of a checked checkbox input': function(){
			checkbox.set('checked', true);
			value_of(checkbox.get('inputValue')).should_be('checkboxValue');
		},

		'should get the value of an un-checked checkbox input': function(){
			checkbox.set('checked', false);
			value_of(checkbox.get('inputValue')).should_be(false);
		}
	});
	
	describe('Element.set(inputValue)', {

		
		'should set the value of a checkbox input (boolean)': function(){
			checkbox.set('inputValue', true);
			value_of(checkbox.get('inputValue')).should_be('checkboxValue');
		},

		'should set uncheck a checkbox input (string)': function(){
			checkbox.set('inputValue', 'foo');
			value_of(checkbox.get('inputValue')).should_be(false);
		},

		'should set the value of a select list where the option has no value set (option.text is set)': function(){
			selectList.set('inputValue', '0_txt');
			value_of(selectList.get('inputValue')).should_be('0_txt');
		},

		'should set the value of a select list where the option has a value set': function(){
			selectList.set('inputValue', '2_val');
			value_of(selectList.get('inputValue')).should_be('2_val');
		},

		'should set the values of a mutli-select list (string)': function(){
			multiselect.set('inputValue', '0_txt');
			value_of(multiselect.get('inputValue')).should_be('0_txt');
		},

		'should set the values of a mutli-select list (array)': function(){
			multiselect.set('inputValue', ['0_txt', '1_val']);
			value_of(multiselect.get('inputValue')).should_be(['0_txt', '1_val']);
		},
		
		'should set the value of a text input': function(){
			input.set('value', 'foo');
			input.set('inputValue', '0123456789');
			value_of(input.get('inputValue')).should_be('0123456789');
		},

		'should set the value of a textarea': function(){
			textarea.set('value', 'foo');
			textarea.set('inputValue', '0123456789');
			value_of(textarea.get('inputValue')).should_be('0123456789');
		}
		

	});
})();