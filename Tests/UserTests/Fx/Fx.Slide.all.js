{
	tests: [
		{
			title: "Fx.Slide:slideOut",
			description: "Slides a box out of view",
			verify: "Did the box slide out of view?",
			before: function(){
				var fx = $('sliderButton').retrieve('test') 
				if (!fx) {
					fx = new Fx.Slide('sliderButton', {duration: 500});
					$('sliderButton').store('test', fx);
				}
				fx.show().slideOut();
			}
		},
		{
			title: "Fx.Slide:slideIn",
			description: "Slides a box into view",
			verify: "Did the box slide into view?",
			before: function(){
				var fx = $('sliderButton').retrieve('test') 
				if (!fx) {
					fx = new Fx.Slide('sliderButton', {duration: 500});
					$('sliderButton').store('test', fx);
				}
				fx.hide().slideIn();
			}
		},
		{
			title: "Fx.Slide:toggle",
			description: "Slides a box in and out of view",
			verify: "Did the box slide out of view?",
			before: function(){
				var fx = $('sliderButton').retrieve('test') 
				if (!fx) {
					fx = new Fx.Slide('sliderButton', {duration: 500});
					$('sliderButton').store('test', fx);
				}
				var toggler = function(){
					fx.toggle.delay(250, fx);
				};
				fx.hide().toggle().chain(toggler).chain(toggler);
			}
		}
	]
}