Type: String {#String}
========================

A collection of the String Object prototype methods.

String Method: parseQueryString {#String:parseQueryString}
----------------------------------------------------------

Turns a querystring into an object of key/value pairs.

### Syntax

	myString.parseQueryString(decodeKeys, decodeValues);

### Arguments

1. decodeKeys - (*boolean*, optional) if set to *false*, keys are passed through [decodeURIComponent][]; defaults to *true*
1. decodeValues - (*boolean*, optional) if set to *false*, values are passed through [decodeURIComponent][]; defaults to *true*

### Example

	"apple=red&lemon=yellow".parseQueryString();
	//returns { apple: "red", lemon: "yellow }
	var fruits = "apple=red&lemon=yellow".parseQueryString();
	//returns fruits.apple > "red"

### Returns

* (*object*) the querystring as key/value pairs

### See Also

- [Object.toQueryString][]

String Method: cleanQueryString {#String:cleanQueryString}
----------------------------------------------------------

Removes from a query string any keys that have empty values.

### Syntax

	myQueryString.cleanQueryString([method]);

### Arguments

1. method - (*funciton*, optional) a method passed to [Array.filter][] that returns true if a key/value set should be included. Defaults to a method that checks that the value is not an empty string.

### Example

	var cleaned = "a=b&x=&z=123&e=".cleanQueryString();
	//cleaned = "a=b&z=123"
	var noNumberValues = "a=b&x=y&z=123&e=".cleanQueryString(function(set){
		//set is "a=b", "x=y", "z=123", "e="
		return !set.split("=")[1].match(/[0-9]/);
	});
	//noNumberValues = "a=b&x=y&e="

### Returns

* (*string*) the string appropriate key/values removed
