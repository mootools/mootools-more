var test_load_form_request_single = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Forms/Form.Validator.Inline_(single_input).html"
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
	this.test_type = {
		method: "type",
		params: {
			id: "a",
			text: ""
		}
	};
	this.test_blur_input = {
		method: "blur",
		params: {
			id: "a"
		}
	};
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("block", $('advice-required-a').getStyle('display'));
	};
	this.test_type_after = {
		method: "type",
		params: {
			id: 'a',
			text: "foo"
		}
	};
	this.test_blur_input_after = {
		method: "blur",
		params: {
			id: 'a'
		}
	};
	this.test_pause_after = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure_after = function(){
		jum.assertEquals("none", $('advice-required-a').getStyle('display'));
	};
};