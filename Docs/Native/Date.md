Native: Date {#Date}
====================

Extends the Date native to include more powerful parsing and formatting functions.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/00-date

### Authors
* Nicholas Barthelemy - https://svn.nbarthelemy.com/date-js/
* Harald Kirshner - mail [at] digitarald.de; http://digitarald.de
* Aaron Newton - aaron [dot] newton [at] cnet [dot] com

### License:

MIT-style license

Date Method: get {#Date:get}
----------------------------

Retrieves a property of a date.

### Syntax

	date.get(key);

### Arguments

1. key - (*string*) the key of the value you wish to get

### Returns

* (*mixed*) the corresponding value for the key supplied

### Notes

* All of the native date methods work with *get* in addition to most of the *get...* methods added in Date.js. These are: "Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds", "Time", "TimezoneOffset", "Week", "Timezone", "GMTOffset", "Ordinal", "DayOfYear", "LastMonth", "UTCDate", "UTCDay", "UTCFullYear", "AMPM", "UTCHours", "UTCMilliseconds", "UTCMinutes", "UTCMonth", "UTCSeconds"
* *get* is **not** case sensitive; so you can do *get('date')*

### Aliases

The following aliases/shortcuts are available:

* ms: "Milliseconds"
* year: "FullYear"
* min: "Minutes"
* mo: "Month"
* sec: "Seconds"
* hr: "Hours"

### Examples

	date.get('date');
	date.get('year');
	date.get('ms');
	//etc.

Date Method: set {#Date:set}
----------------------------

Sets a property of a date.

### Syntax

	date.set(arguments);

### Arguments

- Two Arguments (property, value)
	1. property - (*string*) the property that you want to set
	2. value - (*mixed*) the value for the key
- One Argument (properties)
	1. properties - (*object*) Object with its keys/value pairs representing the properties and values to set for the Date (as described below).
### Notes

* All of the native date methods work with *set*. These are: "Date", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds", "Time", "UTCDate", "UTCFullYear", "UTCHours", "UTCMilliseconds", "UTCMinutes", "UTCMonth", "UTCSeconds"
* *set* is **not** case sensitive; so you can do *set('date')*

### Aliases

The following aliases/shortcuts are available:

* ms: "Milliseconds"
* year: "FullYear"
* min: "Minutes"
* mo: "Month"
* sec: "Seconds"
* hr: "Hours"

### Examples

	date.set('date', 12);
	date.set('year', 2001);
	date.set('ms', 100);
	//etc.

Date Method: clone {#Date:clone}
--------------------------------

Returns a copy of the date.

### Syntax

	date.clone();

### Example

	var today = new Date();
	var todayCopy = today.clone();

### Returns

* (*date*) A new Date object with the same date/time set as the cloned one.

Date Method: increment {#Date:increment}
----------------------------------------

Increments a value in the date.

### Syntax

	date.increment(interval, times);

### Arguments

1. interval - (*string*, optional) "day", "month", etc. (defaults to 'day')
2. times - (*integer*, optional) the number of times to increment (defaults to 1)

### Examples

	new Date().increment('day', 4); //four days from now
	new Date().increment(); //tomorrow
	new Date().increment('year'); //one year from now

### Returns

* (*Date*) This Date.

### Note

* the only acceptable values for interval are **year**, **month**, **day**, **hour**, **minute**, and **millisecond**

Date Method: decrement {#Date:decrement}
----------------------------------------

Decrements a value in the date. See [Date:increment][].

### Returns

* (*Date*) This Date.

### Note

* the only acceptable values for interval are **year**, **month**, **day**, **hour**, **minute**, and **millisecond**


Date Method: isLeapYear {#Date:isLeapYear}
-------------------------------------------

Returns true if the date is in a leap year.

### Syntax

	new Date().isLeapYear();

### Returns

* (*boolean*) true if date is in a leap year

Date Method: clearTime {#Date:clearTime}
----------------------------------------

Sets the hours, minutes, seconds, and milliseconds to zero.

### Syntax

	new Date().clearTime(); //midnight on the dot

### Returns

* (*Date*) This Date.

Date Method: diff {#Date:diff}
------------------------------

Compares two dates.

### Syntax

	date.diff(otherDate[, resolution]);

### Arguments
1. otherDate - (*date*) the other date to compare this one to.
2. resolution - (*string*, optional) how fine a comparision to make; 'day', 'month', etc. defaults to 'day'

### Examples

	var today = new Date();
	var tomorrow = today.clone().increment();
	today.diff(tomorrow); //returns 1
	today.diff(tomorrow, 'minute'); //returns 1440

### Returns

* (*integer*) the difference in time at the specified resolution

Date Method: get('timezone'){#Date:getTimezone}
------------------------------------------------

Returns the time zone for the date. Example: "GMT".

### Syntax

	new Date().get('timezone'); //"GMT" or whatever

### Returns

* (*string*) the time zone stamp ("GMT" for example);

Date Method: get('gmtoffset'){#Date:getGMTOffset}
--------------------------------------------------

Returns the offset to GMT *as a string*. Example: "-0800".

### Syntax

	new Date().get('gmtoffset'); //"-0800" or whatever

### Returns

* (*string*) the GMT offset

Date Method: get('week'){#Date:getWeek}
----------------------------------------

### Syntax

	new Date().get('week');

### Returns

* (*integer*) the week of the year for the date (i.e. 1 - 52).

Date Method: format {#Date:format}
----------------------------------

Outputs the date into a specific format.

### Syntax

	new Date().format(format);

### Arguments

1. format - (*string*) a string format for the output. Use the keys below with percent signs to get a desired output. Defaults to "%x %X", which renders "12/31/2007 03:45PM"

### Keys:
* a - short day ("Mon", "Tue")
* A - full day ("Monday")
* b - short month ("Jan", "Feb")
* B - full month ("January")
* c - the full date to string ("Mon Dec 10 2007 14:35:42 GMT-0800 (Pacific Standard Time)"; same as .toString() method.
* d - the date to two digits (01, 05, etc)
* H - the hour to two digits in military time (24 hr mode) (01, 11, 14, etc)
* I - the hour in 12 hour time (1, 11, 2, etc)
* j - the day of the year to three digits (001 is Jan 1st)
* m - the numerical month to two digits (01 is Jan, 12 is Dec)
* M - the minutes to two digits (01, 40, 59)
* p - The current language equivalent of either AM or PM
* S - the seconds to two digits (01, 40, 59)
* U - the week to two digits (01 is the week of Jan 1, 52 is the week of Dec 31)
* W - not yet supported
* w - the numerical day of the week, one digit (0 is Sunday, 1 is Monday)
* x - the date in the current language prefered format. en-US: %m/%d/%Y (12/10/2007)
* X - the time in the current language prefered format. en-US: %I:%M%p (02:45PM)
* y - the short year (two digits; "07")
* Y - the full year (four digits; "2007")
* T - the GMT offset ("-0800")
* Z - the time zone ("GMT")
* % - returns % (example: %y%% = 07%)

### Shortcuts:

These keys are NOT preceded by the percent sign.

* db - "%Y-%m-%d %H:%M:%S",
* compact - "%Y%m%dT%H%M%S",
* iso8601 - "%Y-%m-%dT%H:%M:%S%T",
* rfc822 - "%a, %d %b %Y %H:%M:%S %Z",
* short - "%d %b %H:%M",
* long - "%B %d, %Y %H:%M"

### Examples

	new Date().format("db"); //1999-12-31 23:59:59
	new Date().format("%x"); //12/31/1999
	new Date().format("%y"); //99

### Returns

* (*string*) the corresponding format for the Date.

Date Method: parse {#Date:parse}
--------------------------------

Parses a string to a date. In the examples below, parsing works with dates using / (slash), - (dash), or (space). (12.31.2007, 12-31-2007, 12/31/2007).

### Syntax

	Date.parse(date);
	new Date().parse(date);

### Arguments

1. date - (*string*) a string date that has a predefined parser (see [Date:parsePatterns][])

### Example

	Date.parse('10/12/1982') //"Tue Oct 12 1982 11:53:25 GMT-0700 (Pacific Daylight Time)"
	Date.parse('10/12/1982 10:45pm') //"Tue Oct 12 1982 10:45:25 GMT-0700 (Pacific Daylight Time)"
	Date.parse('10.12.1982 22:45:00') //"Tue Oct 12 1982 10:45:25 GMT-0700 (Pacific Daylight Time)"
	Date.parse('2007-06-08 16:34:52') //"Fri Jun 08 2007 09:34:52 GMT-0700 (Pacific Daylight Time)"

	var PrinceParty = new Date();
	PrinceParty.parse("12/31/1999 11:59pm");
	//PrinceParty is now set for 12/31/1999 just before midnight

	var PrinceParty = Date.parse("12/31/1999 11:59pm");

### Returns

* (*date*) a Date instance with the parsed value as its date.

### Notes

* *Date.js* includes four default parsers - for *YYYY-MM-DD*, *YYYY-MM-DD HH:mm[:ss][AM|PM]*, *MM/DD/YYYY* and *MM/DD/YYYY HH:mm[:ss][AM|PM]*
* If you include *[Date.Extras.js][]* you will get more parsers
* You can write your own parsers - see [Date:$parsePatterns][]
* If you execute the *parse* method against an instance of *Date*, that instance will take on the parsed value
* If you execute the *parse* method against the *Date* namespace a new *Date* object is created and returned

Custom Parsers {#Date:CustomParsers}
------------------------------------

Additional parsers can be authored than those already outlined by default in *Date.js*. If you include *Date.Extras.js* you'll get several more, but you can write your own.

### Syntax

	Date.parsePatterns.push(pattern);
	Date.parsePatterns.extend([pattern, pattern, etc]);

### Patterns

Each pattern is an object with two properties: a regular expression and a handler that is passed the result of that expression.

	Date.parsePatterns.push({
		re: <regularExpression>,
		handler: function(bits){...}
	});

### Example

	Date.parsePatterns.extend([
		{
			//"12.31.08", "12-31-08", "12/31/08", "12.31.2008", "12-31-2008", "12/31/2008"
			re: /^(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{2,4})$/,
			handler: function(bits){
				var d = new Date();
				d.setYear(bits[3]);
				d.setMonth(bits[1].toInt() - 1, bits[2].toInt());
				return Date.fixY2K(d);
			}
		}
	]);


Date Language Localization {#Localization}
==========================================

*Date.js* includes the following key/values for localization. See [Lang][].

* months - (*array*) An array of month names for the language (January, February, etc)
* days - (*array*) An array of names for the days of the week (Monday, Tuesday, etc)
* dateOrder - (*array*) An array specifying the order for date expression followed by a default delimiter (usually /). US english is *['month', 'date', 'year', '/']*, for instance.
* AM - (*string*) the string that denotes morning in 12 hour time
* PM - (*string*) the string that denotes evening in 12 hour time

[Date:increment]: #Date:increment
[Date:parsePatterns]: #Date:CustomParsers
[Date.Extras.js]: /docs/more/Native/Date.Extras
[Lang]: /docs/more/Core/Lang