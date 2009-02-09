/*
Script: IframeShim.js
	Defines IframeShim, a class for obscuring select lists and flash objects in IE.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

var IframeShim = new Class({

	Implements: [Options, Events, Class.Occlude],

	options: {
		className: 'iframeShim',
		display: false,
		zIndex: null,
		margin: 0,
		offset: {'x': 0, 'y': 0},
		browsers: (Browser.Engine.trident4 || (Browser.Engine.gecko && !Browser.Engine.gecko19 && Browser.Platform.mac))
	},

	property: 'iframeShim',

	initialize: function (element, options){
		this.element = $(element);
		if (this.occlude()) return this.occludes;
		this.setOptions(options);
		if(this.options.browsers){
		  var zIndex = this.element.getStyle('zIndex').toInt();
			if (!zIndex){
				zIndex = 5;
				this.element.setStyle('zIndex', 5);
			}
			this.shim = new Iframe({
				src: (window.location.protocol == 'https') ? '://0' : 'javascript:void(0)',
				scrolling: 'no',
				frameborder: 0,
				styles: {
					zIndex: ($chk(this.options.zIndex) && zIndex > this.options.zIndex) ? this.options.zIndex : zIndex - 1,
					position: 'absolute',
					border: 'none',
					filter: 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
				},
				'class': this.options.className
			}).store('IframeShim', this);
			var inject = (function(){
				this.shim.inject(this.element, 'after');
				this[this.options.display ? 'show' : 'hide']();
				this.fireEvent('inject');
			}).bind(this);
			if (Browser.Engine.trident && !IframeShim.ready) window.addEvent('load', inject);
			else inject();
		} else {
			this.position = this.hide = this.show = this.dispose = $lambda(this);
		}
	},

	position: function(){
		if (!IframeShim.ready) return this;
		var size = this.element.measure(function(){ return this.getSize(); });
		if ($type(this.options.margin)){
			size.x = size.x - (this.options.margin * 2);
			size.y = size.y - (this.options.margin * 2);
			this.options.offset.x += this.options.margin;
			this.options.offset.y += this.options.margin;
		}
		this.shim.set({width: size.x, height: size.y}).position({
			relativeTo: this.element,
			offset: this.options.offset
		});
		return this;
	},

	hide: function(){
		this.shim.hide();
		return this;
	},

	show: function(){
		this.shim.show();
		return this.position();
	},

	dispose: function(forever){
		this.shim[forever ? 'destroy' : 'dispose']();
		return this;
	}

});

window.addEvent('load', function(){
	IframeShim.ready = true;
});

Element.Properties.iframeShim = {

	set: function(options){
		var shim = this.retrieve('iframeShim');
		if (shim) shim.dispose(true);
		return this.eliminate('iframeShim').store('iframeShim:options', options);
	},

	get: function(options){
		if (options || !this.retrieve('iframeShim')){
			if (options || !this.retrieve('iframeShim:options')) this.set('iframeShim', options);
			new IframeShim(this, this.retrieve('iframeShim:options'));
		}
		return this.retrieve('iframeShim');
	}

};

['position', 'hide', 'show', 'dispose'].each(function(m){
	
	Element.implement(m + 'IframeShim', function(){
		this.get('iframeShim')[m]();
		return this;
	});
	
});
