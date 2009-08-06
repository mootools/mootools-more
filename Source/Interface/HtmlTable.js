/*
Script: HtmlTable.js
	Builds table elements with methods to add rows.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

var HtmlTable = new Class({

	Implements: [Options, Events],

	options: {
		properties: {
			cellpadding: 0,
			cellspacing: 0,
			border: 0
		},
		rows: [],
		headers: [],
		footers: []
	},

	initialize: function() {
		var params = Array.link(arguments, {options: Object.type, table: Element.type});
		this.setOptions(params.options);
		this.build(params.element);
	},

	build: function(table){
		this.element = table || new Element('table', this.options.properties);
		this.element.store('HtmlTable', this);
		
		this.body = $(this.element.tBodies[0]);
		if (!this.body) this.body = new Element('tbody').inject(this.element);

		$$(this.body.rows);
		
		if (this.options.headers.length) this.setHeaders(this.options.headers);
		else this.thead = $(this.element.tHead);
		if (this.thead) this.head = $(this.thead.rows[0]);

		if (this.options.footers.length) this.setFooters(this.options.footers);
		this.tfoot = $(this.element.tFoot);
		if (this.tfoot) this.foot = $(this.thead.rows[0]);

		this.options.rows.each(this.push.bind(this));

		["adopt", "inject", "wraps", "grab", "replaces", "dispose"].each(function(method){
				this[method] = this.element[method].bind(this.element);
		}, this);
	},

	empty: function(){
		this.body.empty();
	},

	toElement: function(){
		return this.element;
	},

	setHeaders: function(headers){
		this.thead = $(this.element.tHead);
		if (!this.thead) this.thead = new Element('thead').inject(this.element, 'top');
		else this.thead.empty();
		this.push(headers, this.thead, 'th');
		this.head = $(this.thead.rows[0]);
	},

	setFooters: function(footers) {
		this.tfoot = $(this.element.tFoot);
		if (!this.tfoot) this.tfoot = new Element('tfoot').inject(this.element, 'top');
		else this.tfoot.empty();
		this.push(footers, this.tfoot);
		this.foot = $(this.thead.rows[0]);
	},

	push: function(row, target, tag) {
		var tr = new Element('tr').inject(target || this.body);
		var tds = row.map(function (tdata) {
			tdata = tdata || '';
			var td = new Element(tag || 'td').inject(tr);
			if (tdata.properties) td.setProperties(tdata.properties);
			function setContent(content){
				if (document.id(content)) td.adopt(document.id(content));
				else td.set('html', content);
			};
			if ($defined(tdata.content)) setContent(tdata.content);
			else setContent(tdata);
			return td;
		}, this);
		return {tr: tr, tds: tds};
	}

});