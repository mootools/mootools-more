/*
Script: Hash.Extras.js
	Specs for Hash.Extras.js

License:
	MIT-style license.
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
		value_of(h.getFromPath('animal.human.most_deadly')).should_be('ninja');
	}
});
