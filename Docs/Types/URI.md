Type: URI {#URI}
==================

Provides numerous methods useful for managing URIs.

URI Method: constructor
-----------------------

Pass a *string* to the URI subclass and it will extend it, returning a new string-like object with new methods useful for managing that URI.

### Syntax

	new URI([strURI, options]);

### Arguments

1. strURI - (*string*) the URI to parse into the class.
2. options - (*object*) a key/value set of options.

### Options

* base - (*mixed*) A base href for the URI (defaults to the document base location). Can be a *string* or an instance of *URI*. This is used to interpret relative urls (for instance if you were to call *new URI('/foo/bar.html')* the class will infer that this path is relative to the current document base location).

### Example

	var myURI = new URI('http://user:password@www.test.com:8383/the/path.html?query=value#anchor');

### Returns

* *URI* - (*string*; optional) - an instance of the URI class that has new methods useful for managing the URI. If not declared the window's current base location is used.

URI Method: toString {#URI:toString}
------------------------------------------

Returns the URI as a *string*.

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

1. type - (*string*, optional) url with a query string to parse; defaults to *window.location*

### Example

	myURI.set('scheme', 'https');
	myURI.set('host', 'www.foo.com');
	//etc.

### Returns

* (*URI*) This instance of *URI*.

### Valid parts

* scheme - (*string*) 'http', 'https', 'ftp', etc.
* user - (*string*) the username portion of the credentials
* password - (*string*) the password portion of the credentials
* host - (*string*) 'www.example.com', 'example.com', 'subdomain.example.com', etc.
* port - (*string* or *number*) 80, 8080, etc.
* directory - (*string*) '/directory/'
* file - (*string*) 'file.html'
* query - (*string*) 'foo=bar&something=else' (the *?* is added for you)
* fragment - (*string*)  'anAnchor' (the *#* is added for you)
* data - (*object*) an object of key/value pairs to set the query to (*{foo: 'bar', something: 'else'}*)

URI Method: get {#URI:get}
--------------------------

Returns the current value for the specified portion of the URI.

### Syntax

	myURI.get(part);

### Example

	myURI.get('scheme'); //returns "http", for example
	myURI.get('host'); //returns "www.example.com", for example

### Returns

* *mixed* - usually returns a *string*, but in the case of 'data' returns an *object*.

### Valid parts

* scheme - (returns *string*) 'http', 'https', 'ftp', etc.
* user - (*string*) the username portion of the credentials
* password - (*string*) the password portion of the credentials
* host - (returns *string*) 'www.example.com', 'example.com', 'subdomain.example.com', etc.
* port - (returns *string*) 80, 8080, etc.
* directory - (returns *string*) '/directory/'
* file - (returns *string*) 'file.html'
* query - (returns *string*) 'foo=bar&something=else' (the *?* is added for you)
* fragment - (returns *string*)  'anAnchor' (the *#* is added for you)
* data - (returns *object*) an *object* of key/value pairs to set the query to (*{foo: 'bar', something: 'else'}*)

URI Method: setData {#URI:setData}
------------------------------------------

Sets the query string from an *object* (much like *myURI.set('data', obj)*) but also allows merging.

### Syntax

	myURI.setData(data[, merge, part]);


### Arguments

1. object - (*object*) the key/values you want to set for the query string
2. merge - (*boolean*, optional) if *true* the values will be merged with the existing query string. Defaults to *false*.
3. part - (*string*, optional) this defaults to 'query' for setting query string data to the URI, but you could, for example specify 'fragment' to assign query string data to the '#...' portion of the URI (which is useful in ajax applications that wish to store state in the URI without reloading the document).

### Alternate Syntax

	myURI.setData(key, value);

### Alternate Syntax Arguments

1. key - (*string*) the key of the data which you wish to assign
2. value - (*string* or *number*) the value you wish to assign

### Returns

* (*URI*) this instance of *URI*

### Example

	myURI.setData(myObject); //same as myURI.set('data', myObject);
	myURI.setData(myObject, true); //merges myObject w/ existing query values
	myURI.setData('foo', 'bar'); //sets foo=bar in the query string
	myURI.setData({foo: 'bar'}, false, 'fragment'); //adds #foo=bar to the url fragment


URI Method: getData {#URI:getData}
----------------------------------

Returns the query string values as an *object*. Same as *URI.get('data')*.

### Syntax

	myURI.getData([key, part]);

### Arguments

1. key - (*string*; optional) If specified, returns the value for the given key.
2. part - (*string*; optional) If specified, returns the data from the given part (defaults to 'query'). This is useful if you choose to store data in the fragment (the '#...' part of the URI) which is useful in ajax applications that wish to store state in the URI without reloading the document.

### Returns

* *mixed* - the *string* value for the given key; if key is not specified, returns an *object* for all the query string values.

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

URI Method: toURI {#URI:toURI}
------------------------

Returns the current instance of *URI*. Useful when a parameter type is known to be either string or URI.

### Example

	// Accepts either a string or URI instance
	function(uri){
		this.filename = uri.toURI().get('file');
	}

Type: String {#String}
========================

Adds a method to instantiate a *URI* instance from a string.

String Method: toURI {#String:toURI}
------------------------------------

Returns a *URI* instance.

### Syntax

	"http://www.domain.com/etc".toURI()

### Returns

* an instance of URI
