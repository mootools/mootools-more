/*
---

script: Class.Singleton.js

name: Class.Singleton

description: Always provides a single instance of a class

license: MIT-style license.

authors:
  - Hristo Chakarov

requires:
  - Core/Class

provides: [Class.Singleton]

...
*/

Class.Singleton = new Class({
   
   initialize : function ( descriptor ) {
      // here we keep reference of the single instance
      var singleton;
      // create a regular Class
      var constructor = new Class( descriptor );
      // We return another constructor, because we need to make sure that we
      // always return the same one and only instance.
      return function () {
         if ( singleton ) {
            return singleton;
         }
         // Obviously we instantiate that class for the first time.
         // Create brand new object & extend it with the prototype of the 
         // original `constructor`.
         singleton = Object.append( {}, constructor.prototype );
         singleton.constructor = constructor;
         // We also need to call the constructor as a function, passing the 
         // arguments object.
         var return_value = constructor.apply( singleton, arguments );
         // In case the `constructor` returns something other than `this` - 
         // return that value; otherwise return the `singleton`.
         singleton = typeof return_value == 'object' ? return_value : singleton;
         return singleton;
      };
   }
   
});