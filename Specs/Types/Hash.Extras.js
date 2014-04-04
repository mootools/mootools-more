/*
---
name: Hash.Extras Tests
requires: [More/Hash.Extras]
provides: [Hash.Extras.Tests]
...
*/

describe('Hash.getFromPath', {

	'should retrieve a hash value from a path': function(){
		var h = $H({
			animal: {
				human: {
					most_deadly: 'ninja'
				}
			}
		});
		expect(h.getFromPath('animal.human.most_deadly')).toEqual('ninja');
	}
});
