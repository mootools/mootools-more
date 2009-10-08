{
	tests: [
		{
			title: "Reveal / dissolve in quick succession: link = cancel",
			description: "Reveals and dissolves an element in quick succession with link set to cancel.",
			verify: "Did the box reveal partially and then dissolve?",
			before: function() {
				$('x').hide();
				$('x').reveal();
				(function(){
					$('x').dissolve();
				}).delay(300);
			}
		},
		{
			title: "Reveal / dissolve in quick succession: link = ignore",
			description: "Reveals and dissolves an element in quick succession with link set to ignore.",
			verify: "Did the box reveal normally?",
			before: function() {
				$('x').hide();
				$('x').reveal({
					link: 'ignore'
				});
				(function(){
					$('x').dissolve();
				}).delay(300);
			}
		},
		{
			title: "Reveal / dissolve in quick succession: link = chain",
			description: "Reveals and dissolves an element in quick succession with link set to chain.",
			verify: "Did the box reveal entirely and then dissolve?",
			before: function() {
				$('x').hide();
				$('x').reveal({
					link: 'chain'
				});
				(function(){
					$('x').dissolve();
				}).delay(300);
			}
		}
	]
}
