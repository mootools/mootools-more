{
	tests: [
		{
			title: "Assets.image",
			description: "Loads an image file into the document.",
			verify: "Did the image appear?",
			before: function(){
				Asset.image('assets/moobugger/images/mootools.png', {
					events: {
						load: function(){
							this.inject(document.body);
						}
					}
				});
			}
		}
	]
}