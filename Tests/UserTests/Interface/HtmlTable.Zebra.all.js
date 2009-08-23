{
	tests: [
		{
			title: "HtmlTable.Zebra",
			description: "Loads a striped table of data into the view.",
			verify: "Do you see the table? Is it stripey?",
			before: function(){
				var t = new HtmlTable({
					zebra: true,
					headers: ['fruit', 'colors']
				});
				t.inject(document.body);
				t.push(['apple', 'red']);
				t.push(['lemon', 'yellow']);
				t.push(['plumbs', 'purple']);
				t.push(['grapes', 'green']);
			}
		}
	]
}