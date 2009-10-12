{
	tests: [
		{
			title: "Depender script loading.",
			description: "Loads a group of scripts based on their dependency maps.",
			verify: "Did the message that all dependencies were loaded appear?",
			before: function(){
				Depender.enableLog();
				Depender.include('UserTests/Core/Depender.libs.json');
				Depender.require({
					scripts: "Fx.Reveal",
					callback: function(scripts){
						$('foo').reveal();
					}
				});
			}
		}
	]
}