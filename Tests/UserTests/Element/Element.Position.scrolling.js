{
	tests: [
		{
			title: "Center",
			description: "Centers the red box over the text box.",
			verify: "Do the red and yellow boxes follow the green box when you scroll either scrollbar?",
			before: function(){
			  var red = $('red'),
            green = $('green'),
            yellow = $('yellow');
            
				(function(){
				  green.position({relativeTo: red, position: 'centerLeft', edge: 'centerRight'});
				  yellow.position({relativeTo: red, position: 'centerRight', edge: 'centerLeft'});  
				}).periodical(100);
			}
		}
	]
}