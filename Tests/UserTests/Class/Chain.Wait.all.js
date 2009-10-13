{
	tests: [
		{
			title: "Chain.delay",
			description: "Tests the ability of the chain method to have delays.",
			verify: "Are the messages in the box delayed by 1 second?",
			before: function(){
				var chain = new Chain();
				var stamp = function(){
					$('foo').adopt(new Element('p').appendText(new Date()));
					chain.callChain();
				};


				chain.chain(stamp);
				chain.wait(1000);
				chain.chain(stamp);
				chain.wait(1000);
				chain.chain(stamp);
				chain.wait(1000);
				chain.callChain();
			}
		},
		{
			title: "fx.delay",
			description: "Delays a series of effects.",
			verify: "Does the element grow, shrink, and grow, with a short delay between each action?",
			before: function(){
				$('foo').chains().tween('height', 100).pauseFx(500)
					.tween('height', 200).pauseFx(500)
					.tween('height', 100).pauseFx(500)
					.tween('height', 200).pauseFx(500);
			}
		}
	],
	otherScripts: ["Fx.Tween"]
}
