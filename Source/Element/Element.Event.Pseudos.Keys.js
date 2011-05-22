/*
---

name: Element.Event.Pseudos.Keys

description: Adds the functionality to fire events if certain keycombinations are pressed

license: MIT-style license

authors:
  - Arian Stolwijk
  - Djamil Legato

requires: [Element.Event.Pseudos]

provides: [Element.Event.Pseudos.Keys]

...
*/

(function(){

var keysStoreKey = '$moo:keys-pressed',
	keysKeyupStoreKey = '$moo:keys-keyup';


Event.definePseudo('keys', function(split, fn, args){

	var event = args[0],
		keyList = {},
		pressed = this.retrieve(keysStoreKey, []),
		value = split.value;
	
	// all of this is to split by , allowing , as char of the list
	// if you have a regexp for that please do share!
	value = value.replace(/\s/g, '').replace(/^,,|,,?$/g, function(match, pos){
	    if (!pos) return '-sep-,';
	    else return (value.length - 1 == pos) ? '-sep-' : ',-sep-';
	}).replace(/,,,?/g, function(match, pos){
	    if (match.length == 2) return '-sep-,';
	    else return ',-sep-,';
	});

	value = (value == ',' ? [value] : value.split(',')).map(function(value){
		value = value.replace('-sep-', ',');
		keyList[value] = [];

		keyList[value].append(value.replace('++', function(){
			keyList[value].push('+'); // shift++ and shift+++a
			return '';
		}).split('+'));

	    return value;
	});

	pressed.include(event.key);

	Object.each(keyList, function(keys){
		if (keys.every(function(key){
			return pressed.contains(key);
		})) fn.apply(this, args);
	});

	this.store(keysStoreKey, pressed);

	if (!this.retrieve(keysKeyupStoreKey)){
		var keyup = function(event){
			(function(){
				pressed = this.retrieve(keysStoreKey, []).erase(event.key);
				this.store(keysStoreKey, pressed);
			}).delay(0, this); // Fix for IE
		};
		this.store(keysKeyupStoreKey, keyup).addEvent('keyup', keyup);
	}

});

Object.append(Event.Keys, {
	'shift': 16,
	'control': 17,
	'alt': 18,
	'capslock': 20,
	'pageup': 33,
	'pagedown': 34,
	'end': 35,
	'home': 36,
	'numlock': 144,
	'scrolllock': 145,
	';': 186,
	'=': 187,
	',': 188,
	'-': Browser.firefox ? 109 : 189,
	'.': 190,
	'/': 191,
	'`': 192,
	'[': 219,
	'\\': 220,
	']': 221,
	"'": 222,
	'+': 107
});

})();
