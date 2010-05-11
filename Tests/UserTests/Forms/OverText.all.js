{
	tests: [
		{
			title: "OverText",
			description: "Displays help text over an input",
			before: function(){
				new OverText('ot');
			},
			verify: "Does the text appear over the input? Does it disappear when you focus or change the input? Does it reappear if you remove the text you add to the input (tab out after you remove your text)?"
		},
		{
			title: "OverText: Disable",
			description: "Disables the OverText behavior",
			before: function(){
				var ot = new OverText('ot');
				ot.disable();
			},
			verify: "Did the hint text hide? If you empty the input and blur it (remove focus) does the hint text remain hidden?"
		},
		{
			title: "OverText: Enable",
			description: "Enable the OverText behavior",
			before: function(){
				var ot = new OverText('ot');
				ot.enable();
			},
			verify: "Did the hint text display (if the input was empty)? If you empty the input and blur it (remove focus) does the hint text display?"
		},
		{
			title: "OverText: Destroy",
			description: "Disables the OverText behavior and removes any DOM elements and attachments.",
			before: function(){
				var ot = new OverText('ot');
				ot.destroy();
			},
			verify: "Did the hint text hide? If you empty the input and blur it (remove focus) does the hint text remain hidden? If you can, inspect the DOM with Firebug; is the label element for the first input gone?"
		},
		{
			title: "OverText: suppressFocus",
			description: "Must not focus an input with a default value on instantiation",
			before: function(){
				var el = $$('input[value*=Default]')[0];
				el.setStyle('background-color', '#0f0');
				el.addEvent('focus', function(){
					this.setStyle('background-color', '#f00');
				});
				new OverText(el);
			},
			verify: "Is the 'Default Value' input green?"
		},
		{
			title: "OverText: Polling",
			description: "Polls inputs for changes",
			before: function(){
				$$('#pw, #un').each(function(el) {
					new OverText(el, {
						poll: true
					});
				});
				$('un').addEvent('change', function(){
					$('pw').set('value', 'asdfasdf');
				});

			},
			verify: "When you enter avalue for the first input (username), the second input will be auto-filled. Does it's OverText disappear?"
		},
		{
			title: "OverText: Polling",
			description: "Removes OverText when an element gets removed",
			before: function(){
				$('un').dispose();
				OverText.update();
			},
			verify: "When the input element gets removed from the DOM. Does it's OverText disappear?"
		}
	],
	otherScripts: ["Selectors"]
}