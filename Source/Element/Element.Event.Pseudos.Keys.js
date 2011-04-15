/*
---

name: Element.Event.Pseudos.Keys

description: Adds functionality fire events if certain keycombinations are pressed

license: MIT-style license

authors:
  - Arian Stolwijk

requires: [Element.Event.Pseudos]

provides: [Element.Event.Pseudos.Keys]

...
*/

(function(){

var keysStoreKey = '$moo:keys-pressed',
	keysKeyupStoreKey = '$moo:keys-keyup',
	keysParsed = {},
	parseKeys = function(text){
		return text.replace(/ctrl/g, 'control').split('|').map(function(key) {
			var arr = [];
			arr.append(key.replace('++', function(){
				arr.push('+'); // shift++ and shift+++a
				return '';
			}).split('+'));
			return arr;
		});
	},
	store = function(key, val){
		this.store ? this.store(key, val) : this[key] = val;
		return this;
	},
	retrieve = function(key, def){
		return this.retrieve ? this.retrieve(key, def) : (this[key] || def);
	},
	keysPseudo = function(split, fn, args){
		var event = args[0],
			unparsedValue = split.value,
			keyCombos = keysParsed[unparsedValue] || (keysParsed[unparsedValue] = parseKeys(unparsedValue)),
			pressed = retrieve.call(this, keysStoreKey, []);
	
		pressed.include(event.key);
	
		if (keyCombos.some(function(combo){
			return combo.every(function(key){
				return pressed.contains(key);
			});
		})) fn.apply(this, args);
	
		store.call(this, keysStoreKey, pressed);
	
		if (!retrieve.call(this, keysKeyupStoreKey)){
			var keyup = function(event){
				(function(){
					pressed = retrieve.call(this, keysStoreKey, []).erase(event.key);
					store.call(this, keysStoreKey, pressed);
				}).delay(0, this); // Fix for IE
			};
			store.call(this, keysKeyupStoreKey, keyup).addEvent('keyup', keyup);
		}
	
	};

Event.definePseudo('keys', keysPseudo);
Events.definePseudo('keys', keysPseudo);

Object.append(Event.Keys, {
	'shift': 16,
	'control': 17,
	'alt': 18,
	'meta': (Browser.Platform.mac && Browser.firefox) ? 224 :  91,
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
