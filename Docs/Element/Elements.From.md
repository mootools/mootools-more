Type: Elements {#Elements}
==========================

Extends the [Elements][] object to add a function that returns a collection of elements from a string of html.

Function: Elements.from {#Elements:Elements-from}
----------------------------------------------

Returns a collection of elements from a string of html.

### Syntax

	Elements.from(str, excludeScripts);

### Arguments

1. str - (*string*) an html string.
2. excludeScripts - (*boolean*) if *true*, the default, scripts are not included in the element collection returned.

### Example

	var els = Elements.from("<p>this is a <i>string</i> of <b>HTML</b>.</p><p>It has two paragraphs.</p>");
	els.each(function(paragraph){
		console.log(paragraph); //logs each paragraph
	});
	els.inject(document.body); //injects both paragraphs into the document body

### Returns

* (*array*) an array of elements (i.e. a collection) - an instance of [Elements][].

[Elements]: /core/Element/Element#Elements
