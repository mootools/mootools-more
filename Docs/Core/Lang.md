Class Instance: MooTools.lang {#MooTools-lang}
==============================================

Contains methods and data necessary to provide localization.

### Notes

* The language sets are protected in a private variable that can only be altered using methods in *MooTools.lang* documented below. Though you can retrieve language sets which are objects, you should not alter these through assignment but instead use the *.set* method.
* Language sets can contain any type of object, so, for instance, a language item could be an *array*, a *function*, a *string*, or even another *class*. Classes that make use of these items must be aware of the types of objects in the language file.
* Objects that are functions are executed and their results are returned. So if you execute *MooTools.lang.get('Date').get('ordinal', 4)*, then the ordinal member will be executed and passed *4* as its argument. If *ordinal* is not a function, then its value will simply be returned.
* Languages cascade. If there are members in the language set for a given key, it will be returned, but if not, the next language in the specified cascade will be inspected for that key and so on. This way if there are new language properties added for a given set but not every language has a translation yet, the set will at least have a value, though not in the right language.
* By default, all language sets cascade to US English, as this is the only language set that we can guarantee is complete for the plugins in the MooTools repository. Any specific language set can specify it's own cascade (see example below).
* Users are encouraged to send in updates and additions to the MooTools team to help us grow this collection of translations.

Example language file
---------------------

Below is an example language file from *Date.English.US.js*. Note that some members are arrays (months and days), others are strings, and one is even a function. Also note that some of the strings contain notation for variable substitution. Each class establishes it's own conventions for the language file that is required and is therefor required to document those conventions. Look for these at the bottom of the class's documentation.

		MooTools.lang.set('en-US', 'Date', {

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

All the above code does is register these values for the 'en-US' language for 'Date'. *Date* has attached an event to *MooTools.lang* in order to monitor these changes and update it's local store of this data. See below.

Example of setting the cascade for a language
---------------------------------------------

	//Italian cascades to Spanish, then to British English
	//(this is just an example of how to do it - not a suggestion!)
	MooTools.lang.set('IT', 'cascade', ['IT', 'ESP', 'gbENG']);

MooTools.lang event: onLangChange {#MooTools-lang:onLangChange}
---------------------------------------------------------------

This event is fired whenever the language is changed for the user (for instance, from "en-US" to "ESP") or whenever the current selected language is updated with new data.

MooTools.lang Methods
====================

MooTools.lang method: setLanguage {#MooTools-lang:setLanguage}
--------------------------------------------------------------

Sets the current language for the user.

### Syntax

	MooTools.lang.setLanguage(lang);

### Arguments

1. lang - (*string*) the new language for classes to use.

### Returns

* *object* - MooTools.lang (the instance)

MooTools.lang method: getCurrentLanguage {#MooTools-lang:getCurrentLanguage}
--------------------------------------------------------------

Returns the language currently in use.

### Syntax

	MooTools.lang.getCurrentLanguage();

### Returns

* *string* - the language (i.e. "en-US").

MooTools.lang method: get {#MooTools-lang:get}
----------------------------------------------

Retrieves a set of language properties for the current language.

### Syntax

	MooTools.lang.get(set[, key, args]);

### Arguments

1. set - (*string*) The set you wish to retrieve.
2. key - (*string*; optional) The member of the set you wish to retrieve. 
3. args - (*mixed*; optional) A single value or an array of values that are passed to the language value (if it is not a function, these are ignored; if it is a function, these are passed);


### Example

	MooTools.lang.get('Date', 'months', 0); //"January"
	MooTools.lang.get('Date', 'dayAgo'); //"1 day ago"
	MooTools.lang.get('Date', 'dayAgo', 'foo'); //foo is ignored
	MooTools.lang.get('Date'); //returns the object of key/values for Date in the current language

### Returns

* If passed a valid set and key, returns the language value for the given set (usually a string).
* If passed a valid set and no key, returns an object containing all the key/values in the translation.
* If passed a valid set, key, and arguments, passes the arguments to the value if it is a function and returns what it returns, otherwise returns the value.

MooTools.lang method: set {#MooTools-lang:set}
----------------------------------------------

Sets properties for a given set in a given language.

### Syntax

	MooTools.lang.set(lang, set, members);

### Arguments

1. lang - (*string*) the language you want to alter.
2. set - (*string*) the set you want to alter in that language.
3. members - (*object*) the key/values for the set and language.

### Example

	MooTools.lang.set('en-US', 'Date', {
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dateOrder: ['month', 'date', 'year', '/'],
		AM: "AM",
		PM: "PM"
	});

### Returns

* *object* - MooTools.lang (the instance)

MooTools.lang method: list {#MooTools-lang:list}
------------------------------------------------

Returns an array of languages currently supported.

### Syntax

	MooTools.lang.list();

### Returns

* *array* an array of languages (*strings*)