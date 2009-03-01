{
	tests: [
		{
			title: "FormValidator",
			description: "Validates that a form's inputs are correct.",
			verify: "Fill out the form as described and submit it. Were errors reported correctly?",
			before: function(){
				new FormValidator.Inline('foo', {
					serial: false,
					onFormValidate: function(passed, form, event){
						//if (passed) alert('form validated');
						//else alert('form did NOT validate');
					}
				});
			}
		}
	],
	otherScripts: ['Element.Dimensions']
}