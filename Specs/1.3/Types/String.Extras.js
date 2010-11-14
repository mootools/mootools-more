/*
Script: String.Extras.js
	Specs for String.Extras.js

License:
	MIT-style license.
*/

describe('String.standardize', {

	'should map special characters into standard ones': function(){
		expect('También jugué al fútbol con Martín.'.standardize()).toEqual('Tambien jugue al futbol con Martin.');
		expect('Enchanté. Très bien, merci.'.standardize()).toEqual('Enchante. Tres bien, merci.');
		expect('Jak się masz?'.standardize()).toEqual('Jak sie masz?');
	}

});

describe('String.repeat', {

	'should repeat the given string a number of times': function(){
		expect('ha'.repeat(5)).toEqual('hahahahaha');
		expect('ha'.repeat(0)).toEqual('');
	}

});

describe('String.pad', {

	'should work with both numbers and strings': function(){
		expect('1'.pad(2, 0, 'left')).toEqual('01');
		expect('1'.pad(2, '0', 'left')).toEqual('01');
	},

	'should fill the string with the supplied pad string to left, right or both to reach a given number of characters': function(){
		expect('Alien'.pad(10, ' ', 'right')).toEqual('Alien     ');
		expect('Alien'.pad(10, '-=', 'left')).toEqual('-=-=-Alien');
		expect('Alien'.pad(10, '_', 'both')).toEqual('__Alien___');
		expect('Alien'.pad(6, '___', 'right')).toEqual('Alien_');
	}

});

describe('String.stripTags', {

	'should remove all tags from an html string': function(){
		expect('<b>test<a>another</a><br><hr/><div>thing</div></b>'.stripTags()).toEqual('testanotherthing');
	},

	'should leave a string w/o html alone': function(){
		expect('i like cookies'.stripTags()).toEqual('i like cookies');
	}

});

describe('String.truncate', function(){

	it('it should truncate a string at 10 chars and add ...', function(){
		expect("Just MooTooling'".truncate(10)).toEqual('Just MooTo…');
	});

	it('it should another trail, instead of the usual dots', function(){
		expect("Just MooTooling'".truncate(10, '--')).toEqual('Just MooTo--');
		expect("Just MooTooling'".truncate(10, null)).toEqual('Just MooTo');
	});

	it('should truncate a string nicely after the last given char, for example a space', function(){
		expect("Just MooTooling'".truncate(10, '--', ' ')).toEqual('Just--');
		expect("Just MooTooling'".truncate(10, null, ' ')).toEqual('Just');
	});

});
