/*
Script: Tips.js
	Class for creating nice tips that follow the mouse cursor when hovering an element.

	License:
		MIT-style license.

	Authors:
		Valerio Proietti
*/

var Tips = new Class({

	Implements: [Events, Options, Class.ToElement],

	options: {
		onShow: function(tip){
			tip.setStyle('visibility', 'visible');
		},
		onHide: function(tip){
			tip.setStyle('visibility', 'hidden');
		},
		showDelay: 100,
		hideDelay: 100,
		className: null,
		offset: {x: 16, y: 16},
		fixed: false
	},

	initialize: function(){
		var params = Array.link(arguments, {options: Object.type, elements: $defined});
		this.setOptions(params.options);
		this.element = new Element('div').inject(document.body);
		if (this.options.className) $(this).addClass(this.options.className);
		this.container = new Element('div', {'class': 'tip'});
		$(this).adopt(
			new Element('div', {'class': 'tip-top'}),
			this.container,
			new Element('div', {'class': 'tip-bottom'})
		);
		$(this).setStyles({position: 'absolute', top: 0, left: 0, visibility: 'hidden'});
		if (params.elements) this.attach(params.elements);
	},
	
	attach: function(elements){
		$$(elements).each(function(element){
			var title = element.get('title');
			element.store('tip:native', title).erase('title').retrieve('tip:title', title);
			element.retrieve('tip:text', element.get('rel') || element.get('href'));
			var events = ['enter', 'leave'];
			if (!this.options.fixed) events.push('move');
			events.each(function(value){
				element.addEvent('mouse' + value, element.retrieve('tip:' + value, this['element' + value.capitalize()].bindWithEvent(this, element)));
			}, this);
		}, this);
		return this;
	},
	
	detach: function(elements){
		$$(elements).each(function(element){
			['enter', 'leave', 'move'].each(function(value){
				element.removeEvent('mouse' + value, element.retrieve('tip:' + value) || $empty);
			});
			element.eliminate('tip:enter').eliminate('tip:leave').eliminate('tip:move');
			var original = element.retrieve('tip:native');
			if (original) element.set('title', original);
		});
		return this;
	},
	
	elementEnter: function(event, element){
		$A(this.container.childNodes).each(Element.dispose);
		['title', 'text'].each(function(value){
			var content = element.retrieve('tip:' + value);
			if (content){
				this[value + 'Element'] = new Element('div', {'class': 'tip-' + value}).inject(this.container);
				this.fill(this[value + 'Element'], content);
			}
		}, this);
		this.timer = $clear(this.timer);
		this.timer = this.show.delay(this.options.showDelay, this, element);
		this.position((!this.options.fixed) ? event : {page: element.getPosition()});
	},
	
	elementLeave: function(event, element){
		$clear(this.timer);
		this.timer = this.hide.delay(this.options.hideDelay, this, element);
	},
	
	elementMove: function(event){
		this.position(event);
	},
	
	position: function(event){
		var size = window.getSize(), scroll = window.getScroll(),
			tip = {x: $(this).offsetWidth, y: $(this).offsetHeight},
			props = {x: 'left', y: 'top'},
			obj = {};
		for (var z in props){
			obj[props[z]] = event.page[z] + this.options.offset[z];
			if ((obj[props[z]] + tip[z] - scroll[z]) > size[z]) obj[props[z]] = event.page[z] - this.options.offset[z] - tip[z];
		}
		$(this).setStyles(obj);
	},
	
	fill: function(element, contents){
		if(typeof contents == 'string') element.set('html', contents);
		else element.adopt(contents);
	},

	show: function(el){
		this.fireEvent('show', [$(this), el]);
	},

	hide: function(el){
		this.fireEvent('hide', [$(this), el]);
	}

});