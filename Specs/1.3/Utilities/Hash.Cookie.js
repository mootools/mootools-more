/*
Script: Hash.Cookie.js
	Specs for Hash.Cookie.js

License:
	MIT-style license.
*/

describe('Hash.Cookie', {

	'Saves a set of key/values into a cookie': function(){
		var hc = new Hash.Cookie('HCtest');
		hc.set('foo', 'bar');
		hc.extend({
			apple: 'red',
			lemon: 'yellow'
		});
		value_of(hc.get('apple')).should_be('red');
	},
	
	'Retrieves a Hash.Cookie': function(){
		var hc = new Hash.Cookie('HCtest');
		value_of(hc.get('apple')).should_be('red');
	},

	'Removes a Hash.Cookie': function(){
		var hc1 = new Hash.Cookie('HCtest');
		hc1.dispose();
		var hc2 = new Hash.Cookie('HCtest');
		value_of(hc2.get('apple')).should_be(null);
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

