var test_load_multi_sort = new function(){
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Drag/Sortables_(multi).html"
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

var test_sort_multi = new function() {
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: '1',
			pixels: '(190,50)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals('order: 2,3,4,5,6,1,7,8,9', $('order').get('text'));
	};
};