Class Instance: Locale {#Locale}
==============================================

Contains methods and data necessary to provide localization.

### Notes

* The locale sets are protected in a private variable that can only be altered using methods in *Locale* documented below. Though you can retrieve locale sets which are objects, you should not alter these through assignment but instead use the *.define* method.
* Locale sets can contain any type of object, so, for instance, a language item could be an *array*, a *function*, a *string*, or even another *class*. Classes that make use of these items must be aware of the types of objects in the language file.
* Objects that are functions are executed and their results are returned. So if you execute *Locale.get('Date', 'ordinal', 4)*, then the ordinal member will be executed and passed *4* as its argument. If *ordinal* is not a function, then its value will simply be returned.
* Users are encouraged to send in updates and additions to the MooTools team to help us grow this collection of translations.

Example language file
---------------------

Below is an example language file from *Date.English.US.js*. Note that some members are arrays (months and days), others are strings, and one is even a function. Also note that some of the strings contain notation for variable substitution. Each class establishes it's own conventions for the language file that is required and is therefor required to document those conventions. Look for these at the bottom of the class's documentation.

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
		lessThanMinuteAgo: 'less than a minute ago',
		minuteAgo: 'about a minute ago',
		minutesAgo: '{delta} minutes ago',
		hourAgo: 'about an hour ago',
		hoursAgo: 'about {delta} hours ago',
		dayAgo: '1 day ago',
		daysAgo: '{delta} days ago',
		lessThanMinuteUntil: 'less than a minute from now',
		minuteUntil: 'about a minute from now',
		minutesUntil: '{delta} minutes from now',
		hourUntil: 'about an hour from now',
		hoursUntil: 'about {delta} hours from now',
		dayUntil: '1 day from now',
		daysUntil: '{delta} days from now'

	});

All the above code does is register these values for the 'en-US' language for 'Date'. *Date* has attached an event to *Locale* in order to monitor these changes and update it's local store of this data. See below.


Locale event: onChange {#Locale:onChange}
---------------------------------------------------------------

This event is fired whenever the current locale is changed for the user (for instance, from "en-US" to "es-ES") or whenever the current selected locale is updated with new data.

### Example:

	Locale.addEvent('change', function(name){
		alert('Youre locale settings changed to ' + name);
	});


Locale method: define {#Locale:define}
----------------------------------------------

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

* *object* - Locale (the instance)


Locale method: setCurrent {#Locale:setCurrent}
--------------------------------------------------------------

Sets the current locale for the user.

### Syntax

	Locale.setCurrent(name);

### Arguments

1. name - (*string*) the new locale name for classes to use.

### Returns

* *object* - Locale (the instance)


Locale method: getCurrent {#Locale:getCurrent}
--------------------------------------------------------------

Returns the locale name currently in use.

### Syntax

	Locale.getCurrent();

### Returns

* *string* - the locale name (i.e. "en-US").


Locale method: get {#Locale:get}
----------------------------------------------

Retrieves a set of locale properties for the current language or the whole set.

### Syntax

	Locale.get(set[, key, args]);

### Arguments

1. set - (*string*) The set you wish to retrieve.
2. key - (*string*: optional) The member of the set you wish to retrieve. Dots `.` can be used to find nested properties.
3. args - (*mixed*: optional) A single value or an array of values that are passed to the language value (if it is not a function, these are ignored; if it is a function, these are passed);


### Example

	Locale.get('Date', 'dayAgo'); //"1 day ago"
	Locale.get('Date', 'nested.property'); // the get method is using [Object.getFromPath][] to find properties
	Locale.get('Date', 'ordinal', 1); //"st" > as in "1st"
	Locale.get('Date', 'dayAgo', 'foo'); //foo is ignored
	Locale.get('Date'); //returns the object of key/values for Date in the current language

### Returns

* If passed a valid set and key, returns the locale value for the given set (usually a string).
* If passed a valid set and no key, returns an object containing all the key/values in the translation.
* If passed a valid set, key, and arguments, passes the arguments to the value if it is a function and returns what it returns, otherwise returns the value.


Locale method: setCascades {#Locale:setCascades}
------------------------------------------------

Locale cascade. If there are members in the locale set for a given key, 
it will be returned, but if not, the next locale set in the specified 
cascade will be inspected for that key and so on. This way if there 
are new locale properties added for a given set but not every locale 
set has a translation yet, the set will at least have a value, though 
not in the right language.

By default, all locale sets cascade to US English, as this is the only 
locale set that we can guarantee is complete for the plugins in the 
MooTools repository. Any specific locale set can specify it's own 
cascade with this method.

### Syntax: 

	Locale.setCascades(value);

### Arguments: 

1. value - (*array*) An array with the locale names in the order the get method should search for.

### Returns

* *object* - Locale (the instance)


### Example: 

	// Italian cascades to Spanish, then to British English
	//(this is just an example of how to do it - not a suggestion!)
	Locale.setCascades(['it-IT', 'es-ES', 'en-GB']);


Locale method: getCascades {#Locale:getCascades}
------------------------------------------------

Get the current list of cascades.

### Syntax:

	Locale.getCascades();

### Return:

* *array* - an array with the locale names


Locale method: cascades {#Locale:cascades}
------------------------------------------

This method returns an object with methods so you can modify the cascades array.

### Syntax:

	Locale.cascades();

### Returns:

* *object* An object with the following Array methods to modify the cascades array: 'erase', 'include', 'reverse', 'sort', 'unshift', 'push', 'append' and 'include'

### Examples:

	Locale.cascades().push('nl-NL'); // adds 'nl-NL' at the and of the array
	Locale.cascades().unshift('nl-NL'); // adds 'nl-NL' at the beginning of the array 


Locale method: list {#Locale:list}
------------------------------------------------

Returns an array of languages currently supported.

### Syntax

	Locale.list();

### Returns

* *array* an array of locale names (*strings*)
