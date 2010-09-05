var make_position_test = function(id, top, left) {
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
		this.test_measure = function(){
			jum.assertEquals(top, $('box').getStyle('top').toInt());
			jum.assertEquals(left, $('box').getStyle('left').toInt());
		};
	};
};

var test_load_position = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Element/Element.Position_(basic).html"
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

var test_center = make_position_test('test-0', 125, 495);
var test_ul_ul = make_position_test('test-1', 40, 410);
var test_br_br = make_position_test('test-2', 210, 580);
var test_c_br = make_position_test('test-3', 237, 607);
var test_rc_rc = make_position_test('test-4', 125, 580);
var test_ul_body = make_position_test('test-5', -41, -240);
