{
	tests: [
		{
			title: "Depender script loading.",
			description: "Loads a group of scripts based on their dependency maps.",
			verify: "Did the message that all dependencies were loaded appear?",
			before: function(){
				window.dep = new Depender('UserTests/Core/Depender.libs.json', {
					loaded: ['Core', 'Browser', 'Array', 'String', 'Function', 'Number', 'Hash', 'Element', 'Event', 'Element.Event', 'Class', 'Class.Extras', 'Request', 'JSON', 'Request.JSON', 'Depender']
				});
				dep.require("Fx.Reveal").addEvent('ready', function(scripts){
					$('foo').reveal();
				});
			}
		}
	]
}