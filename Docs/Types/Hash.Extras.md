Type: Hash {#Hash}
========================

A collection of Hash methods.

### Note

Hash Extras is kept for compatibility reasons. It is expected to be removed with the MooTools 2.0 release. It is encouraged to use [Object.Extras][] instead.

### Tutorial/Demo

* [Online Tutorial/Demo][]

[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/02-hash.extras


### See Also

- [Mootools:Hash][]


Hash Method: getFromPath {#Hash:getFromPath}
-------------------------------------

Returns a value of an object by its path.

### Syntax

	myHash.getFromPath(path);

### Arguments

1. path - (*string*) the path to the key for the value you wish to retrieve

### Returns

* (*null* or *mixed*) if the path has no value, *null* is returned; otherwise the value that corresponds to the path is returned.

### Example

	#H({
		food: {
			fruits: {
				apples: "red",
				lemon: "yellow"
			}
		}
	}).getFromPath("food.fruits.apples");
	//returns "red"


Hash Method: cleanValues {#Hash:cleanValues}
-------------------------------------

Removes values from the Hash.

### Syntax

	myHash.cleanValues(method);

### Arguments

1. method - (*function*) The function that each value in the Hash is passed. If it returns **true** the value is kept. Defaults to **[$defined][]**.

### Returns

* (*Hash*) - This Hash.

### Example

	$H({
		foo: 'bar',
		something: 'else',
		missing: null
	}).cleanValues();

	//remove all values < 0
	$H({
		a: -1,
		b: 2,
		c: 0,
		d: -5
	}).cleanValues(function(value){
		if ($type(value) != "number") return true;
		return value > 0;
	});

Hash method: run {#Hash:run}
----------------------------

Runs all the methods that are values of the hash.

### Syntax

	myHash.run()

### Example

	var myPage = {
		init: new Hash({
			setupNav: function(){
				//set up the nav
			},
			setupSearch: function(){
				//set up the search
			}
		})
	};
	window.addEvent('domready', myPage.init.run.bind(myPage.init));

[Object.Extras]: /more/Types/Object.Extras
