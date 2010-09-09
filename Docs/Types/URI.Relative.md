Type: URI {#URI}
==================

Extends the [URI][] class to add methods for computing relative and absolute urls.

URI Method: toAbsolute {#URI:toAbsolute}
----------------------------------------

Returns the absolute path for a given url (i.e. a path beginning with '/'). If a different schemes or hosts are used, it returns the full url.

### Syntax

	myURI.toAbsolute([base]);

### Arguments

1. base - (*mixed*, optional) - either an instance of *URI* or a *string* (which will be passed to *URI*) that contains the base location for the path.

### Returns

* *string* - the absolute path beginning with '/'.

URI Method: toRelative {#URI:toRelative}
----------------------------------------

Returns the relative path for a given url (i.e. a path that might include '../' for example). If a different schemes or hosts are used, it returns the full url.

### Syntax

	myURI.toRelative([base]);

### Arguments

1. base - (*mixed*, optional) - either an instance of *URI* or a *string* (which will be passed to *URI*) that contains a location that is relative to *myURI*.

### Example

	var uri1 = new URI('http://www.test.com/this/is/a/path.html');
	var uri2 = new URI('http://www.test.com/this/is/an/adjacent/path.html')
	uri1.toRelative(uri2); //returns "../../a/path.html"

### Returns

* *string* - the relative path.

[URI]: /more/Types/URI
