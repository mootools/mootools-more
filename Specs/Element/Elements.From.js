/*
---
name: Elements.From
requires: ~
provides: ~
...
*/

describe('Elements.From', function(){

	it('should return a group of elements', function(){
		var str = '<p><b>foo</b></p><i>bar</i>';
		var div = new Element('div');
		expect(div.adopt(Elements.from(str)).get('html').toLowerCase().trim()).toEqual(str);
	});

	it('should return a group of table elements', function(){
		var str = '<tr><td>foo</td></tr>';
		var tbody = new Element('tbody').inject(new Element('table')).adopt(Elements.from(str));
		expect(tbody.get('html').toLowerCase().replace(/\s+/g, '').trim()).toEqual(str);
	});

	it('should also return a group of table elements', function(){
		var str = '<tr><td>foo</td></tr>';
		var commented = ' <!-- comments --> ' + str;
		var tbody = new Element('tbody').inject(new Element('table')).adopt(Elements.from(commented));
		expect(tbody.get('html').toLowerCase().replace(/\s+/g, '').trim()).toEqual(str);
	});

});
