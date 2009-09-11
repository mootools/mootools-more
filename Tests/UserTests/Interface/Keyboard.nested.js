{
	tests: [
		{
			title: "Nested Keyboard:activate (group 1)",
			description: "Activates the keys for group 1.",
			verify: "When you type the keys for group 1 do the sections toggle state? When you hit the keys for group 2, do they remain the same?",
			before: function(){
				var kbs = {
					kb: new Keyboard({name: 'kb'}),
					kb1: new Keyboard({
						name: 'kb1',
						preventDefault: true,
						onActivate: function(){
							$$('.group').removeClass('activeGroup');
							$('group1').addClass('activeGroup');
						},
						events: {
							'shift+a': function(){
								$('sa').toggleClass('active');
							},
							'enter': function(){
								$('enter').toggleClass('active');
							},
							'up': function(){
								$('up').toggleClass('active');
							}
						}
					}),
					kb2: new Keyboard({
						name: 'kb2',
						preventDefault: true,
						onActivate: function(){
							$$('.group').removeClass('activeGroup');
							$('group2').addClass('activeGroup');
						},
						events: {
							'control+d': function(){
								$('ctrld').toggleClass('active');
							},
							'space': function(){
								$('space').toggleClass('active');
							},
							'esc': function(){
								$('escape').toggleClass('active');
							}
						}
					})
				};
				kbs.kb.manage(kbs.kb1);
				kbs.kb.manage(kbs.kb2);
				kbs.kb.activate();
				kbs.kb1.activate();
				$(document.body).store('kbs', kbs);
			}
		},
		{
			title: "Nested Keyboard:activate (group 2)",
			description: "Activates the keys for group 2.",
			verify: "When you type the keys for group 2 do the sections toggle state? When you hit the keys for group 1, do they remain the same?",
			before: function(){
				var kbs = $(document.body).retrieve('kbs');
				kbs.kb2.activate();
			}
		},
		{
			title: "Deactivate keyboard",
			description: "Deactivates both groups.",
			verify: "Are the keys for both groups disabled?",
			before: function(){
				var kbs = $(document.body).retrieve('kbs');
				kbs.kb.deactivate();
			}
		},
		{
			title: "Reactivate keyboard",
			description: "Reactivates the keyboard into the previous state.",
			verify: "Are the keys for group 2 enabled again?",
			before: function(){
				var kbs = $(document.body).retrieve('kbs');
				kbs.kb.activate();
			}
		}
	]
}