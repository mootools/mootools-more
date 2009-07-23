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
	if (text.match(/^\<(td|th)/)) container = new Element('tr').inject(new Element('tbody').inject(new Element('table')));
	else if (text.match(/^\<tr/)) container = new Element('tbody').inject(new Element('table'));
	else if (text.match(/^<tbody/)) container = new Element('table');
	else container = new Element('div');
	return container.set('html', text).getChildren();
};