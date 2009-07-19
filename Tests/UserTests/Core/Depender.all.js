{
	tests: [
		{
			title: "Depender script loading.",
			description: "Loads a group of scripts based on their dependency maps.",
			verify: "Did the message that all dependencies were loaded appear?",
			before: function(){
				window.dep = new Depender('UserTests/Core/Depender.libs.json');
				dep.require("Fx.Reveal").addEvent('ready', function(scripts){
					$('foo').reveal();
				});
			}
		}
	]
}