var reposition = function(){
	window.scrollTo(0,0);
};

var test_load_delegation = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Element/Element.Delegation.html"
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
	this.test_mouseover = {
		method: 'mouseOver',
		params: {
			id: 'item1'
		}
	};
	this.test_pause = {
		method: 'waits.sleep',
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure_mo = function(){
		jum.assertEquals('#222222', $('item1').getStyle('background-color'));
	};
	this.test_click = {
		method: 'click',
		params: {
			id: 'item1'
		}
	};
	this.test_reposition = reposition;
	this.test_measure_click = function(){
		jum.assertEquals('Apples are red this.tagName: DIV e.target.tagName: DIV el.tagName: DIV', $('clicked').get('text'));
	};
	
	this.test_disable = {
		method: 'click',
		params: {
			id: 'remove'
		}
	};
	this.test_reposition2 = reposition;
	
	this.test_mouseover2 = {
		method: 'mouseOver',
		params: {
			id: 'item2'
		}
	};
	this.test_pause2 = {
		method: 'waits.sleep',
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure_mo2 = function(){
		jum.assertEquals('#2d5e4c', $('item2').getStyle('background-color'));
	};
	this.test_click2 = {
		method: 'click',
		params: {
			id: 'item2'
		}
	};
	this.test_reposition2 = reposition;
	this.test_measure_click2 = function(){
		jum.assertEquals('Apples are red this.tagName: DIV e.target.tagName: DIV el.tagName: DIV', $('clicked').get('text'));
	};
};