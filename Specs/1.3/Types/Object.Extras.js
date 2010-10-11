/*
Script: Object.Extras.js
	Specs for Object.Extras.js

License:
	MIT-style license.
*/

describe('Object.getFromPath', {

	'should retrieve a hash value from a path': function(){
		var obj = {
			animal: {
				human: {
					most_deadly: 'ninja'
				}
			}
		};
		expect(Object.getFromPath(obj, 'animal.human.most_deadly')).toEqual('ninja');
	}
});


describe('Object.cleanValues', {

	'should filter all the null values out': function(){
		var obj = {
			animal: null,
			mootools: true,
			test: 'ing',
			no: false
		};
		expect(Object.cleanValues(obj)).toEqual({
			mootools: true,
			test: 'ing',
			no: false
		});
	},

	'custom filter method': function(){
		var obj = {
			animal: null,
			mootools: true,
			test: 'ing',
			no: false
		};
		expect(Object.cleanValues(obj, function(obj){
			return obj !== false;
		})).toEqual({
			animal: null,
			mootools: true,
			test: 'ing'
		});
	}
});

describe('Object.erase', {

	'should retrieve a hash value from a path': function(){
		var obj = {
			animal: null,
			mootools: true,
			test: 'ing',
			no: false
		};
		expect(Object.cleanValues(obj)).toEqual({
			mootools: true,
			test: 'ing',
			no: false
		});
	}
});

describe('Object.run', {

	'should retrieve a hash value from a path': function(){
		var value = '';
		var obj = {
			animal: function(arg){
				value += arg;
			},
			moo: function(arg){
				value += arg;
			}
		};
		expect((function(){
			Object.run(obj, 'running');
			return value;
		})()).toEqual('runningrunning');
	}
});
