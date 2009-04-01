{
	tests: [
		{
			title: "Drag Moving in a container",
			description: "Tests the ability to drag an element limited to a container.",
			verify: "Can you drag the red box around but only within the container?",
			before: function(){
				var dragger = $('box').retrieve('dragger');
				if (dragger) dragger.detach();
				$('box').makeDraggable({
					container: $('container')
				});
			}
		},
		{
			title: "Drag Moving in a container (exclude margins)",
			description: "Tests the ability to drag an element limited to a container to the edge of the border.",
			verify: "Can you drag the red box around but only within the container? Does the white border touch the black border?",
			before: function(){
				var dragger = $('box').retrieve('dragger');
				if (dragger) dragger.detach();
				$('box').makeDraggable({
					container: $('container'),
					includeMargins: false
				});
			}
		}
	]
}