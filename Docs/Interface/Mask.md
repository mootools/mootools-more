Class: Mask {#Mask}
===================

Adds a semi-transparent overlay over a DOM element.

### Implements

* [Options][], [Events][]

### See Also

* [Spinner][]


Mask Method: constructor
------------------------

### Syntax

	new Mask(target[, options]);

### Arguments

1. target - (*mixed*) A string of the id for an Element or an Element reference to overlay; defaults to *document.body*
2. options - (*object*) a key/value set of options

### Options

* inject - (*object*) where to inject the layer. If not specified, the mask is injected into the document body. Example: *inject: { where: 'after', target: element }*
* hideOnClick - (*boolean*) if *true*, the mask will hide when clicked. Defaults to *false*.
* id - (*string*) if defined, the overlay layer will be assigned this id. If not defined, the id will default to 'mask-<timestamp>'
* destroyOnHide - (*boolean*) if *true* the mask layer is destroyed when hidden. The class will no longer function after this. Defaults to *false*.
* class - (*string*) the css class to apply to the layer; defaults to 'mask'.
* style - (*object*) if defined, will apply to the mask with [Element.setStyles][]. You can also style the layer by just defining a style for the layer class name (defaults to ".mask"). Default styles can be found in the Styles directory of the MooTools More library on github or downloaded on the More builder on MooTools.net.
* maskMargins - (*boolean*) if *true* the mask will extend to the margins of the target. Defaults to *false*.
* useIframeShim - (*boolean*) if true the mask will use [IframeShim][] to hide OS elements (select boxes, flash, etc) for IE6.
* iframeShimOptions - (*object*) options passed to [IframeShim][].

### Events

* show - (*function*) callback to execute when the layer is shown; passed the target element to which the [Mask][] was attached.
* hide - (*function*) callback to execute when the layer is hidden; passed the target element to which the [Mask][] was attached.
* destroy - (*function*) callback to execute when the layer is destroyed.
* click - (*function*) callback to execute when the layer is clicked.

### Examples

	var myMask = new Mask();
	var myMask = new Mask($('myElement'));

### Styles

The mask element is not styled, so if you don't add a css rule in your style sheets, it will be invisible. You can download the default styles here: [mask.css](http://github.com/mootools/mootools-more/raw/master/Styles/Interface/Mask/mask.css)

Mask Method: toggle {#Mask:toggle}
--------------------------------------

Toggles the [Mask][] visibility. If the [Mask][] is currently visible, it will hide. Otherwise it will display.

### Syntax

	myMask.toggle(element);

### Arguments

1. element - (*mixed*, optional) A string of the id for an Element or an Element reference to overlay; defaults to the target passed in at initialization, but you can specify a different element if you wish to reuse the class.

### Returns

* (*object*) This instance of [Mask][]

Mask Method: show {#Mask:show}
------------------------------------

Displays the [Mask][] layer.

### Syntax

	myMask.show();

### Returns

* (*object*) This instance of [Mask][]

Mask Method: hide {#Mask:hide}
----------------------------------

Hides the [Mask][] layer.

### Syntax

	myMask.hide();

### Returns

* (*object*) This instance of [Mask][]

Mask Method: destroy {#Mask:destroy}
------------------------------------

Destroys the [Mask][] layer. This renders the instance of this class inert (and further calls to its methods will throw errors).

### Syntax

	myMask.destroy()

### Returns

* (*object*) This instance of [Mask][]

Mask Method: position {#Mask:position}
------------------------------------

Reasserts the position of the overlay layer.

### Syntax

	myMask.position()

### Returns

* (*object*) This instance of [Mask][]


Mask Method: resize {#Mask:resize}
------------------------------------

Reasserts the dimensions of the overlay layer. Note that this method is called when [Mask.position][] is called, so you needn't call it if you call position.

### Syntax

	myMask.resize()

### Returns

* (*object*) This instance of [Mask][]

Type: Element {#Element}
==========================

Extends the Element Type with [Mask][] methods.

Element Property: mask {#Element-Properties:mask}
---------------------------------------------------

### Setter

Sets a default [Mask][] instance for an Element.

#### Syntax

	el.set('mask'[, options]);

#### Arguments

1. options - (*object*, optional) The [Mask][] options.

#### Returns

* (*element*) This Element.

#### Examples

	el.set('mask', {onClick: function(){..etc..}});
	el.mask(); //obscure the element with the overlay
	el.unmask(); //hide the overlay

### Getter

Gets the default [Mask][] instance for the Element.

#### Syntax

	el.get('mask');

#### Arguments

1. name - (*string*) This should always be 'mask'.

#### Returns

* (*object*) The Element's internal [Mask][] instance.

#### Examples

	el.set('mask', {onClick: function(){..etc..}});
	el.mask(); //show the mask
	el.get('mask'); //The Mask instance.

Type: Element {#Element}
==========================

Adds [Mask][] shortcuts to the [Element][] class.

Element Method: mask {#Element:mask}
----------------------------------------

Retrieves the "build-in" instance of [Mask][] and calls its *show* method.

### Syntax

	$('myElement').mask([options]);

### Arguments

1. options - (*object* - optional) the options for the default mask.

### Returns

* (*element*) This Element

Element Method: unmask {#Element:unmask}
--------------------------------------------

Retrieves the "build-in"  instance of [Mask][] and calls its *hide* method.

### Syntax

	$('myElement').unmask();

### Returns

* (*element*) This Element

[Mask]: #Mask
[Mask.position]: #Mask:position
[Spinner]: /more/Interface/Spinner
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Element]: /core/Element/Element
[Element.setStyles]: /core/Element/Element.Style
[IframeShim]: /more/Browser/IframeShim
