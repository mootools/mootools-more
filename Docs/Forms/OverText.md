Class: OverText {#OverText}
===========================

Shows text over an input that disappears when the user clicks into it. The text remains hidden if the user adds a value.

### Tutorial/Demos

* [Enhanced Form](http://mootools.net/demos/?demo=Enhanced-Form)
* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/09-forms/05-overtext)

### Implements

* [Options][], [Events][], [Class.Binds][]


OverText Method: constructor
-----------------------------


### Syntax

	new OverText(input[, options]);

### Arguments

1. input - (*mixed*) a DOM Element (or its id) that should receive the hover text
2. options - (*object*, optional) a key/value set of options

### Options

* element - (*string*) type of element to be used for the OverText; defaults to *label*.
* positionOptions - (*object*) data passed to [Element.position][].
* poll - (*boolean*) whether to periodically re-evaluate the input to set their overtext element's position and visibility (useful for login in fields that are often populated by remembered usernames and passwords by the browser); defaults to *false*.
* pollInterval - (*number*) the duration between polling in milliseconds; defaults to *250*.
* wrap - (*boolean*) if *true*, all inputs are wrapped with a div that is positioned relatively with the class "overTxtWrapper"
* textOverride - (*string*) if defined, this will be the value of the over text rather than the input *alt* or *title*.
* labelClass - (*string*, defaults to `overTxtLabel`) a css classname to style the input overtext

### Events

* onTextHide - (*function*) callback fired when an overtext element is hidden (passed the overtext element and the input element as arguments)
* onTextShow - (*function*) callback fired when an overtext element is shown (passed the overtext element and the input element as arguments)

### Note
OverText positions the text over your input. Depending on your layout, it's possible that your input might move (for instance, if you inject new content above it, or the user resizes their browser). This often happens with [Form.Validator.Inline](/more/Forms/Form.Validator.Inline), for instance. The solution here is to wrap your inputs in containers that are positioned (position: relative, for instance). By wrapping your inputs, when the page flow changes the overtext will move with them. The *wrap* option does this for you automatically.

OverText Method: hide {#OverText:hide}
--------------------------------------

Hides the overtext element for a given input.

### Syntax

	myOverText.hide();

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: show {#OverText:show}
--------------------------------------

Shows the overtext element for a given input.

### Syntax

	myOverText.show();

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: focus {#OverText:focus}
--------------------------------------------------------

Focuses the input and hides the overtext.

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: enable {#OverText:enable}
--------------------------------------------------------

Enables the behavior of the class. Displays the text hint if the input is empty.

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: disable {#OverText:disable}
--------------------------------------------------------

Disables the behavior of the class. Hides the text hint.

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: destroy {#OverText:destroy}
--------------------------------------------------------

Destroys the class, removing the behavior from the input as well as any DOM elements created (the hint text label and the wrapper element if the options called for it).

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: reposition {#OverText:reposition}
----------------------------------------------------------------

Repositions the overtext element over a the input.

### Syntax

	myOverText.reposition();

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: startPolling {#OverText:startPolling}
--------------------------------------------------------

Begins repeatedly polling the input to position and show (or hide) the over text. Useful for login fields that are often autofilled by browsers.

### Returns

* (*object*) - This instance of [OverText][]

OverText Method: stopPolling {#OverText:stopPolling}
--------------------------------------------------------

Cancels the polling of the input.

### Returns

* (*object*) - This instance of [OverText][]

OverText Static Methods: update {#OverText:update}
==================================================

These method calls are made against the OverText namespace (not instances of OverText) and apply their actions to all running instances.


OverText Static Method: update {#OverText:update}
-------------------------------------------------

This allows you to manually re-assert the positioning and visibility of all the OverTexts on the page.

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

* *array* - an array of all the running instances of the class.

OverText Static Method: hideAll {#OverText:hideAll}
-------------------------------------------------

This allows you to manually hide all the OverTexts on the page.

### Syntax

	OverText.hideAll();

### Note

This method is NOT a method on the instance. Rather it is on the namespace. So:

### Example

	var myOverText_1 = new OverText(...);
	var myOverText_2 = new OverText(...);
	//...later
	OverText.hideAll(); //hides all the instances of OverText

### Returns

* *array* - an array of all the running instances of the class.


OverText Static Method: showAll {#OverText:showAll}
-------------------------------------------------

This allows you to manually show all the OverTexts on the page.

### Syntax

	OverText.showAll();

### Note

This method is NOT a method on the instance. Rather it is on the namespace. So:

### Example

	var myOverText_1 = new OverText(...);
	var myOverText_2 = new OverText(...);
	//...later
	OverText.showAll(); //updates all the instances of OverText

### Returns

* *array* - an array of all the running instances of the class.

Type: Element {#Element}
==========================

Extends the Element Type with a reference to its [OverText][] instance.

Element property: OverText {#Element:overtext}
------------------------------------------------

### Syntax

	myInput.retrieve('OverText'); //the instance of OverText for the element


[Overtext]: #OverText
[OverText.reposition]: #OverText:reposition
[Element.position]: /more/Element/Element.Position#Element:position
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Class.Binds]: /more/Class/Class.Binds
