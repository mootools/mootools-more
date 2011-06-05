/*
---

name: Validation

description: A Validation System

license: MIT-style license

authors:
  - Arian Stolwijk

requires:
  - Core/Class
  - Core/Object

provides: [Validation]

...
*/

(function(){

var rules = {};

var Validation = this.Validation = new Class({

	Implements: [Options, Events],

	options: {
		stopOnFail: false
	},

	rules: [],
	failed: [],

	initialize: function(rules, options){
		this.setOptions(options);
		if (rules) this.addRules(Array.from(rules));
	},

	addRule: function(rule, options){
		rule = Validation.lookupRule(rule);
		if (rule){
			if (options) Object.merge(rule.options, options);
			this.rules.include(rule);
		}
		return this;
	},

	addRules: function(rules){
		for (var i = 0, l = rules.length; i < l; i++) this.addRule(rules[i]);
		return this;
	},

	validate: function(value, options){

		var old = this.options;
		options = Object.append({stopOnFail: old.stopOnFail}, options);

		var rules = this.rules, rule, length = rules.length,
			passed = [], progressed = [], failed = [],
			self = this;

		var progress = function(result){
			if (!rule) return;

			if (!Type.isObject(result)) result = {passed: result};
			Object.append(result, {rule: rule, name: rule.name, value: value, options: rule.options});

			progressed.push(result);
			(result.passed ? passed : failed).push(result);
			self.fireEvent('progress', [result, progressed, passed, failed, rules]);
			if (passed.length == length){ // all rules passed
				self.fireEvent('success', [passed]);
			} else if (
				(!result && options.stopOnFail) // first one failed
				|| (progressed.length == length) // all failed
			){
				this.failed = failed;
				self.fireEvent('failure', [failed]);
			} else { // validate next rule
				validate();
			}
		};

		var validate = function(){
			rule = rules[progressed.length];
			if (rule.async) rule.rule.call(self, value, rule.options, progress);
			else progress(rule.rule.call(self, value, rule.options));
		};
		validate();

		return !failed.length;
	},

	getErrors: function(fn){
		return Validation.report(this.failed, fn);
	}

}).extend({

	validate: function(rules, value, success, failure, progress, options){
		if (arguments.length == 2 && typeOf(rules) != 'array'){
			var rule = Validation.lookupRule(rules);
			if (!rule.async){
				var result = rule.rule(value, rule.options);
				return (typeOf(result) == 'object') ? result.passed : result;
			}
		}
		options = Object.merge({}, options || {}, {
			onSuccess: success,
			onFailure: failure,
			onProgress: progress
		});
		return (new Validation(rules, options)).validate(value);
	},

	defineRule: function(name, rule, options){
		rules[name] = Object.merge({
			name: name,
			rule: rule,
			options: {}
		}, options);
		return this;
	},

	defineRegExpRule: function(name, regexp, options){
		return Validation.defineRule(name, function(value){
			return regexp.test(value);
		}, options);
	},

	defineAsyncRule: function(name, rule, options){
		options = options || {};
		options.async = true;
		return Validation.defineRule(name, rule, options);
	},

	lookupRule: function(rule){
		var type = typeOf(rule);
		if (type != 'object'){
			switch (typeOf(rule)){
				case 'string': return rules[rule];
				case 'function': return {rule: rule};
			}
			return null;
		}
		return (rule.name && !rule.rule)
			? Object.merge({}, rules[rule.name], rule) : rule;
	},

	report: function(failed, fn){
		return (fn ? failed.map(fn) : failed);
	}

});

// Overload
Validation.extend({
	defineRules: Validation.defineRule.overloadSetter(true),
	defineRegExpRules: Validation.defineRegExpRule.overloadSetter(true),
	defineAsyncRules: Validation.defineAsyncRule.overloadSetter(true)
});

// Defining some default rules
Validation.defineRules({

	empty: function(value){
		return (value == null || value == '');
	},

	required: function(value){
		return (value != null && value != '');
	},

	equals: function(value, options){
		return (value == options.equals);
	},

	between: function(value, options){
		return (value > options.min && value < options.max);
	},

	minLength: function(value, options){
		return (value.length >= options.minLength);
	},

	maxLength: function(value, options){
		return (value.length <= options.maxLength);
	}

});

})();
