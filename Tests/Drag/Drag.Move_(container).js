var test_load_drag_container = new function(){
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Drag/Drag.Move_(container).html"
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
var makeDragFunction = function(opts) {
	/*
		opts = {
			id: 'box1',
			measure: {
				up: {x, y},
				down: {x, y}
			}
		}
	*/
	return new function() {
		var positions = [
			{x: 222, y: 99 }, 
			{x: 552, y: 99 },
			{x: 222, y: 399 },
			{x: 552, y: 399 }, 
			{x: 222, y: 689 },
			{x: 552, y: 689 },
			{x: 222, y: 989 },
			{x: 552, y: 989 }
		];
		this.test_scroll_to = {
			method: 'scroll',
			params: {
				coords: '(' + 0 + ',' + positions[opts.index].y + ')'
			}
		};
		this.test_wait0 = {
			method: 'waits.sleep',
			params: {
				milliseconds: 500
			}
		};
		this.test_drag_up = {
			method: 'dragDropElemToAbs',
			params: {
				id: opts.id,
				coords: '(' + (positions[opts.index].x - 10) + ',' + (positions[opts.index].y - 10 )+ ')'
			}
		};
		this.test_wait1 = {
			method: 'waits.sleep',
			params: {
				milliseconds: 2000
			}
		};
		this.test_measure_up = function(){
			var end = $(opts.id).getPosition($(opts.id).getOffsetParent());
			jum.assertEquals(opts.measure.up.x, end.x);
			jum.assertEquals(opts.measure.up.y, end.y);
		};
		this.test_wait2 = {
			method: 'waits.sleep',
			params: {
				milliseconds: 100
			}
		};
		this.test_drag_down = {
			method: 'dragDropElemToAbs',
			params: {
				id: opts.id,
				coords: '(' + (positions[opts.index].x + 300) + ',' + (positions[opts.index].y + 300) + ')'
			}
		};
		this.test_wait3 = {
			method: 'waits.sleep',
			params: {
				milliseconds: 2500
			}
		};
		this.test_measure_down = function(){
			var end = $(opts.id).getPosition($(opts.id).getOffsetParent());
			jum.assertEquals(opts.measure.down.x, end.x);
			jum.assertEquals(opts.measure.down.y, end.y);
		};
		this.test_wait4 = {
			method: 'waits.sleep',
			params: {
				milliseconds: 500
			}
		};
	};
};
// var test_drag_container1 = makeDragFunction({
// 	id: 'box1',
// 	index: 0,
// 	measure: {
// 		up: {x: 22, y: 24},
// 		down: {x: 231, y: 238}
// 	}
// });
// var test_drag_container2 = makeDragFunction({
// 	id: 'box2',
// 	index: 1,
// 	measure: {
// 		up: {x: 35, y: 31},
// 		down: {x: 222, y: 227}
// 	}
// });
var test_drag_container3 = makeDragFunction({
	id: 'box3',
	index: 2,
	measure: {
		up: {x: 8, y: 4},
		down: {x: 217, y: 218}
	}
});
// var test_drag_container4 = makeDragFunction({
// 	id: 'box4',
// 	index: 3,
// 	measure: {
// 		up: {x: 21, y: 11},
// 		down: {x: 208, y: 207}
// 	}
// });
// //these are exactly the same as the ones above, only with items 5-8
// var test_drag_container5 = makeDragFunction({
// 	id: 'box5',
// 	index: 4,
// 	measure: {
// 		up: {x: 22, y: 24},
// 		down: {x: 231, y: 238}
// 	}
// });
// var test_drag_container6 = makeDragFunction({
// 	id: 'box6',
// 	index: 5,
// 	measure: {
// 		up: {x: 35, y: 31},
// 		down: {x: 222, y: 227}
// 	}
// });
// var test_drag_container7 = makeDragFunction({
// 	id: 'box7',
// 	index: 6,
// 	measure: {
// 		up: {x: 8, y: 4},
// 		down: {x: 217, y: 218}
// 	}
// });
// var test_drag_container8 = makeDragFunction({
// 	id: 'box8',
// 	index: 7,
// 	measure: {
// 		up: {x: 21, y: 11},
// 		down: {x: 208, y: 207}
// 	}
// });