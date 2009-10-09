{
	tests: [
		{
			title: "Fx.Scroll:toBottom",
			description: "Scrolls the box to the bottom",
			verify: "Did the box scroll to the bottom?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.toBottom();
			}
		},
		{
			title: "Fx.Scroll:toRight",
			description: "Scrolls the box to the right",
			verify: "Did the box scroll to the right?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.toRight();
			}
		},
		{
			title: "Fx.Scroll:toTop",
			description: "Scrolls the box to the top",
			verify: "Did the box scroll to the top?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.toTop();
			}
		},
		{
			title: "Fx.Scroll:toLeft",
			description: "Scrolls the box to the left",
			verify: "Did the box scroll to the left?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.toLeft();
			}
		},
		{
			title: "Fx.Scroll:toElement",
			description: "Scrolls the box to the red item",
			verify: "Did the box scroll to the red item?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.toElement('red');
			}
		},
		{
			title: "Fx.Scroll:scrollIntoView (bottom)",
			description: "Scrolls the box so that the blue item is in the view at the bottom.",
			verify: "Did the box scroll so that the blue item is at the bottom?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.set(0,0);
				fx.scrollIntoView('blue', 'y');
			}
		},
		{
			title: "Fx.Scroll:scrollIntoView (top)",
			description: "Scrolls the box so that the yellow item is in the view at the top.",
			verify: "Did the box scroll so that the yellow item is at the top?",
			before: function(){
				var fx = $('scrollExample').retrieve('test') 
				if (!fx) {
					fx = new Fx.Scroll('scrollExample', {duration: 500});
					$('scrollExample').store('test', fx);
				}
				fx.set(0,500);
				fx.scrollIntoView('yellow', 'y');
			}
		}
	]
}