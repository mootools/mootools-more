/*
Script: Element.Pseudos.js
	Specs for Element.Pseudos.js

License:
	MIT-style license.
*/
	
describe('Element.Pseudos', {

	'tests the Event.definePseudo function': function(){
		
		var eventFn =  function(){
			return 'bar';
		},
		eventArgs = ['one', 'two', 'three'];
		
		Event.definePseudo('test', function(split, fn, args){
			value_of(split).should_be({
				event: 'e',
				value: 'foo',
				pseudo: 'test',
				original: 'e:test(foo)'
			});
			value_of(fn).should_be(eventFn);
			value_of(Array.from(args)).should_be(eventArgs);
		});
		
		var element = new Element('div');
		element.addEvent('e:test(foo)', eventFn);
		element.fireEvent('e', eventArgs);
		
	}


});

