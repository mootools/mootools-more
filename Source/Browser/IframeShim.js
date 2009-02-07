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
		zindex: null,
		margin: 0,
		offsets: {x: 0, y: 0},
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
		if (!this.options.browsers) return;
		
		var zIndex = this.element.getStyle('zIndex').toInt();
		if (!zIndex){
			zIndex = 5;
			this.element.setStyle('zIndex', 5);
		}
		
		var z = zIndex-1;
		if ($chk(this.options.zindex) && zIndex > this.options.zindex)
			 z = this.options.zindex;
		
		this.shim = new Element('iframe').set({
			src: (window.location.protocol == 'https') ? '://0' : 'javascript:void(0)',
			scrolling: 'no',
			frameborder: 0,
			styles: {
				zIndex: z,
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
	},

	position: function(){
		if (!this.options.browsers || !IframeShim.ready) return this;
		
		var size = this.element.measure(function(){ return this.getSize(); });
		if ($type(this.options.margin)){
			size.x = size.x-(this.options.margin*2);
			size.y = size.y-(this.options.margin*2);
			this.options.offsets.x += this.options.margin; 
			this.options.offsets.y += this.options.margin;
		}
		this.shim.set({
			width: size.x,
			height: size.y
		}).position({
			relativeTo: this.element,
			offsets: this.options.offset
		});
		return this;
	},

	hide: function(){
		if (this.options.browsers) this.shim.hide();
		
		return this;
	},

	show: function(){
		if (this.options.browsers){
			this.shim.show();
			this.position();
		}
		
		return this;
	},

	dispose: function(){
		if (this.options.browsers) this.shim.dispose();
		
		return this;
	}

});

window.addEvent('load', function(){
	IframeShim.ready = true;
});