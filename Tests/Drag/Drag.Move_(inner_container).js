var test_load_drag_inner_container = new function(){
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Drag/Drag.Move_(inner_container).html"
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
var make_drag_inner_container_function = function(opts) {
	/*
		opts = {
			to: {x, y},
			measure: {x, y}
		}
	*/
	return new function() {
		this.test_drag_to = {
			method: 'dragDropElemToAbs',
			params: {
				id: "small_drag",
				coords: '(' + opts.to.x + ',' + opts.to.y + ')'
			}
		};
		this.test_measure = function(){
			var end = $("small_drag").getPosition(document.body);
			jum.assertEquals(opts.measure.x, end.x);
			jum.assertEquals(opts.measure.y, end.y);
		};
	};
};
var test_ur = make_drag_inner_container_function({
	to: {
		x: 340,
		y: 85
	},
	measure: {
		x: 335,
		y: 96
	}
});
var test_br = make_drag_inner_container_function({
	to: {
		x: 345,
		y: 220
	},
	measure: {
		x: 335,
		y: 216
	}
});
var test_bl = make_drag_inner_container_function({
	to: {
		x: 210,
		y: 220
	},
	measure: {
		x: 215,
		y: 216
	}
});
var test_ul = make_drag_inner_container_function({
	to: {
		x: 210,
		y: 85
	},
	measure: {
		x: 215,
		y: 96
	}
});