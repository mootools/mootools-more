{
	tests: [
		{
			title: "Assets.images",
			description: "Loads a list of image files into the document.",
			verify: "Did three images appear?",
			before: function(){
				var imgs = Asset.images([
					'assets/moobugger/images/mootools.png',
					'assets/moobugger/images/mootools.png',
					'assets/moobugger/images/mootools.png'
					], {
					onComplete: function(){
						imgs.inject(document.body);
					}
				});
			}
		}
	]
}