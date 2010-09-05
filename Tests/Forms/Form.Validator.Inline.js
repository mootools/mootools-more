var test_load_form_request = new function() {
	this.test_load = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Forms/Form.Validator.Inline.html"
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

var make_type_test = function(id, text_before, text_after, error_id, error){
	return new function(){
		this.test_type = {
			method: "type",
			params: {
				id: id,
				text: text_before
			}
		};
		this.test_blur_input = {
			method: "blur",
			params: {
				id: id
			}
		};
		this.test_pause = {
			method: "waits.sleep",
			params: {
				milliseconds: 2000
			}
		};
		this.test_measure = function(){
			jum.assertEquals("block", $('advice-' + error_id + '-' + id).getStyle('display'));
		};
		this.test_type_after = {
			method: "type",
			params: {
				id: id,
				text: text_after
			}
		};
		this.test_blur_input_after = {
			method: "blur",
			params: {
				id: id
			}
		};
		this.test_pause_after = {
			method: "waits.sleep",
			params: {
				milliseconds: 2000
			}
		};
		this.test_measure_after = function(){
			jum.assertEquals("none", $('advice-' + error_id + '-' + id).getStyle('display'));
		};
	};
};

var test_required = make_type_test('a', "", "some text", "required");
var test_integer = make_type_test('b', "134.9", "123", "validate-integer");
var test_integer_2 = make_type_test('b', "a324", "123", "validate-integer");
var test_numeric = make_type_test('c', 'foo', '1.9', "validate-numeric");
var test_min_length = make_type_test('d', 'ba', 'blah', "minLength");
var test_max_length = make_type_test('d', 'blahblah', 'blah', "maxLength");
var test_digits = make_type_test('e', '1.9!', '1.09 3-4', "validate-digits");
var test_alpha = make_type_test('f', 'foo bar 99', 'foobar', 'validate-alpha');
var test_alphanum = make_type_test('g', 'party like it\'s 1999', 'partylikeitis1999', 'validate-alphanum');
var test_date = make_type_test('h', 'tomorrow', '9/9/99', 'validate-date');
var test_email = make_type_test('i', 'foo@bar', 'foo@bar.com', 'validate-email');
var test_url = make_type_test('j', 'google.com', 'http://google.com', 'validate-url');
var test_currency = make_type_test('k', '$akd', '$301.10', 'validate-currency-dollar');
var test_one_required = new function(){
	this.test_submit = {
		method: "click",
		params: {
			id: "validator_submit"
		}
	};
	this.test_pause = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure = function(){
		jum.assertEquals("block", $('advice-validate-one-required-input_').getStyle('display'));
	};
	this.test_check = {
		method: "click",
		params: {
			id: "l"
		}
	};
	this.test_submit_again = {
		method: "click",
		params: {
			id: "validator_submit"
		}
	};
	this.test_pause_after = {
		method: "waits.sleep",
		params: {
			milliseconds: 2000
		}
	};
	this.test_measure_after = function(){
		jum.assertEquals("none", $('advice-validate-one-required-input_').getStyle('display'));
	};
};