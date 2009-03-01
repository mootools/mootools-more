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

String Method: tidy {#String:tidy}
----------------------------------

Replaces common special characters with their ASCII counterparts (smart quotes, elipse characters, stuff from MS Word, etc.).

### Syntax

	var tidyString = stringWithBadChars.tidy();

### Returns

* (*string*) the string with the non-ASCII characters replaced

[String]: http://docs.mootools.net/Native/String
[Array.filter]: http://docs.mootools.net/Native/Array#Array:filter
[encodeURIComponent]: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
