{
	tests: [
		{
			title: "Form.Validator",
			description: "Validates that a form's inputs are correct.",
			verify: "Fill out the form as described and submit it. Were errors reported correctly?",
			before: function(){
				new Form.Validator.Inline('foo', {
					serial: false,
					onFormValidate: function(passed, form, event){
						event.stop();
						if (passed) alert('form validated');
						else alert('form did NOT validate');
					}
				});
			}
		}
	],
	otherScripts: ['Form.Validator.Inline']
}