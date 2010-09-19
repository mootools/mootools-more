describe('Elements.From', {

	'should return a group of elements': function(){
		var str = '<p><b>foo</b></p><i>bar</i>';
		var div = new Element('div');
		value_of(div.adopt(Elements.from(str)).get('html').toLowerCase().trim()).should_be(str);
	},

	'should return a group of table elements': function(){
		var str = '<tr><td>foo</td></tr>';
		var tbody = new Element('tbody').inject(new Element('table')).adopt(Elements.from(str));
		value_of(tbody.get('html').toLowerCase().replace(/\s+/g, '').trim()).should_be(str);
	}

});
