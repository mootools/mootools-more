{
	tests: [
		{
			title: "Group",
			description: "Tests that a group of animations have completed.",
			verify: "Did each ",
			before: function(){
				var fx = $$('.exampleBar').map(function(el) {
					return el.get('tween');
				});
				new Group(fx).addEvent('onComplete', function(){
					alert('all effects have finished!');
				});
				var run = function(i){
					return fx[i].start('height', 100);
				};
				run(0).chain(function(){
					run(1).chain(function(){
						run(2);
					});
				});
			}
		}
	],
	otherScripts: ['Fx.Tween', 'Selectors']
}