/*
---

name: Element.Event.Pseudos.Keys

description: Adds functionality fire events if certain key combinations are pressed

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Element.Event.Pseudos]

provides: [Element.Event.Pseudos.Keys]

...
*/

(function(){


Event.definePseudo('keys', function(split, fn, args){

	var event = args[0],
		keys = [];

	keys.append(split.value.replace('++', function(){
		keys.push('+'); // shift++
		return '';
	}).replace('ctrl', 'control').split('+'));

	if (keys.every(function(part){
		return event.key == part || event[part];
	})) fn.apply(this, args);

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
