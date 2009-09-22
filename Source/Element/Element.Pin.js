/*
Script: Element.Pin.js
	Extends the Element native object to include the pin method useful for fixed positioning for elements.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

(function(){
	var supportsPositionFixed = false;
	window.addEvent('domready', function(){
		var test = new Element('div').setStyles({
			position: 'fixed',
			top: 0,
			right: 0
		}).inject(document.body);
		supportsPositionFixed = (test.offsetTop === 0);
		test.dispose();
	});

	Element.implement({

		pin: function(enable){
			if (this.getStyle('display') == 'none') return null;
			
			var p,
					scroll = window.getScroll();
			if (enable !== false){
				p = this.getPosition();
				if (!this.retrieve('pinned')){
					var pos = {
						top: p.y - scroll.y,
						left: p.x - scroll.x
					};
					if (supportsPositionFixed){
						this.setStyle('position', 'fixed').setStyles(pos);
					} else {
						this.store('pinnedByJS', true);
						this.setStyles({
							position: 'absolute',
							top: p.y,
							left: p.x
						});
						this.store('scrollFixer', (function(){
							if (this.retrieve('pinned'))
								this.setStyles({
									top: pos.top.toInt() + scroll.y,
									left: pos.left.toInt() + scroll.x
								});
						}).bind(this));
						window.addEvent('scroll', this.retrieve('scrollFixer'));
					}
					this.store('pinned', true);
				}
			} else {
				var op;
				if (!Browser.Engine.trident){
					var parent = this.getParent();
					op = (parent.getComputedStyle('position') != 'static' ? parent : parent.getOffsetParent());
				}
				p = this.getPosition(op);
				this.store('pinned', false);
				var reposition;
				if (supportsPositionFixed && !this.retrieve('pinnedByJS')){
					reposition = {
						top: p.y + scroll.y,
						left: p.x + scroll.x
					};
				} else {
					this.store('pinnedByJS', false);
					window.removeEvent('scroll', this.retrieve('scrollFixer'));
					reposition = {
						top: p.y,
						left: p.x
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

})();