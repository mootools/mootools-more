Class: Locale.Set {#Locale-Set}
===============================

Extends *Locale.Set* (the class which Locale sets are an instance of) with a function to create locale sets from a JSON string. This locale set can then be used through [Locale.use][] to set as current locale.

Function: Locale.Set.from {#Locale-Set:Locale-Set-from}
-------------------------------------------------------

Returns a *Locale.Set* containing the language items described in the JSON string.

### Syntax

	Language.Set.from(str);

### Arguments

1. str - (*string*) a JSON string.

### Example

	var json = '{"name":"en-US","sets":{"FormValidator":{"required":"This field is required."}}}';
	var mySet = Locale.Set.from(json);
	Locale.use(mySet); // mySet is now the current locale

### Returns

* (*object*) A new *Locale.Set* instance.

[Locale.use]: /more/Locale/Locale#Locale:use
