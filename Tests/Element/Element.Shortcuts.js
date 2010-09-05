var test_load_shorcuts = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Element/Element.Shortcuts.html"
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

var make_shortcut_test = function(item, test, delay){
	return new function(){
		this.test_hide = {
			method: "click",
			params: {
				id: item
			}
		};
		this.test_reposition = function(){
			window.scrollTo(0,0);
		};
		this.test_measure = test;
		if (delay) {
			this.test_pause = {
				method: "waits.sleep",
				params: {
					milliseconds: delay
				}
			};
		}
	};
};

var test_hide = make_shortcut_test("test-0", function(){
	jum.assertEquals('none', $('foo').getStyle('display'));
});
var test_show = make_shortcut_test("test-1", function(){
	jum.assertEquals('block', $('foo').getStyle('display'));
});
var test_show_inline = make_shortcut_test("test-2", function(){
	jum.assertEquals('inline', $('foo').getStyle('display'));
}, 1200);
var test_toggle_off = make_shortcut_test("test-3", function(){
	jum.assertEquals('none', $('foo').getStyle('display'));
});
var test_toggle_on = make_shortcut_test("test-3", function(){
	jum.assertEquals('block', $('foo').getStyle('display'));
});

var test_is_diplayed = make_shortcut_test("test-4", function(){
	jum.assertEquals('<p>hide successful; foo is not visible</p><p>show successful; foo is visible</p>', $('logContaner').innerHTML);
});
var test_is_visible = make_shortcut_test("test-5", function(){
	jum.assertEquals('<p>hide successful; foo is not visible</p><p>show successful; foo is visible</p><p>hide successful; foo is not visible</p><p>show successful; foo is visible</p>', $('logContaner').innerHTML);
});
var test_swap_class = make_shortcut_test("test-6", function(){
	jum.assertTrue($('foo').hasClass('blueText'));
	jum.assertTrue(!$('foo').hasClass('blackText'));
});
var test_swap_class_back = make_shortcut_test("test-7", function(){
	jum.assertTrue(!$('foo').hasClass('blueText'));
	jum.assertTrue($('foo').hasClass('blackText'));
});