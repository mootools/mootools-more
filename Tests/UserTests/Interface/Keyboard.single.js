{
	tests: [
		{
			title: "Keyboard:activate",
			description: "Captures keyboard evnets as you type them.",
			verify: "Enter the keys defined in the box to make them toggle colors. Do they toggle?",
			before: function(){
				var kb = new Keyboard({
					events: {
						'shift+a': function(){
							$('sa').toggleClass('active');
						},
						'enter': function(){
							$('enter').toggleClass('active');
						},
						'up': function(){
							$('up').toggleClass('active');
						},
						'control+d': function(){
							$('ctrld').toggleClass('active');
						},
						'space': function(){
							$('space').toggleClass('active');
						},
						'esc': function(){
							$('escape').toggleClass('active');
						}
					},
					active: true
				});
				$(document.body).store('kb', kb);
			}
		},
		{
			title: "Keyboard:deactivate",
			description: "Disables the keyboard set up in the previous test.",
			verify: "Hitting any of the keys will no longer toggle the colors. Are the keys no longer active?",
			before: function(){
				$(document.body).retrieve('kb').deactivate();
			}
		}
		
	]
}