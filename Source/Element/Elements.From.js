/*
Script: Elements.From.js
	Returns a collection of elements from a string of html.

	License:
		MIT-style license.

	Authors:
		Aaron Newton

*/
Elements.from = function(text) {
	var container;
	if (text.match(/^\<(td|tr|th)/)) {
		var table = new Element('table');
		container = new Element('tbody').inject(table);
	} else if (text.match(/^<tbody/)) {
		container = new Element('table');
	} else {
		container = new Element('div');
	}
	return container.set('html', text).getChildren();
};