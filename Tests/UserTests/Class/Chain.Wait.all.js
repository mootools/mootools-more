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
		}
	],
	otherScripts: ["Element"]
}
