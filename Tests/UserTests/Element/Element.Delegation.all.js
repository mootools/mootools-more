{
	tests: [
		{
			title: "Element.addEvent",
			description: "Adds hover and click events to the list items",
			verify: "Do the items change color when you mouseover/out? Does the text show when you click?",
			before: function(){
				$('someListing').removeEvents('mouseover(.item)').removeEvents('mousedown(.item)').removeEvents('mouseout(.item)');
				var over = function(){
					this.morph({ backgroundColor: '#222' });
				};
				var out = function(){
					this.morph({ backgroundColor: '#2D5E4C' });
				};
				var down = function(e, el){ // el == this, that's important, event when child is clicked
					var text = this.get('text') +
						' this.tagName: ' + this.tagName +
						' e.target.tagName: ' + e.target.tagName +
						' el.tagName: ' + el.tagName;
					$$('label')[0].set('text', text);
				};
				$('someListing').store('delegateTests', [over, out, down]);
				$('someListing').addEvent('mouseover(.item)', over).addEvent('mouseout(.item)', out).addEvent('mousedown(.item)', down);
			}
		},
		{
			title: "Element.removeEvent",
			description: "Removes the behavior added in the above test.",
			verify: "Did the colors stop changing on mouseover/out? When you click does the text remain unchanged?",
			before: function(){
				var tests = $('someListing').retrieve('delegateTests');
				$('someListing').removeEvent('mouseover', tests[0]);
				$('someListing').removeEvent('mouseout', tests[1]);
				$('someListing').removeEvent('mousedown', tests[2]);
			}
		},
		{
			title: "Element.AddEvents",
			description: "Adds hover and click events to the list items",
			verify: "Do the items change color when you mouseover/out? Does the text show when you click?",
			before: function(){
				$('someListing').removeEvents('mouseover(.item)').removeEvents('mousedown(.item)').removeEvents('mouseout(.item)');
				var over = function(){
					this.morph({ backgroundColor: '#222' });
				};
				var out = function(){
					this.morph({ backgroundColor: '#2D5E4C' });
				};
				var down = function(e, el){ // el == this, that's important, event when child is clicked
					var text = this.get('text') +
						' this.tagName: ' + this.tagName +
						' e.target.tagName: ' + e.target.tagName +
						' el.tagName: ' + el.tagName;
					$$('label')[0].set('text', text);
				};
				$('someListing').store('delegateTests', [over, out, down]);
				$('someListing').addEvents({
					'mouseover(.item)': over,
					'mouseout(.item)': out,
					'mousedown(.item)': down
				});
			}
		},
		{
			title: "Element.removeEvents",
			description: "Removes the behavior added in the above test.",
			verify: "Did the colors stop changing on mouseover/out? When you click does the text remain unchanged?",
			before: function(){
				var tests = $('someListing').retrieve('delegateTests');
				$('someListing').removeEvents({
					'mouseover(.item)': tests[0],
					'mouseout(.item)': tests[1],
					'mousedown(.item)': tests[2]
				});
			}
		}
	],
	otherScripts: ['Selectors', 'Fx.Morph']
}