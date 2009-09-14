{
	tests: [
		{
			title: "Test Spinner",
			description: "Creates a semi-transparent layer that obscures an element and has a 'spinning' icon and message ovelaid upon that.",
			verify: "Did the Spinner show up obscuring the content of the element? Did it have a 'spinning' icon and message?",
			before: function() {
				$('foo').wait({message: 'testing....'});
	    }
		},
			{
			title: "Tests Spinner start and stop",
			description: "Shows and Hides a Spinner",
			verify: "Did the Spinner show and then hide?",
			before: function() {
			  var w = $('foo').retrieve('spinner');
			  w.hide();
	      w.show();
	      w.hide.delay(2000, w);
	    }
		},
		{
			title: "Toggle a Spinner",
			description: "Toggles the Spinner's visibility",
			verify: "Did the Spinner toggle on and off (if it was already visible, it will toggle off and then on again)?",
			before: function() {
			  var w = $('foo').retrieve('spinner');
			  w.hide();
	      w.toggle();
	      w.toggle.delay(2000, w);
	    }
		},
		{
			title: "Spinner with Request",
			description: "Retrieves content via ajax and automatically applies the Spinner to it.",
			verify: "Did the Spinner show up until the ajax finished and updated the content?",
			before: function(){
				var req = new Request.HTML({
					url: 'UserTests/Request/simple.php?sleep=1',
					method: 'get',
					useSpinner: true,
					update: $('foo2')
				});
				req.send();
			}
		}
	],
	otherScripts: ["Request.HTML"]
}
