/*
Script: HtmlTable.js
	Builds table elements with methods to add rows.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

var HtmlTable = new Class({

	Implements: [Options, Events, Class.Occlude],

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

	property: 'HtmlTable',

	initialize: function(){
		var params = Array.link(arguments, {options: Object.type, table: Element.type});
		this.setOptions(params.options);
		this.element = params.table || new Element('table', this.options.properties);
		if (this.occlude()) return this.occluded;
		this.build();
	},

	build: function(){
		this.element.store('HtmlTable', this);

		this.body = document.id(this.element.tBodies[0]) || new Element('tbody').inject(this.element);
		$$(this.body.rows);

		if (this.options.headers.length) this.setHeaders(this.options.headers);
		else this.thead = document.id(this.element.tHead);
		if (this.thead) this.head = document.id(this.thead.rows[0]);

		if (this.options.footers.length) this.setFooters(this.options.footers);
		this.tfoot = document.id(this.element.tFoot);
		if (this.tfoot) this.foot = document.id(this.thead.rows[0]);

		this.options.rows.each(this.push.bind(this));

		['adopt', 'inject', 'wraps', 'grab', 'replaces', 'dispose'].each(function(method){
				this[method] = this.element[method].bind(this.element);
		}, this);
	},

	toElement: function(){
		return this.element;
	},

	empty: function(){
		this.body.empty();
		return this;
	},

	setHeaders: function(headers){
		this.thead = (document.id(this.element.tHead) || new Element('thead').inject(this.element, 'top')).empty();
		this.push(headers, this.thead, 'th');
		this.head = document.id(this.thead.rows[0]);
		return this;
	},

	setFooters: function(footers){
		this.tfoot = (document.id(this.element.tFoot) || new Element('tfoot').inject(this.element, 'top')).empty();
		this.push(footers, this.tfoot);
		this.foot = document.id(this.thead.rows[0]);
		return this;
	},

	push: function(row, target, tag){
		var tds = row.map(function(data){
			var td = new Element(tag || 'td', data.properties),
				type = data.content || data || '',
				element = document.id(type);

			if(element) td.adopt(element)
			else td.set('html', type);

			return td;
		});

		return {
			tr: new Element('tr').inject(target || this.body).adopt(tds),
			tds: tds
		};
	}

});