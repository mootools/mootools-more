/*
---
name: Group Tests
requires: [More/Group]
provides: [Group.Tests]
...
*/
describe('Group', function(){

	it('should fire an event if all the events are fired of each instance', function(){

		var callback = jasmine.createSpy();

		var instances = [new Events(), new Events(), new Events()];

		new Group(instances).addEvent('complete', callback);

		var l = instances.length;
		while (l--) instances[l].fireEvent('complete');

		expect(callback).toHaveBeenCalled();

	});

});
