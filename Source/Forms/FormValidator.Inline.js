/*
Script: FormValidator.Inline.js
	Extends FormValidator to add inline messages.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

FormValidator.Inline = new Class({

	Extends: FormValidator,

	options: {
		scrollToErrorsOnSubmit: true,
		scrollFxOptions: {
			offset: {
				y: -20
			}
		}
	},

	initialize: function(form, options){
		this.parent(form, options);
		this.addEvent('onElementValidate', function(isValid, field, className, warn){
			var validator = this.getValidator(className);
			if (!isValid && validator.getError(field)){
				if (warn) field.addClass('warning');
				var advice = this.makeAdvice(className, field, validator.getError(field), warn);
				this.insertAdvice(advice, field);
				this.showAdvice(className, field);
			} else {
				this.hideAdvice(className, field);
			}
		});
	},

	makeAdvice: function(className, field, error, warn){
		var errorMsg = (warn)?this.warningPrefix:this.errorPrefix;
				errorMsg += (this.options.useTitles) ? field.title || error:error;
		var cssClass = (warn)?'warning-advice':'validation-advice';
		var advice = this.getAdvice(className, field);
		if(advice) {
			advice = advice.clone(true).set('html', errorMsg).replaces(advice);
		} else {
			advice = new Element('div', {
				html: errorMsg,
				styles: { display: 'none' },
				id: 'advice-'+className+'-'+this.getFieldId(field)
			}).addClass(cssClass);
		}
		field.store('advice-'+className, advice);
		return advice;
	},

	getFieldId : function(field){
		return field.id ? field.id : field.id = "input_" + field.name;
	},

	showAdvice: function(className, field){
		var advice = this.getAdvice(className, field);
		if (advice && !field.retrieve(this.getPropName(className))
				&& (advice.getStyle('display') == "none"
				|| advice.getStyle('visiblity') == "hidden"
				|| advice.getStyle('opacity') == 0)){
			field.store(this.getPropName(className), true);
			if (advice.reveal) advice.reveal();
			else advice.setStyle('display', 'block');
		}
	},

	hideAdvice: function(className, field){
		var advice = this.getAdvice(className, field);
		if (advice && field.retrieve(this.getPropName(className))){
			field.store(this.getPropName(className), false);
			//if Fx.Reveal.js is present, transition the advice out
			if (advice.dissolve) advice.dissolve();
			else advice.setStyle('display', 'none');
		}
	},

	getPropName: function(className){
		return 'advice' + className;
	},

	resetField: function(field){
		field = $(field);
		if (!field) return this;
		this.parent(field);
		field.className.split(" ").each(function(className){
			this.hideAdvice(className, field);
		}, this);
	},

	getAllAdviceMessages: function(field, force){
		var advice = [];
		if (field.hasClass('ignoreValidation') && !force) return advice;
		var validators = field.className.split(" ").some(function(cn){
			var warner = cn.test('^warn-') || field.hasClass('warnOnly');
			if (warner) cn = cn.replace(/^warn-/,"");
			var validator = this.getValidator(cn);
			if (!validator) return;
			advice.push({
				message: validator.getError(field),
				warnOnly: warner,
				passed: validator.test(),
				validator: validator
			});
		}, this);
		return advice;
	},

	getAdvice: function(className, field){
		return field.retrieve('advice-'+className);
	},

	insertAdvice: function(advice, field){
		//Check for error position prop
		var props = field.get('validatorProps');
		//Build advice
		if (!props.msgPos || !$(props.msgPos)){
			switch (field.type.toLowerCase()){
				case 'radio':
					var p = field.getParent().adopt(advice);
					break;
				default:
					advice.inject($(field), 'after');
			};
		} else {
			$(props.msgPos).grab(advice);
		}
	},

	validate: function(field, force){
		var result = this.parent(field, force);
		if (this.options.scrollToErrorsOnSubmit && !result){
			var failed = $(this).getElement('.validation-failed');
			var par = $(this).getParent();
			var isScrolled = function(p){
				return p.getScrollSize().y != p.getSize().y;
			};
			var scrolls;
			while (par != document.body && !isScrolled(par)){
				par = par.getParent();
			};
			var fx = par.retrieve('fvScroller');
			if (!fx && window.Fx && Fx.Scroll){
				fx = new Fx.Scroll(par, {
					transition: 'quad:out',
					offset: {
						y: -20
					}
				});
				par.store('fvScroller', fx);
			}
			if (failed){
				if (fx) fx.toElement(failed);
				else par.scrollTo(par.getScroll().x, failed.getPosition(par).y - 20);
			}
		}
	}

});
