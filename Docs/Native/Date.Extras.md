Native Date {#Date}
===================

Extends the *Date* native to include more powerful parsing and formatting functions; this is a further extention and depends on *[Date.js][]*.

### Authors

* Nicholas Barthelemy - https://svn.nbarthelemy.com/date-js/
* Harald Kirshner - mail [at] digitarald.de ; http://digitarald.de
* Aaron Newton - aaron [dot] newton [at] cnet [dot] com

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/03-native/01-date.extras

### License:

MIT-style license
	Extra Date Parsers: {#Date:parsers}
-----------------------------------

In addition to the two default parsers included in *[Date.js][]*, *Date.Extras.js* includes numerous additional parsers.

### Examples

	Date.parse('2007-06-08T16:34:52+0200') = "Fri Jun 08 2007 07:34:52 GMT-0700 (Pacific Daylight Time)"
	Date.parse('today') = "Mon Dec 10 2007 11:53:25 GMT-0800 (Pacific Standard Time)"
	Date.parse('tomorrow') = "Tue Dec 11 2007 11:53:25 GMT-0800 (Pacific Standard Time)"
	Date.parse('yesterday') = "Sun Dec 09 2007 11:53:25 GMT-0800 (Pacific Standard Time)"
	Date.parse('next monday') = "Mon Dec 17 2007 11:53:25 GMT-0800 (Pacific Standard Time)"
	Date.parse('1st') = "Sat Dec 01 2007 11:53:25 GMT-0800 (Pacific Standard Time)"
	Date.parse('14th October') = "Sun Oct 14 2007 11:53:25 GMT-0700 (Pacific Daylight Time)"
	Date.parse('24th May, 2007') = "Thu May 24 2007 11:53:25 GMT-0700 (Pacific Daylight Time)"
	Date.parse('May 3rd 2006') = "Wed May 03 2006 11:53:25 GMT-0700 (Pacific Daylight Time)"

### See Also:

- [Date:parse][]

Date Method: timeDiffInWords {#Date:timeDiffInWords}
--------------------------------------------------

### Syntax

	date.timeDiffInWords([otherDate]);

### Arguments

1. otherDate - (*date*; optional) an optional date to use for the differential. Defaults to the current date/time.

### Example

	var example = new Date();
	example.timeDiffInWords(); //less than a minute ago
	example.decrement('hour');
	example.timeDiffInWords(); //about an hour ago
	example.increment('hour', 2);
	example.timeDiffInWords(); //about an hour from now

### Returns

* (*string*) the friendly version of the duration since the date

### Note

This method is now an alias for the old *Date.timeAgoInWords*.

Date Method: get('ordinal'){#Date:getOrdinal}
------------------------------------------

### Syntax

	new Date().get('ordinal');

### Returns

* (*string*) the ordinal for the day ('th', 'st', 'nd', etc).

Date Method: get('dayofyear'){#Date:getDayOfYear}
----------------------------------------------

### Syntax

	new Date().get('dayofyear');

* (*integer*) the day of the year (i.e. for Dec. 10, you'll get 344 in a non-leap year).

Date Method: get('lastdayofmonth'){#Date:getLastDayOfMonth}
---------------------------------------------------

### Syntax

	new Date().get('lastdayofmonth');

### Returns

* (*integer*) the last day of the month (i.e. for December, you'll get 31).

Date.Extras Language Localization {#Localization}
==========================================

*Date.Extras.js* includes the following key/values for localization.

* ordinal - (*function*) A method that returns the proper ordinal ("th", "st", "nd", etc) given a day of the month.
* lessThanMinuteAgo - (*string*) 'less than a minute ago'
* minuteAgo - (*string*) 'about a minute ago'
* minutesAgo - (*string*) '{delta} minutes ago' where {delta} is the number of minutes
* hourAgo - (*string*) 'about an hour ago'
* hoursAgo - (*string*) 'about {delta} hours ago' where {delta} is the number of hours
* dayAgo - (*string*) '1 day ago'
* daysAgo - (*string*) '{delta} days ago' where {delta} is the number of days
* lessThanMinuteUntil - (*string*) 'less than a minute from now'
* minuteUntil - (*string*) 'about a minute from now'
* minutesUntil - (*string*) '{delta} minutes from now' where {delta} is the number of minutes
* hourUntil - (*string*) 'about an hour from now'
* hoursUntil - (*string*) 'about {delta} hours from now' where {delta} is the number of hours
* dayUntil - (*string*) '1 day from now'
* daysUntil - (*string*) '{delta} days from now' where {delta} is the number of days

[Date.js]: /docs/more/Native/Date
[Date:parse]: /docs/more/Native/Date#Date:parse
