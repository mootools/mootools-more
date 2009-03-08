Native: String {#String}
========================

A collection of the String Object prototype methods.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/03-string.extras

### See Also:

- [String][]


String Method: pad {#String:pad}
-------------------------------------

Pads a string with the specified character(s) either before or after the current value.

### Syntax

	myString.pad(length, string, direction);

### Arguments

1. length - (*number*) the number of characters to pad.
2. string - (*string*) the string to use for padding; defaults to a space.
3. direction - (*string*) either "left" or "right" (defaults to "right"); the side to add the padding.

### Example

	var tonyTheTigerSez = "They're gr".pad(5, 'r') + 'eat!';
	//returns "They're grrrrrreat!"

### Returns

* (*string*) a string with the specified character repeated the specified number of times either to the right or left of the current value.


String Method: repeat {#String:repeat}
-------------------------------------

Repeats a string a specified number of times.

### Syntax

	myString.repeat(times);

### Arguments

1. times - (*number*) The number of times to repeat the string.

### Example

	var one = "1";
	var eleventyOne = one.repeat(3);
	//returns "111"

### Returns

* (*string*) the string repeated the specified number of times.


String Method: standardize {#String:standardize}
-------------------------------------

Removes non-ascii characters and converts them to their most appropriate ascii character.

### Syntax

	myString.standardize();

### Example

	var bjorkProper = "Björk";
	var bjorkAscii = bjorkProper.standarize();
	//returns "Bjork"

### Returns

* (*string*) a string without any non-ascii characters.




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

[String]: /docs/core/Native/String
[Array.filter]: /docs/core/Native/Array#Array:filter
[encodeURIComponent]: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
