Class: Tips {#Tips}
===================

Display a tip on any element with a title and/or href.

### Credits

- The idea behind Tips.js is based on [Bubble Tooltips](http://web-graphics.com/mtarchive/001717.php) by [Alessandro Fulcitiniti](http://web-graphics.com/)

### Note

- Tips requires the page to be in [Standards Mode](http://hsivonen.iki.fi/doctype/).

### Implements

- [Events][], [Options][]

Tips Method: constructor
------------------------

### Arguments

* elements - (*mixed*: optional) A collection of elements, a string Selector, or an Element to apply the tooltips to.
* options  - (*object*) An object to customize this Tips instance.

### Options

* showDelay - (*number*: defaults to 100) The delay the show event is fired.
* hideDelay - (*number*: defaults to 100) The delay the hide hide is fired.
* title - (*string|function*: defaults to title) The property of the element to be used for the tip-title. If this option is a function it will execute it on every element with it passed as the first argument. It uses the return value of this function as the tip-title
* text - (*string|function*) Behaves the same as the `title` option but for tip-text. By default it either uses the `rel` or the `href` attribute as tip-text.
* className - (*string*: defaults to *null*) The className your tooltip container will get. Useful for styling.
 * The tooltip element inside the tooltip container above will have 'tip' as classname.
 * The title will have as classname: tip-title
 * The text will have as classname: tip-text
* offset - (*object*: defaults to {x: 16, y: 16}) The distance of your tooltip from the mouse.
* fixed - (*boolean*: defaults to *false*) If set to true, the tooltip will not follow the mouse.
* windowPadding - (*object*; defaults to {x: 0, y: 0}) Allows you to reduce or expand the virtual size of the window for tip positioning. The tips will not be allowed to approach the edge of the window on any side based on this offset.
* id - (*string*: defaults to *null*) Add an `id` to the tooltip element, required for WAI-ARIA support.
* waiAria - (*boolean*: defaults to *true*) Requires the `id` option to be set. Enable [WAI-ARIA](http://www.w3.org/WAI/intro/aria.php) support. Adds aria-attributes to the tooltip.

### Events

* show - (*function*: defaults to `function(tip, hovered){ tip.setStyle('display', 'block'); }`) The default function for the show event, passes the tip element and the currently hovered element.
* hide - (*function*: defaults to `function(tip, hovered){ tip.setStyle('display', 'none'); }`)  The default function for the hide event, passes the currently hovered element.
* attach - (*function*) Fires when an element gets added to the tips instance. Passes the element as argument.
* detach - (*function*) Fires when the event listeners get removed from an element. Passes the element as argument.

### Example

#### HTML

	<a href="http://mootools.net" title="mootools homepage" class="thisisatooltip" />

#### JavaScript

	var myTips = new Tips('.thisisatooltip');



Tips Event: show {#Tips:show}
---------------------------------

* (*function*) Fires when the Tip is starting to show and by default sets the tip visible.

### Signature

	onShow(tip)

### Arguments

1. tip - (*element*) The tip element. Useful if you want to apply effects to it.
2. el - (*element*) The element on which the tip is based on.

### Example

	myTips.addEvent('show', function(tip, el){
		tip.addClass('someCustomClassBecauseTheTipIsVisible');
	});

### Note

To override the default tip show behavior, you must either declare the onShow event in the options on initialization or remove the onShow event from the class yourself. Example:

		var myTips = new Tips('.thisisatooltip', {
			onShow: function(tip, el){
				tip.setStyles({
					visibility: 'hidden', 
					display: 'block'
				}).fade('in');
			}
		});
		//if you want to add this after init
		myTips.removeEvents('show').addEvent('show', function(tip, el){
			tip.setStyles({
				visibility: 'hidden', 
				display: 'block'
			}).fade('in');
		});

Tips Event: hide {#Tips:hide}
---------------------------------

* (*function*) Fires when the Tip is starting to hide and by default sets the tip hidden.

### Signature

	onHide(tip)

### Arguments

1. tip - (*element*) The tip element. Useful if you want to apply effects to it.
2. el - (*element*) The element on which the tip is based on.

### Example

	myTips.addEvent('hide', function(tip, el){
		tip.removeClass('someCustomClassBecauseTheTipIsVisible');
	});

### Note

To override the default tip hide behavior, you must either declare the onHide event in the options on initialization or remove the onHide event from the class yourself. Example:

		var myTips = new Tips('.thisisatooltip', {
			onHide: function(tip, el){
				tip.fade('out').get('tween').chain(function(){
					tip.setStyle('display', 'none');
				});
			}
		});
		//if you want to add this after init
		myTips.removeEvents('hide').addEvent('hide', function(tip, el){
			tip.fade('out').get('tween').chain(function(){
				tip.setStyle('display', 'none');
			});
		});

Tips Method: setTitle {#Tips:setTitle}
----------------------------------

Updates the tip title. Note that the title is re-assigned when the tip is hidden and displayed again; this method allows you to change it after it's visible.

### Syntax

	myTips.setTitle(title);

### Arguments

1. title - (*mixed*) A collection of elements, a single Element, or a string of text. The former two being adopted into the tip the latter being set as its HTML.

### Returns

* (*object*) This Tips instance.

### Example

	myTips.setTitle("I'm the new title!");


Tips Method: setText {#Tips:setText}
----------------------------------

Updates the tip text. Note that the text is re-assigned when the tip is hidden and displayed again; this method allows you to change it after it's visible.

### Syntax

	myTips.setText(text);

### Arguments

1. text - (*mixed*) A collection of elements, a single Element, or a string of text. The former two being adopted into the tip the latter being set as its HTML.

### Returns

* (*object*) This Tips instance.

### Example

	myTips.setText("I'm the new body text!");

Tips Method: attach {#Tips:attach}
----------------------------------

Attaches tooltips to elements. Useful to add more elements to a tips instance.

### Syntax

	myTips.attach(elements);

### Arguments

1. elements - (*mixed*) A collection of elements, a string Selector, or an Element to apply the tooltips to.

### Returns

* (*object*) This Tips instance.

### Example

	myTips.attach('a.thisisatip');


Tips Method: detach {#Tips:detach}
----------------------------------

Detaches tooltips from elements. Useful to remove elements from a tips instance.

### Syntax

	myTips.detach(elements);

### Arguments

1. elements - (*mixed*) A collection of elements, a string Selector, or an Element to apply the tooltips to.

### Returns

* (*object*) This Tips instance.

### Example

	myTips.detach('a.thisisatip');


Tips HTML Structure {#Tips:HTML}
--------------------------------

	<div class="options.className"> //the className you pass in options will be assigned here.
		<div class="tip-top"></div> //useful for styling

		<div class="tip">

			<div class="tip-title"></div>

			<div class="tip-text"></div>

		</div>

		<div class="tip-bottom"></div> //useful for styling
	</div>


Tips with storage {#Tips:Storage}
---------------------------------

You can also assign tips titles and contents via [Element Storage](/Element/Element/#ElementStorage).

### Example

#### HTML

	<a id="tip1" href="http://mootools.net" title="mootools homepage" class="thisisatooltip" />

#### JavaScript

	$('tip1').store('tip:title', 'custom title for tip 1');

	$('tip1').store('tip:text', 'custom text for tip 1');

### Note

If you use tips storage you can use elements and / or html as tips title and text.


[Events]: /core/Class/Class.Extras#Events
[Options]: /core/Class/Class.Extras#Options
