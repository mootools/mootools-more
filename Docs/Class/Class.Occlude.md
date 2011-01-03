Class: Class.Occlude {#Class-Occlude}
=====================================

Prevents a class from applying itself to an element that already has had the class applied.

### Tutorial/Demo

* [Online Tutorial/Demo][]

Class.Occlude Method: occlude {#Class-Occlude:occlude}
------------------------------------------------------

Determines if the class has already been applied to the element.

### Syntax

	this.occlude(property, element)

### Arguments

1. property - (*string*) property name for instances of this class attached to the element via [Element.Storage][]
2. element - (*mixed*) an Element or the string id of an Element to test

### Example

	var Widget = new Class({
		Implements: [Class.Occlude],
		initialize: function(element){
			if (this.occlude('widget', element)) return this.occluded;
			//returns the instance already bound to the element and exits
		}
	});

### Note

See the two properties below for ideal usage.

Class property: property {#Class-Occlude:property}
--------------------------------------------------

The string used to bind the instance of the class to the element.

### Example

	var Widget = new Class({
		Implements: [Class.Occlude],
		property: 'widget',
		initialize: function(element){
			this.element = $(element);
			if (this.occlude()) return this.occluded;
			//returns the instance already bound to the element and exits
		}
	});


### Note

In the example above, because we have a *this.element* property and because we define the *this.property* property in the class, the method *occlude* doesn't require any arguments as it uses these by default.

[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/03-occlude
[Element.Storage]: http://mootools.net/docs/core/Element/Element#Element:store
