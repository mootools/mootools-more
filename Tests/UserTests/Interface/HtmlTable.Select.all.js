{
	tests: [
		{
			title: "HtmlTable.Select",
			description: "Loads a table of data that can be selected.",
			verify: "Do you see the table? Can you select a row?",
			before: function(){
				var t = new HtmlTable({
					headers: ['fruit', 'colors'],
					allowMultiSelect: false,
					selectable: true
				});
				t.inject(document.body);
				t.push(['apple', 'red']);
				t.push(['lemon', 'yellow']);
				t.push(['plumbs', 'purple']);
				t.push(['grapes', 'green']);
			}
		},
		{
			title: "HtmlTable.Select, Sortable, Zebra",
			description: "Loads a striped table of data that can be sorted with rows that can be selected.",
			verify: "Do you see the table? Can you select a row? Is it stripey? Can you sort it?",
			before: function(){
				var t = new HtmlTable({
					headers: ['fruit', 'colors'],
					allowMultiSelect: false,
					selectable: true,
					sortable: true,
					zebra: true
				});
				t.inject(document.body);
				t.push(['apple', 'red']);
				t.push(['lemon', 'yellow']);
				t.push(['plumbs', 'purple']);
				t.push(['grapes', 'green']);
			}
		}
	],
	otherScripts: ['HtmlTable.Zebra', 'HtmlTable.Sort']
}