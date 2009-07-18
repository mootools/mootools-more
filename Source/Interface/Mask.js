var Mask = new Class({

	Implements: [Options, Events],

	Binds: ['resize'],

	options: {
		// onShow: $empty,
		// onHide: $empty,
		// onDestroy: $empty,
		// onClick: $empty,
		//inject: {
		//  where: 'after',
		//  target: null,
		//},
		// hideOnClick: false,
		// id: null,
		// destroyOnHide: false,
		'class': 'mask',
		style: {
			position: 'absolute',
			opacity: 0.9,
			zIndex: 999,
			background: '#fff'
		},
		useIframeShim: true,
		hideElements: Browser.Engine.trident4,
		elementsToHide: 'select, embed, object'
	},

	initialize: function(target, options){
		this.target = document.id(target) || document.body;
		this.target.store('mask', this);
		this.setOptions(options);
		if (this.target == document.body) {
			if(!Browser.Engine.trident4) this.options.style.position = 'fixed';
			this.options.useIframeShim = false;
		}
		this.render();
		this.inject();
	},
	
	render: function() {
		this.element = new Element('div', {
			'class': this.options['class'],
			id: this.options.id || 'mask-' + $time(),
			styles: $merge(this.options.style, {
				display: 'none'
			}),
			events: {
				click: function(){
					this.fireEvent('click');
					if (this.options.hideOnClick) this.hide();
				}.bind(this)
			}
		});
		this.hidden = true;
	},

	toElement: function(){
		return this.element;
	},

	inject: function(target, where){
		var where = where || this.options.inject ? this.options.inject.where : '' || this.target == document.body ? 'inside' : 'after';
		var target = target || this.options.inject ? this.options.inject.target : '' || this.target;
		this.element.inject(target, where);
		if (this.options.useIframeShim) {
			this.shim = new IframeShim(this.element);
			this.addEvents({
				show: this.shim.show.bind(this.shim),
				hide: this.shim.hide.bind(this.shim),
				destroy: this.shim.destroy.bind(this.shim)
			});
		}
	},

	position: function(){
		this.element.position({
			relativeTo: this.target,
			position: 'upperLeft',
			ignoreScroll: this.target == document.body
		});
		this.resize(this.options.width, this.options.height);
		return this;
	},

	resize: function(x, y){
		var dim = this.target.getComputedSize();
		this.element.setStyles({
			width:($pick(x, dim.totalWidth)),
			height:($pick(y, dim.totalHeight))
		});
	},

	show: function(){
		if (!this.hidden) return this;
		this.target.addEvent('resize', this.resize);
		this.position();
		this.togglePopThroughElements(0);
		this.showMask.apply(this, arguments);
		return this;
	},

	showMask: function(){
		this.element.setStyle('display', 'block');
		this.hidden = false;
		this.fireEvent('show');
	},

	hide: function(){
		if (this.options.destroyOnHide) return this.destroy();
		if (this.hidden) return this;
		this.togglePopThroughElements(1);
		this.target.removeEvent('resize', this.resize);
		this.hideMask.apply(this, arguments);
		return this;
	},

	hideMask: function(){
		this.element.setStyle('display', 'none');
		this.hidden = true;
		this.fireEvent('hide');
	},

	toggle: function(){
		this[this.hidden ? 'show' : 'hide']();
	},

	togglePopThroughElements: function(opacity){
		if (this.options.hideElements) {
			this.target.getElements(this.options.elementsToHide).each(function(sel){
				sel.setStyle('opacity', opacity);
			});
		}
	},

	destroy: function(){
		this.hide();
		this.element.destroy();
		this.fireEvent('destroy');
		this.target.eliminate('mask');
	}

});

Element.Properties.mask = {

	set: function(options){
		var mask = this.retrieve('mask');
		return this.eliminate('mask').store('mask:options', options);
	},

	get: function(options){
		if (options || !this.retrieve('mask')){
			if (this.retrieve('mask')) this.retrieve('mask').destroy();
			if (options || !this.retrieve('mask:options')) this.set('mask', options);
			this.store('mask', new Mask(this, this.retrieve('mask:options')));
		}
		return this.retrieve('mask');
	}

};

Element.implement({

	mask: function(options){
		this.get('mask', options).show();
		return this;
	},

	unmask: function(){
		this.get('mask').hide();
		return this;
	}

});