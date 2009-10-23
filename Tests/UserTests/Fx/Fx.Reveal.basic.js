{
	tests: [
		{
			title: "Fx.Reveal::reveal",
			description: "Tests the reveal method, showing the object smoothly.",
			verify: "Did the element appear smoothly?",
			before: function(){
				$("foo").hide();
				var effect = new Fx.Reveal($('foo'));
				effect.reveal();
			}
		},
		{
			title: "Fx.Reveal::dissolve",
			description: "Tests the dissolve method, hiding the object smoothly.",
			verify: "Did the element hide smoothly?",
			before: function(){
				$("foo").show();
				var effect = new Fx.Reveal($('foo'));
				effect.dissolve();
			}
		},
		{
			title: "Element::reveal",
			description: "Tests the Element.reveal method, showing the object smoothly.",
			verify: "Did the element appear smoothly?",
			before: function(){
				$("foo").hide();
				$('foo').reveal();
			}
		},
		{
			title: "Element::dissolve",
			description: "Tests the Element.dissolve method, showing the object smoothly.",
			verify: "Did the element hide smoothly?",
			before: function(){
				$("foo").show();
				$('foo').dissolve();
			}
		},
		{
			title: "Element::reveal in quick succession",
			description: "Tests the Element.reveal method, calling it twice in a row.",
			verify: "Did the element reveal smoothly?",
			before: function(){
				$("foo").hide();
				$("foo").reveal();
				(function(){
					$('foo').reveal();
				}).delay(40);
			}
		},
		
		{
			title: "Element::nix",
			description: "Removes an element from the DOM with a transition.",
			verify: "Did the second box disappear?",
			before: function(){
				$('nixxer').nix();
			}
		}
	]
}
