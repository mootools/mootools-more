/*
Script: HtmlTable.Sort.js
	Builds a stripy, sortable table with methods to add rows.

	License:
		MIT-style license.

	Authors:
		Harald Kirschner
		Aaron Newton
*/

HtmlTable.Sort = new Class({

	Extends: HtmlTable.Zebra,

	options: {/*
		onSort: $empty, */
		sortIndex: 0,
		sortReverse: false,
		parsers: [],
		defaultParser: 'string',
		classHeadSort: 'table-th-sort',
		classHeadSortRev: 'table-th-sort-rev',
		classNoSort: 'table-th-nosort',
		classGroupHead: 'table-tr-group-head',
		classGroup: 'table-tr-group',
		classCellSort: 'table-td-sort',
		enableSort: true
	},

	initialize: function () {
		this.parent.apply(this, arguments);
		this.sorted = {index: null, dir: 1};
		this.detectParsers();
		this.attach();
		if (this.options.enableSort) this.enableSort();
		if (this.options.sortIndex != null) this.sort(this.options.sortIndex, this.options.sortReverse);
	},

	attach: function(){
		this.table.addEvent('click:relay(th)', this.headClick.bind(this));
	},

	setHeaders: function(){
		this.parent.apply(this, arguments);
		this.detectParsers();
	},

	detectParsers: function(){
		if (!this.getHead()) return;
		var parsers = this.options.parsers;
		var rows = this.body.rows;

		// auto-detect
		this.parsers = $$(this.getHead().cells).map(function(cell, index) {
			if (cell.hasClass(this.options.classNoSort)) return null;

			new Element('span', {'html': '&#160;', 'class': 'table-th-sort-span'}).inject(cell, 'top');

			var parser = parsers[index];
			switch ($type(parser)) {
				case 'function': return {convert: parser};
				case 'string': return parser;
			}

			HtmlTable.Parsers.some(function(current) {
				var match = current.match;
				if (!match) return false;
				if (Browser.Engine.trident) return false;
				for (var i = 0, j = rows.length; i < j; i++) {
					var text = rows[i].cells[index].get('html').clean();
					if (text && match.test(text)) {
						parser = current;
						return true;
					}
				}
			});

			return parser || this.options.defaultParser;
		}, this);
	},

	headClick: function(event, el) {
		var index = Array.indexOf(this.getHead().cells, el);
		this.sort(index);
		return false;
	},

	sort: function(index, reverse, pre) {
		if (!this.sortEnabled) return;
		pre = !!(pre);
		var classCellSort = this.options.classCellSort;
		var classGroup = this.options.classGroup, classGroupHead = this.options.classGroupHead;

		if (!pre) {
			if (index != null) {
				if (this.sorted.index == index) {
					this.sorted.reverse = !(this.sorted.reverse);
				} else {
					if (this.sorted.index != null) {
						this.sorted.reverse = false;
						this.getHead().cells[this.sorted.index]
							.removeClass(this.options.classHeadSort)
							.removeClass(this.options.classHeadSortRev);
					} else {
						this.sorted.reverse = true;
					}
					this.sorted.index = index;
				}
			} else {
				index = this.sorted.index;
			}

			if (reverse != null) this.sorted.reverse = reverse;

			var head = $(this.getHead().cells[index]);
			if (head) {
				head.addClass(this.options.classHeadSort);
				if (this.sorted.reverse) head.addClass(this.options.classHeadSortRev);
				else head.removeClass(this.options.classHeadSortRev);
			}

			this.body.getElements('td').removeClass(this.options.classCellSort);
		}

		var parser = this.parsers[index];
		if ($type(parser) == 'string') parser = HtmlTable.Parsers.get(parser);

		if (!parser) return;

		if (!Browser.Engine.trident) {
			var rel = this.body.getParent();
			this.body.dispose();
		}

		var data = Array.map(this.body.rows, function(row, i) {
			var value = parser.convert.call($(row.cells[index]));

			if (parser.number || $type(value) == 'number') {
				value = String(value).replace(/[^\d]/, '');
				value = '00000000000000000000000000000000'.substr(0, 32 - value.length).concat(value);
			}

			return {
				position: i,
				value: value,
				toString:  function() {
					return value;
				}
			};
		}, this);

		data.reverse(true);

		data.sort();

		if (!this.sorted.reverse) data.reverse(true);

		var i = data.length, body = this.body;
		var j, position, entry, group;

		while (i) {
			var item = data[--i];
			position = item.position;
			var row = body.rows[position];
			if (row.disabled) continue;

			if (!pre) {
				if (group === item.value) {
					row.removeClass(classGroupHead).addClass(classGroup);
				} else {
					group = item.value;
					row.removeClass(classGroup).addClass(classGroupHead);
				}
				this.zebra(row, i);

				row.cells[index].addClass(classCellSort);
			}

			body.appendChild(row);
			for (j = 0; j < i; j++) {
				if (data[j].position > position) data[j].position--;
			}
		};
		data = null;
		if (rel) rel.grab(body);

		this.fireEvent('sort', [body, index]);
	},

	enableSort: function(){
		this.sortEnabled = true;
	},

	disableSort: function(){
		this.sortEnabled = false;
	}

});

HtmlTable.Parsers = new Hash({

	'date': {
		match: /^\d{4}[^\d]|[^\d]\d{4}$/,
		convert: function() {
			return Date.parse(this.get('text'));
		},
		type: 'date'
	},
	'input-checked': {
		match: / type="(radio|checkbox)" /,
		convert: function() {
			return this.getElement('input').checked;
		}
	},
	'input-value': {
		match: /<input/,
		convert: function() {
			return this.getElement('input').value;
		}
	},
	'number': {
		match: /^\d+[^\d.,]*$/,
		convert: function() {
			return parseInt(this.get('text'));
		},
		number: true
	},
	'numberLax': {
		match: /^[^\d]+\d+$/,
		convert: function() {
			return parseInt(this.get('text').replace(/[^0-9]/, ''));
		},
		number: true
	},
	'float': {
		match: /^[\d]+\.[\d]+/,
		convert: function() {
			return parseFloat(this.get('text').replace(/[^\d.]/, ''));
		},
		number: true
	},
	'floatLax': {
		match: /^[^\d]+[\d]+\.[\d]+$/,
		convert: function() {
			return this.get('text').replace(/[^\d.]/, '');
		},
		number: true
	},
	'string': {
		match: null,
		convert: function() {
			return this.get('text');
		}
	},
	'title': {
		match: null,
		convert: function() {
			return this.title;
		}
	}

});