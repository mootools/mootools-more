var test_load_form_extras = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Forms/Form.Validator.Extras.html"
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

var test_toggle_oncheck = new function(){
	this.test_type = {
		method: "type",
		params: {
			id: "nospaces",
			text: "this has spaces"
		}
	};
	this.test_blur = {
		method: "blur",
		params: {
			id: "nospaces"
		}
	};
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("block", $('advice-validate-nospace-nospaces').getStyle('display'));
	};
	this.test_check = {
		method: "click",
		params: {
			id: "a"
		}
	};
	this.test_pause_after = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure_after = function(){
		jum.assertEquals("none", $('advice-validate-nospace-nospaces').getStyle('display'));
	};
};

var make_one_checked_test = function(id, error_id){
	return new function(){
		this.test_submit_form = {
			method: "click",
			params: {
				id: "validatorSubmit"
			}
		};
		this.test_pause = {
			method: "waits.sleep",
			params: {
				milliseconds: 2000
			}
		};
		this.test_measure = function(){
			jum.assertEquals("block", $(error_id).getStyle('display'));
		};
		this.test_check = {
			method: "click",
			params: {
				id: id
			}
		};
		this.test_submit_again = {
			method: "click",
			params: {
				id: "validatorSubmit"
			}
		};
		this.test_pause_after = {
			method: "waits.sleep",
			params: {
				milliseconds: 2000
			}
		};
		this.test_measure_after = function(){
			jum.assertEquals("none", $(error_id).getStyle('display'));
		};
	};
};
var test_reqchk_by_node = make_one_checked_test('c', 'advice-validate-reqchk-bynode-e');
var test_reqchk_by_name = make_one_checked_test('f', 'advice-validate-reqchk-byname-h');
var test_required_check = make_one_checked_test('j', 'advice-validate-required-check-j');

var make_date_test = function(before, before_date, after, after_date, error_id, shouldBeValid){
	return new function(){
		this.test_set_before = {
			method: "type",
			params: {
				id: before,
				text: before_date
			}
		};
		this.test_set_after = {
			method: "type",
			params: {
				id: after,
				text: after_date
			}
		};
		this.test_submit = {
			method: "click",
			params: {
				id: "validatorSubmit"
			}
		};
		this.test_pause_after = {
			method: "waits.sleep",
			params: {
				milliseconds: 2000
			}
		};
		this.test_measure_after = function(){
			jum.assertEquals(shouldBeValid ? "none" : "block", $(error_id).getStyle('display'));
		};
	};
};

var test_after_date_fail = make_date_test("before1", "9.9.99", "after1", "01/01/1985", "advice-validate-after-date-after1", false);
var test_after_date_succeed = make_date_test("before1", "9.9.99", "after1", "01/01/2000", "advice-validate-after-date-after1", true);

var test_before_dates_fail = make_date_test("before2", "9.9.99", "after2", "01/01/1985", "advice-validate-before-date-before2", false);
var test_before_dates_succeed = make_date_test("before2", "9.9.99", "after2", "01/01/2000", "advice-validate-before-date-before2", true);

//the second date argument really isn't useful here as this validates against today's date
var test_before_today_fail = make_date_test("before3", "01/01/9999", "after3", "01/01/1985", "advice-validate-before-date-before3", false);
var test_before_today_succeed = make_date_test("before3", "01/01/1985", "after3", "01/01/1985", "advice-validate-before-date-before3", true);

var test_after_today_fail = make_date_test("before3", "01/01/9999", "after3", "01/01/1985", "advice-validate-after-date-after3", false);
var test_after_today_succeed = make_date_test("before3", "01/01/1985", "after3", "01/01/9999", "advice-validate-after-date-after3", true);

var test_custom_required = new function(){
	this.test_submit = {
		method: "click",
		params: {
			id: "validatorSubmit"
		}
	};
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("block", $("advice-validate-custom-required-k").getStyle('display'));
	};
	this.test_select_value = {
		method: "select",
		params: {
			id: "k",
			index: 1
		}
	};
	this.test_submit_after = {
		method: "click",
		params: {
			id: "validatorSubmit"
		}
	};
	this.test_pause_after = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure_after = function(){
		jum.assertEquals("none", $("advice-validate-custom-required-k").getStyle('display'));
	};
};