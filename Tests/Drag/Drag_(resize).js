var test_drag_resize = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Drag/Drag_(resize).html"
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
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: 'textresizer',
			pixels: '(0,100)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals('200px', $('comment').getStyle('height'));
	};
};

var test_disabled_resize = new function(){
	this.test_disable_drag = {
		method: 'click',
		params: {
			'id': 'disable'
		}
	};
	this.test_scroll_up = function(){
		window.scrollTo(0,0);
	};
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: 'textresizer',
			pixels: '(0,-100)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals('200px', $('comment').getStyle('height'));
	};
};

var test_enable_drag_resize = new function(){
	this.test_enable_drag = {
		method: 'click',
		params: {
			'id': 'enable'
		}
	};
	this.test_scroll_up = function(){
		window.scrollTo(0,0);
	};
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: 'textresizer',
			pixels: '(0,-100)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals('100px', $('comment').getStyle('height'));
	};
};