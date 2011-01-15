Class: Spinner {#Spinner}
=========================

Adds a semi-transparent overlay over a DOM element with a 'spinning' ajax icon.

### Extends

* [Mask][]

### Implements

* [Options][], [Events][], [Chain][]

Spinner Method: constructor
---------------------------

### Syntax

	new Spinner(target[, options]);

### Arguments

1. target - (*mixed*) A string of the id for an Element or an Element reference to overlay; defaults to *document.body*
2. options - (*object*) a key/value set of options

### Options
* all of [Mask][] options PLUS:
* message - (*mixed*, optional) message placed above the spinner image (as in "Please wait..."). Can be a *string* or an *element*.
* class - (*string*) css class name to apply to the spinner container.
* containerPosition - (*object*) options passed to [Element:position][] for the container of the message; relativeTo is set to the target in the arguments automatically (but can be overwritten).
* content - (*object*) properties for the element that contains the spinning image and the message. Defaults only to "class:spinner-content".
* img - (*object* or *false*) properties for the image element (note: not an img tag - a div); if set to *false* no image will be injected. Defaults to "class:spinner-img".
* fxOptions - (*object*) options passed to the effects used to transition the overlay and the image opacity.

### Styles

You can style the layer and its contents by just defining a css style for the class names specified in the options class name (these default to ".spinner", ".spinner-content", and ".spinner-img"). You can download the default styles and spinner image here: [spinner.css](http://github.com/mootools/mootools-more/raw/master/Styles/Interface/Spinner/spinner.css), [spinner.gif](http://github.com/mootools/mootools-more/raw/master/Styles/Interface/Spinner/spinner.gif). Without any styles nothing will show up, except for any optional message you may have passed.

### Events

* show - (*function*) callback to execute when the spinning layer is shown; passed the target element to which the [Spinner][] was attached
* hide - (*function*) callback to execute when the spinning layer is hidden; passed the target element to which the [Spinner][] was attached

### Example

	<div id="myElement">...</div>

	new Spinner('myElement');


Spinner Method: toggle {#Spinner:toggle}
----------------------------------------

Toggles the [Spinner][] visibility. If the [Spinner][] is currently visible, it will hide. Otherwise it will display.

### Syntax

	mySpinner.toggle(element);

### Arguments

1. element - (*mixed*, optional) A string of the id for an Element or an Element reference to overlay; defaults to the target passed in at initialization, but you can specify a different element if you wish to reuse the class.

### Returns

* (*object*) This instance of [Spinner][]

Spinner Method: show {#Spinner:show}
------------------------------------

Displays the [Spinner][] layer.

### Syntax

	mySpinner.show(noFx);

### Arguments

1. noFx - (*boolean*) if *true* the spinner will not use effects to display but will show immediately (defaults to *false*).

### Returns

* (*object*) This instance of [Spinner][]

Spinner Method: hide {#Spinner:hide}
------------------------------------

Hides the [Spinner][] layer.

### Syntax

	mySpinner.hide(noFx);

### Returns

1. noFx - (*boolean*) if *true* the spinner will not use effects to hide but will hide immediately (defaults to *false*).

Spinner Method: destroy {#Spinner:destroy}
------------------------------------------

Destroys the [Spinner][] spinner layer and its contents. This renders the instance of this class inert (and further calls to its methods will throw errors).

### Syntax

	mySpinner.destroy()

### Returns

* (*object*) This instance of [Spinner][]

Spinner Method: position {#Spinner:position}
--------------------------------------------

Reasserts the position of the spinner layer and its contents.

### Syntax

	mySpinner.position()

### Returns

* (*object*) This instance of [Spinner][]


Spinner Method: resize {#Spinner:resize}
----------------------------------------

Reasserts the dimensions of the overlay layer. Note that this method is called when [Spinner.position][] is called, so you needn't call it if you call position.

### Syntax

	mySpinner.destroy()

### Returns

* (*object*) This instance of [Spinner][]

Class: Request {#Request}
=========================

Extends [Request][] to add integrated [Spinner][] functionality.

### Extends

* [Request][]

### Syntax

	new Request(options);

### Arguments

* options - (*object*) an object with key/value options

### Options

* all of [Request][] options PLUS:
* useSpinner - (*boolean*) use the [Spinner][] class with this request
* spinnerOptions - (*object*) the options object for the [Spinner][] class
* spinnerTarget - (*mixed*) a string of the id for an Element or an Element reference to use instead of the one specifed in the *update* option. This is useful if you want to overlay a different area (or, say, the parent of the one being updated).

### Example

	new Request({
		url: '/myHtmlFragment.html',
		update: $('myElement'),
		useSpinner: true,
		spinnerOptions: {...etc...}
	});

### Notes

* When you execute *Request.send* the [Spinner][] class will automatically overlay the area on the page that's going to get updated with the new content and when this area is updated the [Spinner][] hides itself.

Request Method: getSpinner {#Request:getSpinner}
------------------------------------------------

Retrieves the "build-in" instance of [Spinner][].

### Syntax

	myRequest.getSpinner();

### Returns

* (*object*) This instance of [Spinner][]

Type: Element {#Element}
==========================

Extends the Element Type with [Spinner][] methods.

Element Property: spinner {#Element-Properties:spinner}
-------------------------------------------------------

### Setter

Sets a default [Spinner][] instance for an Element.

#### Syntax

	el.set('spinner'[, options]);

#### Arguments

1. options - (*object*, optional) The [Spinner][] options.

#### Returns

* (*element*) This Element.

#### Examples

	el.set('spinner', {message: 'one moment...'});
	el.spin(); //obscure the element with the spinner
	el.unspin(); //hide the spinner

### Getter

Gets the default [Spinner][] instance for the Element.

#### Syntax

	el.get('spinner');

#### Arguments

1. name - (*string*) This should always be 'spinner'.

#### Returns

* (*object*) The Element's internal [Spinner][] instance.

#### Examples

	el.set('spinner', {message: 'one moment...'});
	el.spin(); //show the spinner
	el.get('spinner'); //The Spinner instance.

Type: Element {#Element}
==========================

Adds [Spinner][] shortcuts to the [Element][] class.

Element Method: spin {#Element:spin}
------------------------------------

Retrieves the "build-in" instance of [Spinner][] and calls its *mask* method.

### Syntax

	$('myElement').spin([options]);

### Arguments

1. options - (*object* - optional) the options for the default spinner.

### Returns

* (*element*) This Element

Element Method: unspin {#Element:unspin}
----------------------------------------

Retrieves the "build-in"  instance of [Spinner][] and calls its *hide* method.

### Syntax

	$('myElement').unspin();

### Returns

* (*element*) This Element


[Spinner]: #Spinner
[Mask]: /more/Interface/Mask
[IframeShim]: /more/Browser/IframeShim
[Element]: /core/Element/Element
[Element:position]: /more/Element/Element.Position#Element:position
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Chain]: /core/Class/Class.Extras#Chain
[Request]: /core/Request/Request
