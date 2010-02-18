{
	tests: [
		{
			title: "Assets.javascript",
			description: "Loads a javascript file into the document.",
			verify: "Did the message load into the frame stating that the JS loaded successfully?",
			before: function(){
				Asset.javascript('UserTests/Utilities/Assets.javascript.test.js');
			}
		},
		{
			title: "Assets.javascript onLoad",
			description: "Loads a javascript file into the document and watch for the load event.",
			verify: "Did the message change to 'JavaScript onLoad fired successfully!' ?",
			before: function(){
				$('msg').set('html', 'testing...');
				Asset.javascript('UserTests/Utilities/Assets.javascript.test.js', {
					onLoad: function(){
						$('msg').set('html', 'JavaScript onLoad fired successfully!');
					}
				});
			}
		}
	]
}
