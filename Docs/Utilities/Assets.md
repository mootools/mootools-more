Object: Asset {#Asset}
======================

Provides functions for the dynamic loading and management of JavaScript, CSS, and image files.



Asset Function: javascript {#Asset:Asset-javascript}
----------------------------------------------------

Injects a script tag into the head section of the document, pointing to the src specified.

### Syntax

	var myScript = Asset.javascript(source[, properties]);

### Arguments

1. source     - (*string*) The location of the JavaScript file to load.
2. properties - (*object*, optional) Additional attributes to be included into the script Element; this is the same as the second argument you might pass to including the Element constructor with the exception of Events (see note)
   - onLoad   - (*function*) A function that will be invoked when the JavaScript is loaded.
   - document - (*object*, defaults to `document`) The document which the JavaScript should be injected in.

### Returns

* (*element*) A new script Element.

### Examples

	var myScript = Asset.javascript('/scripts/myScript.js', {
		id: 'myScript',
		onLoad: function(){
			alert('myScript.js is loaded!');
		}
	});

### Note

- WARNING: DO NOT use addEvent for load on the returned element, give it as onLoad in the properties argument.


Asset Function: css {#Asset:Asset-css}
--------------------------------------

Injects a css file in the page.

### Syntax

	var myCSS = Asset.css(source[, properties]);

### Arguments

1. source     - (*string*) The path of the CSS file.
2. properties - (*object*) Some additional attributes you might want to add to the link Element; this is the same as the second argument you might pass to including the Element constructor. For instance you might specify a title attribute or perhaps an id.
   - document - (*object*, defaults to `document`) The document which the link element should be injected in.


### Returns

* (*element*) A new link Element.

### Examples

	var myCSS = Asset.css('/css/myStyle.css', {id: 'myStyle', title: 'myStyle'});


Asset Function: image {#Asset:Asset-image}
------------------------------------------

Preloads an image and returns the img element.

### Syntax

	var myImage = Asset.image(source[, properties]);

### Arguments

1. source     - (*string*) The path of the image file.
2. properties - (*object*) Some additional attributes you might want to add to the img Element.
	- onLoad  - (*function*) A function that will be invoked when the image is loaded.
	- onError - (*function*) A function that will be invoked when the image failed loading.
	- onAbort - (*function*) A function what will be invoked when the loading is aborted.

### Returns

* (*element*) A new HTML img Element.

### Examples

	var myImage = Asset.image('/images/myImage.png', {
		id: 'myImage',
		title: 'myImage',
		onLoad: myFunction
	});

### Notes

- Does not inject the image into the page.
- WARNING: DO NOT use addEvent for load/error/abort on the returned element, give them as onLoad/onError/onAbort in the properties argument.

Asset Function: images {#Asset:Asset-images}
--------------------------------------------

Preloads an array of images (as strings) and returns an array of img elements. does not inject them to the page.

### Syntax

	var myImages = Asset.images(source[, options]);

### Arguments

1. sources - (*mixed*) An array or a string, of the paths of the image files.
2. options - (*object*, optional) See below.

### Options

* properties - (*object*) Some additional attributes for all the images (same as the second argument you might pass to *Asset.image*).

### Events

#### complete

* (*function*) Executes when all image files are loaded.

##### Signature

	onComplete()

#### progress

* (*function*) Executes when one image file is loaded.

##### Signature

	onProgress(counter, index, source)

##### Arguments

1. counter - (*number*) The number of loaded images.
2. index   - (*number*) The index of the loaded image.
3. source  - (*string*) The path of the image file.

#### error

* (*function*) Executes when one image file fails to load.

##### Signature

	onError(counter, index, source)

##### Arguments

1. counter - (*number*) The number of errored images.
2. index   - (*number*) The index of the errored image.
3. source  - (*string*) The path of the image file.

### Returns

* (*array*) An [Elements][] collection.

### Examples

	var myImages = Asset.images(['/images/myImage.png', '/images/myImage2.gif'], {
		properties: {
			'class': 'myImage',
			title: 'myImage'
		},
		onComplete: function(){
			alert('All images loaded!');
		}
	});



[Elements]: /core/Element/Element#Elements
