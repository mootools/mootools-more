/* update cursor on add/remove click event */
Element.Events.click = { 
	base:'click',
	onAdd: function() {
		this.setStyle('cursor','pointer');
	},
	onRemove: function() {
		this.setStyle('cursor','');
	}
};