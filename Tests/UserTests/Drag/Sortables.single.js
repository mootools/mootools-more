{
	tests: [
		{
			title: "Sortables:single list",
			description: "Allows you to drag and drop items to sort them.",
			verify: "Can you reorder the list by dragging? Does the new order display below the list?",
			before: function(){
				var mySort = new Sortables($('SortableExample'), {
					clone: true,
					opacity: 0.6,
					onComplete: function(){
						$('order').set('html', 'order: ' + mySort.serialize())
					}
				});
			}
		}
	],
	otherScripts: ['Element.Position']
}