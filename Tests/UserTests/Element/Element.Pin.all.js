{
	tests: [
		{
			title: "Element.pin",
			description: "Pins an element into place so it does not scroll",
			verify: "Did the element stay in place when you scrolled?",
			before: function(){
				window.addEvent('domready', function(){
					$('foo').unpin();
					$('foo').pin();
				});
			}
		},
		{
			title: "Element.unpin",
			description: "Un-Pins an element so that it will scroll",
			verify: "Did the element move up/down when you scrolled?",
			before: function(){
				window.addEvent('domready', function(){
					$('foo').pin();
					$('foo').unpin();
				});
			}
		}
	],
	otherScripts: ['DomReady']
}