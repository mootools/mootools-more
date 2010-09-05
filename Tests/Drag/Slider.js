var test_load_slider = new function(){
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Drag/Slider.html"
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

var test_slider = new function() {
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: 'knob',
			pixels: '(90,0)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals(50, $('upd').get('text').toInt());
	};
};
var test_slider2 = new function() {
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: 'knob2',
			pixels: '(96,0)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals(5, $('upd2').get('text').toInt());
	};
};
var test_slider3 = new function() {
	this.test_drag = {
		method: 'dragDropElem',
		params: {
			id: 'knob3',
			pixels: '(90,0)'
		}
	};
	this.test_measure = function(){
		jum.assertEquals(50, $('upd3').get('text').toInt());
	};
	this.test_click_set_range = {
		method: 'click',
		params: {
			id: 'setRange'
		}
	};
	this.test_scroll_to = {
		method: 'scroll',
		params: {
			coords: '(0,0)'
		}
	};
	this.test_measure_new_position = function(){
		jum.assertEquals(180, $('knob3').getStyle('left').toInt());
	};
	this.test_drag_back = {
		method: 'dragDropElem',
		params: {
			id: 'knob3',
			pixels: '(-180,0)'
		}
	};
	this.test_measure_final = function(){
		jum.assertEquals(200, $('upd3').get('text').toInt());
	};
};