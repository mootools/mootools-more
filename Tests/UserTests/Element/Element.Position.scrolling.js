{
	tests: [
		{
			title: "Scrolling and Element.Position",
			description: "Makes the red & yellow boxes follow the green box during scroll",
			verify: "Do the red and yellow boxes follow the green box when you scroll any scrollbar?",
			before: function(){
			  var red1 = $('red1'), red2 = $('red2'),
            green1 = $('green1'), green2 = $('green2'),
            yellow1 = $('yellow1'), yellow2 = $('yellow2');

        var position = function(){
          green1.position({relativeTo: red1, position: 'centerLeft', edge: 'centerRight'});
				  yellow1.position({relativeTo: red1, position: 'centerRight', edge: 'centerLeft'});
				  green2.position({relativeTo: red2, position: 'centerLeft', edge: 'centerRight'});
				  yellow2.position({relativeTo: red2, position: 'centerRight', edge: 'centerLeft'});
        };
        
        position();        
        window.addEvent('scroll', position);
        $('inner-container1').addEvent('scroll', position);
        $('inner-container2').addEvent('scroll', position);
			}
		}
	],
	otherScripts: ['Element.Event']
}