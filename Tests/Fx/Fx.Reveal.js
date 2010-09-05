var test_load_fx_reveal = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.Reveal.html"
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
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 1000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("block", $('success').getStyle('display'));
	};
	this.test_dissolve = {
		method: "click",
		params: {
			id: "dissolve"
		}
	};
	this.test_pause_dissolve = {
		method: "waits.sleep",
		params: {
			milliseconds: 1000
		}
	};
	this.test_measure_dissolve = function(){
		jum.assertEquals("none", $('success').getStyle('display'));
	};
	this.test_reveal = {
		method: "click",
		params: {
			id: "reveal"
		}
	};
	this.test_pause_reveal = {
		method: "waits.sleep",
		params: {
			milliseconds: 1000
		}
	};
	this.test_measure_reveal = function(){
		jum.assertEquals("block", $('success').getStyle('display'));
	};
};