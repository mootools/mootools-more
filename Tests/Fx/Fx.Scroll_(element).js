var test_load_fx_scroll_element = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.Scroll_(element).html"
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

var make_scroll_element_test = function(id, top, left) {
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
			var scrolls = $('scrollExample').getScrolls();
			if (top != null) jum.assertEquals(top, scrolls.y);
			if (left != null) jum.assertEquals(left, scrolls.x);
		};
	};
};
var test_scroll_element_to_bottom = make_scroll_element_test('test-0', 1049);
var test_scroll_element_to_br = make_scroll_element_test('test-1', 1049, 255);
var test_scroll_element_to_top = make_scroll_element_test('test-2', 0, 255);
var test_scroll_element_to_tl = make_scroll_element_test('test-3', 0, 0);
var test_scroll_element_to_red = make_scroll_element_test('test-4', 648, 40);
var test_scroll_element_to_blue = make_scroll_element_test('test-5', 962, 0);
var test_scroll_element_to_yellow = make_scroll_element_test('test-6', 54, 0);
var test_scroll_element_to_centergreen = make_scroll_element_test('test-7', 832, 140);
var test_scroll_element_to_xgreen = make_scroll_element_test('test-8', 0, 140);
var test_scroll_element_to_ygreen = make_scroll_element_test('test-9', 832, 0);
