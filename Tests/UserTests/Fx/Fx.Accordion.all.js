{
	tests: [
		{
			title: "Fx.Accordion",
			description: "Closes one as you open another.",
			verify: "When you click on headers do their contents display, hiding the previously visible item?",
			before: function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
				var acc = new Fx.Accordion($$('dt'), $$('dd'));
				$('accordionExample').store('acc', acc);
			}
		},
		{
			title: "Fx.Accordion:detach",
			description: "Detaches an instance of Fx.Accordion",
			verify: "Is the accordion no longer functional?",
			before: function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
			}
		},
		{
			title: "Fx.Accordion",
			description: "Mouse enter triggering",
			verify: "When you mouseover on headers do their contents display, hiding the previously visible item?",
			before: function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
				acc = new Fx.Accordion($$('dt'), $$('dd'),{
					trigger: 'mouseenter'
				});
				$('accordionExample').store('acc', acc);
			}
		},
		{
			title: "Fx.Accordion",
			description: "Dynamically add sections to an existing accordion.",
			verify: "Is there a 'fourth section' does it respond like the others?",
			before : function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
				var acc = new Fx.Accordion($$('dt'), $$('dd'));
				$('accordionExample').store('acc', acc);
				var container = $('accordionExample').getElement('dl');
				acc.addSection(
					new Element('dt',{'class': 'toggle', 'html' : '<b>fourth section</b>'}).inject(container),
					new Element('dd',{'class': 'stretcher', 'html' : "I'n the content for the fourth section."}).inject(container)
				);
			}
		},
		{
			title: "Fx.Accordion:always hide",
			description: "Allows sections to be hidden without exposing another",
			verify: "Can you click on an element to expose it, and click it again to hide it without another opening?",
			before: function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
				acc = new Fx.Accordion($$('dt'), $$('dd'),{
					display: -1,
					alwaysHide: true
				});
				$('accordionExample').store('acc', acc);
			}
		},
		{
			title: "Fx.Accordion:initial display",
			description: "Displays the 2nd item on instantiation w/o animation",
			verify: "Is the second item visible? Was there NO transition to that state? Can you click on other sections to open them as expected?",
			before: function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
				acc = new Fx.Accordion($$('dt'), $$('dd'),{
					display: 1,
					initialDisplayFx: false
				});
				$('accordionExample').store('acc', acc);
			}
		},
		{
			title: "Fx.Accordion:initial display w/ effects",
			description: "Displays the 2nd item on instantiation WITH animation",
			verify: "Is the second item visible? Was there a transition to that state? Can you click on other sections to open them as expected?",
			before: function(){
				var acc = $('accordionExample').retrieve('acc');
				if (acc) acc.detach();
				acc = new Fx.Accordion($$('dt'), $$('dd'),{
					display: 1
				});
				$('accordionExample').store('acc', acc);
			}
		}
	]
}