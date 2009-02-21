/*
Script: String.Extras.js
	Specs for String.Extras.js

License:
	MIT-style license.
*/

describe('String.standarize', {

	'should map special characters into standard ones': function(){
		value_of('También jugué al fútbol con Martín.'.standarize()).should_be('Tambien jugue al futbol con Martin.');
		value_of('Enchanté. Très bien, merci.'.standarize()).should_be('Enchante. Tres bien, merci.');
		value_of('Jak się masz?'.standarize()).should_be('Jak sie masz?');
	}

});

describe('String.toSlug', {

	'should convert text into a slug phrase': function(){
		value_of('I\'m called _JOHN_!'.toSlug()).should_be('im-called-john');
		value_of(' óóóóhh!   ---rare'.standarize()).should_be('oooohh-rare');
	}

});

describe('String.truncate', {

	'should truncate text at a given length': function(){
		value_of('Lorem Ipsum is'.truncate(10, '..')).should_be('Lorem Ipsu..');
		value_of('Hello space '.truncate(12)).should_be('Hello space...');
		value_of('Hello space '.truncate(12, '...', true)).should_be('Hello space ...');
	}

});

describe('String.highlight', {

	'should search a phrase and replace it with given pattern': function(){
		value_of('Hello world'.highlight('world', '<em>$1</em>')).should_be('Hello <em>world</em>');
	}

});

describe('String.repeat', {

	'should repeat the given string a number of times': function(){
		value_of('ha'.repeat(5)).should_be('hahaha');
		value_of('ha'.repeat(0)).should_be('ha');
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

describe('String.parseQuery', {

	'should parse a query string to an object': function(){
		value_of('apple=red&lemon=yellow'.parseQuery().apple).should_be('red');
	},

	'should parse a plain string to an empty object': function(){
		value_of($H('appleyellow'.parseQuery()).getLength() == 0).should_be_true();
	}

});

describe('String.cleanQueryString', {

	'should remove empty keys': function(){
		value_of('a=b&x=y&z=123&e='.cleanQueryString()).should_be('a=b&x=y&z=123');
	},

	'should remove specified keys': function(){
		value_of('a=b&x=y&z=123&e='.cleanQueryString(function(set){
			return !set.split("=")[1].match(/[0-9]/);
		})).should_be('a=b&x=y&e=');
	}

});