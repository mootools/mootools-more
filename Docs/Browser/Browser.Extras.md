Hash: Browser {#Browser}
========================

Adds numerous methods for managing various window location data to the [Browser][] Object.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/02-browser/00-browser.extras

Browser Method: getHost	{#Browser:getHost}
------------------------------------------

### Syntax

	Browser.getHost();
	Browser.getHost(url);

### Returns

* (*string*) the domain of the window or the passed in url.

### Arguments

1. url (*string*, optional) - the url you wish to get the host for (otherwise *Browser.getHost* returns the host of the current window location).

Browser Method: getQueryStringValue {#Browser:getQueryStringValue}
------------------------------------------------------------------

### Syntax

	Browser.getQueryStringValue(key[, url]);

### Arguments

1. key - (*string*) the key to search for in the querystring
2. url - (*string*, optional) url with a querystring to parse; defaults to *window.location*

### Returns 

* (*string*) a specific querystring value from the window location.

### Example

	//window.location is http://www.example.com/?red=apple&yellow=lemon
	var something = window.getQueryStringValue("red");
	> something = "apple"
	var something = window.getQueryStringValue("red", "http://www.example.com/?red=apple&yellow=lemon");
	> something = "apple"

Browser Method: getQueryStringValues {#Browser:getQueryStringValues}
---------------------------------------------------------------------

### Syntax

	Browser.getQueryStringValues();
	Browser.getQueryStringValues(url);

### Arguments

1. url - (*string*, optional) url with a querystring to parse; defaults to *window.location*

### Returns

* (*object*) An object with name/value pairs of the values in the querystring of the window

### Example

	//window.location is http://www.example.com/?red=apple&yellow=lemon
	Browser.getQueryStringValues();
	//returns: { red: 'apple', yellow: 'lemon' }
	Browser.getQueryStringValues("http://www.example.com/?red=apple&yellow=lemon");
	//returns: { red: 'apple', yellow: 'lemon' }


Browser Method: getPort {#Browser:getPort}
------------------------------------------

### Syntax

	Browser.getPort();
	Brower.getPort(url);

### Arguments

1. url - (*string*, optional) the url to test for a port; defaults to *window location*

### Returns 

* (*string*) the port number of the window location

### Example

	//window.location.href is http://www.example.com:8001/blah.html
	Browser.getPort();
	> 8001
	Browser.getPort("http://www.example.com:8001/blah.html");
	> 8001

Browser Method:	qs {#Browser:qs}
--------------------------------

### Syntax

	Browser.qs;

### Returns

* (*object*) an object with name/value pairs of the values in the querystring of the window

### Example

	//window.location.href is http://www.example.com?red=apple&yellow=lemon
	Browser.qs["red"]; //or Browser.qs.red
	> apple
	Browser.qs["yellow"]; //or Browser.qs.yellow
	> lemon

### Notes

- This is a shortcut to *Browser.getQueryStringValues()*.

Browser Method: redraw {#Browser:qs}
------------------------------------

Forces the window to refresh/redraw. Useful for some cases where the browser just... doesn't.

### Syntax

	Browser.redraw();

Browser Method: mergeQueryStringValues {#Browser:mergeQueryStringValues}
--------------------------------------------------------------------

Combines query string values into a query string.

### Syntax

	Browser.mergeQueryStringValues(values[, url]);

### Arguments

1. values - (*object*) an object of key/value pairs to merge into a url/queryString
2. url - (*string*) a url or query string that you'd like to merge with the values

### Examples

	//merges foo=bar with the current window's query string
	//so if the page is http://www.test.com?x=y
	//this would return http://www.test.com?x=y&a=b
	Browser.mergeQueryStringValues({a: 'b'})
	
	//merges with a specified url
	//this would yeild www.test.com?x=y&a=b
	Browser.mergeQueryStringValues({a: 'b'}, 'http://www.test.com?x=y');
	
	//specified values overwrite the url values
	//this would yeild http://www.test.com?x=y&a=c
	Browser.mergeQueryStringValues({a: 'c'}, 'http://www.test.com?x=y&a=b');
	
	//query strings can be passed without the full url
	//this would yeild x=y&a=c
	Browser.mergeQueryStringValues({a: 'c'}, 'x=y&a=b');

### Returns

* *string* the resulting url.

### Note

The url returned is *not* encoded.

[Browser]: http://docs.mootools.net/Core/Browser
