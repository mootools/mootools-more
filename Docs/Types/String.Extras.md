Type: String {#String}
========================

A collection of the String Object prototype methods.

### Tutorial/Demo

* [Online Tutorial/Demo][]

[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/03-string.extras

### See Also

- [String][]


String Method: pad {#String:pad}
-------------------------------------

Pads a string with the specified character(s) either before or after the current value.

### Syntax

	myString.pad(length, string, direction);

### Arguments

1. length - (*number*) the number of characters to pad.
2. string - (*string*) the string to use for padding; defaults to a space.
3. direction - (*string*) either "left", "right" or "both" (defaults to "right"); the side to add the padding.

### Example

	var tonyTheTigerSez = "They're gr".pad(15, 'r') + 'eat!';
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
	var bjorkAscii = bjorkProper.standardize();
	//returns "Bjork"

### Returns

* (*string*) a string without any non-ascii characters.

String Method: getTags {#String:getTags}
-------------------------------------

Get all the HTML tags from a given string.

### Syntax

	myString.getTags([tag, contents]);

### Arguments

1. tag - (*string*; optional) if defined, returns the tags of the specified type in an array. If not defined, returns all tags in an array.
2. contents - (*boolean*; optional) if *true*, you are returned an array of tag matches and their contents.

### Example

	var html = "<b>This is a string with <i>html</i> in it.</b>"
	var tags = html.getTags();
	//returns ["<b>", "<i>", "</i>", "</b>"]
	var italics = html.getTags('i');
	//returns ["<i>", "</i>"]
	var italicsWithContent = html.getTags('i', true);
	//returns ["<i>html</i>"]

### Returns

* (*array*) An array of strings for each matched tag (important note: NOT *elements*, *strings*)

### Note

Currently, you cannot ask for all tags with their content. If you want the inner content of tags, you must specify the tag type.


String Method: stripTags {#String:stripTags}
-------------------------------------

Remove all html tags from a string.

### Syntax

	myString.stripTags([tag, contents]);

### Arguments

1. tag - (*string*; optional) if defined, returns the tags of the specified type in an array. If not defined, returns all tags in an array.
2. contents - (*boolean*; optional) if *true*, you are returned an array of tag matches and their contents.

### Example

	var html = "<b>This is a string with <i>html</i> in it.</b>"
	var noHtml = html.stripTags();
	//returns "This is a string with html in it."
	var noItalics = html.stripTags('i');
	//returns "<b>This is a string with html in it.</b>"
	var noItalicsContent = html.stripTags('i', true);
	returns "<b>This is a string with  in it.</b>"

### Returns

* (*string*) a string with the appropriate HTML stripped

String Method: tidy {#String:tidy}
----------------------------------

Replaces common special characters with their ASCII counterparts (smart quotes, elipse characters, stuff from MS Word, etc.).

### Syntax

	var tidyString = stringWithBadChars.tidy();

### Returns

* (*string*) the string with the non-ASCII characters replaced

String Method: truncate {#String:truncate}
------------------------------------------

Truncates a string after the given number of characters.

### Syntax

	myString.truncate(max, trail, atChar);

### Arguments

1. max - (*number*) the maximum length of the string.
2. trail - (*string*, optional) the trail which will be appended to the string when it is truncated, defaults to `…` when only the `max` argument is passed.
3. atChar - (*string*, optional) a string which be truncated after. For example before a space.

### Returns

* (*string*) the truncated string

### Examples

	'This is some random text'.truncate(15); // This is some ra…
	'This is some random text'.truncate(15, '--'); // This is some ra--
	'This is some random text'.truncate(15, '…', ' '); // This is some…

String Method: ms {#String:ms}
------------------------------------------

Converts a string with units, such as '5m', to milliseconds, for use with e.g. [Function.delay][].

### Syntax

	'3s'.ms()

### Returns

* (*number*) the string converted to milliseconds

### Examples

	theFunction.delay('10s'.ms()); // Executes theFunction in 10,000 milliseconds

### Notes

	Currently supported units are
		- ms: milliseconds
		- s: seconds (1000 milliseconds)
		- m: minutes (60,000 milliseconds)
		- h: hours (3,600,000 milliseconds)



[String]: /core/Types/String
[Array.filter]: /core/Types/Array#Array:filter
[Function.delay]: /core/Types/Function#Function:delay
[encodeURIComponent]: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
