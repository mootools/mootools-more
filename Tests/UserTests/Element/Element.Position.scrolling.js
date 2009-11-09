{
	tests: [
		{
			title: "Scrolling and Element.Position",
			description: "Makes the red & yellow boxes follow the green box during scroll",
			verify: "Do the red and yellow boxes follow the green box when you scroll either scrollbar?",
			before: function(){
			  var red = $('red'),
            green = $('green'),
            yellow = $('yellow');

        var position = function(){
          green.position({relativeTo: red, position: 'centerLeft', edge: 'centerRight'});
				  yellow.position({relativeTo: red, position: 'centerRight', edge: 'centerLeft'});
        };
        
        position();        
        window.addEvent('scroll', position);
        $('inner-container').addEvent('scroll', position);
			}
		}
	],
	otherScripts: ['Element.Event']
}