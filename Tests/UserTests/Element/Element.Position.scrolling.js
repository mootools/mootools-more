{
	tests: [
		{
			title: "Scrolling and Element.Position",
			description: "Makes the red & yellow boxes follow the green box during scroll",
			verify: "Do the red and yellow boxes follow the green box when you scroll any scrollbar?",
			before: function(){
        var position = function(){
          ['0','1','2'].each(function(post){
            $('green' + post).position( {relativeTo: $('red' + post), position: 'centerRight', edge: 'centerLeft'});
            $('yellow' + post).position({relativeTo: $('red' + post), position: 'centerLeft', edge: 'centerRight'});
          });
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