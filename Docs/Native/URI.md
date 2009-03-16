String Subclass: URI {#URI}
========================

Extends a *string* to add numerous methods useful for managing URIs.

Usage {#Usage}
--------------

Pass a *string* to the URI subclass and it will extend it, returning a new string-like object with new methods useful for managing that URI. 

### Syntax

	var myURI = new URI(['http://www.test.com:8383/the/path.html?query=value#anchor']);

### Returns

* *URI* - (*string*; optional) - like object that has new methods useful for managing the URI. If not declared the window's current location is used.

### Notes

* If you pass the extended *string* to *typeof* it will return "object". However, if you pass it to MooTools' *$type* it will return "string".
* If you test the string against another string it will work as expected (i.e. *if (myURI == 'http://www.test.com...')*).

URI Method: toString {#URI:toString}
------------------------------------------

Returns an regular *string* without the URI extensions.

### Syntax

	myURI.toString(); //"http://www.test.com...etc"

### Returns

* (*string*) the unaltered url.

URI Method: set {#URI:set}
--------------------------

Set's a portion of the URI to the specified value.

### Syntax

	myURI.set(part, value);

### Arguments

1. type - (*string*, optional) url with a querystring to parse; defaults to *window.location*

### Example

	myURI.set('protocol', 'https');
	myURI.set('domain', 'www.foo.com');
	//etc.

### Returns

* (*URI*) This instance of *URI*.

### Valid parts

* protocol - (*string*) 'http', 'https', 'ftp', etc.
* domain - (*string*) 'www.example.com', 'exmaple.com', 'subdomain.example.com', etc.
* port - (*string* or *integer*) 80, 8080, etc.
* path - (*string*) '/directory/file.html'
* query - (*string*) 'foo=bar&something=else' (the *?* is added for you)
* fragment - (*string*)  'anAnchor' (the *#* is added for you)
* data - (*object*) an object of key/value pairs to set the query to (*{foo: 'bar', something: 'else'}*)

URI Method: get {#URI:get}
--------------------------

Returns the current value for the specified portion of the URI.

### Syntax

	myURI.get(part);

### Example

	myURI.get('protocol'); //returns "http", for example
	myURI.get('domain'); //returns "www.example.com", for example

### Returns

* *mixed* - usually returns a *string*, but in the case of 'data' returns an *object*.

### Valid parts

* protocol - (returns *string*) 'http', 'https', 'ftp', etc.
* domain - (returns *string*) 'www.example.com', 'exmaple.com', 'subdomain.example.com', etc.
* port - (returns *string*) 80, 8080, etc.
* path - (returns *string*) '/directory/file.html'
* query - (returns *string*) 'foo=bar&something=else' (the *?* is added for you)
* fragment - (returns *string*)  'anAnchor' (the *#* is added for you)
* data - (returns *object*) an *object* of key/value pairs to set the query to (*{foo: 'bar', something: 'else'}*)

URI Method: setData {#URI:setData}
------------------------------------------

Sets the query string from an *object* (much like *myURI.set('data', obj)*) but also allows merging.

### Syntax

	myURI.setData(data[, merge]);


### Arguments

1. object - (*object*) the key/values you want to set for the query string
2. merge - (*boolean*, optional) if *true* the values will be merged with the existing query string. Defaults to *false*.

### Returns

* (*URI*) this instance of *URI*

### Example

	myURI.setData(myObject); //same as myURI.set('data', myObject);
	myURI.setData(myObject, true); //merges myObject w/ existing query values
	

URI Method: getData {#URI:getData}
------------------------------------

Returns the query string values as an *object*. Same as *URI.get('data')*.

### Syntax

	myURI.getData([key]);

### Arguments

1. key - (*string*; optional) If specified, returns the value for the given key.

### Returns

* *string* - the value for the given key

URI Method: clearData {#URI:clearData}
--------------------------------------

Clears the query string values entirely.

### Syntax

	myURI.clearData();

URI Method: go {#URI:go}
------------------------

Loads the url into the document location.

### Syntax

	myURI.go();

Method Translations
===================

All the URI parts ('protocol', 'domain', 'port', 'query', and 'hash') have corresponding *get<Part>* methods. So you can call *myURI.get('domain')* or *myURI.getDomain()*. The same is true of *set* - you can call *myURI.set('domain', 'www.foo.com')* or *myURI.setDomain('www.foo.com')*. The *set/get(part)* method is the prefered method.
  
String Method: parseQueryString {#String:parseQueryString}
----------------------------------------------------------

Turns a querystring into an object of key/value pairs.

### Syntax

	myString.parseQueryString(encodeKeys, encodeValues);

### Arguments

1. encodeKeys - (*boolean*, optional) if set to *false*, keys are passed through [encodeURIComponent][]; defaults to *true*
1. encodeValues - (*boolean*, optional) if set to *false*, values are passed through [encodeURIComponent][]; defaults to *true*

### Example

	"apple=red&lemon=yellow".parseQuery();
	//returns { apple: "red", lemon: "yellow }
	var fruits = "apple=red&lemon=yellow".parseQuery();
	//returns fruits.apple > "red"

### Returns

* (*object*) the querystring as key/value pairs

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
  