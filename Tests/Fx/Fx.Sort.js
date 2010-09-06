var test_load_fx_sort = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.Sort.html"
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

var make_sort_test = function(index, beforeIndex, afterIndex){
	return new function(){
		this.test_click_action = {
			method: "click",
			params: {
				id: 'test-' + index
			}
		};
		this.test_pause = {
			method: "waits.sleep",
			params: {
				milliseconds: 1500
			}
		};
		this.test_measure = function(){
			jum.assertLessThan($('li' + beforeIndex).getPosition().y, $('li' + afterIndex).getPosition().y);
			jum.assertLessThan($('sp' + beforeIndex).getPosition().x, $('sp' + afterIndex).getPosition().x);
		};
	};
};
var test_54321 = make_sort_test(0, 4, 0);
var test_12345 = make_sort_test(1, 0, 4);
var test_52431 = make_sort_test(2, 1, 3);
var test_swap5and1 = make_sort_test(3, 0, 4);
var test_reverse =  make_sort_test(4, 4, 0);
var test_set_dom_order = new function(){
	this.test_click_action = {
		method: "click",
		params: {
			id: 'test-0'
		}
	};
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 1500
		}
	};
	this.test_reorder_dom = {
		method: "click",
		params: {
			id: "test-5"
		}
	};
	this.test_text = function(){
		jum.assertTrue($$('#sorter li')[0].innerHTML.contains("(4) blah"));
	};
};