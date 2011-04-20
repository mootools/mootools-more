/*
---
name: Color Tests
requires: [More/Color]
provides: [Color.Tests]
...
*/

describe('Color initialize', function(){

	it('Should initialize a color from a hex value', function(){
		expect(new Color('#000').toString()).toEqual('0,0,0');
	});

	it('Should initialize a color from a RGB array', function(){
		expect(new Color([255,0,255]).toString()).toEqual('255,0,255');
	});

});

describe('Color properties', function(){

	it('Should define the rgb value for a color', function(){
		expect(new Color("#ff00ff").rgb).toEqual([255,0,255]);
	});

	it('Should define the hsb value for a color', function(){
		expect(new Color("#ff00ff").hsb).toEqual([300, 100, 100]);
	});

	it('Should define the hex value for a color', function(){
		expect(new Color([255,0,255]).hex).toEqual("#ff00ff");
	});


});

describe('Color mutation', function(){

	it('Should invert a color', function(){
		expect(new Color('#000').invert().toString()).toEqual('255,255,255');
	});

	it('Should mix a color', function(){
		expect(new Color('#000').mix('#fff').toString()).toEqual('127,127,127');
	});

	it('Should set the hue of a color', function(){
		expect(new Color('#700').setHue(300).toString()).toEqual('120,0,120');
	});

	it('Should set the saturation of a color', function(){
		expect(new Color('#700').setSaturation(50).toString()).toEqual('120,60,60');
	});

	it('Should set the brightness of a color', function(){
		expect(new Color('#700').setBrightness(70).toString()).toEqual('179,0,0');
	});

});

describe('Color $methods', function(){

	it('Tests $RGB', function(){
		expect(Array.from($RGB(127, 0, 0))).toEqual([127,0,0]);
	});

	it('Tests $HSB', function(){
		expect(Array.from($HSB(50, 50, 100))).toEqual([255,234,128]);
	});

	it('Tests $HEX', function(){
		expect(Array.from($HEX('#700'))).toEqual([281,0,0]);
	});

});


