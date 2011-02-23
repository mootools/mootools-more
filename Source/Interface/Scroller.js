/*
---

script: Scroller.js

name: Scroller

description: Class which scrolls the contents of any Element (including the window) when the mouse reaches the Element's boundaries.

license: MIT-style license

authors:
  - Valerio Proietti

requires:
  - Core/Events
  - Core/Options
  - Core/Element.Event
  - Core/Element.Dimensions
  - MooTools.More

provides: [Scroller]

...
*/

var Scroller = new Class({

	Implements: [Events, Options],

	options: {
		area: 20,
		velocity: 1,
		onChange: function(x, y){
			this.element.scrollTo(x, y);
		},
		fps: 50
	},

	initialize: function(element, options){
		this.setOptions(options);
		this.element = document.id(element);
		this.docBody = document.id(this.element.getDocument().body);
		this.listener = (typeOf(this.element) != 'element') ? this.docBody : this.element;
		this.timer = null;
		this.bound = {
			attach: this.attach.bind(this),
			detach: this.detach.bind(this),
			getCoords: this.getCoords.bind(this)
		};
	},

	start: function(){
		this.listener.addEvents({
			mouseover: this.bound.attach,
			mouseleave: this.bound.detach
		});
		return this;
	},

	stop: function(){
		this.listener.removeEvents({
			mouseover: this.bound.attach,
			mouseleave: this.bound.detach
		});
		this.detach();
		this.timer = clearInterval(this.timer);
		return this;
	},

	attach: function(){
		this.listener.addEvent('mousemove', this.bound.getCoords);
	},

	detach: function(){
		this.listener.removeEvent('mousemove', this.bound.getCoords);
		this.timer = clearInterval(this.timer);
	},

	getCoords: function(event){
		this.page = (this.listener.get('tag') == 'body') ? event.client : event.page;
		if (!this.timer) this.timer = this.scroll.periodical(Math.round(1000 / this.options.fps), this);
	},

	scroll: function(){
		var size = this.element.getSize(),
			scroll = this.element.getScroll(),
			pos = this.element != this.docBody ? this.element.getOffsets() : {x: 0, y:0},
			scrollSize = this.element.getScrollSize(),
			change = {x: 0, y: 0},
			top = this.options.area.top || this.options.area,
			bottom = this.options.area.bottom || this.options.area;
		for (var z in this.page){
			if (this.page[z] < (top + pos[z]) && scroll[z] != 0){
				change[z] = (this.page[z] - top - pos[z]) * this.options.velocity;
			} else if (this.page[z] + bottom > (size[z] + pos[z]) && scroll[z] + size[z] != scrollSize[z]){
				change[z] = (this.page[z] - size[z] + bottom - pos[z]) * this.options.velocity;
			}
			change[z] = change[z].round();
		}
		if (change.y || change.x) this.fireEvent('change', [scroll.x + change.x, scroll.y + change.y]);
	}

});
