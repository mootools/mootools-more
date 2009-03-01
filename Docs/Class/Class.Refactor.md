Native: Class {#Class}
=====================

Extends the [Class][] native.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/00-class.refactor

Class Static Method: refactor {#Class-refactor}
-----------------------------------------------

Extends a class back onto itself preserving any properties assigned to the class's namespace.


### Syntax

	OriginalClass = Class.refactor(OriginalClass, newProperties)

### Arguments

1. OriginalClass - (*class*) the original class to augment
2. newProperties - (*object*) properties to assign to the class

### Returns

* *object* - the original class with the new properties assigned. Any properties attached to the original's namespace are preserved.

### Notes

MooTools is designed to be extended and as you can see in this repository, I make judicious use of that design. One of the cooler things you can do is extend a class onto itself. Let's consider the following code:


	var Test = new Class({
		log: function(msg){
			console.log(msg);
		},
		msgs: {
			foo: 'bar',
			something: 'something else'
		},
		logMsg: function(msg){
			this.log(this.msgs[msg]);
		}
	});
	var firstTest = new Test();
	firstTest.log('this is the first test instance');
	firstTest.logMsg('foo'); //bar

	var Test = new Class({
		Extends: Test, //extends itself!
		log: function(msg){
			this.parent(msg); //methods have reference to previous state via this.parent
			console.log('altered version of Test just logged message');
		},
		msgs: {
			foo: 'not bar anymore!' //can overwrite nested properties w/o altering others
		}
	})

	//firstTest is unaltered because it was instantiated perviously:
	firstTest.log('this is the first test instance');
	firstTest.logMsg('foo'); //bar

	//but new instances get the new properties:
	var secondTest = new Test();
	secondTest.log('this is the second test instance'); //logs the message and
			//then "altered version..." message
	secondTest.logMsg('foo'); //logs "not bar anymore!" and then "altered version.." message

MooTools does this already. No big deal really. It lets you extend a class back onto itself. This is really useful if, say, you want ot change the defaults for *Fx.Tween* but want the *Element.tween* method to use those changes. If you extended *Fx.Tween* into *Fx.MyTween*, then *Element.tween* would still be using *Fx.Tween*, not your new one. By extending *Fx.Tween* onto itself, you change all the new instances that might get created to use your new defined properties.

The catch with this approach is that you must assign a class back onto it's own namespace. This works fine so long as there aren't any other properties assigned to that namespace. But one of the patterns in MooTools is to namespace subclasses onto the parent class. So, for example, we have *Fx*, and then we have *Fx.Tween*. If we assign a new class to *Fx*, we destroy the reference to *Fx.Tween*, and that's no good:

	Fx = new Class({
		Extends: Fx,
		...new functionality...
	});
	//Fx is a new reference, and Fx.Tween no longer exists

All that *Class.refactor* does is allow you to assign new properties to a class in the same manner as extending the class onto itself *without* destroying the namespace.

This functionality comes in two flavors: A static method on the *Class* namespace and a method available on all classes defined after this script is included in your environment. Why two flavors? Because any class that is defined *before* *Class.Refactor.js* is included in your environment won't have the method baked in. So:

Use this method on any class that existed before *Class.refactor* was included in your environment (i.e. all the MooTools classes defined before the Clientcide javascript):

	Fx = Class.refactor(Fx, {
		options: {
			duration: 100
		}
	});
	//all new instances of Fx start with a default duration of 100
	//Fx.Css, Fx.Tween, etc are unaltered in any way

Class Instance Method: refactor {#Class:refactor}
-------------------------------------------------

Automatically augments a class (a shorthand of the static method above).

### Syntax

	MyClass.refactor(newProperties)

### Arguments

1. newProperties - (*object*) properties to assign to the class

### Example

	MyClass.refactor({
		options: {
			height: 100
		},
		someMethod: function(){
			this.parent();
			...some new functionality...
		}
	});

### Notes

For all other classes (the Clientcide code and your own classes) you can just use the instance method:

	StickyWin.refactor({
		options: {
			zIndex: 100
		}
	});
	//all new instances of StickyWin will have //options.zIndex// set to //100//
	//StickyWin.Fx, StickyWin.Modal, etc. are unaltered in any way


Refactoring Class Families
--------------------------

What happens if you wanted to take the example above (where we set the default zIndex on *StickyWin*) and apply it to all the *StickyWin* classes? Well, you'll have to refactor them all. This would look like this:

	[StickyWin, StickyWin.Fx, StickyWin.Modal, StickyWin.Fx.Modal, etc].each(function(cls){
		cls.refactor({
			...new properties...
		});
	});


[Class]: http://docs.mootools.net/Class/Class