/*
Script: Class.Occlude.js
	Specs for Class.Occlude.js

License:
	MIT-style license.
*/
(function(){
	var testDiv = new Element('div');
	var Tester = new Class({
		Implements: Class.Occlude,
		property: "Tester",
		initialize: function(element){
			this.element = $(element);
			if (this.occlude()) return this.occluded;
		}
	});

	var t1 = new Tester(testDiv);
	var t2 = new Tester(testDiv);
	describe('Class.Occlude', {

		'verifies that occluded classes equate': function(){
			expect(t1).toEqual(t2);
		}

	});
})();
