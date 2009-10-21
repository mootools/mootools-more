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
		},
		{
			title: "Form.Validator: tests a single input",
			description: "Validates that a form's input is correct.",
			verify: "1) focus the input, tab out - do you see the error? 2) add a value, ",
			before: function(){
				new Form.Validator.Inline('foo2', {
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
	otherScripts: ['Element.Dimensions', 'Fx.Reveal']
}