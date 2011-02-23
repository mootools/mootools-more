Class Instance: Locale {#Locale}
================================

Contains methods and data necessary to provide localization.

### Notes

* The locale sets are protected in a private variable that can only be altered using methods in *Locale* documented below. Though you can retrieve locale sets, which are objects, you should not alter these through assignment but instead use the *.define* method.
* Locale sets can contain any type of object, so, for instance, a language item could be an *array*, a *function*, a *string*, or even another *class*. Classes that make use of these items must be aware of the types of objects in the language file.
* Language items that are functions are executed and their results are returned. So if you execute *Locale.get('Date.ordinal', 4)*, then the ordinal member will be executed and passed *4* as its argument. If *ordinal* is not a function, then its value will simply be returned.
* Users are encouraged to send in updates and additions to the MooTools team to help us grow this collection of translations.
* Predefined Locale sets follow [this list][Locale_codes] as Locale codes.

Example language file
---------------------

Below is an example language file from *Locale.en-US.Date.js*. Note that some members are
arrays (months and days), others are strings, and one is even a function. Also note that
some of the strings contain notation for variable substitution. Each class establishes it's
own conventions for the language file that is required and is therefore required to document
those conventions. Look for these at the bottom of the class's Locale documentation.

	Locale.define('en-US', 'Date', {

		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dateOrder: ['month', 'date', 'year', '/'],
		AM: "AM",
		PM: "PM",
		//members can be functions; these will be executed and passed any arguments with .get(member[,args])
		ordinal: function(dayOfMonth){
			return (dayOfMonth > 3 && dayOfMonth < 21) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(dayOfMonth % 10, 4)];
		},
		lessThanMinuteAgo: 'less than a minute ago'

	});


Locale event: onChange {#Locale:onChange}
-----------------------------------------

This event is fired whenever the current locale is changed for the user (for instance,
from "en-US" to "es-ES") or whenever the current selected locale is updated with new data.

### Example:

	Locale.addEvent('change', function(name){
		alert('Youre locale settings changed to ' + name);
	});


Locale method: define {#Locale:define}
--------------------------------------

Defines properties for a given set in a given language.

### Syntax

	Locale.define(name, set, data);
	// or
	Locale.define(name, set, key, value);


### Arguments

1. name - (*string*) the locale name you want to alter.
2. set - (*string*) the set you want to alter in that locale.
3. data - (*object*) the key/values object for the set and locale.
4. key - (*string*) the key of a property for the data object for the set and locale.
5. value - (*mixed*) the value of a property for the data object for the set and locale.

### Example

	Locale.define('en-US', 'Date', {
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dateOrder: ['month', 'date', 'year', '/'],
		AM: "AM",
		PM: "PM"
	});

### Returns

* *object* - Locale Set instance


Locale method: use {#Locale:use}
--------------------------------

Sets the current locale for the user.

### Syntax

	Locale.use(name);

### Arguments

1. name - (*string*) the new locale name to use.

### Returns

* *object* - Locale (the instance)

### Example

	Locale.use('nl-NL');

Locale method: getCurrent {#Locale:getCurrent}
----------------------------------------------

Returns the locale name currently in use.

### Syntax

	Locale.getCurrent();

### Returns

* *object* - the Locale Set object
	* name - *string* The Locale Set name (i.e. "en-US").

### Example

	Locale.getCurrent().name // 'en-US'


Locale method: get {#Locale:get}
--------------------------------

Retrieves a set of locale properties for the current language or the whole set.

### Syntax

	Locale.get(key[, args]);

### Arguments

1. key - (*string*: optional) The member you wish to retrieve. This should look like `Set.key`. This will use [Object.getFromPath][] for nested properties.
2. args - (*mixed*: optional) A single value or an array of values that are passed to the language value (if it is not a function, these are ignored; if it is a function, these are passed);


### Example

	Locale.get('Date.dayAgo'); //"1 day ago"
	Locale.get('Date.nested.property'); // the get method is using Object.getFromPath to find properties
	Locale.get('Date.ordinal', 1); //"st" > as in "1st"
	Locale.get('Date.dayAgo', 'foo'); //foo is ignored
	Locale.get('Date'); //returns the object of key/values for Date in the current language

### Returns

* If passed a valid set and key, returns the locale value for the given set (usually a string).
* If passed a valid set and no key, returns an object containing all the key/values in the translation.
* If passed a valid set, key, and arguments, passes the arguments to the value if it is a function and returns what it returns, otherwise returns the value.

### Notes:

1. Dots '`.`' in the key argument can be used to find nested properties.

Locale method: inherit {#Locale:inherit}
----------------------------------------

It often occurs that localization data is based on another language.
For example Spanish in Argentina has many similarities with Spanish
or Number formatting in Europe is the same for lots of Europe countries.
Therefore it is possible to inherit another locale data from another
language. `Locale.get` will search trough the inherited locale names
until a property is set.

### Syntax:

	Locale.inherit(name, parent[, set]);

### Arguments:

1. name - (*string*) The locale name
2. parent - (*string*) The locale name to inherit from
3. set - (*string*, optional) If the locale data should only inherit for specific data sets, set this argument

### Returns

* *object* - Locale (the instance)


### Example:

	Locale.inherit('es-AR', 'es-ES');

	// Only inherit for a specific data set
	Locale.inherit('de-CH', 'de-DE', 'Number');


Locale method: list {#Locale:list}
----------------------------------

Returns an array of languages currently supported.

### Syntax

	Locale.list();

### Returns

* *array* an array of locale names (*strings*)

[Object.getFromPath]: /more/Types/Object.Extras#Object:Object-getFromPath
[Locale_codes]: http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_territory_information.html

