var test_load_fx_slide = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.Slide.html"
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

var make_fx_slide_test = function(id, top) {
	return new function(){
		this.test_action = {
			method: "click",
			params: {
				id: id
			}
		};
		this.test_scroll = function(){
			window.scrollTo(0,0);
		};
		this.test_pause = {
			method: "waits.sleep",
			params: {
				milliseconds: 1000
			}
		};
		this.test_measure = function(){
			jum.assertEquals(top, $('sliderButton').getStyle('margin-top').toInt());
		};
	};
};
var test_slide_out = make_fx_slide_test('test-0', -102);
var test_slide_in = make_fx_slide_test('test-1', 0);
var test_toggle_out = make_fx_slide_test('test-2', -102);
var test_toggle_in = make_fx_slide_test('test-2', 0);