Native: String {#String}
========================

A collection of the String Object prototype methods.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/03-string.extras

### See Also:

- [String][]


String Method: stripTags {#String:stripTags}
-------------------------------------

Remove all html tags from a string.

### Syntax

	myString.stripTags();

### Example

	var html = "<b>This is a string with <i>html</i> in it.</b>"
	var noHtml = html.stripTags();
	//returns "This is a string with html in it."

### Returns

* (*string*) a string without any HTML tags

String Method: parseQuery {#String:parseQuery}
----------------------------------------------

Turns a querystring into an object of key/value pairs.

### Syntax

	myString.parseQuery(encodeKeys, encodeValues);
	
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
----------------------------------

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

String Method: tidy {#String:tidy}
----------------------------------

Replaces common special characters with their ASCII counterparts (smart quotes, elipse characters, stuff from MS Word, etc.).

### Syntax

	var tidyString = stringWithBadChars.tidy();

### Returns

* (*string*) the string with the non-ASCII characters replaced

String Method: findAllEmails {#findAllEmails}
--------------------------------------------

Finds all the email addresses present in a string.

### Syntax

	var arrayOfEmails = myString.findAllEmails();

### Example

	var arrayOfEmails = "fred: fred@flintstone.com, barney: barney@rubble.com".findAllEmails();
	//arrayOfEmails = ['fred@flintstone.com', 'barney@rubble.com'];

[String]: http://docs.mootools.net/Native/String
[Array.filter]: http://docs.mootools.net/Native/Array#Array:filter
[encodeURIComponent]: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
