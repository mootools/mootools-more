{
	tests: [
		{
			title: "HtmlTable.Select",
			description: "Loads a striped table of data that can be sorted with rows that can be selected.",
			verify: "Do you see the table? Is it stripey? Can you sort it? Can you select a row?",
			before: function(){
				var t = new HtmlTable.Select({
					headers: ['fruit', 'colors'],
					allowMultiSelect: false
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