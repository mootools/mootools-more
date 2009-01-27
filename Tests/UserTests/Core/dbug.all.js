{
	tests: [
		{
			title: "log",
			description: "Logs a message to the console",
			verify: "Is there a message in the firebug console?",
			body: "dbug.log('hi there');"
		},
		{
			title: "dir",
			description: "Logs a directory of an object to the console",
			verify: "Is there an object tree in the firebug console?",
			body: "dbug.dir({red: 'apple', citrus: {lemon: 'yellow', orange: 'orange'}})"
		},
		{
			title: "log: string substitution",
			description: "Logs a complex string to the console.",
			verify: "Do you see 'My favorite fruits are ['apple', 'pear']' in the console?",
			body: "dbug.log('My favorite %s are %o', 'fruits', ['apple', 'pear'])"
		}
	]
}
