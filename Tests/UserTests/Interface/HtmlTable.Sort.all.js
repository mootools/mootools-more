{
	tests: [
		{
			title: "HtmlTable.Sort",
			description: "Loads a striped table of data that can be sorted.",
			verify: "Do you see the table? Can you sort it by clicking the headers?",
			before: function(){
				var t = new HtmlTable({
					sortable: true,
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