{
	tests: [
		{
			title: "Slider",
			description: "Allows you to drag a 'knob' to change a value.",
			verify: "When you drag the black box horizontally does the number below change to reflect the position?",
			before: function(){
				var mySlide = new Slider($('area'), $('knob'), {
					onChange: function(pos){
					$('upd').set('html', pos);
					}
				}).set(0);
			}
		}
	]
}