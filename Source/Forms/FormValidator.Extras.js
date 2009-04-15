/*
Script: FormValidator.Extras.js
	Additional validators for the FormValidator class.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/
FormValidator.addAllThese([

	['validate-enforce-oncheck', {
		test: function(element, props){
			if (element.checked){
				var fv = element.getParent('form').retrieve('validator');
				if (!fv) return true;
				(props.toEnforce || $(props.enforceChildrenOf).getElements('input, select, textarea')).map(function(item){
					fv.enforceField(item);
				});
			}
			return true;
		}
	}],

	['validate-ignore-oncheck', {
		test: function(element, props){
			if (element.checked){
				var fv = element.getParent('form').retrieve('validator');
				if (!fv) return true;
				(props.toIgnore || $(props.ignoreChildrenOf).getElements('input, select, textarea')).each(function(item){
					fv.ignoreField(item);
					fv.resetField(item);
				});
			}
			return true;
		}
	}],

	['validate-nospace', {
		errorMsg: function(){
			return FormValidator.getMsg('noSpace');
		},
		test: function(element, props){
			return !element.get('value').test(/\s/);
		}
	}],

	['validate-toggle-oncheck', {
		test: function(element, props){
			var fv = element.getParent('form').retrieve('validator');
			if (!fv) return true;
			var eleArr = props.toToggle || $(props.toToggleChildrenOf).getElements('input, select, textarea');
			if (!element.checked){
				eleArr.each(function(item){
					fv.ignoreField(item);
					fv.resetField(item);
				});
			} else {
				eleArr.each(function(item){
					fv.enforceField(item);
				});
			}
			return true;
		}
	}],

	['validate-reqchk-bynode', {
		errorMsg: function(){
			return FormValidator.getMsg('reqChkByNode');
		},
		test: function(element, props){
			return ($(props.nodeId).getElements(props.selector || 'input[type=checkbox], input[type=radio]')).some(function(item){
				return item.checked;
			});
		}
	}],

	['validate-required-check', {
		errorMsg: function(element, props){
			return props.useTitle ? element.get('title') : FormValidator.getMsg('requiredChk');
		},
		test: function(element, props){
			return !!element.checked;
		}
	}],

	['validate-reqchk-byname', {
		errorMsg: function(element, props){
			return FormValidator.getMsg('reqChkByName').substitute({label: props.label || element.get('type')});
		},
		test: function(element, props){
			var grpName = props.groupName || element.get('name');
			var oneCheckedItem = $$(document.getElementsByName(grpName)).some(function(item, index){
				return item.checked;
			});
			var fv = element.getParent('form').retrieve('validator');
			if (oneCheckedItem && fv) fv.resetField(element);
			return oneCheckedItem;
		}
	}],

	['validate-match', {
		errorMsg: function(element, props){
			return FormValidator.getMsg('match').substitute({matchName: props.matchName || $(props.matchInput).get('name')});
		},
		test: function(element, props){
			var eleVal = element.get('value');
			var matchVal = $(props.matchInput) && $(props.matchInput).get('value');
			return eleVal && matchVal ? eleVal == matchVal : true;
		}
	}],

	['validate-after-date', {
		errorMsg: function(element, props){
			return FormValidator.getMsg('afterDate').substitute({
				label: props.afterLabel || (props.afterElement ? FormValidator.getMsg('startDate') : FormValidator.getMsg('currentDate'))
			});
		},
		test: function(element, props){
			var start = $(props.afterElement) ? Date.parse($(props.afterElement).get('value')) : new Date();
			var end = Date.parse(element.get('value'));
			return end && start ? end >= start : true;
		}
	}],

	['validate-before-date', {
		errorMsg: function(element, props){
			return FormValidator.getMsg('beforeDate').substitute({
				label: props.beforeLabel || (props.beforeElement ? FormValidator.getMsg('endDate') : FormValidator.getMsg('currentDate'))
			});
		},
		test: function(element, props){
			var start = Date.parse(element.get('value'));
			var end = $(props.beforeElement) ? Date.parse($(props.beforeElement).get('value')) : new Date();
			return end && start ? end >= start : true;
		}
	}],

	['validate-custom-required', {
		errorMsg: function(){
			return FormValidator.getMsg('required');
		},
		test: function(element, props){
			return element.get('value') != props.emptyValue;
		}
	}],

	['validate-same-month', {
		errorMsg: function(element, props){
			var startMo = $(props.sameMonthAs) && $(props.sameMonthAs).get('value');
			var eleVal = element.get('value');
			if (eleVal != ''){
				if (!startMo){ return FormValidator.getMsg('startMonth');}
				else {
					return FormValidator.getMsg('sameMonth');
				}
			}
		},
		test: function(element, props){
			var d1 = Date.parse(element.get('value'));
			var d2 = Date.parse($(props.sameMonthAs) && $(props.sameMonthAs).get('value'));
			return d1 && d2 ? d1.format('%B') == d2.format('%B') : true;
		}
	}]


	['validate-cc-num', {
		errorMsg: function(element){
			return 'The credit card number entered is invalid. Please check the number and try again. '
			 		+ (element.get('value').replace(/[^0-9]/g, '').length) + ' digits entered.';
		},
		test: function(element){
			if (FormValidator.getValidator('IsEmpty').test(element)) return true;
			var ccNum = element.get('value').replace(/[^0-9]/g, '');

			var valid_type = false;
			if (ccNum.test(/^4[0-9]{12}([0-9]{3})?$/)) valid_type = 'Visa';
			else if (ccNum.test(/^5[1-5]([0-9]{14})$/)) valid_type = 'Master Card';
			else if (ccNum.test(/^3[47][0-9]{13}$/)) valid_type = 'American Express';
			else if (ccNum.test(/^6011[0-9]{12}$/)) valid_type = 'Discover';

			if (valid_type) {
				var sum = 0,
					cur = 0;

				for(var i=ccNum.length-1; i>=0; --i) {
					cur = ccNum.charAt(i).toInt();
					if (cur === 0) { continue; }
					if ((ccNum.length-i) % 2 === 0) { cur += cur; }
					if (cur > 9) { cur = cur.toString().charAt(0).toInt() + cur.toString().charAt(1).toInt(); }
					sum += cur;
				}
				if ((sum % 10) === 0) { return true; }
			}

			var chunks = '';
			while (ccNum != '') {
				chunks += ' ' + ccNum.substr(0,4);
				ccNum = ccNum.substr(4);
			}

			element.set('value', chunks.clean());
			return false;
		}
	}]


]);