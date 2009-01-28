/*
Script: Element.Pin.js
	Extends the Element native object to include the pin method useful for fixed positioning for elements.

	License:
		MIT-style license.

*/

window.addEvent('domready', function(){

	var test = new Element('div').setStyles({
		position: 'fixed',
		top: 0,
		right: 0
	}).inject(document.body);
	var supported = (test.offsetTop === 0);
	test.dispose();
	Browser.supportsPositionFixed = supported;

});

Element.implement({

	pin: function(enable){
		if (!Browser.loaded && window.dbug) dbug.log('cannot pin ' + this + ' natively because the dom is not ready');
		if (this.getStyle('display') == 'none') {
			if (window.dbug) dbug.log('cannot pin ' + this + ' because it is hidden');
			return;
		}
		if (enable!==false) {
			var p = this.getPosition();
			if (!this.retrieve('pinned')) {
				var pos = {
					top: (p.y - window.getScroll().y),
					left: (p.x - window.getScroll().x)
				};
				if (Browser.supportsPositionFixed) {
					this.setStyle('position','fixed').setStyles(pos);
				} else {
					this.store('pinnedByJS', true);
					this.setStyles({
						position: 'absolute',
						top: p.y,
						left: p.x
					});
					this.store('scrollFixer', function(){
						if (this.retrieve('pinned')) {
							var to = {
								top: (pos.top.toInt() + window.getScroll().y),
								left: (pos.left.toInt() + window.getScroll().x)
							};
							this.setStyles(to);
						}
					}.bind(this));
					window.addEvent('scroll', this.retrieve('scrollFixer'));
				}
				this.store('pinned', true);
			}
		} else {
			var op;
			if (!Browser.Engine.trident) {
				if (this.getParent().getComputedStyle('position') != 'static') op = this.getParent();
				else op = this.getParent().getOffsetParent();
			}
			var p = this.getPosition(op);
			this.store('pinned', false);
			var reposition;
			if (Browser.supportsPositionFixed && !this.retrieve('pinnedByJS')) {
				reposition = {
					top: (p.y + window.getScroll().y),
					left: (p.x + window.getScroll().x)
				};
			} else {
				this.store('pinnedByJS', false);
				window.removeEvent('scroll', this.retrieve('scrollFixer'));
				reposition = {
					top: (p.y),
					left: (p.x)
				};
			}
			this.setStyles($merge(reposition, {position: 'absolute'}));
		}
		return this.addClass('isPinned');
	},

	unpin: function(){
		return this.pin(false).removeClass('isPinned');
	},

	togglepin: function(){
		this.pin(!this.retrieve('pinned'));
	}

});