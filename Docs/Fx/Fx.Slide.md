Class: Fx.Slide {#Fx-Slide}
===========================

The slide effect slides an Element in horizontally or vertically.  The contents will fold inside.

### Demo

* [Fx.Slide](http://mootools.net/demos/?demo=Fx.Slide)

### Note

- Fx.Slide requires the page to be in [Standards Mode](http://hsivonen.iki.fi/doctype/).

### Extends

- [Fx][]

Fx.Slide Method: constructor
----------------------------

### Syntax

	var myFx = new Fx.Slide(element[, options]);

### Arguments

1. elements - (*element*) The element to slide.
2. options  - (*object*, optional) All of [Fx][] options in addition to mode and wrapper.

#### Options

* mode    - (*string*; defaults to 'vertical') String to indicate what type of sliding. Can be set to 'vertical' or 'horizontal'.
* wrapper - (*element*; defaults to this.element) Allows to set another Element as wrapper.
* hideOverflow - (*boolean*; defaults to *true*) automatically sets the overflow of the wrapper to overflow, otherwise it inherits from the element being wrapped.
* resetHeight - (*boolean*; defaults to *false*) Automatically resets the height of the wrapper when the slide unfold animation is completed, allowying to manipulate the content keeping it adjusting naturally.

#### Properties

2. open    - (*boolean*) Indicates whether the slide element is visible.

### Examples

	// Hides the Element, then brings it back in with toggle and finally alerts
	// when complete:
	var mySlide = new Fx.Slide('container').hide().toggle().chain(function(){
		alert(mySlide.open); //Alerts true.
	});

### Note

* To create the slide effect an additional Element (a "div" by default) is wrapped around the given Element. This wrapper adapts the margin from the Element. It's overflow is set to hidden and it has a fixed height.


Fx.Slide Method: slideIn {#Fx-Slide:slideIn}
--------------------------------------------

Slides the Element in view horizontally or vertically.

### Syntax

	myFx.slideIn([mode]);

### Arguments

1. mode - (*string*, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

### Returns

* (*object*) This Fx.Slide instance.

### Examples

	var myFx = new Fx.Slide('myElement').slideOut().chain(function(){
		this.show().slideIn('horizontal');
	});



Fx.Slide Method: slideOut {#Fx-Slide:slideOut}
----------------------------------------------

Slides the Element out of view horizontally or vertically.

### Syntax

	myFx.slideOut([mode]);

### Arguments

1. *mode* - (*string*, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

### Returns

* (*object*) This Fx.Slide instance.

### Examples

	var myFx = new Fx.Slide('myElement', {
		mode: 'horizontal',
		//Due to inheritance, all the [Fx][] options are available.
		onComplete: function(){
			alert('Poof!');
		}
	// The mode argument provided to slideOut overrides the option set.
	}).slideOut('vertical');



Fx.Slide Method: toggle {#Fx-Slide:toggle}
------------------------------------------

Slides the Element in or out, depending on its state.

### Syntax

	myFx.toggle([mode]);

### Arguments

1. mode - (*string*, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

### Returns

* (*object*) This Fx.Slide instance.

### Examples

	var myFx = new Fx.Slide('myElement', {
		duration: 1000,
		transition: Fx.Transitions.Pow.easeOut
	});

	// Toggles between slideIn and slideOut twice:
	myFx.toggle().chain(myFx.toggle);



Fx.Slide Method: hide {#Fx-Slide:hide}
--------------------------------------

Hides the Element without a transition.

### Syntax

	myFx.hide([mode]);

### Arguments

1. mode - (*string*, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

### Returns

* (*object*) This Fx.Slide instance.

### Examples

	var myFx = new Fx.Slide('myElement', {
		duration: 'long',
		transition: Fx.Transitions.Bounce.easeOut
	});

	// Automatically hides and then slies in "myElement":
	myFx.hide().slideIn();



Fx.Slide Method: show {#Fx-Slide:show}
--------------------------------------

Shows the Element without a transition.

### Syntax

	myFx.show([mode]);

### Arguments

1. mode - (*string*, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

### Returns

* (*object*) This Fx.Slide instance.

### Examples

	var myFx = new Fx.Slide('myElement', {
		duration: 1000,
		transition: Fx.Transitions.Bounce.easeOut
	});

	// Slides "myElement" out.
	myFx.slideOut().chain(function(){
		// Waits one second, then the Element appears without transition.
		this.show.delay(1000, this);
	});


Object: Element.Properties {#Element-Properties}
================================================

See [Element.Properties][].

Element Property: slide {#Element-Properties:slide}
---------------------------------------------------

Sets a default Fx.Slide instance for an element.
Gets the previously setted Fx.Slide instance or a new one with default options.

### Syntax

	el.set('slide'[, options]);

### Arguments

1. options - (*object*) the Fx.Morph options.

### Returns

* (*element*) this element

### Example

	el.set('slide', {duration: 'long', transition: 'bounce:out'});
	el.slide('in');

### Syntax

	el.get('slide');

### Returns

* (*object*) the Fx.Slide instance

### Examples

	el.set('slide', {duration: 'long', transition: 'bounce:out'});
	el.slide('in');

	el.get('slide'); //the Fx.Slide instance


Type: Element {#Element}
========================

Custom Type to allow all of its methods to be used with any DOM element via the dollar function or [document.id][].


Element Method: slide {#Element:slide}
--------------------------------------

Slides this Element in view.

### Syntax

	myElement.slide(how);

### Arguments

1. how     - (*string*, optional) Can be 'in', 'out', 'toggle', 'show' and 'hide'. Defaults to 'toggle'.

### Returns

* (*element*) this Element.

### Examples

	$('myElement').slide('hide').slide('in');


[Fx]: /core/Fx/Fx
[document.id]: /core/Element/Element#Window:document-id
[Element.Properties]: /core/Element/Element#Element-Properties
