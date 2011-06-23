/*
---
name: Element.Measure Tests
requires: [More/Element.Measure]
provides: [Element.Measure.Tests]
...
*/

describe('Element.Measure', function(){

	var div,
		parDiv;

	var createElement = function(id){
		return new Element('div', {
			id: id,
			styles: {
				width: 100,
				height: 100,
				margin: 2,
				padding: 3,
				border: '1px solid black',
				display: 'none',
				position: 'absolute'
			}
		});
	};

	window.addEvent('domready', function(){
		div = createElement('MeasureTest').inject(document.body);
		innerDiv = createElement('MeasureTestInner').inject(div);
	});

	it('should measure the width and height of the hidden element', function(){
		expect(div.getDimensions()).toEqual({width: 108, height: 108, x: 108, y: 108});
	});

	it('should measure the computed (total) size of an element', function(){
		expect(div.getDimensions({computeSize: true})).toEqual({
			'padding-top': 3,
			'border-top-width': 1,
			'padding-bottom': 3,
			'border-bottom-width': 1,
			'padding-left': 3,
			'border-left-width': 1,
			'padding-right': 3,
			'border-right-width': 1,
			'width': 100,
			'height': 100,
			'x': 100,
			'y': 100,
			'totalHeight': 108,
			'computedTop': 4,
			'computedBottom': 4,
			'totalWidth': 108,
			'computedLeft': 4,
			'computedRight': 4
		});
	});

	it('should measure the computed width of an element', function(){
		expect(div.getDimensions({computeSize: true, mode: 'horizontal'})).toEqual({
			'padding-left': 3,
			'border-left-width': 1,
			'padding-right': 3,
			'border-right-width': 1,
			'totalWidth': 108,
			'width': 100,
			'x': 100,
			'computedLeft': 4,
			'computedRight': 4
		});
	});

});

describe('Element.getComputedSize', function(){

	it('should get the Computed Size of an element even if height and width aren\'t explicity defined', function(){
		var element = new Element('ul', {
			'html': '<li><a href="#" title="">Foo Bar</a></li>'
		}).inject(document.body);

		var computedSize = element.getComputedSize();

		this.after(element.destroy.bind(element));

		expect(typeOf(computedSize.width)).toEqual('number');
		expect(typeOf(computedSize.height)).toEqual('number');
	});

});
