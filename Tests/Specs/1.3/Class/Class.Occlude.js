/*
---
name: Class.Occlude Tests
requires: [More/Class.Occlude]
provides: [Class.Occlude.Tests]
...
*/

describe('Class.Occlude', function(){

	var testDiv = new Element('div');

	var Tester = new Class({
		Implements: Class.Occlude,
		property: 'Tester',
		initialize: function(element){
			this.element = $(element);
			if (this.occlude()) return this.occluded;
		}
	});

	var Tester2 = new Class({
		Implements: Class.Occlude,
		initialize: function(element){
			this.element = $(element);
			if (this.occlude()) return this.occluded;
		}
	});

	var t1 = new Tester(testDiv),
		t2 = new Tester(testDiv),
		t3 = new Tester(testDiv);

	var t21 = new Tester2(testDiv),
		t22 = new Tester2(testDiv),
		t23 = new Tester2(testDiv);

	it('should not create a new instance so that occluded classes equate', function(){
		expect(t1 == t2).toBeTruthy();
		expect(t1 == t3).toBeTruthy();
	});

	it('should not create new intances without the occlude `property` property ', function(){
		expect(t21 == t22).toBeTruthy();
		expect(t21 == t23).toBeTruthy();
		expect(t1 == t21).toBeFalsy();
	});

});
