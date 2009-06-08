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

In addition to the two default parsers included in *[Date.js][]*, *Date.Extras.js* includes some additional parsers.

### Examples

	Date.parse('today') //"Mon Dec 10 2007 00:00:00 GMT-0800 (Pacific Standard Time)"
	Date.parse('tomorrow') //"Tue Dec 11 2007 00:00:00 GMT-0800 (Pacific Standard Time)"
	Date.parse('yesterday') //"Sun Dec 09 2007 00:00:00 GMT-0800 (Pacific Standard Time)"
	Date.parse('next monday') //"Mon Dec 17 2007 00:00:00 GMT-0800 (Pacific Standard Time)"
	Date.parse('last wednesday') //"Wed Dec 05 2007 00:00:00 GMT-0800 (Pacific Standard Time)"

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

Date.Extras Language Localization {#Localization}
==========================================

*Date.Extras.js* includes the following key/values for localization.

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

[Date.js]: /more/Native/Date
[Date:parse]: /more/Native/Date#Date:parse
