Class: Class.Refactor {#Class}
==============================

Extends [Class][].

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/00-class.refactor

Class Static Method: refactor {#Class:Class-refactor}
-----------------------------------------------

Implements properties into a class preserving the previous state of methods so you can reference them..


### Syntax

	OriginalClass = Class.refactor(OriginalClass, newProperties)

### Arguments

1. OriginalClass - (*class*) the original class to augment
2. newProperties - (*object*) properties to assign to the class

### Returns

* *object* - the original class with the new properties assigned. Any methods overwritten are preserved through *this.previous*.

### Notes

The *.implements* method of class allows you to inject new properties into an existing class. Where collisions of objects occur, they are blended. For example:

	var Animal = new Class({
	    options: {
	        color: 'brown',
	        says: 'hissss'
	    }
	});

	Animal.implement('options', {says: 'meow'});

	// Animal.prototype.options is now {says: 'meow', color: 'brown'};

However, this is not the case with methods, which are overwritten.

Class.refactor, however, allows you to reference the previous state with *this.previous*. For example:

	var Cat = new Class({
	    energy: 0,
	        eat: function(){
	            this.energy++;
	    }
	});

	Class.refactor(Cat, {
	    eat: function(){
	        this.previous(); //energy++!
	        alert("this cat has " + this.energy + " energy");
	    }
	});

Note also that changes to a class affect the subclasses of that class.

[Class]: /core/Class/Class
