/*
Script: Waiter.js
	Adds a semi-transparent overlay over a dom element with a spinnin ajax icon.

		License:
			MIT-style license.

		Authors:
			Aaron Newton
	*/

var Waiter = new Class({

	Extends: Mask,

	options: {
		/*message: false,*/
		'class':'waiter',
		containerPosition: {},
		content: {
			'class':'waiter-content'
		},
		messageContainer: {
			'class':'waiter-msg'
		},
		img: {
			'class':'waiter-img'
		},
		fxOptions: {
			link: 'chain'
		}
	},

	initialize: function(){
		this.parent.apply(this, arguments);
		this.target.store('waiter', this);

		//add this to events for when noFx is true; parent methods handle hide/show
		var deactivate = function(){ this.active = false; }.bind(this);
		this.addEvents({
			hide: deactivate,
			show: deactivate
		});
	},

	render: function(){
		this.parent();
		this.element.set('id', this.options.id || 'waiter-'+$time());
		this.content = document.id(this.options.content) || new Element('div', this.options.content);
		this.content.inject(this.element);
		if (this.options.message) {
			this.msg = document.id(this.options.message) || new Element('p', this.options.messageContainer).appendText(this.options.message);
			this.msg.inject(this.content);
		}
		if (this.options.img) {
			this.img = document.id(this.options.img) || new Element('div', this.options.img);
			this.img.inject(this.content);
		}
		this.element.set('tween', this.options.fxOptions);
	},

	show: function(noFx){
		if (this.active) return this.chain(this.show.bind(this));
		if (!this.hidden) {
			this.callChain.delay(20, this);
			return this;
		}
		this.active = true;
		return this.parent(noFx);
	},

	showMask: function(noFx){
		var pos = function(){
			this.content.position($merge({
				relativeTo: this.element
			}, this.options.containerPosition));
		}.bind(this);
		if (noFx) {
			this.parent();
			pos();
		} else {
			this.element.setStyles({
				display: 'block',
				opacity: 0
			}).tween('opacity', this.options.style.opacity || 0.9);
			pos();
			this.hidden = false;
			this.fireEvent('show');
			this.callChain();
		}
	},

	hide: function(noFx){
		if (this.active) return this.chain(this.hide.bind(this));
		if (this.hidden) {
			this.callChain.delay(20, this);
			return this;
		}
		this.active = true;
		return this.parent();
	},

	hideMask: function(noFx){
		if (noFx) return this.parent();
		this.element.tween('opacity', 0).get('tween').chain(function(){
			this.element.setStyle('display', 'none');
			this.hidden = true;
			this.fireEvent('hide');
			this.callChain();
		}.bind(this));
	}

});

Waiter.implement(new Chain);

if (window.Request) {
	Request = Class.refactor(Request, {
		options: {
			useWaiter: false,
			waiterOptions: {},
			waiterTarget: false
		},
		initialize: function(options){
			this._send = this.send;
			this.send = function(options){
				if (this.waiter) this.waiter.chain(this._send.bind(this, options)).show();
				else this._send(options);
				return this;
			};
			this.previous(options);
			var update = document.id(this.options.update) || document.id(this.options.waiterTarget);
			if (this.options.useWaiter && update) {
				this.waiter = update.get('waiter', this.options.waiterOptions);
				['onComplete', 'onException', 'onCancel'].each(function(event){
					this.addEvent(event, this.waiter.hide.bind(this.waiter));
				}, this);
			}
		}
	});
}

Element.Properties.waiter = {

	set: function(options){
		var waiter = this.retrieve('waiter');
		return this.eliminate('waiter').store('waiter:options', options);
	},

	get: function(options){
		if (options || !this.retrieve('waiter')){
			if (this.retrieve('waiter')) this.retrieve('waiter').destroy();
			if (options || !this.retrieve('waiter:options')) this.set('waiter', options);
			new Waiter(this, this.retrieve('waiter:options'));
		}
		return this.retrieve('waiter');
	}

};

Element.implement({

	wait: function(options){
		this.get('waiter', options).show();
		return this;
	},

	release: function(){
		var opt = Array.link(arguments, {options: Object.type, callback: Function.type});
		this.get('waiter', opt.options).hide(opt.callback);
		return this;
	}

});