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
		className:'iframeShim',
		display:false,
		zindex: null,
		margin: 0,
		offset: {
			x: 0,
			y: 0
		},
		browsers: (Browser.Engine.trident4 || (Browser.Engine.gecko && !Browser.Engine.gecko19 && Browser.Platform.mac))
	},

	property: 'IframeShim',

	initialize: function (element, options){
		this.element = $(element);
		if (this.occlude()) return this.occludes;
		this.setOptions(options);
		this.makeShim();
	},

	makeShim: function(){
		this.shim = new Element('iframe').store('IframeShim', this);
		if (!this.options.browsers) return;
		if (this.element.getStyle('z-Index').toInt()<1 || isNaN(this.element.getStyle('z-Index').toInt())){
			this.element.setStyle('z-Index',5);
		}
		var z = this.element.getStyle('z-Index')-1;
		if ($chk(this.options.zindex) && this.element.getStyle('z-Index').toInt() > this.options.zindex){
			 z = this.options.zindex;
		}
		this.shim.set({
			src: (window.location.protocol == 'https') ? '://0' : 'javascript:void(0)',
			frameborder:'0',
			scrolling:'no',
			styles: {
				position: 'absolute',
				zIndex: z,
				border: 'none',
				filter: 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
			},
			'class':this.options.className
		});
		var inject = function(){
			this.shim.inject(this.element, 'after');
			if (this.options.display) this.show();
			else this.hide();
			this.fireEvent('onInject');
		};
		if (Browser.Engine.trident && !IframeShim.ready) window.addEvent('load', inject.bind(this));
		else inject.run(null, this);
	},

	position: function(shim){
		if (!this.options.browsers || !IframeShim.ready) return this;
		var size = this.element.measure(function(){ return this.getSize(); });
		if ($type(this.options.margin)){
			size.x = size.x-(this.options.margin*2);
			size.y = size.y-(this.options.margin*2);
			this.options.offset.x += this.options.margin; 
			this.options.offset.y += this.options.margin;
		}
		this.shim.set({
			'width': size.x,
			'height': size.y
		}).position({
			relativeTo: this.element,
			offset: this.options.offset
		});
		return this;
	},

	hide: function(){
		if (this.options.browsers) this.shim.hide();
		return this;
	},

	show: function(){
		if (!this.options.browsers) return this;
		this.shim.show();
		return this.position();
	},

	dispose: function(){
		if (this.options.browsers) this.shim.dispose();
		return this;
	}

});

window.addEvent('load', function(){
	IframeShim.ready = true;
});