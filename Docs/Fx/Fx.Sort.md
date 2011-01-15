Class: Fx.Sort {#Fx-Sort}
=========================

Reorders a group of items with a transition.

### Tutorial/Demos

* [Fx.Sort](http://mootools.net/demos/?demo=Fx.Sort)
* [Clientcide Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/05-fx/03-fx.sort)


### Extends

- [Fx.Elements][]

Fx.Sort Method: constructor
---------------------------

### Syntax

	new Fx.Sort(elements[, options]);

### Arguments

1. elements - (*array*) A collection of Elements the effects will be applied to.
2. options  - (*object*, optional) Same as [Fx.Elements][] options plus the additional options below.

### Options

* mode - (*string*) either "vertical" or "horizontal"; defaults to *"vertical"*

### Returns

* (*object*) A new instance of [Fx.Sort][].

### Example

	var mysort = new Fx.Sort($$('ul li'), {
      transition: Fx.Transitions.Back.easeInOut,
      duration: 1000
	});
	mysort.sort([2,0,1]); //a specific order
	mysort.forward(); //forward (the original) order

### Note

* [Fx.Sort][] does not, by default, reorder the DOM; it just puts the elements into x/y locations that imply the sort, but their location in the DOM remains unless you execute [Fx.Sort:rearrangeDOM][].


Fx.Sort Method: getCurrentOrder {#Fx-Sort:getCurrentOrder}
----------------------------------------------------------

Retrieves the current sort order.

### Syntax

	mySort.getCurrentOrder();

### Returns

* (*array*) The current sort state.

Fx.Sort Method: sort {#Fx-Sort:sort}
------------------------------------

Rearranges the items visually into a new order.

### Syntax

	mySort.sort(order);

### Arguments

1. order - (*array*) the new order for the items.

### Returns

* (*object*) This [Fx.Sort][] instance.

### Example

	mySort.sort([2,1,0]); //reverse

### Notes
- If you pass it an incomplete order [Fx.Sort][] will fill in the rest with the current sort. For example, if the current sort is 0,1,2, and you execute *mySort.sort(1)*, the result will be 1,0,2.

Fx.Sort Method: rearrangeDOM {#Fx-Sort:rearrangeDOM}
----------------------------------------------------

Rearranges the DOM to the current sort order.

### Syntax

	mySort.rearrangeDOM(order); //order is optional

### Arguments

1. order - (*array*, optional) the order to arrange the DOM with; defaults to *this.currentOrder*.

### Returns

* (*object*) This [Fx.Sort][] instance.

### Example

	mySort.rearrangeDOM([1,3,2,0]);
	mySort.rearrangeDOM(); //use current sort

Fx.Sort Method: forward {#Fx-Sort:forward}
----------------------------------------------

Arrange the items in the original order (0,1,2,3,etc).

### Syntax

	mySort.forward();

### Returns

* (*object*) This [Fx.Sort][] instance.

Fx.Sort Method: backward {#Fx-Sort:backward}
----------------------------------------------

Arrange the items in the original order reversed (...3,2,1,0).

### Syntax

	mySort.forward();

### Returns

* (*object*) This [Fx.Sort][] instance.

Fx.Sort Method: reverse {#Fx-Sort:reverse}
----------------------------------------------

Arrange the items in the current order reversed.

### Syntax

	mySort.reverse();

### Returns

* (*object*) This [Fx.Sort][] instance.

Fx.Sort Method: sortByElements {#Fx-Sort:sortByElements}
----------------------------------------------

Sort by the order specified in a collection of elements; elements must be an array (collection) of the elements within the elements specified at instantiation.

### Syntax

	mySort.sortByElements(elements);

### Arguments

1. elements - (*array* or *collection*) a collection or array of elements in the new order

### Returns

* (*object*) This [Fx.Sort][] instance.

### Example

	var mySort = new Fx.Sort($$('ul li'));
	mySort.sortByElements([$('li3'), $('li2'), $('li1'), $('li0')]);

### Notes

- The elements passed in to sortByElements must be the same ones passed in to the effect when it was created.

Fx.Sort Method: swap {#Fx-Sort:swap}
------------------------------------

Swaps the position of one item with another.

### Syntax

	mySort.swap(element_1, element_2);

### Arguments

1. one - (*mixed*) A string of the id for an Element or an Element reference to swap
2. two - (*mixed*) A string of the id for the *other* Element or an Element reference to swap

###	Example

	var mySort = new Fx.Sort($$('ul li'));
	mySort.swap($('#li3'), $('#li0'));
	//OR
	mySort.swap(3, 0);

### Returns

* (*object*) This [Fx.Sort][] instance.

[Fx.Sort:rearrangeDOM]: #Fx-Sort:rearrangeDOM
[Fx.Sort]: #Fx-Sort
[Fx.Elements]: /more/Fx/Fx.Elements
