Class: Slider {#Slider}
=======================

Creates a slider with two elements: a knob and a container.

### Demo

- [Slider](http://mootools.net/demos/?demo=Slider)

### Note

- Slider requires the page to be in [Standards Mode](http://hsivonen.iki.fi/doctype/).

Slider Method: constructor
--------------------------

### Syntax

	var mySlider = new Slider(element, knob[, options]);

### Arguments

1. element - (*element*) The container element for the slider.
2. knob    - (*element*) The handle element for the slider.
3. options - (*object*) An optional object for customizing the Slider.

### Options

1. snap   - (*boolean*: defaults to false) True if you want the knob to snap to the nearest value.
2. offset - (*number*: defaults to 0) Relative offset for knob position at start.
3. range  - (*mixed*: defaults to false) Array of numbers or false. The minimum and maximum limits values the slider will use.
4. wheel  - (*boolean*: defaults to false) True if you want the ability to move the knob by mousewheeling.
5. steps  - (*number*: defaults to 100) The number of steps the Slider should move/tick.
6. mode   - (*string*: defaults to horizontal) The type of Slider can be either 'horizontal' or 'vertical' in movement.
6. initialStep   - (*number*: defaults to 0) The step the slider will start at.

### Events

#### change

Fires when the Slider's value changes.

##### Signature

	onChange(step)

##### Arguments

1. step - (*number*) The current step that the Slider is on.


#### onComplete

Fire when you're done dragging.

##### Signature

	onComplete(step)

##### Arguments

1. step - (*string*) The current step that the Slider is on as a string.


#### tick

Fires when the user scrolls or when the container element is clicked. This Event can be overridden to alter the default tick behavior.

##### Signature

	onTick(pos)

##### Arguments

1. pos - (*number*) The current position that slider moved to.

##### Notes

- By default Slider uses the 'tick' event to set the style of the knob to a new position.


### Returns

* (*object*) A new Slider instance.

### Examples

	var mySlider = new Slider('myElement', 'myKnob', {
		range: [-50, 50],
		wheel: true,
		snap: true,
		onTick: function(pos){
			this.element.setStyle('border-color', '#f00');
			this.knob.setStyle(this.property, pos);
		},
		onComplete: function(){
			this.element.tween('border').start('#000');
		}
	});


### Notes

- Range option allows an array of numbers. Numbers can be negative and positive.
- If snap is enabled, the width of the bar in which the slider resides must fit an equation for the steps to line up just right at it's end value. The equation is:

		(Math.ceil(barWidth/numSteps - knobWidth/numSteps) * numSteps) + knobWidth

For instance, if you had a bar that is 300px wide and a knob that is 15px wide, and have snap enabled and 10 steps specified, then the bar's width divided by the number of steps (300 / 10 = 30) minus room for the knob (15 / 10 = 1.5) gives you the value of each step (28.5). Slider must round this value, and it rounds up (29). Take this and multiply times the number of steps and you get 290, but there must also be room for the knob, which adds 15, yielding 305. The result is that our knob can't be dragged to the 10th position because there isn't room for it; so it stops at the 9th. This takes a little tweaking in your css. Just add a few pixels until you can drag it all the way (or change the knob width).


Slider Method: set {#Slider:set}
--------------------------------

The slider will move to the passed position.

### Syntax

	mySlider.set(step);

### Arguments

1. step - (*number*) A number to position the Slider to.

### Returns

* (*object*) This Slider instance.

### Examples

	var mySlider = new Slider('myElement', 'myKnob');
	mySlider.set(0);

	var myPeriodical = (function(){
		if (this.step == this.options.steps) $clear(myPeriodical);
			this.set(this.step++);
	}).periodical(1000, mySlider);

### Notes

- Step will automatically be limited between 0 and the optional steps value.



Slider Method: attach {#Slider:attach}
--------------------------------------

Attaches the mouse listeners to the Slider making the Slider draggable

### Syntax

	mySlider.attach();

### Returns

* (*object*) This Slider instance.

### Examples

	var mySlider = new Slider('myElement', 'myKnob');
	mySlider.detach();
	myElement.addEvent('click', function(){
		mySlider.attach();
		alert('Slider enabled!');
	});

### Notes

- You only need to use this method when you manually detached the mouse listeners before.

### See Also

- [Slider:detach](#Slider:detach), [Element:addEvent][]



Slider Method: detach {#Slider:detach}
--------------------------------------

Detaches the mouse listeners from the Slider so its value can't be changed any longer

### Syntax

	mySlider.detach();

### Returns

* (*object*) This Slider instance.

### Examples

	var mySlider = new Slider('myElement', 'myKnob');
	myElement.addEvent('click', function(){
		mySlider.detach();
		alert('Slider disabled!');
	});

### See Also

- [Slider:attach](#Slider:attach), [Element:removeEvent][]

Slider Method: setRange {#Slider:setRange}
------------------------------------------

Dynamically sets the range for the slider.

### Syntax

	mySlider.setRange(range);

### Arguments

1. range - (*array*) Same as the `range` option array.

### Returns

* (*object*) This Slider instance.

### Examples

	var mySlider = new Slider('myElement', 'myKnob',{
		range: [100, 1000]
	});
	mySlider.setRange([500, 5000]);

### Notes

- If the current step is now out of the new range it will automatically adjust.

Slider Method: autosize {#Slider:autosize}
------------------------------------------

Cause the slider to recalculate the allotted drag area for itself (useful if resizing slider).

### Syntax

	mySlider.autosize();

### Returns

* (*object*) This Slider instance.

### Examples

	var mySlider = new Slider('myElement', 'myKnob');
	window.addEvent('resize', function(){
		mySlider.autosize();
	});

