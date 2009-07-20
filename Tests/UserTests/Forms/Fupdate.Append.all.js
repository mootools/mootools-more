
{
	tests: [
		{
			title: "Fupdate.Apend Test",
			description: "Updates a div when the form is submitted, appending the result instead of relacing.",
			verify: "Did new text load into the grey box every time you click the submit button?",
			before: function(){
				new Fupdate.Append($('test'), $('update'));
			}
		}
	]
}
