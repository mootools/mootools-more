{
	tests: [
		{
			title: "Test Waiter",
			description: "Creates a semi-transparent layer that obscures an element and has a 'spinning' icon and message ovelaid upon that.",
			verify: "Did the Waiter show up obscuring the content of the element? Did it have a 'spinning' icon and message?",
			before: function() {
				$('foo').wait({message: 'testing....'});
	    }
		},
			{
			title: "Tests Waiter start and stop",
			description: "Shows and Hides a Waiter",
			verify: "Did the Waiter show and then hide?",
			before: function() {
			  var w = $('foo').retrieve('waiter');
			  w.hide();
	      w.show();
	      w.hide.delay(2000, w);
	    }
		},
		{
			title: "Toggle a Waiter",
			description: "Toggles the Waiter's visibility",
			verify: "Did the Waiter toggle on and off (if it was already visible, it will toggle off and then on again)?",
			before: function() {
			  var w = $('foo').retrieve('waiter');
			  w.hide();
	      w.toggle();
	      w.toggle.delay(2000, w);
	    }
		},
		{
			title: "Waiter with Request",
			description: "Retrieves content via ajax and automatically applies the waiter to it.",
			verify: "Did the waiter show up until the ajax finished and updated the content?",
			before: function(){
				var req = new Request.HTML({
					url: 'UserTests/Request/simple.php?sleep=1',
					method: 'get',
					useWaiter: true,
					update: $('foo2'),
					onRequest: function(){
						if (location.protocol != 'http') {
							(function(){
								this.response = {text: this.xhr.responseText, xml: this.xhr.responseXML};
								this.success(this.response.text, this.response.xml);
							}).delay(1000, this);
						}
					}
				});
				req.send();
			}
		}
	],
	otherScripts: ["Request.HTML"]
}
