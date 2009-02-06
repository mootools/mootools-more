Class: Class.ToElement {#Class-ToElement}
=======================

Adds the *toElement* method on a class. This allows [dollar][] to return the element when passed an instance of the class.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/04.toelement

### Example

	var Widget = new Class({
		Implements: Class.ToElement,
		initialize: function(element){
			this.element = $(element):
		}
	});
	var myWidget = new Widget($('example'));
	$('example') == $(myWidget);

[dollar]:http://mootools.net/docs/Element/Element#dollar