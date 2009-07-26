/*
Script: Fupdate.js
	Handles the basic functionality of submitting a form and updating a dom element with the result.

License:
	MIT-style license

Authors:
	Aaron Newton

*/

var Fupdate;

(function(){

	Fupdate = new Class({

		Implements: [Options, Events, Class.Occlude, Class.Binds],

		options: {
			//onFailure: $empty,
			//onSuccess: #empty, //aliased to onComplete,
			//onSend: $empty
			requestOptions: {
				evalScripts: true,
				useWaiter: true,
				emulation: false,
				link: 'ignore'
			},
			extraData: {},
			resetForm: true
		},

		property: 'fupdate',

		initialize: function(form, update, options) {
			this.element = document.id(form);
			if (this.occlude()) return this.occluded;
			this.update = document.id(update);
			this.setOptions(options);
			this.makeRequest();
			if (this.options.resetForm) {
				this.request.addEvent('success', function(){
					$try(function(){ this.element.reset(); }.bind(this));
					if (window.OverText) OverText.update();
				}.bind(this));
			}
			this.attach();
		},

		toElement: function() {
			return this.element;
		},

		makeRequest: function(){
			this.request = new Request.HTML($merge({
					url: this.element.get('action'),
					update: this.update,
					emulation: false,
					waiterTarget: this.element,
					method: this.element.get('method') || 'post'
			}, this.options.requestOptions)).addEvents({
				success: function(text, xml){
					['success', 'complete'].each(function(evt){
						this.fireEvent(evt, [this.update, text, xml]);
					}, this);
				}.bind(this),
				failure: function(xhr){
					this.fireEvent('failure', xhr);
				}.bind(this),
				exception: function(){
					this.fireEvent('failure', xhr);
				}.bind(this)
			});
		},

		attach: function(attach){
			attach = $pick(attach, true);
			method = attach ? 'addEvent' : 'removeEvent';
			
			var fv = this.element.retrieve('validator');
			if (fv) fv[method]('onFormValidate', this.found('onFormValidate'));
			if (!fv || !attach) this.element[method]('submit', this.bound('onSubmit'));
		},

		detach: function(){
			this.attach(false);
		},

		//public method
		enable: function(){
			this.attach();
		},

		//public method
		disable: function(){
			this.detach();
		},

		onFormValidate: function(valid, form, e) {
			if (valid || !fv.options.stopOnFailure) {
				if (e && e.stop) e.stop();
				this.send();
			}
		},

		onSubmit: function(e){
			if (this.element.retrieve('validator')) {
				//form validator was created after fupdate
				this.detach();
				this.addFormEvent();
				return;
			}
			e.stop();
			this.send();
		},

		send: function(){
			var str = this.element.toQueryString().trim();
			formData = str.parseQueryString();
			var data = $H(this.options.extraData).combine(formData);
			this.fireEvent('send', [this.element, data]);
			this.request.send({data: data});
			return this;
		}

	});

	Element.Properties.fupdate = {

		set: function(){
			var opt = Array.link(arguments, {options: Object.type, update: Element.type, updateId: String.type});
			var update = opt.update || opt.updateId;
			var fupdate = this.retrieve('fupdate');
			if (update) {
				if (fupdate) fupdate.update = document.id(update);
				this.store('fupdate:update', update);
			}
			if (opt.options) {
				if (fupdate) fupdate.setOptions(opt.options);
				this.store('fupdate:options', opt.options)
			}
			return this;
		},

		get: function(){
			var opt = Array.link(arguments, {options: Object.type, update: Element.type, updateId: String.type});
			var update = opt.update || opt.updateId;
			if (opt.options || update || !this.retrieve('fupdate')){
				if (opt.options || !this.retrieve('fupdate:options')) this.set('fupdate', opt.options);
				if (update) this.set('fupdate', update);
				this.store('fupdate', new Fupdate(this, this.retrieve('fupdate:update'), this.retrieve('fupdate:options')));
			}
			return this.retrieve('fupdate');
		}

	};

	Element.implement({

		fupdate: function(update, options){
			this.get('fupdate', update, options).send();
			return this;
		}

	});

})();