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
		},
		{
			title: "HtmlTable push:empty:push",
			description: "Creates a table, fills it, empties it, and fills it again.",
			verify: "Do you see the table? Does it have the contents 'I' and 'work' in the body?",
			before: function(){
				// create blank table with no options
				var table = new HtmlTable();
				// set some headers
				table.setHeaders(['column1','column2']);
				// inject table into myElement
				table.inject($(document.body));
				// push data to the table
				table.push(['hello','world']);
				// this is the trouble spot, it removes the tbody tag from the table
				table.empty();
				// at this stage if you call table.build(), the below push will work
				// if you try to push rows into the table now it wont work as the tbody tag is missing
				table.push(['I','work']);
			}
		}
	]
}