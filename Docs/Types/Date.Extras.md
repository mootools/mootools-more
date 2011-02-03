Type Date {#Date}
===================

Extends the *Date* Type to include more powerful parsing and formatting functions; this is a further extention and depends on *[Date.js][]*.

### Authors

* Nicholas Barthelemy - https://svn.nbarthelemy.com/date-js/
* Harald Kirshner - mail [at] digitarald.de ; http://digitarald.de
* Aaron Newton - aaron [dot] newton [at] cnet [dot] com
* Scott Kyle - scott [at] appden.com; http://appden.com

### Tutorial/Demo

* [Online Tutorial/Demo][]

[Online Tutorial/Demo]: http://www.clientcide.com/wiki/cnet-libraries/03-native/01-date.extras

### License

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

### See Also

- [Date:parse][]

Date Method: timeDiff {#Date:timeDiff}
--------------------------------------

Returns the difference between two dates in a compact format.

### Syntax

	date.timeDiff([to, separator]);

### Arguments

1. to - (*date*) the date to compare to; defaults to the current time.
2. separator - (*string*, defaults to ':') the string used to separate the values.

### Example

	var example = new Date();
	example.timeDiff(); //0s
	example.decrement('minute');
	example.timeDiff(); //1m:0s
	example.decrement('hour');
	example.timeDiff(); //1h:1m:0s
	example.increment('hour', 2);
	example.timeDiff(); //3h:1m:0s

### Returns

* (*string*) the compact representation of the differences in the times.

Date Method: timeDiffInWords {#Date:timeDiffInWords}
--------------------------------------------------

### Syntax

	date.timeDiffInWords([to]);

### Arguments

1. to - (*date*, optional) an optional date to use for the differential. Defaults to the current date/time.

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

[Date.js]: /more/Types/Date
[Date:parse]: /more/Types/Date#Date:parse
