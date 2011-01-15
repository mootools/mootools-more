Class: Fx.Reveal {#Fx-Reveal}
=============================

Transitions the height, opacity, padding, and margin (but not border) from and to their current height from and to zero, then sets display to none or block and resets the height, opacity, etc. back to their original values.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/05-fx/02-fx.reveal)

### Extends

- [Fx.Morph][]

Fx.Reveal Method: constructor
-----------------------------

### Syntax

	new Fx.Reveal(element[, options]);

### Arguments

1. element - (*mixed*) A string of the id for an Element or an Element reference to reveal or hide.
2. options  - (*object*, optional) a key/value object of options

### Options

* all the options passed along to [Fx.Morph][] (transition, duration, etc.); (optional); PLUS
* styles - (*array*) css properties to transition in addition to width/height;  defaults to *['padding','border','margin']*
* transitionOpacity - (*boolean*) toggles the use of transitioning the opacity during the Reveal/Dissolve effect (this feature is not currently supported in IE)
* mode - (*string*) "vertical", "horizontal", or "both" to describe how the element should slide in; defaults to *"vertical"*
* heightOverride - (*number*) height to open to; overrides the default offsetHeight
* widthOverride - (*number*) width to open to; overrides the default offsetWidth
* display - (*string*) the property for the display style when your reveal the element. Defaults to *block* but could be, for instance, *list-item*, *inline-block*, etc.
* opacity - (*float*) the opacity value for fading in an element; defaults to *1* but can be set to a number between zero and one to have the element fade in to a partially transparent state.

### Events

* All the events found in [Fx.Morph][], PLUS
* show - (*function*) The function to apply when the element is displayed.
* hide - (*function*) The function to apply when the element is hidden. NOTE: the *onComplete* event occurs when the effect is complete, but before the element is set to *display:none*.

### Returns

* (*object*) A new instance of [Fx.Reveal][].

### Example

	new Fx.Reveal($('myElement'), {duration: 500, mode: 'horizontal'});

Fx.Reveal Method: dissolve {#Fx-Reveal:dissolve}
------------------------------------------------

Transitions the height, opacity, padding, and margin (but not border) from their current height to zero, then sets display to none and resets the height, opacity, etc. back to their original values.
### Syntax

	myRevealFx.dissolve();

### Returns

* (*object*) This [Fx.Reveal][] instance.

### Note

* After the effect reveals the element, its display will be set block and its height or width to *auto* unless *heightOverride* and/or *widthOverride* (depending on the *mode* option) is specified.

Fx.Reveal Method: reveal {#Fx-Reveal:reveal}
--------------------------------------------

Sets the display of the element to opacity: 0 and display: block, then transitions the height, opacity, padding, and margin (but not border) from zero to their proper height.

### Syntax

	myRevealFx.reveal();

### Returns

* (*object*) This [Fx.Reveal][] instance.

Fx.Reveal Method: toggle {#Fx-Reveal:toggle}
--------------------------------------------

Toggles the element from shown to hidden.

### Syntax

	myRevealFx.toggle();

### Returns

* (*object*) This [Fx.Reveal][] instance.


Object: Element.Properties {#Element-Properties}
================================================


See [Element.Properties][].

Element Property: reveal {#Element-Properties:reveal}
-----------------------------------------------------

### Setter

Sets a default [Fx.Reveal][] instance for an Element.

#### Syntax

	el.set('reveal'[, options]);

#### Arguments

1. options - (*object*, optional) The [Fx.Reveal][] options.

#### Returns

* (*element*) This Element.

#### Examples

	el.set('reveal', {duration: 'long', transition: 'bounce:out'});
	el.reveal(); //show the element
	el.dissolve(); //hide it

### Getter

Gets the default [Fx.Reveal][] instance for the Element.

#### Syntax

	el.get('reveal');

#### Arguments

1. name - (*string*) - this should always be "reveal".

#### Returns

* (*object*) The Element's internal [Fx.Reveal][] instance.

#### Examples

	el.set('reveal', {duration: 'long', transition: 'bounce:out'});
	el.reveal(); //show the element
	el.get('reveal'); //The Fx.Reveal instance.

Type: Element {#Element}
========================

Adds [Fx.Reveal][] shortcuts to the [Element][] class.

Element Method: reveal {#Element:reveal}
----------------------------------------

Retrieves the "build-in" instance of [Fx.Reveal][] and calls its *reveal* method.

### Syntax

	$('myElement').reveal(options);

#### Arguments

1. options - (*object*, optional) The [Fx.Reveal][] options. If these are passed in, a new instance will be generated.

### Returns

* (*element*) This Element

Element Method: dissolve {#Element:dissolve}
--------------------------------------------

Retrieves the "build-in"  instance of [Fx.Reveal][] and calls its *dissolve* method.

### Syntax

	$('myElement').dissolve();

### Returns

* (*element*) This Element

Element Method: nix {#Element:nix}
----------------------------------

Retrieves the "build-in" instance of [Fx.Reveal][] and calls its *dissolve* method, then either removes or destroys the element.

### Syntax

	$('myElement').nix([options, destroy]);
	$('myElement').nix([destroy]);

### Arguments

Note that either or both of these may be specified and in any order.

* options - (*object*) The options object to pass to the "built-in" instance of Fx.Reveal.
* destroy - (*boolean*) If (*true*) the element will be destroyed entirely after the effect (using *Element.destroy*), otherwise it will only be removed from the DOM (using *Element.erase*). Defaults to (*false* - i.e. erase).

### Examples

	$('myElement').nix(true); //destroy
	$('myElement').nix(); //erase
	$('myElement').nix({duration: 1000}); //dissolve over 1 second, then erase
	$('myElement').nix({duration: 1000}, true); //dissolve over 1 second, then destroy

### Returns

* (*element*) This Element

Element Method: wink {#Element:wink}
----------------------------------

Retrieves the "build-in" instance of [Fx.Reveal][] and calls its *reveal* method, then pauses the specified duration, and then calls its *dissolve* method.

### Syntax

	$('myElement').wink([duration]);

### Arguments

* duration - (*number*, optional) The duration that the element should remain visible before it hides again. Defaults to 2000 (ms).

### Examples

	$('myElement').wink(); //2 second pause
	$('myElement').wink(500); //.5 second pause

### Returns

* (*element*) This Element

[Fx.Reveal]: #Fx-Reveal
[Fx.Morph]: /core/Fx/Fx.Morph
[Element]: /core/Element/Element
[Element.Properties]: /core/Element/Element#Element-Properties
