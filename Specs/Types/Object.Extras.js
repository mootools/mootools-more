/*
---
name: Object.Extras Tests
requires: [More/Object.Extras]
provides: [Object.Extras.Tests]
...
*/
describe('Object.getFromPath', function(){

	it('should retrieve an object value from a path', function(){
		var obj = {
			animal: {
				human: {
					most_deadly: 'ninja'
				}
			}
		};
		expect(Object.getFromPath(obj, 'animal.human.most_deadly')).toEqual('ninja');
	});

	it('should retrieve an object value from an array', function(){
		var obj = {
			animal: {
				human: {
					most_deadly: 'ninja'
				}
			}
		};
		expect(Object.getFromPath(obj, ['animal', 'human', 'most_deadly'])).toEqual('ninja');
	});

});


describe('Object.cleanValues', function(){

	it('should filter all the null values out', function(){
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
	});

	it('custom filter method', function(){
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
	});

});

describe('Object.erase', function(){

	it('should retrieve a hash value from a path', function(){
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
	});

});

describe('Object.run', function(){

	it('should retrieve a hash value from a path', function(){
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
	});

});

describe('Object.sort', function(){

	it('should recursively sort objects by key', function(){
		expect(JSON.encode(Object.sort({
			lorem: 'lorem',
			ipsum: 'ipsum',
			dolor: 'dolor',
			abc: 'abc',
			object: {
				p: 'v',
				i: 5,
				b: true,
				n: null
			}
		}))).toEqual('{"abc":"abc","dolor":"dolor","ipsum":"ipsum","lorem":"lorem","object":{"b":true,"i":5,"n":null,"p":"v"}}');
	});
	
	it('should accept custom sort method', function(){
		expect(JSON.encode(Object.sort({
			b: 'b',
			a: 'a',
			c: 'c'
		}, function(a, b){
			return a == b ? 0 : (a > b ? -1 : 1);
		}))).toEqual('{"c":"c","b":"b","a":"a"}');
	});

});
