/*
---
name: Class.Singleton Tests
requires: [More/Class.Singleton]
provides: [Class.Singleton.Tests]
...
*/
describe('Class.Singleton', function(){
   var ClassA = new Class.Singleton({
      
      Extends     : Events,
      Implements  : [ Options ],
      
      options     : { foo : 'bar' },
      
      initialize  : function ( name, options ) {
         this.name = name;
         this.setOptions( options );
      },
      
      getOption   : function ( name ) {
         return this.options[ name ];
      },
      
      fireEvent   : function () {
         this.setOptions({ fireEventCalled : true });
         return this.parent.apply( this, arguments );
      }
      
   });
   
   var ClassB = new Class.Singleton({
      
      initialize  : function () {
         return new Element('div');
      }
      
   });
   
   var instanceA = new ClassA( 'Test', { integer : 5 } );
   
   instanceA.addEvent( 'test', function () {
      this.setOptions({ eventHandlerCalled : true });
   });
   
   instanceA.fireEvent('test');
   
   it( 'should always return single instance', function () {
      expect( instanceA == new ClassA() ).toBeTruthy();
      expect( new ClassB() == new ClassB() ).toBeTruthy();
   });
   
   it( 'should not return the same instance across different classes', function () {
      expect( instanceA == new ClassB() ).toBeFalsy();
   });
   
   it( 'should properly implement methods from the prototype', function () {
      expect( typeof instanceA.getOption == 'function' ).toBeTruthy();
      expect( typeof instanceA.setOptions == 'function' ).toBeTruthy();
      expect( typeof instanceA.fireEvent == 'function' ).toBeTruthy();
      expect( typeof instanceA.addEvent == 'function' ).toBeTruthy();
   });
   
   it( 'should take into considerations constructor parameters', function () {
      expect( instanceA.getOption('integer') === 5 ).toBeTruthy();
   });
   
   it( 'should be able to call parent method', function () {
      expect( instanceA.getOption('fireEventCalled') ).toBeTruthy();
      expect( instanceA.getOption('eventHandlerCalled') ).toBeTruthy();
   });
   
   it( 'should be able to return other object than `this`', function () {
      expect( typeOf( new ClassB() ) == 'element' ).toBeTruthy();
   });

});