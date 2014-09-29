Class: Class.Singleton {#Class-Singleton}
=================================

Extends [Class][];. Creates a class that always returns the same instance.

### Simple Example

   var MyClass = new Class.Singleton({

      foo : function () {
         alert('bar');
      }

   });
   
   new MyClass() === new MyClass(); // returns true

[Class]: /core/Class/Class