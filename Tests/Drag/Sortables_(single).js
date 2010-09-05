var test_load_single_sort = new function(){
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Drag/Sortables_(single).html"
		}
	};
	this.test_wait_for_loaded = {
		method: "waits.forJS",
		params: {
			js: function(){
				return document.body.className == "loaded";
			}
		}
	};
};

var test_sort_single = new function() {
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: '1',
			pixels: '(10,100)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals('order: 2,3,4,5,1,6,7,8,9,10', $('order').get('text'));
		jum.assertChecked($('fooCheck'));
	};
};