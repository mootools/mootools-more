{
	tests: [
		{
			title: "Assets.images",
			description: "Loads a list of image files into the document.",
			verify: "Did three images appear?",
			before: function(){
				var imgs = Asset.images([
					'UserTests/Utilities/mootools.png',
					'UserTests/Utilities/mootools.png',
					'UserTests/Utilities/mootools.png'
					], {
					onComplete: function(){
						imgs.inject(document.body);
					}
				});
			}
		}
	]
}