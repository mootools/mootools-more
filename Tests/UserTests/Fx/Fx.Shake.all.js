{
	tests: [
		{
			title: "Fx.Shake",
			description: "Tests the Fx.Shake class, shaking an item left to right.",
			verify: "Did the element shake left to right?",
			before: function(){
				$("box").shake('left', 20);
				
			}
		}
	]
}
