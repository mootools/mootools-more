Type: Element {#Element}
==========================
The following functions are treated as [Element][] methods.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/04-element/01-element.measure)


Element Method: measure {#Element:measure}
------------------------------------------

Exposes an element for measurement in a way the user cannot see and then restores it's state after the measurement.

### Syntax

	element.measure(fn);

### Arguments

1. fn - (*function*) a function to run while the element is visible (but not to the user); bound to the element by default.

### Example

	var size = myHiddenElement.measure(function(){
		return this.getSize();
	});

### Returns

* *mixed* - whatever the passed in function returns.

### Notes

* You cannot ascertain the location or size for an element whose display style is 'none'. With this method, the element is set to *display:block*, *position:absolute*, and *visibility:hidden* and then the function passed is applied. Then the element is restored to it's previous state. This allows you to safely measure the element even if it is hidden.
* This method was authored by Daniel Steigerwald and granted use by the MIT License.


Element Method: getDimensions {#Element:getDimensions}
------------------------------------------------------

Returns width and height for element even if the element is not visible.

### Syntax

	element.getDimensions([options]);

### Arguments

1. options - (*object*; optional) a key/value set of options

### Options

1. computeSize - (*boolean*) use [Element:getComputedSize][] or not; defaults to *false*
2. styles - (*array*) see [Element:getComputedSize][]
3. planes - (*array*) see [Element:getComputedSize][]

###	Returns

* (*object*) An object with .x and .y defined as numbers. If options.computeSize is true, returns all the values that [Element:getComputedSize][] returns.

### Example

	$('myElement').getDimensions();
	//returns {width: #, height: #}
	$('myElement').getDimensions(true);
	//returns the getComputedSize object; see getComputedSize

Element Method: getComputedSize {#Element:getComputedSize}
----------------------------------------------------------

Calculates the size of an element including the width, border, padding, etc.

### Syntax

	element.getComputedSize([options]);

### Arguments

1. options - (*object*) an object with key/value options

### Options

1. styles - (*array*) the styles to include in the calculation; defaults to ['padding','border']
2. planes - (*object*) an object with height and width properties, each of which is an array including the edges to include in that plane. defaults to *{height: ['top','bottom'], width: ['left','right']}*
3. mode - (*string*) limit the plane to 'vertical' or 'horizontal'; defaults to 'both'

### Returns

* (*object*) An object that contains dimension values (*numbers*); see list below

### Dimension Values Returned

* width - the actual width of the object (not including borders or padding)
* height - the actual height of the object (not including borders or padding)
* border-\* width - (where \* is top, right, bottom, and left) the width of the border on that edge
* padding-\* - (where \* is top, right, bottom, and left) the width of the padding on that edge
* computed\* - (where \* is Top, Right, Bottom, and Left; e.g. computedRight - case sensitive) the width of all the styles on that edge computed (so if options.styles remains unchanged with the default *padding* and *border*, computedRight is the sum of *border-right-width* and *padding-right*)
* totalHeight - the total sum of the height plus all the computed styles on the top or bottom. By default this is just padding and border, but if you were to specify in the styles option margin, for instance, the totalHeight calculated would include the margin.
* totalWidth - same as totalHeight, only using width, left, and right

### Example

	$(el).getComputedSize();

### Returns

An object with all the style properties as well as summed properties (like *totalWidth*).

	{
		'padding-top': 0,
		'border-top-width': 1,
		'padding-bottom': 0,
		'border-bottom-width': 1,
		'padding-left': 0,
		'border-left-width': 1,
		'padding-right': 0,
		'border-right-width': 1,
		'width': 100,
		'height': 100,
		'totalHeight': 102,
		'computedTop': 1,
		'computedBottom': 1,
		'totalWidth': 102,
		'computedLeft': 1,
		'computedRight': 1
	}

[Element:getComputedSize]: #Element:getComputedSize
[Element]: /core/Element/Element
