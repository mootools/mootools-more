{
	tests: [
		{
			title: "Fx.Accordion",
			description: "Closes one as you open another.",
			verify: "When you click on headers do their contents display, hiding the previously visible item?",
			before: function(){
				new Fx.Accordion($$('dt'), $$('dd'));
			}
		},
		{
			title: "Fx.Accordion",
			description: "Mouse enter triggering",
			verify: "When you mouseover on headers do their contents display, hiding the previously visible item?",
			before: function(){
				new Fx.Accordion($$('dt'), $$('dd'),{
					trigger: 'mouseenter'
				});
			}
		},
		{
			title: "Fx.Accordion",
			description: "Dynamically add sections to an existing accordion.",
			verify: "Is there a 'fourth section' does it respond like the others?",
			before : function(){
				var accordion = new Fx.Accordion($$('dt'), $$('dd'));
				var container = $('accordionExample').getElement('dl')
				accordion.addSection(
					new Element('dt',{'class': 'toggle', 'html' : '<b>fourth section</b>'}).inject(container),
					new Element('dd',{'class': 'stretcher', 'html' : "I'n the content for the fourth section."}).inject(container)
				);
			}
		}
	]
}