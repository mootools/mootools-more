Native: Array {#Array}
======================

A collection of useful methods to extend Arrays.

### See Also:

* [Array][]


Array Method: min {#Array:min}
-------------------------------------

Calls Math.min on the array and returns its lowest value.

### Syntax

	myArray.min();

### Example

	[1, 2, 3].min();
	//returns 1

### Returns

* (*number*) the lowest number in the array

Array Method: max {#Array:max}
-------------------------------------

Calls Math.max on the array and returns its highest value.

### Syntax

	myArray.max();

### Example

	[1, 2, 3].max();
	//returns 3

### Returns

* (*number*) the highest number in the array

Array Method: average {#Array:average}
-------------------------------------

Calculates the average value of the array

### Syntax

	myArray.average();

### Example

	[1, 2, 3].average();
	//returns 2

### Returns

* (*number*) the highest number in the array

Array Method: sum {#Array:sum}
-------------------------------------

Sums up all values in an array.

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