/*
Script: Elements.From.js
	Returns a collection of elements from a string of html.

	License:
		MIT-style license.

	Authors:
		Aaron Newton

*/

Elements.from = function(text, excludeScripts){
	if ($pick(excludeScripts, true)) text = text.stripScripts();

	var container, match = text.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);

	if (match){
		container = new Element('table');
		var tag = match[1].toLowerCase();
		if (tag == 'td' || tag == 'th' || tag == 'tr'){
			container = new Element('tbody').inject(container);
			if (tag != 'tr') container = new Element('tr').inject(container);
		}
	} else {
		container = new Element('div');
	}

	return container.set('html', text).getChildren();
};