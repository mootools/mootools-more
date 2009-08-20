{
	tests: [
		{
			title: "Mask:element",
			description: "Overlays a target element with a semi-transparent layer.",
			verify: "Does the box have a transparent layer over it (precisely, covering only it)?",
			before: function(){
				$('foo').mask();
			}
		},
		{
			title: "Unmask:element",
			description: "Hides the overlay layer.",
			verify: "Did the box's mask disappear?",
			before: function(){
				$('foo').unmask();
			}
		},
		{
			title: "Document:mask",
			description: "Overlays the window with a semi-transparent layer.",
			verify: "Does the window have a transparent layer? When you scroll does it continue to cover the entire window?",
			before: function(){
				$(document.body).mask({
					style: {
						background: '#666',
						opacity: 0.6
					},
					hideOnClick: true
				});
			}
		},
		{
			title: "Document:unmask",
			description: "Hides the document's overlay.",
			verify: "Does the mask disappear when you click it?",
			before: function(){
				$(document.body).mask({
					style: {
						background: '#666',
						opacity: 0.6
					},
					hideOnClick: true
				});
			}
		}
	]
}