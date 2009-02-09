{
	tests: [
		{
			title: "OverText",
			description: "Displays help text over an input",
			before: function(){
				new OverText($$('#ot'));
			},
			verify: "Does the text appear over the input? Does it disappear when you focus or change the input? Does it reappear if you remove the text you add to the input (tab out after you remove your text)?"
		},
		{
			title: "OverText: Polling",
			description: "Polls inputs for changes",
			before: function(){
				new OverText($$('#pw, #un'), {
					poll: true
				});
				$('un').addEvent('change', function(){
					$('pw').set('value', 'asdfasdf');
				});
				
			},
			verify: "When you enter avalue for the first input (username), the second input will be auto-filled. Does it's OverText disappear?"
		}
	],
	otherScripts: ["Selectors"]
}