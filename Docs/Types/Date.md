Type: Date {#Date}
====================

Extends the Date Type to include more powerful parsing and formatting functions.

### Tutorial/Demo

* [Online Tutorial/Demo][]

[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/00-date

### Authors
* Nicholas Barthelemy - https://svn.nbarthelemy.com/date-js/
* Harald Kirshner - mail [at] digitarald.de; http://digitarald.de
* Aaron Newton - aaron [dot] newton [at] cnet [dot] com
* Scott Kyle - scott [at] appden.com; http://appden.com

### License

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

* All of the native date methods work with *get* in addition to most of the *get...* methods added in Date.js. These are: "Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds", "Time", "TimezoneOffset", "Week", "Timezone", "GMTOffset", "Ordinal", "DayOfYear", "LastDayOfMonth", "UTCDate", "UTCDay", "UTCFullYear", "AMPM", "UTCHours", "UTCMilliseconds", "UTCMinutes", "UTCMonth", "UTCSeconds"
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
2. times - (*number*, optional) the number of times to increment (defaults to 1)

### Examples

	new Date().increment('day', 4); //four days from now
	new Date().increment(); //tomorrow
	new Date().increment('year'); //one year from now

### Returns

* (*Date*) This Date.

### Note

* the only acceptable values for interval are **year**, **month**, **week**, **day**, **hour**, **minute**, **second**, and **ms**

Date Method: decrement {#Date:decrement}
----------------------------------------

Decrements a value in the date. See [Date:increment][].

### Returns

* (*Date*) This Date.

### Note

* the only acceptable values for interval are **year**, **month**, **week**, **day**, **hour**, **minute**, **second**, and **ms**


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

* (*number*) the difference in time at the specified resolution

Date Method: get('timezone') {#Date:getTimezone}
------------------------------------------------

Returns the time zone for the date. Example: "GMT".

### Syntax

	new Date().get('timezone'); //"GMT" or whatever

### Returns

* (*string*) the time zone stamp ("GMT" for example);

Date Method: get('gmtoffset') {#Date:getGMTOffset}
--------------------------------------------------

Returns the offset to GMT *as a string*. Example: "-0800".

### Syntax

	new Date().get('gmtoffset'); //"-0800" or whatever

### Returns

* (*string*) the GMT offset

Date Method: get('week') {#Date:getWeek}
----------------------------------------

### Syntax

	new Date().get('week');

### Returns

* (*number*) the week of the year for the date (i.e. 1 - 52).

Date Method: get('ordinal') {#Date:getOrdinal}
----------------------------------------------

### Syntax

	new Date().get('ordinal');

### Returns

* (*string*) the ordinal for the day ('th', 'st', 'nd', etc).

Date Method: get('dayofyear') {#Date:getDayOfYear}
--------------------------------------------------

### Syntax

	new Date().get('dayofyear');

* (*number*) the day of the year (i.e. for Dec. 10, you'll get 344 in a non-leap year).

Date Method: get('lastdayofmonth') {#Date:getLastDayOfMonth}
------------------------------------------------------------

### Syntax

	new Date().get('lastdayofmonth');

### Returns

* (*number*) the last day of the month (i.e. for December, you'll get 31).

Date Method: format {#Date:format}
----------------------------------

Outputs the date into a specific format.

### Syntax

	new Date().format(format);

### Arguments

1. format - (*string*) a string format for the output. Use the keys below with percent signs to get a desired output. Defaults to "%x %X", which renders "12/31/2007 03:45PM"

### Keys
* a - short day ("Mon", "Tue")
* A - full day ("Monday")
* b - short month ("Jan", "Feb")
* B - full month ("January")
* c - the full date to string ("Mon Dec 10 14:35:42 2007"; %a %b %d %H:%m:%S %Y)
* d - the date to two digits (01, 05, etc)
* e - the date as one digit (1, 5, 12, etc)
* H - the hour to two digits in military time (24 hr mode) (00, 11, 14, etc)
* I - the hour as a decimal number using a 12-hour clock (range 01 to 12).
* j - the day of the year to three digits (001 to 366, is Jan 1st)
* k - the hour (24-hour clock) as a digit (range 0 to 23). Single digits are preceded by a blank space.
* l - the hour (12-hour clock) as a digit (range 1 to 12). Single digits are preceded by a blank space.
* L - the time in milliseconds (three digits; "081")
* m - the numerical month to two digits (01 is Jan, 12 is Dec)
* M - the minutes to two digits (01, 40, 59)
* o - the ordinal of the day of the month in the current language ("st" for the 1st, "nd" for the 2nd, etc.)
* p - the current language equivalent of either AM or PM
* s - the Unix Epoch Time timestamp
* S - the seconds to two digits (01, 40, 59)
* T - the time as %H:%M:%S
* U - the week to two digits (01 is the week of Jan 1, 52 is the week of Dec 31)
* w - the numerical day of the week, one digit (0 is Sunday, 1 is Monday)
* x - the date in the current language preferred format. en-US: %m/%d/%Y (12/10/2007)
* X - the time in the current language preferred format. en-US: %I:%M%p (02:45PM)
* y - the short year (two digits; "07")
* Y - the full year (four digits; "2007")
* z - the GMT offset ("-0800")
* Z - the time zone ("GMT")
* % - returns % (example: %y%% = 07%)

### Shortcuts

These shortcuts are NOT preceded by the percent sign.

* db - "%Y-%m-%d %H:%M:%S",
* compact - "%Y%m%dT%H%M%S",
* iso8601 - "%Y-%m-%dT%H:%M:%S%z",
* rfc822 - "%a, %d %b %Y %H:%M:%S %Z",
* rfc2822 - "%a, %d %b %Y %H:%M:%S %z",
* short - "%d %b %H:%M",
* long - "%B %d, %Y %H:%M"

See [Date:defineFormat][] to define new shortcuts.

### Examples

	new Date().format('db'); //1999-12-31 23:59:59
	new Date().format('%x'); //12/31/1999
	new Date().format('%y'); //99

### Returns

* (*string*) the corresponding format for the Date.

Date Method: toISOString {#Date:toISOString}
--------------------------------------------

Outputs the date in the ISO-8601 standard format (i.e. 1999-12-31T19:59:59.000Z).

### Syntax

	new Date().toISOString();  //equivalent to format('iso8601')

### Returns

* (*string*) the date in ISO-8601 format.

Date Method: parse {#Date:parse}
--------------------------------

Parses a string to a date. In the examples below, parsing works with dates using / (slash), - (dash), or . (period). (12.31.2007, 12-31-2007, 12/31/2007).

### Syntax

	Date.parse(date);
	new Date().parse(date);

### Arguments

1. date - (*string*) a string date that has a predefined parser (see [Date:defineParser][])

### Example

	Date.parse('10/12/1982') //"Tue Oct 12 1982 00:00:00 GMT-0700 (Pacific Daylight Time)"
	Date.parse('10/12/1982 10:45pm') //"Tue Oct 12 1982 22:45:00 GMT-0700 (Pacific Daylight Time)"
	Date.parse('10.12.1982 22:45:00') //"Tue Oct 12 1982 22:45:00 GMT-0700 (Pacific Daylight Time)"
	Date.parse('2007-06-08 16:34:52') //"Fri Jun 08 2007 16:34:52 GMT-0700 (Pacific Daylight Time)"
	Date.parse('2007-06-08T16:34:52+0200') //"Fri Jun 08 2007 07:34:52 GMT-0700 (Pacific Daylight Time)"
	Date.parse('Thu Oct 22 08:11:23 +0000 2009') //Thu Oct 12 2009 08:11:23 GMT (Greenwich Mean Time)

	Date.parse('1st') //"Sat Dec 01 2007 00:00:00 GMT-0800 (Pacific Standard Time)"
	Date.parse('14th October') //"Sun Oct 14 2007 00:00:00 GMT-0700 (Pacific Daylight Time)"
	Date.parse('24th May, 2007') //"Thu May 24 2007 00:00:00 GMT-0700 (Pacific Daylight Time)"
	Date.parse('May 3rd 2006 10:45pm') //"Wed May 03 2006 22:45:00 GMT-0700 (Pacific Daylight Time)"

	var PrinceParty = new Date();
	PrinceParty.parse('12/31/1999 11:59pm'); //PrinceParty is now set for 12/31/1999 just before midnight

### Returns

* (*date*) a Date instance with the parsed value as its date.

### Notes

* *Date.js* includes many default parsers, you will get some more if you include *[Date.Extras.js][]*
* You can write your own parsers - see [Date:defineParser][]
* If you execute the *parse* method against an instance of *Date*, that instance will take on the parsed value
* If you execute the *parse* method against the *Date* namespace a new *Date* object is created and returned
* If the date was not able to be parsed, you'll still be returned a native Date object that is not a valid date. Use the [Date:isValid][] method to determine if the parse was successful.

Date Method: isValid {#Date:isValid}
------------------------------------

Returns *true* if the date is a valid date object.

### Syntax

	new Date('foo').isValid();

Static Methods
==============

Static Method: defineFormat {#Date:Date-defineFormat}
-----------------------------------------------------

Adds a new shortcut for [Date:format][].

### Syntax

	Date.defineFormat(name, format);

### Arguments

1. name - (*string*) name of the new format, as lowercase.
2. format - (*string*, *function*) format string (see [Date:format][])

### Example

	Date.defineFormat('time', '%H:%M');
	new Date().format('time');	//17:30

	// also possible to pass a function
	Date.defineFormat('timeago', function(date){
		var now = Date.now();
		return Math.round((now - date) / (1000 * 60)) + ' minutes ago';
	});

Static Method: defineFormats {#Date:Date-defineFormats}
-------------------------------------------------------

Add a new shortcuts for [Date:format][].  Plural form of [Date:defineFormat][].

### Syntax

	Date.defineFormats(formats);

### Arguments

1. formats - (*object*) key/value pairs corresponding to the name and format passed into [Date:defineFormat][]

### Example

	Date.defineFormats({
		time: '%H:%M',
		day: '%A'
	});

Static Method: parse {#Date:Date-staticParse}
---------------------------------------------

See [Date:parse][] above.


Static Method: isValid {#Date:Date-isValid}
-------------------------------------------

See [Date:isValid][] above.

### Syntax

	Date.isValid(dateObj);

Static Method: defineParser {#Date:Date-defineParser}
-----------------------------------------------------

Additional parsers can be authored than those already outlined by default in *Date.js*. If you include *Date.Extras.js* you'll get several more, but you can write your own.

### Syntax

	Date.defineParser(pattern);

### Arguments

- pattern - (*string* or *object*) see descriptions below.

### Pattern String

A pattern string is somewhat of a hybrid between regular expressions and the format strings passed into [Date:format][]. First, an example:

	Date.defineParser('%d%o( %b( %Y)?)?( %X)?');

As you can see, the above pattern (already included in *Date.js*) uses parentheses for grouping with a question mark to denote the preceding item or group as being optional, just as in a regular expression. It parses strings such as:

* 14th
* 31st October
* 1 Jan 2000
* 1 Jan 12:00am

All of the same keys that are supported in [Date:format][] are supported here, except **%c**, **%U**, **%w**, and **%Z**.  However, the matching rules for each key is as loose as possible in order to parse the greatest number of variations.

### Custom Pattern Object

Each custom pattern object has two properties: a regular expression and a handler that is passed the result of that expression executed on the string to be parsed.

	Date.defineParser({
		re: <regularExpression>,
		handler: function(bits){...}
	});

### Notes

The legacy method of adding parsers is still supported but considered deprecated.

	Date.parsePatterns.push(pattern);
	Date.parsePatterns.extend([pattern, pattern, etc]);

Static Method: defineParsers {#Date:Date-defineParsers}
-------------------------------------------------------

Plural form of [Date:defineParser][].

### Syntax

	Date.defineParsers(pattern, pattern, etc.);

### Arguments

1. format - can be multiple format arguments or an array of formats.

Static Method: define2DigitYearStart {#Date:Date-define2DigitYearStart}
-----------------------------------------------------------------------

Define the first year of the 100-year period that 2-digit years will be fall within when parsed.  The default start year is 1970.

### Syntax

	Date.define2DigitYearStart(year)

### Arguments

1. year - (*number*) first year of the 100-year period

### Example

	Date.parse('01/01/00');  //Jan 1, 2000
	Date.parse('12/31/99');  //Dec 31, 1999

	Date.define2DigitYearStart(2000);
	Date.parse('01/01/00');  //Jan 1, 2000
	Date.parse('12/31/99');  //Dec 31, 2099


[Date:increment]: #Date:increment
[Date:parse]: #Date:parse
[Date:format]: #Date:format
[Date:isValid]: #Date:isValid
[Date:defineFormat]: #Date:Date-defineFormat
[Date:defineParser]: #Date:Date-defineParser
[Date:parsePatterns]: #Date:Date-CustomParsers
[Date.Extras.js]: /more/Types/Date.Extras
[Locale]: /more/Locale/Locale
