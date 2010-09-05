var test_load_form_request_append = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Forms/Form.Request.Append.html"
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
			id: "fetch"
		}
	};
	this.test_reposition = function(){
		window.scrollTo(0,0);
	};
	this.test_wait_for_request = {
		method: "waits.sleep",
		params: {
			milliseconds: 5000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("<p>this box should get new text <i>appended</i> when you click the input below.</p><p style=\"display: block;\">this is new text!</p>", $('update').innerHTML.trim());
	};
};