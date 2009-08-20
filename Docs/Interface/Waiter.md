Class: Waiter {#Waiter}
=======================

Adds a semi-transparent overlay over a DOM element with a 'spinning' ajax icon.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/07-ui/11-waiter

### Extends

* [Mask][]

### Implements

* [Options][], [Events][], [Chain][]

### Syntax

	new Waiter(target[, options]);

### Arguments

1. target - (*mixed*) A string of the id for an Element or an Element reference to overlay; defaults to *document.body*
2. options - (*object*) a key/value set of options

### Options
* all of [Mask][] options PLUS:
* message - (*mixed*, optional) message placed above the spinner image (as in "Please wait..."). Can be a *string* or an *element*.
* class - (*string*) css class name to apply to the waiter container.
* containerPosition - (*object*) options passed to [Element:position][] for the container of the message; relativeTo is set to the target in the arguments automatically (but can be overwritten).
* content - (*object*) properties for the element that contains the spinning image and the message. Defaults only to "class:waiter-content".
* img - (*object* or *false*) properties for the image element (note: not an img tag - a div); if set to *false* no image will be injected. Defaults to "class:waiter-img".
* fxOptions - (*object*) options passed to the effects used to transition the overlay and the image opacity.

### Styles

Download the default styles which include css styles and a default spinner image.
You can also style the layer and its contents by just defining a css styles for the class names specified in the options class name (these default to ".waiter", ".waiter-content", and ".waiter-img"). Default styles can be found in the Styles directory of the MooTools More library on github or downloaded on the More builder on MooTools.net.

### Events

* onShow - (*function*) callback to execute when the waiting layer is shown; passed the target element to which the [Waiter][] was attached
* onHide - (*function*) callback to execute when the waiting layer is hidden; passed the target element to which the [Waiter][] was attached

### Example

	<div id="myElement">...</div>
	
	new Waiter('myElement');


Waiter Method: toggle {#Waiter:toggle}
--------------------------------------

Toggles the [Waiter][] visibility. If the [Waiter][] is currently visible, it will hide. Otherwise it will display.

### Syntax

	myWaiter.toggle(element);

### Arguments

1. element - (*mixed*, optional) A string of the id for an Element or an Element reference to overlay; defaults to the target passed in at initialization, but you can specify a different element if you wish to reuse the class.

### Returns

* (*object*) This instance of [Waiter][]

Waiter Method: show {#Waiter:show}
------------------------------------

Displays the [Waiter][] layer.

### Syntax

	myWaiter.show(noFx);

### Arguments

1. noFx - (*boolean*) if *true* the waiter will not use effects to display but will show immediately (defaults to *false*).

### Returns

* (*object*) This instance of [Waiter][]

Waiter Method: hide {#Waiter:hide}
----------------------------------

Hides the [Waiter][] layer.

### Syntax

	myWaiter.hide(noFx);

### Returns

1. noFx - (*boolean*) if *true* the waiter will not use effects to hide but will hide immediately (defaults to *false*).

Waiter Method: destroy {#Waiter:destroy}
------------------------------------

Destroys the [Waiter][] waiter layer and its contents. This renders the instance of this class inert (and further calls to its methods will throw errors).

### Syntax

	myWaiter.destroy()

### Returns

* (*object*) This instance of [Waiter][]

Waiter Method: position {#Waiter:position}
------------------------------------

Reasserts the position of the waiter layer and its contents.

### Syntax

	myWaiter.position()

### Returns

* (*object*) This instance of [Waiter][]


Waiter Method: resize {#Waiter:resize}
------------------------------------

Reasserts the dimensions of the overlay layer. Note that this method is called when [Waiter.position][] is called, so you needn't call it if you call position.

### Syntax

	myWaiter.destroy()

### Returns

* (*object*) This instance of [Waiter][]

Class: Request.HTML {#Request-HTML}
===================================

Extends [Request.HTML][] to add integrated [Waiter][] functionality.

### Extends

* [Request.HTML][]

### Syntax

	new Request.HTML(options);

### Arguments

* options - (*object*) an object with key/value options

### Options

* all of [Request.HTML][] options PLUS:
* useWaiter - (*boolean*) use the [Waiter][] class with this request
* waiterOptions - (*object*) the options object for the [Waiter][] class
* waiterTarget - (*mixed*) a string of the id for an Element or an Element reference to use instead of the one specifed in the *update* option. This is useful if you want to overlay a different area (or, say, the parent of the one being updated).

### Example

	new Request.HTML({
		url: '/myHtmlFragment.html',
		update: $('myElement'),
		useWaiter: true,
		waiterOptions: {...etc...}
	});

### Notes

* When you execute *Request.HTML.send* the [Waiter][] class will automatically overlay the area on the page that's going to get updated with the new content and when this area is updated the [Waiter][] hides itself.


Native: Element {#Element}
==========================

Extends the native Element object with [Waiter][] methods.

Element Property: waiter {#Element-Properties:waiter}
---------------------------------------------------

### Setter

Sets a default [Waiter][] instance for an Element.

#### Syntax:

	el.set('waiter'[, options]);

#### Arguments

1. options - (*object*, optional) The [Waiter][] options.

#### Returns

* (*element*) This Element.

#### Examples

	el.set('waiter', {msg: 'one moment...'});
	el.wait(); //obscure the element with the spinner
	el.release(); //hide the spinner

### Getter

Gets the default [Waiter][] instance for the Element.

#### Syntax

	el.get('waiter'[, options]);

#### Arguments

1. name - (*string*) This should always be 'waiter'.
1. options - (*object*, optional) The [Waiter][] options. If these are passed in, a new instance will always be generated.

#### Returns

* (*object*) The Element's internal [Waiter][] instance.

#### Examples

	el.set('waiter', {msg: 'one moment...'});
	el.wait(); //show the spinner
	el.get('waiter'); //The Waiter instance.

Native: Element {#Element}
==========================

Adds [Waiter][] shortcuts to the [Element][] class.

Element Method: wait {#Element:wait}
----------------------------------------

Retrieves the "build-in" instance of [Waiter][] and calls its *mask* method.

### Syntax

	$('myElement').wait([options]);

### Arguments

1. options - (*object* - optional) the options for the default waiter.

### Returns

* (*element*) This Element

Element Method: release {#Element:release}
--------------------------------------------

Retrieves the "build-in"  instance of [Waiter][] and calls its *hide* method.

### Syntax

	$('myElement').release();

### Returns

* (*element*) This Element


[Waiter]: #Waiter
[Mask]: /more/Interface/Mask
[IframeShim]: /more/Browser/IframeShim
[Element:position]: /more/Element/Element.Position#Element:position
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Chain]: /core/Class/Class.Extras#Chain
[Request.HTML]: /core/Request/Request.HTML
