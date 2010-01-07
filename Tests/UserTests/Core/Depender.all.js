{
	tests: [
		{
			title: "Depender script loading.",
			description: "Loads a group of scripts based on their dependency maps.",
			verify: "Did the message that all dependencies were loaded appear?",
			before: function(){
				Depender.enableLog();
				Depender.include('UserTests/Core/Depender.libs.json');
				Depender.require({
					scripts: "Fx.Reveal",
					callback: function(scripts){
						$('foo').reveal();
					}
				}).require({
					scripts: 'Drag.Move',
					callback: function(scripts) {
						$('foo').get('reveal').chain(function(){
							$('foo').adopt(new Element('p', {html: 'this is now draggable!'}));
							$('foo').makeDraggable();
						});
					}
				});
			}
		}
	]
}