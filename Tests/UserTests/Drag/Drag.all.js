{
	tests: [
		{
			title: "Drag Resizing",
			description: "Tests the ability to resize an element with a handle.",
			verify: "Can you resize the text area with the little bar below it?",
			before: function(){
				$('comment').makeResizable({
					handle: $('textresizer'),
					modifiers: {x: false, y: 'height'}
				});
			}
		}
	]
}