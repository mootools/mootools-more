{
	tests: [
		{
			title: "HtmlTable",
			description: "Loads a table of data into the view.",
			verify: "Do you see the table?",
			before: function(){
				var t = new HtmlTable({
					properties: {
						border: 1, cellspacing: 2, cellpadding: 3
					},
					headers: ['fruit', 'colors'],
					footers: ['fruit', 'colors']
				});
				t.inject(document.body);
				t.push(['apple', 'red']);
				t.push(['lemon', 'yellow']);
				t.push([{
						content: 'grapes',
						properties: {rowspan: 2, valign: 'top'}
				},
				'purple']);
				t.push(['green']);
			}
		},
		{
			title: "HtmlTable Styled",
			description: "Styles a new version of the test table in the first test.",
			verify: "Do you see the table? Is it styled?",
			before: function(){
				var t = new HtmlTable({
					properties: {
						'class':'simple-table'
					},
					headers: ['fruit', 'colors'],
					footers: ['fruit', 'colors']
				});
				t.inject(document.body);
				t.push(['apple', 'red']);
				t.push(['lemon', 'yellow']);
				t.push([{
						content: 'grapes',
						properties: {rowspan: 2, valign: 'top'}
				},
				'purple']);
				t.push(['green']);
			}
		}
	]
}