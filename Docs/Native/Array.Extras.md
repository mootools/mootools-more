Native: Array {#Array}
======================

A collection of useful methods to extend Arrays.

### See Also:

* [Array][]


Array Method: sum {#Array:sum}
-------------------------------------

Sums up all values in an array

### Syntax

	myArray.sum();

### Example

	$$('ul.menu li').getWidth().sum();
	//returns the width of all li elements inside ul.menu as a sum

### Returns

* (*number*) a number containing the sum of all values in the given array

Array Method: unique {#Array:unique}
-------------------------------------

Returns a new array without duplicate values.

### Syntax

	myArrayWithoutDupes = myArray.unique();

### Example

	var fruits = ['apple', 'lemon', 'pear', 'lemon', 'apple'].unique();
	//fruits == ['apple', 'lemon', 'pear']

### Returns

* (*array*) a new array without duplicates.



[Array]: /docs/core/Native/Array