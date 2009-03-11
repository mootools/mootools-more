/*
Script: String.Extras.js
	Specs for String.Extras.js

License:
	MIT-style license.
*/

describe('String.standardize', {

	'should map special characters into standard ones': function(){
		value_of('También jugué al fútbol con Martín.'.standardize()).should_be('Tambien jugue al futbol con Martin.');
		value_of('Enchanté. Très bien, merci.'.standardize()).should_be('Enchante. Tres bien, merci.');
		value_of('Jak się masz?'.standardize()).should_be('Jak sie masz?');
	}

});

describe('String.repeat', {

	'should repeat the given string a number of times': function(){
		value_of('ha'.repeat(5)).should_be('hahahahaha');
		value_of('ha'.repeat(0)).should_be('');
	}

});

describe('String.pad', {

	'should fill the string with the supplied pad string to left, right or both to reach a given number of characters': function(){
		value_of('Alien'.pad(10, ' ', 'right')).should_be('Alien     ');
		value_of('Alien'.pad(10, '-=', 'left')).should_be('-=-=-Alien');
		value_of('Alien'.pad(10, '_', 'both')).should_be('__Alien___');
		value_of('Alien'.pad(6, '___', 'right')).should_be('Alien_');
	}

});

describe('String.stripTags', {

	'should remove all tags from an html string': function(){
		value_of('<b>test<a>another</a><br><hr/><div>thing</div></b>'.stripTags()).should_be('testanotherthing');
	},

	'should leave a string w/o html alone': function(){
		value_of('i like cookies'.stripTags()).should_be('i like cookies');
	}

});