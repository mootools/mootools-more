var test_load_fx_elements = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Fx/Fx.Elements.html"
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
			milliseconds: 2000
		}
	};
	this.test_measure = function(){
		var bars = $$('.exampleBar');
		jum.assertEquals(1, bars[0].getStyle('opacity'));
		jum.assertEquals(200, bars[0].getStyle('width').toInt());
		jum.assertEquals(0.5, bars[1].getStyle('opacity'));
		jum.assertEquals(40, bars[2].getStyle('height').toInt());
	};
};