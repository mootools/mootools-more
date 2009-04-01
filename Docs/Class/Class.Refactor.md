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
			this.previous(msg); //methods have reference to previous state via this.previous
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

If, say, you only want to change the defaults for *Fx.Tween* but want the *Element.tween* method to use those changes, then you should just use *.implement*. But if you want to reference the previous version of methods (similar to *this.parent* when you use *Extends*), you'll need to use refactor.

[Class]: /docs/core/Class/Class