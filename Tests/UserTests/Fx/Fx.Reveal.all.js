{
	tests: [
		{
			title: "Fx.Reveal::reveal",
			description: "Tests the reveal method, showing the object smoothly.",
			verify: "Did the element appear smoothly?",
			before: function(){$("foo").hide();},
			body: "\
	var effect = new Fx.Reveal($('foo'));\n\
	effect.reveal();"
		},
		{
			title: "Fx.Reveal::dissolve",
			description: "Tests the dissolve method, hiding the object smoothly.",
			verify: "Did the element hide smoothly?",
			before: function(){$("foo").show();},
			post: function(){
				$('foo').show.delay(1200, $('foo'));
				return true;
			},
			body: "\
	var effect = new Fx.Reveal($('foo'));\n\
	effect.dissolve();"
		},
		{
			title: "Element::reveal",
			description: "Tests the Element.reveal method, showing the object smoothly.",
			verify: "Did the element appear smoothly?",
			before: function(){$("foo").hide();},
			body: "$('foo').reveal();"
		},
		{
			title: "Element::dissolve",
			description: "Tests the Element.dissolve method, showing the object smoothly.",
			verify: "Did the element hide smoothly?",
			before: function(){$("foo").show();},
			post: function(){
				$('foo').show.delay(1200, $('foo'));
				return true;
			},
			body: "$('foo').dissolve();"
		},
		{
			title: "Element::nix",
			description: "Removes an element from the DOM with a transition.",
			verify: "Did the second box disappear?",
			body: "$('nixxer').nix();"
		}
	]
}
