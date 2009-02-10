/*
Script: MooTools.Lang.js
	Specs for MooTools.Lang.js

License:
	MIT-style license.
*/
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