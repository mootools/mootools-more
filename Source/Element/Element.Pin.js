/*
---

script: Element.Pin.js

name: Element.Pin

description: Extends the Element native object to include the pin method useful for fixed positioning for elements.

license: MIT-style license

authors:
  - Aaron Newton

requires:
  - Core/Element.Event
  - Core/Element.Dimensions
  - Core/Element.Style
  - /MooTools.More

provides: [Element.Pin]

...
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

			var pinnedPosition,
				scroll = window.getScroll();

			if (enable !== false){
				pinnedPosition = this.getPosition(document.body);
				if (!this.retrieve('pin:_pinned')){
					var currentPosition = {
						top: pinnedPosition.y - scroll.y,
						left: pinnedPosition.x - scroll.x
					};

					if (supportsPositionFixed){
						this.setStyle('position', 'fixed').setStyles(currentPosition);
					} else {

						this.store('pin:_pinnedByJS', true);
						this.setStyles({
							position: 'absolute',
							top: pinnedPosition.y,
							left: pinnedPosition.x
						}).addClass('isPinned');

						var scrollFixer = function(){
							if (this.retrieve('pin:_pinned'))
								var scroll = window.getScroll();
								this.setStyles({
									top: currentPosition.top.toInt() + scroll.y,
									left: currentPosition.left.toInt() + scroll.x
								});
						}.bind(this);

						this.store('pin:_scrollFixer', scrollFixer);
						window.addEvent('scroll', scrollFixer);
					}
					this.store('pin:_pinned', true);
				}

			} else {
				var offsetParent;
				if (!Browser.ie){
					var parent = this.getParent();
					offsetParent = (parent.getComputedStyle('position') != 'static' ? parent : parent.getOffsetParent());
				}
				pinnedPosition = this.getPosition(offsetParent);
				this.store('pin:_pinned', false);
				var reposition;
				if (supportsPositionFixed && !this.retrieve('pin:_pinnedByJS')){
					reposition = {
						top: pinnedPosition.y + scroll.y,
						left: pinnedPosition.x + scroll.x
					};
				} else {
					this.store('pin:_pinnedByJS', false);
					window.removeEvent('scroll', this.retrieve('pin:_scrollFixer'));
					reposition = {
						top: pinnedPosition.y,
						left: pinnedPosition.x
					};
				}
				this.setStyles(Object.merge(reposition, {position: 'absolute'})).removeClass('isPinned');
			}
			return this;
		},

		unpin: function(){
			return this.pin(false);
		},

		togglepin: function(){
			this.pin(!this.retrieve('pin:_pinned'));
		}

	});

})();
