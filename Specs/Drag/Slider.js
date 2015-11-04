/*
---
name: Slider
requires: [Core/Element.Dimensions, Core/Number, Class.Binds, Drag, Element.Measure]
provides: [Slider]
...
*/

/* THIS SPECS DO NOT WORK IN <IE9. Commented this and look forward to un-comment this when we stop supporting old browsers... */
/*
// specs code
describe('Slider.js', function(){

	// support jsFiddle: http://jsfiddle.net/N4req/

	function createEnviroment(){
		sliderContainer = new Element('div', {
			styles: {
				backgroundColor: '#555',
				height: '11px',
				margin: '20px',
				position: 'relative'
			}
		}).inject(environment);
		sliderKnob = new Element('div', {
			styles: {
				backgroundColor: '#ccf',
				height: '20px',
				width: '20px',
				position: 'absolute',
				top: '-5px'
			}
		}).inject(sliderContainer);
	}

	// function to format for Syn
	function dragCenterPos(el){
		var dragPos = el.getPosition();
		var dragSize = el.getSize();
		return {
			pageX: dragPos.x + Math.round(dragSize.x / 2),
			pageY: dragPos.y + Math.round(dragSize.y / 2)
		}
	}

	//function to do the Drag
	function dragIt(from, to, el){
		setTimeout(function(){
			Syn.drag({
				from: from,
				to: to,
				duration: 550
			}, el);
		}, 100);
	}
	var environment, sliderContainer, sliderKnob;
	environment = new Element('div', {
		styles: {
			width: '500px',
			height: '50px'
		}
	}).inject($(document.body));

	createEnviroment();
	var changeValue, moveValue, completeValue, tenthChange = [0];
	var maxPosition = (function(){
		var knob = sliderKnob.getPosition();
		var max = sliderContainer.getSize();
		return {
			pageX: knob.x + max.x,
			pageY: knob.y
		};
	})();

	var slider = new Slider(sliderContainer, sliderKnob, {
		range: [0, 10],
		steps: 20,
		initialStep: 0,
		onChange: function(value){
			tenthChange.push(value);
			if (!changeValue) changeValue = value;
		},
		onComplete: function(value){
			if (!completeValue) completeValue = value;
		},
		onMove: function(){
			moveValue = true;
		}
	})
	dragIt(dragCenterPos(sliderKnob), maxPosition, sliderKnob);

	it("should drag to last position when snap is set to true", function(){
		waits(1000);
		runs(function(){
			expect(completeValue).toEqual('10');
		});
	});

	it("should return correct type", function(){
		expect(typeof changeValue).toEqual('number');
		expect(typeof completeValue).toEqual('string');
	});

	it("should change in steps, and give decimal values", function(){
		expect(changeValue).toEqual(0.5);
		expect(tenthChange[10]).toEqual(5)
	});

	it("should fire move event", function(){
		expect(moveValue).toBeTruthy();
	});

	it("should NOT snap to values when snap is unset or false", function(){
		// reset Slider
		slider.set(0);
		slider.options.steps = false;
		changeValue = moveValue = completeValue = undefined;
		tenthChange = [0];
		dragIt(dragCenterPos(sliderKnob), maxPosition, sliderKnob);

		waits(1000);
		runs(function(){
			expect(tenthChange[10]).toBeLessThan(5); // 0.5 would be first step
		});
	});

	it("should handle correct numbers with decimals", function(){
		// reset Slider
		slider.detach();
		environment.empty();
		createEnviroment();
		changeValue = moveValue = completeValue = undefined;

		var slider2 = new Slider(sliderContainer, sliderKnob, {
			range: [0, 8067],
			steps: 10,
			initialStep: 0,
			onChange: function(value){
				if (!changeValue) changeValue = value;
			},
			onComplete: function(value){
				if (!completeValue) completeValue = value;
			}
		})

		changeValue = moveValue = completeValue = undefined;

		dragIt(dragCenterPos(sliderKnob), maxPosition, sliderKnob);

		waits(1000);
		runs(function(){
			expect(changeValue).toEqual(806.7);
			expect(completeValue).toEqual('8067');
		});
	});
});
*/