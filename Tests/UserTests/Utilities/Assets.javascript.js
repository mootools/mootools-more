{
	tests: [
		{
			title: "Assets.javascript",
			description: "Loads a javascript file into the document.",
			verify: "Did the message load into the frame stating that the JS loaded successfully?",
			before: function(){
				Asset.javascript('UserTests/Utilities/Assets.javascript.test.js');
			}
		}
	]
}