var test_load_accordion = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.Accordion.html"
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
var make_accordion_test = function(click, check, displayed, method){
	return new function(){
		if (click) {
			this.test_click = {
				method: method || "click",
				params: {
					id: click
				}
			};
			this.test_pause = {
				method: "waits.sleep",
				params: {
					milliseconds: 1000
				}
			};
		}
		this.test_measure = function(){
			jum.assertEquals(displayed ? "visible" : "hidden", $(check).getStyle('visibility'));
		};
	};
};
var test_first_section = make_accordion_test(null, "acc1_dd1", true);
var test_click_second_section = make_accordion_test("acc1_dt2", "acc1_dd2", true);
var test_check_first_section_hidden = make_accordion_test(null, "acc1_dd1", false);
var test_detach_first = new function(){
	this.test_detach = {
		method: "click",
		params: {
			id: "detach"
		}
	};
};
var test_first_is_detached = make_accordion_test("acc1_dt1", "acc1_dd2", true);
var test_mouse_over_second = make_accordion_test("acc2_dt2", "acc2_dd2", true, "mouseOver");
var test_added_section = make_accordion_test("acc3_dt4", "acc3_dd4", true);
var test_open_fourth = make_accordion_test("acc4_dt1", "acc4_dd1", true);
var test_close_fourth = make_accordion_test("acc4_dt1", "acc4_dd1", false);
var test_second_section = make_accordion_test(null, "acc5dd2", true);