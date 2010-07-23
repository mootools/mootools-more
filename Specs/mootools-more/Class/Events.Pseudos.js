/*
Script: Events.Pseudos.js
	Specs for Events.Pseudos.js

License:
	MIT-style license.
*/
	
describe('Events.Pseudos', {

	'tests the :once pseudo': function(){
		
		var e = new Events();
		var counter = 0;
		e.addEvent('connect:once', function(){
			counter++;
		});
		e.fireEvent('connect');
		e.fireEvent('connect');			
		e.fireEvent('connect');
		
		value_of(counter).should_be(1);
		
	},
	
	'tests the Events.definePseudo function': function(){
		
		var eventFn =  function(){
			return 'bar';
		},
		eventArgs = ['one', 'two', 'three'];
		
		Events.definePseudo('test', function(split, fn, args){
			value_of(split).should_be({
				event: 'e',
				value: 'foo',
				pseudo: 'test',
				original: 'e:test(foo)'
			});
			value_of(fn).should_be(eventFn);
			value_of(Array.from(args)).should_be(eventArgs);
		});
		
		var e = new Events();
		e.addEvent('e:test(foo)', eventFn);
		e.fireEvent('e', eventArgs);
		
	}


});



