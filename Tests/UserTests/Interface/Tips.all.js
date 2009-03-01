{
	tests: [
		{
			title: "Tips",
			description: "Displays a popup with text when you mouse over an element.",
			verify: "Do you see the tip when you mouse over the image?",
			before: function(){
				var myTips = new Tips($$('.toolTipElement'), {
					timeOut: 700,
					maxTitleChars: 50, /*I like my captions a little long*/
					maxOpacity: .9 /*let's leave a little transparancy in there */
				});
			}
		},
		{
			title: "Tips:fixed",
			description: "Displays a popup fixed in place with text when you mouse over an element.",
			verify: "Does the tip remain stationary while you move your mouse around over the image?",
			before: function(){
				var myTips = new Tips($$('.toolTipElement2'), {
					timeOut: 700,
					maxTitleChars: 50, /*I like my captions a little long*/
					maxOpacity: .9, /*let's leave a little transparancy in there */
					fixed: true,
					offset: {
						x: 10,
						y: 70
					}
				});
			}
		}
		
	],
	otherScripts:['Selectors']
}