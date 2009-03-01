{
	tests: [
		{
			title: "Fx.Sort &raquo; Backward",
			description: "Reverses the order of the lists to 5,4,3,2,1",
			verify: "Did the orders change to 5,4,3,2,1?",
			body: "vert.backward();\n\
	(function(){horz.backward();}).delay(1000)"
		},
		{
			title: "Fx.Sort &raquo; Forward",
			description: "Resets the order of the lists to 1,2,3,4,5",
			verify: "Did the orders change to 1,2,3,4,5?",
			body: "vert.forward();\n\
	(function(){horz.forward();}).delay(1000)"
		},
		{
			title: "Fx.Sort &raquo; Sort",
			description: "Sets the order of the lists to 5,2,4,3,1",
			verify: "Did the orders change to 5,2,4,3,1?",
			body: "vert.sort([4,1,3,2,0]);\n\
	(function(){horz.sort([4,1,3,2,0]);}).delay(1000)"
		},
		{
			title: "Fx.Sort &raquo; Swap",
			description: "Swaps the position of 1 and 5",
			verify: "Did 1 and 5 change places?",
			body: "vert.swap(0,4);\n\
	(function(){horz.swap(0,4);}).delay(1000)"
		},
		{
			title: "Fx.Sort &raquo; Reverse",
			description: "Reverses the order of the lists",
			verify: "Did the orders reverse?",
			body: "vert.reverse();\n\
	(function(){horz.reverse();}).delay(1000)"
		},
		{
			title: "Fx.Sort &raquo; rearrangeDOM (vertical only)",
			description: "Reorders the DOM to match the current sort order.",
			verify: "Did the numbers in the numbered list (veritical) change to 1,2,3,4,5?",
			body: "vert.rearrangeDOM();"
		}
	],
	otherScripts: ["Fx.Transitions", "Selectors"]
}