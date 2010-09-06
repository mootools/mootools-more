var test_load_fx_smoothscroll = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.SmoothScroll.html"
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
	this.test_click_d = {
		method: "click",
		params: {
			id: "d_anchor"
		}
	};
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 500
		}
	};
	this.test_measure = function(){
		jum.assertEquals($$("[name=D]")[0].getPosition(document.body).y, window.getScroll().y + 1);
	};
	this.test_click_top = {
		method: "click",
		params: {
			id: "back_to_top"
		}
	};
	this.test_pause_top = {
		method: "waits.sleep",
		params: {
			milliseconds: 500
		}
	};
	this.test_measure_top = function(){
		jum.assertEquals($$("[name=top]")[0].getPosition(document.body).y, window.getScroll().y + 1);
	};
};