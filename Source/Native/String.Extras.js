/*
---

script: String.Extras.js

name: String.Extras

description: Extends the String native object to include methods useful in managing various kinds of strings (query strings, urls, html, etc).

license: MIT-style license

authors:
  - Aaron Newton
  - Guillermo Rauch
  - Christopher Pitt

requires:
  - Core/String
  - Core/$util
  - Core/Array

provides: [String.Extras]

...
*/

(function(){

var special = {
	'a': '[àáâãäåăą]',
	'A': '[ÀÁÂÃÄÅĂĄ]',
	'c': '[ćčç]',
	'C': '[ĆČÇ]',
	'd': '[ďđ]',
	'D': '[ĎÐ]',
	'e': '[èéêëěę]',
	'E': '[ÈÉÊËĚĘ]',
	'g': '[ğ]',
	'G': '[Ğ]',
	'i': '[ìíîï]',
	'I': '[ÌÍÎÏ]',
	'l': '[ĺľł]',
	'L': '[ĹĽŁ]',
	'n': '[ñňń]',
	'N': '[ÑŇŃ]',
	'o': '[òóôõöøő]',
	'O': '[ÒÓÔÕÖØ]',
	'r': '[řŕ]',
	'R': '[ŘŔ]',
	's': '[ššş]',
	'S': '[ŠŞŚ]',
	't': '[ťţ]',
	'T': '[ŤŢ]',
	'ue': '[ü]',
	'UE': '[Ü]',
	'u': '[ùúûůµ]',
	'U': '[ÙÚÛŮ]',
	'y': '[ÿý]',
	'Y': '[ŸÝ]',
	'z': '[žźż]',
	'Z': '[ŽŹŻ]',
	'th': '[þ]',
	'TH': '[Þ]',
	'dh': '[ð]',
	'DH': '[Ð]',
	'ss': '[ß]',
	'oe': '[œ]',
	'OE': '[Œ]',
	'ae': '[æ]',
	'AE': '[Æ]'
},

tidy = {
	' ': '[\xa0\u2002\u2003\u2009]',
	'*': '[\xb7]',
	'\'': '[\u2018\u2019]',
	'"': '[\u201c\u201d]',
	'...': '[\u2026]',
	'-': '[\u2013]',
	'--': '[\u2014]',
	'&raquo;': '[\uFFFD]'
};

function walk(string, replacements) {
	var result = string;

	for (key in replacements) {
		result = result.replace(new RegExp(replacements[key], 'g'), key);
	}

	return result;
}

function getRegForTag(tag, contents) {
	tag = tag || '';
	var regstr = contents ? "<" + tag + "(?!\\w)[^>]*>([\\s\\S]*?)<\/" + tag + "(?!\\w)>" : "<\/?" + tag + "([^>]+)?>";
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
