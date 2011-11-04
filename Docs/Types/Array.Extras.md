Type: Array {#Array}
======================

A collection of useful methods to extend Arrays.

### See Also

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

Calculates the average value of the array.

### Syntax

	myArray.average();

### Example

	[1, 2, 3].average();
	//returns 2

### Returns

* (*number*) the average value of the array

Array Method: shuffle {#Array:shuffle}
-------------------------------------

Randomizes the array (altering it).

### Syntax

	myArray.shuffle();

### Example

	[1, 2, 3].shuffle();

### Returns

* (*array*) the array.

### Note

Calling this method alters the array; it doesn't just return a new array with the same contents shuffled. It does, however, return itself.

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

Array Method: reduce {#Array:reduce}
-------------------------------------

Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.

### Syntax

	result = myArray.reduce(fn[, value]);

### Arguments
1. fn - (*function*) Function to execute on each value in the array.
2. value - (*mixed*) Value to use as the first argument to the first call of the `fn`

#### Signature:

	fn(previousValue, currentValue, index, array)


### Example

	[0, 1, 2, 3, 4].reduce(function(a, b){
		return a + b;
	}); // returns 10

	[0, 1, 2, 3, 4].reduce(function(a, b){
		return a + b;
	}, 20); // returns 30

### Returns

* (*mixed*) Returns the reduced single value of the array.

### See also:
- [MDC Array.reduce][]

Array Method: reduceRight {#Array:reduceRight}
----------------------------------------------

Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.

### Syntax

	result = myArray.reduceRight(fn[, value]);

### Arguments
1. fn - (*function*) Function to execute on each value in the array.
2. value - (*mixed*) Value to use as the first argument to the first call of the `fn`

#### Signature:

	fn(previousValue, currentValue, index, array)


### Example

	var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
		return a.concat(b);
	}, []);
	// flattened is [4, 5, 2, 3, 0, 1]

### Returns

* (*mixed*) Returns the reduced single value of the array.

### See also:
- [MDC Array.reduceRight][]

Array Method: pluck {#Array.pluck}
----------------------------------

Returns an array with the named property from each of the array's elements.

### Syntax

	var arr = myArray.pluck(prop)

### Arguments
1. prop - The named property to access on each element.

### Returns

* (*array*) A new array containing the property value for each element.

### Example

	var foo = [{ a: 1 }, { a: 2 }];
	var bar = foo.pluck('a'); // bar is [1, 2]
	var foo2 = [{ a: 1 }, { b: 2 }];
	var bar2 foo2.pluck('a'); // bar2 is [1, undefined]

### Notes

	Undefined properties are not filtered from the returned array, as shown in the second example.

[Array]: /core/Types/Array
[MDC Array.reduce]: https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Array/Reduce
[MDC Array.reduceRight]: https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Array/ReduceRight
