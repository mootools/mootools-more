Class: OverText {#OverText}
===========================

Shows text over an input that disappears when the user clicks into it. The text remains hidden if the user adds a value.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/09-forms/05-overtext

### Implements

* [Options][], [Events][]

### Syntax

	new OverText(inputs[, options]);

### Arguments

1. inputs - (*mixed*) a DOM Element, its id, a collection of DOM elements or a selector that should receive the hover text
2. options - (*object*, optional) a key/value set of options

### Options

* positionOptions - (*object*) data passed to [Element.position][]
* poll - (*boolean*) whether to periodically re-evaluate the inputs to set their overtext element's position and visibility (useful for login in fields that are often populated by remembered usernames and passwords by the browser); defaults to *false*.
* pollInterval - (*integer*) the duration between polling in milliseconds; defaults to *400*

### Events

* onTextHide - (*function*) callback fired when an overtext element is hidden (passed the overtext element and the input element as arguments)
* onTextShow - (*function*) callback fired when an overtext element is shown (passed the overtext element and the input element as arguments)

OverText Method: hideTxt {#OverText:hideTxt}
--------------------------------------------

Hides the overtext element for a given input.

### Syntax

	myOverText.hideTxt(element);

### Arguments

1. element - (*mixed*) A string of the id for an Element or an Element reference whose overtext element should be hidden

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: showTxt {#OverText:showTxt}
--------------------------------------

Shows the overtext element for a given input.

### Syntax

	myOverText.showTxt(element);

### Arguments

1. element - (*mixed*) A string of the id for an Element or an Element reference whose overtext element should be shown

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: repositionAll {#OverText:repositionAll}
--------------------------------------------------------

Repositions each overtext element over its appropriate input.

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: repositionOverTxt {#OverText:repositionOverTxt}
----------------------------------------------------------------

Repositions the appropriate overtext element over a given input.

### Syntax

	myOverText.repositionOverTxt(input);

### Arguments

1. input - (*mixed*) A string of the id for an Element or an Element reference whose overtext element should be repositioned

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: startPolling {#OverText:startPolling}
--------------------------------------------------------

Begins repeatedly polling the inputs to position and show (or hide) the over text. Useful for login fields that are often autofilled by browsers.

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: stopPolling {#OverText:stopPolling}
--------------------------------------------------------

Cancels the polling of fields.

### Returns

* (*object*) - This instance of [OverText][]

OverText Static Method: update {#OverText:update}
-------------------------------------------------

This method calls [OverText.repositionAll][] for all running instances of OverText. This allows you to manually re-assert the positioning and visibility of all the OverTexts on the page.

### Syntax

	OverText.update();

### Note

This method is NOT a method on the instance. Rather it is on the namespace. So:

### Example

	var myOverText_1 = new OverText(...);
	var myOverText_2 = new OverText(...);
	//...later
	OverText.update(); //updates all the instances of OverText
	
### Returns

* nothing

Native: Element {#Element}
==========================

Extends the native Element object with a reference to its [OverText][] instance.

Element property: OverText {#Element:overtext}
------------------------------------------------

### Syntax

	myInput.retrieve('OverText'); //the instance of OverText for the element




[Overtext]: #OverText
[OverText.repositionAll]: #OverText:repositionAll
[Element.position]: /docs/Native/Element.Position#Element:position
[Options]: http://docs.mootools.net/Class/Class.Extras#Options
[Events]: http://docs.mootools.net/Class/Class.Extras#Events
