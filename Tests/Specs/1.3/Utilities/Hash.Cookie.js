/*
---
name: Hash.Cookie Tests
requires: [More/Hash.Cookie]
provides: [Hash.Cookie.Tests]
...
*/
describe('Hash.Cookie', function(){

	beforeEach(function(){
		this.hc = new Hash.Cookie('HCtest');
	});

	afterEach(function(){
		this.hc.dispose().load();
	});

	it('Saves a set of key/values into a cookie', function(){
		var hc = this.hc;
		hc.set('foo', 'bar');
		hc.extend({
			apple: 'red',
			lemon: 'yellow'
		});
		expect(hc.get('apple')).toEqual('red');
		expect(hc.get('foo')).toEqual('bar');
		expect(hc.get('lemon')).toEqual('yellow');
	});

	it('Retrieves a Hash.Cookie', function(){
		this.hc.set('pomme', 'rouge');
		var hc2 = new Hash.Cookie('HCtest');// order matters here 
		expect(hc2.get('pomme')).toEqual('rouge');
	});

	it('Removes a Hash.Cookie', function(){
		var hc = this.hc;

		hc.set('apple', 'green');
		hc.dispose().load();// destroy cookie then update hash
 
		expect(hc.get('apple')).toEqual(null);
	});

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

