/*
Script: OverText.js
	Shows text over an input that disappears when the user clicks into it. The text remains hidden if the user adds a value.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

var OverText = new Class({

	Implements: [Options, Events],

	options: {
//	textOverride: null,
//	onTextHide: $empty,
//	onTextShow: $empty,
		positionOptions: {
			position: "upperLeft",
			edge: "upperLeft",
			offset: {
				x: 4,
				y: 2
			}
		},
		poll: false,
		pollInterval: 250
	},

	overTxtEls: [],

	initialize: function(inputs, options){
		this.setOptions(options);
		$splat($(inputs) || $$(inputs)).each(this.addElement, this);
		OverText.instances.push(this);
		if (this.options.poll) this.poll();
	},

	addElement: function(el){
		if (el.retrieve('OverText')) return;
		var val = this.options.textOverride || el.get('alt') || el.get('title');
		if (!val) return;
		this.overTxtEls.push(el);
		var txt = new Element('div', {
			'class': 'overTxtDiv',
			styles: {
				lineHeight: 'normal',
				position: 'absolute'
			},
			html: val,
			events: {
				click: this.hideTxt.pass([el, true], this)
			}
		}).inject(el, 'after');
		el.addEvents({
			focus: this.hideTxt.pass([el, true], this),
			blur: this.testOverTxt.pass(el, this),
			change: this.testOverTxt.pass(el, this)
		}).store('OverTextDiv', txt).store('OverText', this);
		window.addEvent('resize', this.repositionAll.bind(this));
		this.testOverTxt(el);
		this.repositionOverTxt(el);
	},

	startPolling: function(){
		this.pollingPaused = false;
		return this.poll();
	},

	poll: function(stop){
		//start immediately
		//pause on focus
		//resumeon blur
		if (this.poller && !stop) return this;
		var test = function(){
			if (this.pollingPaused == true) return;
			this.overTxtEls.each(function(el){
				if (el.retrieve('ot_paused')) return;
				this.testOverTxt(el);
			}, this);
		}.bind(this);
		if (stop) $clear(this.poller);
		else this.poller = test.periodical(this.options.pollInterval, this);
		return this;
	},

	stopPolling: function(){
		this.pollingPaused = true;
		return this.poll(true);
	},

	hideTxt: function(el, focus){
		var txt = el.retrieve('OverTextDiv');
		if (txt && txt.isVisible() && !el.get('disabled')){
			txt.hide(); 
			try {
				if (focus) el.fireEvent('focus').focus();
			} catch(e){} //IE barfs if you call focus on hidden elements
			this.fireEvent('textHide', [txt, el]);
			el.store('ot_paused', true);
		}
		return this;
	},

	showTxt: function(el){
		var txt = el.retrieve('OverTextDiv');
		if (txt && !txt.isVisible()){
			txt.show();
			this.fireEvent('textShow', [txt, el]);
			el.store('ot_paused', false);
		}
		return this;
	},

	testOverTxt: function(el){
		if (el.get('value')) this.hideTxt(el);
		else this.showTxt(el);	
	},

	repositionAll: function(){
		this.overTxtEls.each(this.repositionOverTxt.bind(this));
		return this;
	},

	repositionOverTxt: function (el){
		if (!el) return;
		try {
			var txt = el.retrieve('OverTextDiv');
			if (!txt || !el.getParent()) return;
			this.testOverTxt(el);
			txt.position($merge(this.options.positionOptions, {relativeTo: el}));
			if (el.offsetHeight) this.testOverTxt(el);
			else this.hideTxt(el);
		} catch(e){	}
		return this;
	}

});

OverText.instances = [];

OverText.update = function(){

	return OverText.instances.map(function(ot){
		return ot.repositionAll();
	});

};