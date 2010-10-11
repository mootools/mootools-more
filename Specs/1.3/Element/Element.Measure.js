/*
Script: Element.Measure.js
	Specs for Element.Measure.js

License:
	MIT-style license.
*/
(function(){
	var div, parDiv;
	window.addEvent('domready', function(){
		div = new Element('div', {
			id: 'ElementMeasureTest',
			styles: {
				width: 100,
				height: 100,
				margin: 2,
				padding: 3,
				border: '1px solid black',
				display: 'none',
				position: 'absolute'
			}
		}).inject(document.body);
		parDiv = new Element('div', {
			id: 'ElementMeasureTest',
			styles: {
				width: 100,
				height: 100,
				margin: 2,
				padding: 3,
				border: '1px solid black',
				display: 'none',
				position: 'absolute'
			}
		}).inject(div);
	});

	describe('Element.Measure', {

		'should measure the width and height of the hidden element': function(){
			expect(div.getDimensions()).toEqual({width: 108, height: 108, x: 108, y: 108});
		},

		'should measure the computed (total) size of an element': function(){
			expect(div.getDimensions({computeSize: true})).toEqual({
				"padding-top":3,
				"border-top-width":1,
				"padding-bottom":3,
				"border-bottom-width":1,
				"padding-left":3,
				"border-left-width":1,
				"padding-right":3,
				"border-right-width":1,
				"width":100,
				"height":100,
				"x":100,
				"y":100,
				"totalHeight":108,
				"computedTop":4,
				"computedBottom":4,
				"totalWidth":108,
				"computedLeft":4,
				"computedRight":4
			});
		},

		'should measure the computed width of an element': function(){
			expect(div.getDimensions({computeSize: true, mode: 'horizontal'})).toEqual({
				"padding-left":3,
				"border-left-width":1,
				"padding-right":3,
				"border-right-width":1,
				"totalWidth":108,
				"width":100,
				"x":100,
				"computedLeft":4,
				"computedRight":4
			});
		}

	});

})();
