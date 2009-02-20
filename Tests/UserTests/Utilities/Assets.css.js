{
	tests: [
		{
			title: "Assets.css",
			description: "Loads a stylesheet into the document.",
			verify: "Did the image appear inside a grey box?",
			before: function(){
				Asset.css('UserTests/Utilities/Assets.css.test.css');
			}
		}
	]
}