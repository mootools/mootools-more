var supportsPositionFixed;
var test_load_pin = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Element/Element.Pin.html"
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
	this.test_scroll = function(){
		window.scrollTo(0,10);
	};
	this.test_measure_pin = function(){
		var test = new Element('div').setStyles({
			position: 'fixed',
			top: 0,
			right: 0
		}).inject(document.body);
		supportsPositionFixed = (test.offsetTop === 0);
		test.dispose();
		
		jum.assertEquals(supportsPositionFixed ? 50 : 60, $('foo').getStyle('top').toInt());
	};
	
	this.test_unpin = {
		method: "click",
		params: {
			id: "unpin"
		}
	};
	this.test_scroll2 = function(){
		window.scrollTo(0,10);
	};
	this._test_measure_unpin = function(){
		jum.assertEquals(91, $('foo').getStyle('top').toInt());
	};
	
};