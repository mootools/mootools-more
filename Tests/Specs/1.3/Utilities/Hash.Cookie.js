/*
---
name: Hash.Cookie Tests
requires: [More/Hash.Cookie]
provides: [Hash.Cookie.Tests]
...
*/
describe('Hash.Cookie', {

	'Saves a set of key/values into a cookie': function(){
		var hc = new Hash.Cookie('HCtest');
		hc.set('foo', 'bar');
		hc.extend({
			apple: 'red',
			lemon: 'yellow'
		});
		expect(hc.get('apple')).toEqual('red');
	},

	'Retrieves a Hash.Cookie': function(){
		var hc = new Hash.Cookie('HCtest');
		expect(hc.get('apple')).toEqual('red');
	},

	'Removes a Hash.Cookie': function(){
		var hc1 = new Hash.Cookie('HCtest');
		hc1.dispose();
		var hc2 = new Hash.Cookie('HCtest');
		expect(hc2.get('apple')).toEqual(null);
	}

});

describe('Color properties', {

	'Should define the rgb value for a color': function(){
		expect(new Color("#ff00ff").rgb).toEqual([255,0,255]);
	},

	'Should define the hsb value for a color': function(){
		expect(new Color("#ff00ff").hsb).toEqual([300, 100, 100]);
	},

	'Should define the hex value for a color': function(){
		expect(new Color([255,0,255]).hex).toEqual("#ff00ff");
	}


});

