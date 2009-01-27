{
	tests: [
		{
			title: "Center",
			description: "Centers the red box over the text box.",
			verify: "Is the red box centered over the text box?",
			body: "$('box').setPosition({relativeTo: $('foo')});"
		},
		{
			title: "UpperLeft to UpperLeft",
			description: "Puts the UL corner of the red box to the UL corner of the text box.",
			verify: "Is the upper left corner of the red box over the upper left corner of the text box?",
			body: "$('box').setPosition({relativeTo: $('foo'), position: 'upperLeft'});"
		},
		{
			title: "BottomRight to BottomRight",
			description: "Puts the BR corner of the red box to the BR corner of the text box.",
			verify: "Is the lower right corner of the red box over the lower right corner of the text box?",
			body: "$('box').setPosition({relativeTo: $('foo'), position: 'bottomRight', edge: 'bottomRight'});"
		},
		{
			title: "Center to BottomRight",
			description: "Puts the center of the red box to the BR corner of the text box.",
			verify: "Is the center of the red box over the lower right corner of the text box?",
			body: "$('box').setPosition({relativeTo: $('foo'), position: 'bottomRight', edge: 'center'});"
		},
		{
			title: "Right edge to Right edge",
			description: "Puts the right edge (center) of the red box to the right edge (center) of the text box.",
			verify: "Is the right edge (center) of the red box touching the right edge (center) of the text box?",
			body: "$('box').setPosition({relativeTo: $('foo'), position: 'centerRight', edge: 'centerRight'});"
		}
	]
}