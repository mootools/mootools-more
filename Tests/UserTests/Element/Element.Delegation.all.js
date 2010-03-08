{
	tests: [
		{
			title: "Element.addEvent",
			description: "Adds hover and click events to the list items",
			verify: "Do the items change color when you mouseover/out? Does the text show when you click?",
			before: function(){
				$('someListing').removeEvents('mouseover:relay(.item)')
					.removeEvents('mousedown:relay(.item)')
					.removeEvents('mouseout:relay(.item)');
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
				$('someListing').addEvent('mouseover:relay(.item)', over)
					.addEvent('mouseout:relay(.item)', out)
					.addEvent('mousedown:relay(.item)', down);
			}
		},
		{
			title: "Element.removeEvent",
			description: "Removes the behavior added in the above test.",
			verify: "Did the colors stop changing on mouseover/out? When you click does the text remain unchanged?",
			before: function(){
				var tests = $('someListing').retrieve('delegateTests');
				$('someListing').removeEvent('mouseover:relay(.item)', tests[0]);
				$('someListing').removeEvent('mouseout:relay(.item)', tests[1]);
				$('someListing').removeEvent('mousedown:relay(.item)', tests[2]);
			}
		},
		{
			title: "Element.AddEvents",
			description: "Adds hover and click events to the list items",
			verify: "Do the items change color when you mouseover/out? Does the text show when you click?",
			before: function(){
				$('someListing').removeEvents('mouseover:relay(.item)')
					.removeEvents('mousedown:relay(.item)')
					.removeEvents('mouseout:relay(.item)');
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
					'mouseover:relay(.item)': over,
					'mouseout:relay(.item)': out,
					'mousedown:relay(.item)': down
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
					'mouseover:relay(.item)': tests[0],
					'mouseout:relay(.item)': tests[1],
					'mousedown:relay(.item)': tests[2]
				});
			}
		},
		{
			title       : "Element.AddEvents with :not()",
			description : "Adds hover events to the first and third list items only",
			verify      : "Do ONLY the first and third items change color when you mouseover/out?",
			before: function(){
				
				$('someListing')
					.removeEvents('mouseover:relay(:not(.item2):not(.item4))')
					.removeEvents( 'mouseout:relay(:not(.item2):not(.item4))')
				;
				
				var over = function(){ this.morph({ backgroundColor: '#222' }); };
				var out  = function(){ this.morph({ backgroundColor: '#2D5E4C' }); };
				
				$('someListing').store('delegateTests', [over, out]);
				$('someListing').addEvents({
					'mouseover:relay(:not(.item2):not(.item4))': over,
					 'mouseout:relay(:not(.item2):not(.item4))': out
				});
				
			}
		},
		{
			title       : "Element.removeEvents",
			description : "Removes the behavior added in the above test.",
			verify      : "Did the colors stop changing on mouseover/out? When you click does the text remain unchanged?",
			before: function(){
				var tests = $('someListing').retrieve('delegateTests');
				$('someListing')
					.removeEvents('mouseover:relay(:not(.item2):not(.item4))')
					.removeEvents( 'mouseout:relay(:not(.item2):not(.item4))')
				;
			}
		}
	],
	otherScripts: ['Selectors', 'Fx.Morph']
}