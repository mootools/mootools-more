/*
Script: Element.Pseudos.js
	Specs for Element.Pseudos.js

License:
	MIT-style license.
*/
	
describe('Element.Pseudos', function(){

	it('tests the Event.definePseudo function', function(){
		
		var eventFn =  function(){
			return 'bar';
		},
		eventArgs = ['one', 'two', 'three'];
		
		Event.definePseudo('test', function(split, fn, args){
			expect(split).toEqual({
				event: 'e',
				value: 'foo',
				pseudo: 'test',
				original: 'e:test(foo)'
			});
			expect(fn).toEqual(eventFn);
			expect(Array.from(args)).toEqual(eventArgs);
		});
		
		var element = new Element('div');
		element.addEvent('e:test(foo)', eventFn);
		element.fireEvent('e', eventArgs);
		
	});
	
	describe('pseudos', function(){
		
		it('once: should fire the event once', function(){
			
			var i = 0;
			
			var database = new Class({			
			    Implements: Events,
				
				connect: function(){
					return this.fireEvent('connect');
				}
			});
			
			var db = new database();
			db.addEvent('connect:once', function(){
				i++;
			});			
			db.connect().connect();
			
			expect(i).toEqual(1);
			
		});
		
		it('keys: should fire events for keyboard key cobinations', function(){
			
			var callback = jasmine.createSpy(), called = false,
				callback2 = jasmine.createSpy(), called2 = false;
			
			document.body.addEvent('keydown:keys(shift+a)', callback);
			document.body.addEvent('keydown:keys(shift+b)', callback2);
			
			Syn.type('[shift]a[shift-up]', document.body, function(){
				called = true;
			});
			
			Syn.type('[shift]b[shift-up]', document.body, function(){
				called2 = true;
			});
	
			waitsFor(2, function(){
				return called && called2;
			});
			
			runs(function(){
				expect(callback).toHaveBeenCalled();
				expect(callback2).toHaveBeenCalled();
			});	
		
		});

	});



});

