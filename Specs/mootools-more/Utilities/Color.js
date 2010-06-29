/*
Script: Color.js
	Specs for Color.js

License:
	MIT-style license.
*/

describe('Color initialize', {

	'Should initialize a color from a hex value': function(){
		value_of(new Color('#000')).should_be([0,0,0]);
	},
	
	'Should initialize a color from a RGB array': function(){
		value_of(new Color([255,0,255])).should_be([255,0,255]);
	}

});

describe('Color properties', {

	'Should define the rgb value for a color': function(){
		value_of(new Color("#ff00ff").rgb).should_be([255,0,255]);
	},

	'Should define the hsb value for a color': function(){
		value_of(new Color("#ff00ff").hsb).should_be([300, 100, 100]);
	},

	'Should define the hex value for a color': function(){
		value_of(new Color([255,0,255]).hex).should_be("#ff00ff");
	}


});

describe('Color mutation', {

	'Should invert a color': function(){
		value_of(new Color('#000').invert()).should_be([255,255,255]);
	},
	
	'Should mix a color': function(){
		value_of(new Color('#000').mix('#fff')).should_be([127,127,127]);
	},

	'Should set the hue of a color': function(){
		value_of(new Color('#700').setHue(300)).should_be([120,0,120]);
	},

	'Should set the saturation of a color': function(){
		value_of(new Color('#700').setSaturation(50)).should_be([120,60,60]);
	},

	'Should set the brightness of a color': function(){
		value_of(new Color('#700').setBrightness(70)).should_be([179,0,0]);
	}

});

describe('Color $methods', {

	'Tests $RGB': function(){
		value_of($RGB(127, 0, 0)).should_be([127,0,0]);
	},

	'Tests $HSB': function(){
		value_of($HSB(50, 50, 100)).should_be([255,234,128]);
	},

	'Tests $HEX': function(){
		value_of($HEX('#700')).should_be([281,0,0]);
	}

	
});