/*
---

script: Locale.From.js

name: Locale.From

description: Provides an alternative way to create Locale.Set objects.

license: MIT-style license

authors:
  - Tim Wienk

requires:
  - Core/JSON
  - /Locale

provides: Locale.Set.From

...
*/

Locale.Set.from = function(set){
	if (instanceOf(set, Locale.Set)) return set;

	if (typeOf(set) == 'string') set = JSON.decode(set);

	locale = new Locale.Set;

	locale.sets = set.sets || {};

	if (set.inherits){
		locale.inherits.locales = Array.from(set.inherits.locales);
		locale.inherits.sets = set.inherits.sets || {};
	}
}
