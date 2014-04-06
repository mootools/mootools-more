/*
---
name: Hash.Extras
requires: ~
provides: ~
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
