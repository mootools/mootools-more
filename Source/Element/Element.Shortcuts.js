/*
Script: Element.Shortcuts.js
	Extends the Element native object to include some shortcut methods.

	License:
		MIT-style license.

*/

Element.implement({

	isVisible: function() {
		return this.getStyle('display') != 'none';
	},

	toggle: function() {
		return this[this.isVisible() ? 'hide' : 'show']();
	},

	hide: function() {
		var d;
		try {
			//IE fails here if the element is not in the dom
			if ('none' != this.getStyle('display')) d = this.getStyle('display');
		} catch(e){}
		this.store('originalDisplay', d||'block'); 
		this.setStyle('display','none');
		return this;
	},

	show: function(display) {
		original = this.retrieve('originalDisplay')?this.retrieve('originalDisplay'):this.get('originalDisplay');
		this.setStyle('display',(display || original || 'block'));
		return this;
	},

	swapClass: function(remove, add) {
		return this.removeClass(remove).addClass(add);
	},

});
