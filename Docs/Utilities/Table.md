Class: Table {#Table}
=====================

A LUA-style table implementation that allows for arbitrary data types for keys.

### Note

- Table should only be used when it's really important to use non-scalar types as keys, otherwise use plain objects, which have a better performance.


Table Method: constructor
-------------------------

### Syntax

	var myTable = new Table();

### Arguments

None

### Returns

* (*object*) A new Table instance.

Table Method: set {#Table:set}
------------------------------

Set a value for a specific key. Note that the key can be anything - a function, an object, an element, etc.

### Syntax

	myTable.set(key, value);

### Arguments

1. key - (*object*) The key for the value; any type of object.
2. value  - (*object*) The value for the key; any type of object.

### Returns

* (*object*) This Table instance.

### Examples

	var myTable = new Table();
	myTable.set($('myForm'), {foo: 'bar'});
	myTable.set(myClassInstance, $$('.someElements'));

Table Method: get {#Table:get}
------------------------------

Get a value for a specific key.

### Syntax

	myTable.get(key);

### Arguments

1. key - (*object*) The key for the value.

### Returns

* (*object*) the value set for the specified key.

Table Method: set {#Table:erase}
--------------------------------

Erase a given key/value from the Table instance.

### Syntax

	myTable.erase(key);

### Arguments

1. key - (*object*) The key for the value.

### Returns

* (*object*) This Table instance.

Table Method: each {#Table:each}
--------------------------------

Iterates over the key/values in the table.

### Syntax

	myTable.each(function, bind);

### Arguments

1. function - (*function*) Function executed for each key/value pair in the Table instance; passed two arguments (key and value).
2. bind - (*object*, optional) The object to be used as 'this' in the function. For more information see [Function:bind][].

### Returns

* (*object*) This Table instance.

### Examples

	var myTable = new Table();
	// first set some values
	myTable.set($('myForm'), {foo: 'bar'});
	myTable.set(myClassInstance, $$('.someElements'));
	// and now iterate over them
	myTable.each(function(value, key){
		console.log(value, key);
	});


[Function:bind]: /core/Types/Function/#Function:bind
