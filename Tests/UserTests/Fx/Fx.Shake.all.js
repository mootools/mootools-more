{
	tests: [
		{
			title: "Fx.Shake",
			description: "Tests the reveal method, showing the object smoothly.",
			verify: "Did the element appear smoothly?",
			before: function(){
				new Fx.Shake($("box")).start('left', 20, 5);
			}
		}
	]
}
