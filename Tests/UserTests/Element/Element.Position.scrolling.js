{
	tests: [
		{
			title: "Center",
			description: "Centers the red box over the text box.",
			verify: "Is the red box centered over the text box?",
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