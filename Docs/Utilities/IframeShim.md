Class: IframeShim {#IframeShim}
===============================

A class for obscuring select lists and flash objects in IE.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/02-browser/02-iframeshim)

There are two types of elements that (sometimes) prohibit you from positioning a DOM element over them (mostly in Internet Explorer): some form elements and some flash elements. The two options you have are:

* to hide these elements when your DOM is going to be over them; this works if you know your DOM element is going to completely obscure that element
* an iframe shim - where you put an iframe below your element but ABOVE the form/flash element. More details here: [http://www.macridesweb.com/oltest/IframeShim.html][]


### Implements

* [Options][], [Events][], [Class.Occlude][]

IframeShim Method: constructor
------------------------------

### Syntax

	new IframeShim(element[, options]);

### Arguments

1. element - (*mixed*, required) A string of the id for an Element or an Element reference that should be shimmed
2. options - (*object*, optional) key/value set of options

### Options

* display -  (*boolean*) display the shim on instantiation; defaults to *false*
* zIndex -  (*number*) the z-index of the shim; optional, default is 1 less than the element
* margin -  (*number*) make the iframe smaller than the element to give a buffer (for things like shadows)
* offset -  (*object: {x:#, y:#}*) move the iframe up/down, left/right relative to the element
* className - (*string*) className for the shim; defaults to *"iframeShim"*
* browsers - (*boolean*) allows you to specify the browsers that the iframe should show up for; defaults to ie6 or firefox on a mac `(Browser.ie6 || (Browser.firefox && Browser.version < 3 && Browser.Platform.mac))`. Example usage: `browsers: Browser.ie6 || Browser.opera` will show for ie6 and opera
* src - (*string*) this is the source of the Iframe. For the most part, you shouldn't mess with this option. We've tested it across numerous environments (particularly https environments), but if you need to, for some reason, alter it, we've exposed it as an option, as your environment may require you try an alternate string. The default is *'javascript:false;document.write("");'*.

### Events

* onInject - (*function*) callback executed when the iframe is added to the DOM (which waits until window.onload)

### Example

	<div id="myFloatingDiv">stuff</div>

	var myFloatingDivShim = new IframeShim('myFloatingDiv', {
		display: false,
		className: 'myFloatingDivShimClass'
	});

IframeShim Method: position {#IframeShim:position}
--------------------------------------------------

This will reposition the iframe element. Call this when you move or resize the iframe element.

### Syntax

	myShim.position();

### Returns

* (*object*) This instance of [IframeShim][]

IframeShim Method: hide {#IframeShim:hide}
------------------------------------------

This will hide the iframe shim element. If you don't call this when you hide the element that's over the flash or select list, then that thing will still be obscured.

### Syntax

	myShim.hide();

### Returns

* (*object*) This instance of [IframeShim][]

IframeShim Method: show {#IframeShim:show}
------------------------------------------

This will obscure any form elements or flash elements below the iframe shim element. Call this when you show your floating element.

### Syntax

	myShim.show();

### Returns

* (*object*) This instance of [IframeShim][]

IframeShim Method: dispose {#IframeShim:dispose}
----------------------------------------------

This will remove the iframe from the DOM.

### Syntax

	myShim.dispose();

### Returns

* (*object*) This instance of [IframeShim][]

IframeShim Method: destroy {#IframeShim:destroy}
----------------------------------------------

This will remove the iframe from memory.

### Syntax

	myShim.destroy();

### Returns

* (*object*) This instance of [IframeShim][]

Type: Element {#Element}
==========================

Extends the Element Type with a reference to its [IframeShim][] instance.

Element property: IframeShim {#Element:IframeShim}
------------------------------------------------

### Syntax

	myElement.retrieve('IframeShim'); //the instance of IframeShim for the element

[IframeShim]: #IframeShim
[http://www.macridesweb.com/oltest/IframeShim.html]: http://www.macridesweb.com/oltest/IframeShim.html
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Class.Occlude]: /more/Class/Class.Occlude
