/*
Script: Element.Forms.js
	Extends the Element native object to include methods useful in managing inputs.

	License:
		MIT-style license.

	Authors:
		Aaron Newton

*/
Element.implement({

	tidy: function(){
		this.set('value', this.get('value').tidy());
	},

	getTextInRange: function(start, end){
		return this.get('value').substring(start, end);
	},

	getSelectedText: function(){
		if (Browser.Engine.trident) return document.selection.createRange().text;
		return this.get('value').substring(this.getSelectionStart(), this.getSelectionEnd());
	},

	getIERanges: function(){
		this.focus();
		var range = document.selection.createRange();
		var re = this.createTextRange();
		var dupe = re.duplicate();
		re.moveToBookmark(range.getBookmark());
		dupe.setEndPoint('EndToStart', re);
		return { start: dupe.text.length, end: dupe.text.length + range.text.length, length: range.text.length, text: range.text };
	},

	getSelectionStart: function(){
		if (Browser.Engine.trident) return this.getIERanges().start;
		return this.selectionStart;
	},

	getSelectionEnd: function(){
		if (Browser.Engine.trident) return this.getIERanges().end;
		return this.selectionEnd;
	},

	getSelectedRange: function(){
		return {
			start: this.getSelectionStart(),
			end: this.getSelectionEnd()
		}
	},

	setCaretPosition: function(pos){
		if (pos == 'end') pos = this.get('value').length;
		this.selectRange(pos, pos);
		return this;
	},

	getCaretPosition: function(){
		return this.getSelectedRange().start;
	},

	selectRange: function(start, end){
		this.focus();
		if (Browser.Engine.trident){
			var range = this.createTextRange();
			range.collapse(true);
			range.moveStart('character', start);
			range.moveEnd('character', end - start);
			range.select();
			return this;
		}
		this.setSelectionRange(start, end);
		return this;
	},

	insertAtCursor: function(value, select){
		var start = this.getSelectionStart();
		var end = this.getSelectionEnd();
		this.set('value', this.get('value').substring(0, start) + value + this.get('value').substring(end, this.get('value').length));
 		if ($pick(select, true)) this.selectRange(start, start + value.length);
		else this.setCaretPosition(start + value.length);
		return this;
	},

	insertAroundCursor: function(options, select){
		options = $extend({
			before: '',
			defaultMiddle: 'SOMETHING HERE',
			after: ''
		}, options);
		value = this.getSelectedText() || options.defaultMiddle;
		var start = this.getSelectionStart();
		var end = this.getSelectionEnd();
		if (start == end){
			var text = this.get('value');
			this.set('value', text.substring(0, start) + options.before + value + options.after + text.substring(end, text.length));
			this.selectRange(start + options.before.length, end + options.before.length + value.length);
			text = null;
		} else {
			text = this.get('value').substring(start, end);
			this.set('value', this.get('value').substring(0, start) + options.before + text + options.after + this.get('value').substring(end, this.get('value').length));
			var selStart = start + options.before.length;
			if ($pick(select, true)) this.selectRange(selStart, selStart + text.length);
			else this.setCaretPosition(selStart + text.length);
		}	
		return this;
	}

});