{
	tests: [
		{
			title: "Form.Request Test",
			description: "Updates a div when the form is submitted",
			verify: "Did new text load into the grey box when you click the submit button?",
			before: function(){
				new Form.Request($('test'), $('update'));
			}
		}
	]
}
