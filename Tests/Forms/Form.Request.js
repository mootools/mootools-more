var test_load_form_request = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Forms/Form.Request.html"
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
	this.test_click_button = {
		method: "click",
		params: {
			id: "button1"
		}
	};
	this.test_wait_for_request = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("fetch html (button 1)", $('update').innerHTML);
	};
};