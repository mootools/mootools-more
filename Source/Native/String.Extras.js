/*
---

script: String.Extras.js

description: Extends the String native object to include methods useful in managing various kinds of strings (query strings, urls, html, etc).

license: MIT-style license

authors:
- Aaron Newton
- Guillermo Rauch

requires:
- core:1.2.4/String
- core:1.2.4/$util
- core:1.2.4/Array

provides: [String.Extras]

...
*/

(function(){

var special = {
	'a': ['à', 'á', 'â', 'ã', 'ä', 'å', 'a', 'a'],
	'A': ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'A', 'A'],
	'c': ['c', 'c', 'ç'],
	'C': ['C', 'C', 'Ç'],
	'd': ['d', 'd'],
	'D': ['D', 'Ð'],
	'e': ['è', 'é', 'ê', 'ë', 'e', 'e'],
	'E': ['È', 'É', 'Ê', 'Ë', 'E', 'E'],
	'g': ['g'],
	'G': ['G'],
	'i': ['ì', 'í', 'î', 'ï'],
	'I': ['Ì', 'Í', 'Î', 'Ï'],
	'l': ['l', 'l', 'l'],
	'L': ['L', 'L', 'L'],
	'n': ['ñ', 'n', 'n'],
	'N': ['Ñ', 'N', 'N'],
	'o': ['ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'o'],
	'O': ['Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø'],
	'r': ['r', 'r'],
	'R': ['R', 'R'],
	's': ['š', 's', 's'],
	'S': ['Š', 'S', 'S'],
	't': ['t', 't', 't'],
	'T': ['T', 'T', 'T'],
	'u': ['ù', 'ú', 'û', 'ü', 'u', 'µ'],
	'U': ['Ù', 'Ú', 'Û', 'Ü', 'U'],
	'y': ['ÿ', 'ý'],
	'Y': ['Ÿ', 'Ý'],
	'z': ['ž', 'z', 'z'],
	'Z': ['Ž', 'Z', 'Z'],
	'th': ['þ'],
	'TH': ['Þ'],
	'dh': ['ð'],
	'DH': ['Ð'],
	'ss': ['ß'],
	'oe': ['œ'],
	'OE': ['Œ'],
	'ae': ['æ'],
	'AE': ['Æ']
},

tidy = {
	' ': ['[\xa0\u2002\u2003\u2009]'],
	'*': ['\xb7'],
	'\'': ['[\u2018\u2019]'],
	'"': ['[\u201c\u201d]'],
	'...': ['\u2026'],
	'-': ['\u2013'],
	'--': ['\u2014'],
	'&raquo;': ['\uFFFD']
};

function walk(string, replacements)
{
	var result = string;

	Hash.each(replacements, function(value, key) {
		Array.each(value, function(check) {
			result = result.replace(new RegExp(check, 'g'), key);
		});
	});

	return result;
}

var getRegForTag = function(tag, contents) {
	tag = tag || '';
	var regstr = contents ? "<" + tag + "[^>]*>([\\s\\S]*?)<\/" + tag + ">" : "<\/?" + tag + "([^>]+)?>";
	reg = new RegExp(regstr, "gi");
	return reg;
};

String.implement({

	standardize: function(){
		return walk(this, special);
	},

	repeat: function(times){
		return new Array(times + 1).join(this);
	},

	pad: function(length, str, dir){
		if (this.length >= length) return this;
		var pad = (str == null ? ' ' : '' + str).repeat(length - this.length).substr(0, length - this.length);
		if (!dir || dir == 'right') return this + pad;
		if (dir == 'left') return pad + this;
		return pad.substr(0, (pad.length / 2).floor()) + this + pad.substr(0, (pad.length / 2).ceil());
	},

	getTags: function(tag, contents){
		return this.match(getRegForTag(tag, contents)) || [];
	},

	stripTags: function(tag, contents){
		return this.replace(getRegForTag(tag, contents), '');
	},

	tidy: function(){
		return walk(this, tidy);
	}

});

})();