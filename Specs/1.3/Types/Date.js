/*
Script: Date.js
	Specs for Date.js

License:
	MIT-style license.
*/

(function(global){

describe('Date.clone', function(){

	it('should clone a Date instance', function(){
		var d = new Date(Date.UTC(1999, 11, 31));
		var dc = d.clone();
		expect(d.get('time')).toEqual(dc.get('time'));
	});

	it('the cloned Date should be a new instance of Date', function(){
		var d = new Date(Date.UTC(1999, 11, 31));
		var dc = d.clone();
		dc.set('date', 1);
		expect(d.get('time')).toNotEqual(dc.get('time'));
	});

});

describe('Date.increment', function(){

	// All these tests avoid leap years and daylight savings dates.
	// Other tests may be needed.
	it('should increment a Date instance using milliseconds', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 1, 1, 1, 2));
		d.increment('ms');
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance using seconds', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 1, 1, 2));
		d.increment('second');
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance using minutes', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 1, 2, 1));
		d.increment('minute');
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance using hours', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 2, 1, 1));
		d.increment('hour');
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance (default)', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 21, 1, 1, 1));
		d.increment();
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance using days', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 21, 1, 1, 1));
		d.increment('day');
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance using months', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 11, 20, 1, 1, 1));
		d.increment('month');
		expect(d).toEqual(d2);
	});
	it('should increment a Date instance using years', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1999, 10, 20, 1, 1, 1));
		d.increment('year');
		expect(d).toEqual(d2);
	});

});

describe('Date.decrement', function(){

	// All these tests avoid leap years and daylight savings dates.
	// Other tests may be needed.
	it('should decrement a Date instance using milliseconds', function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 2));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 1));
		d.decrement('ms');
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance using seconds', function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 1, 1, 2));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('second');
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance using minutes', function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 1, 2, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('minute');
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance using hours', function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 2, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('hour');
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance (default)', function(){
		var d =  new Date(Date.UTC(1997, 10, 21, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement();
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance using days', function(){
		var d =  new Date(Date.UTC(1997, 10, 21, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('day');
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance using months', function(){
		var d =  new Date(Date.UTC(1997, 11, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('month');
		expect(d).toEqual(d2);
	});
	it('should decrement a Date instance using years', function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('year');
		expect(d).toEqual(d2);
	});

});

describe('Date.isLeapYear', function(){

	it('should return whether a Date instance is in a leap year', function(){
		var d1 = new Date(Date.UTC(1900, 2, 1));
		d2 = new Date(Date.UTC(2000,2,1));
		d3 = new Date(Date.UTC(2002,2,1));
		d4 = new Date(Date.UTC(2004,2,1));
		expect([d1.isLeapYear(), d2.isLeapYear(), d3.isLeapYear(), d4.isLeapYear()]).toEqual([false, true, false, true]);
		/* better mut messy error output! */
		/*
		var years = $H({'1600':true, '1900':false, '2000':true, '2002':false, '2004':true});
		var result = new Hash(), year, d;
		years.each(function(bool, year){
			d = new Date(Date.UTC(Number(year),0,1));
			result.set(year, d.isLeapYear());
		});
		expect(result).toEqual(years);
		)
		*/
	});

});

describe('Date.clearTime', function(){

	it('should clear the time portion of a Date instance', function(){
		var d =  new Date('Oct 01 1997 10:45:25');
		var d2 = new Date('Oct 01 1997 00:00:00');
		d.clearTime();
		expect(d).toEqual(d2);
	});

});

describe('Date.diff', function(){

	// All these tests avoid leap years and daylight savings dates.
	// Other tests may be needed.
	it('should compare two Date instances (milliseconds)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 0));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 999));
		expect(d.diff(d2, 'ms')).toEqual(999);
	});
	it('should compare two Date instances (seconds)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1,  0));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 10));
		expect(d.diff(d2, 'second')).toEqual(10);
	});
	it('should compare two Date instances (minutes)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1,  0, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 10, 1));
		expect(d.diff(d2, 'minute')).toEqual(10);
	});
	it('should compare two Date instances (hours)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20,  0, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 10, 1, 1));
		expect(d.diff(d2, 'hour')).toEqual(10);
	});
	it('should compare two Date instances (default)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 30, 1, 1, 1));
		expect(d.diff(d2)).toEqual(10);
	});
	it('should compare two Date instances (days)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 30, 1, 1, 1));
		expect(d.diff(d2, 'day')).toEqual(10);
	});
	it('should compare two Date instances (months)', function(){
		var d  = new Date(Date.UTC(1997,  9, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 11, 20, 1, 1, 1));
		expect(d.diff(d2, 'month')).toEqual(2);

		// February bug
		d  = new Date(Date.UTC(1997, 1, 1, 1, 1, 1));
		d2 = new Date(Date.UTC(1997, 2, 1, 1, 1, 1));
		expect(d.diff(d2, 'month')).toEqual(1);
	});
	it('should compare two Date instances (years)', function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1999, 10, 20, 1, 1, 1));
		expect(d.diff(d2, 'year')).toEqual(2);

		// parseInt bug with anything less than 1e-6
		d = new Date(1277244682000);
		d2 = new Date(1277244682237);
		expect(d.diff(d2, 'year')).toEqual(0);
	});

});

describe('Date.getTimezone', function(){

	it('should return the time zone of a Date instance', function(){
		var d = new Date(Date.UTC(2000, 0, 1, 1, 1, 1));
		if (global['Browser'] && Browser.ie) expect(d.get('timezone')).toEqual(new Date(Date.UTC()).get('timezone'));
		else expect(d.get('timezone')).toEqual('GMT');
	});

});

describe('Date.getWeek', function(){

	beforeEach(function(){
		// Make sure we're using monday as first day of week for these specs
		Locale.use(Locale.define('testGetWeek', 'Date', {
			firstDayOfWeek: 1
		}));
	});

	it('should return the week of the year of a Date instance', function(){
		var d = new Date(2007, 0, 1, 1, 1, 1);
		expect(d.get('week')).toEqual(1); // Mon Jan 01 2007
		d.increment('day', 7 * 10 + 2);
		expect(d.get('week')).toEqual(11); // Wed Mar 14 2007
		d.increment('week', 42);
		expect(d.get('week')).toEqual(1); // Wed Jan 02 2008
	});

	it('should return the last week of the previous year if the largest part of the first week is in the previous year', function(){
		var d = new Date(2000, 0, 1, 1, 1, 1);
		expect(d.get('week')).toEqual(52); // Sat Jan 01 2000
		d.increment('year', 21);
		expect(d.get('week')).toEqual(53); // Fri Jan 01 2021
	});

	it('should return the first week of the year if the largest part of the first week is in the current year', function(){
		var d = new Date(2002, 0, 1, 1, 1, 1);
		expect(d.get('week')).toEqual(1); // Tue Jan 01 2002
	});

	it('should return the first week of the next year if the largest part of the last week is in the next year', function(){
		var d = new Date(2012, 11, 31, 1, 1, 1);
		expect(d.get('week')).toEqual(1); // Mon Dec 31 2012
	});

	it('should return the last week of the year if the largest part of the last week is in the current year', function(){
		var d = new Date(2010, 11, 31, 1, 1, 1);
		expect(d.get('week')).toEqual(52); // Fri Dec 31 2010
		d.increment('year', 10);
		expect(d.get('week')).toEqual(53); // Thu Dec 31 2020
	});

	it('should return week 2 for Jan 07, when Jan 01 is on a tuesday', function(){
		var d = new Date(2002, 0, 7, 1, 1, 1);
		expect(d.get('week')).toEqual(2); // Mon Jan 07 2002
	});

	it('should return different week numbers depending on the culture', function(){
		var locale = new Locale.Set('custom');
		Locale.use(locale);

		var d = new Date(2000, 11, 31, 1, 1, 1); // Sun Dec 31 2000
		locale.define('Date', 'firstDayOfWeek', 1); // Monday
		expect(d.get('week')).toEqual(52);
		locale.define('Date', 'firstDayOfWeek', 0); // Sunday
		expect(d.get('week')).toEqual(54);
		locale.define('Date', 'firstDayOfWeek', 6); // Saturday
		expect(d.get('week')).toEqual(53);

		d.increment('day', 1827); // Sun Jan 01 2006
		locale.define('Date', 'firstDayOfWeek', 1); // Monday
		expect(d.get('week')).toEqual(52);
		locale.define('Date', 'firstDayOfWeek', 0); // Sunday
		expect(d.get('week')).toEqual(1);
		locale.define('Date', 'firstDayOfWeek', 6); // Saturday
		expect(d.get('week')).toEqual(1);

		Locale.use('en-US');

	});

	afterEach(function(){
		// set back to en-US for further testing
		Locale.use('en-US');
	});

});

describe('Date.format', function(){

	it('should format a Date instance as a string', function(){
		Locale.use('en-US');
		var d = new Date('Thu Nov 20 1997 01:02:03');
		var d2 = new Date('Thu Nov 2 1997 20:02:03');
		expect(d.format('%a')).toEqual(Date.getMsg('days_abbr')[4]);
		expect(d.format('%a')).toEqual('Thu');

		expect(d.format('%A')).toEqual(Date.getMsg('days')[4]);
		expect(d.format('%A')).toEqual('Thursday');

		expect(d.format('%b')).toEqual(Date.getMsg('months_abbr')[10]);
		expect(d.format('%b')).toEqual('Nov');

		expect(d.format('%B')).toEqual(Date.getMsg('months')[10]);
		expect(d.format('%B')).toEqual('November');

		expect(d.format('%c')).toEqual("Thu Nov 20 01:02:03 1997");

		expect(d.format('%d')).toEqual('20');
		expect(d2.format('%d')).toEqual('02');

		expect(d.format('%e')).toEqual('20');
		expect(d2.format('%e')).toEqual(' 2');

		expect(d.format('%H')).toEqual('01');
		expect(d.format('%I')).toEqual('01');
		expect(d.format('%k')).toEqual(' 1');
		expect(d2.format('%l')).toEqual(' 8');


		expect(d.format('%j')).toEqual('324');
		expect(d.format('%m')).toEqual('11');
		expect(d.format('%M')).toEqual('02');
		expect(d.format('%p')).toEqual('AM');
		expect(d.format('%S')).toEqual('03');
		expect(d.format('%T')).toEqual('01:02:03');
		expect(d.format('%U')).toEqual('47');
		//expect(d.format('%W')).toEqual(''); // not implemented
		expect(d.format('%w')).toEqual('4');
		expect(d.format('%x')).toEqual('11/20/1997');
		expect(d.format('%X')).toEqual('01:02AM');
		expect(d.format('%y')).toEqual('97');
		expect(d.format('%Y')).toEqual('1997');
		//expect(d.format('%z')).toEqual('+0000');
		if (global['Browser'] && Browser.ie) expect(d.format('%Z')).toEqual(new Date(Date.UTC()).get('timezone'));
		else expect(d.format('%Z')).toEqual('GMT');
		expect(d.format('%y%')).toEqual('97%');

		expect(d.format('db')).toEqual(d.format('%Y') + '-' + d.format('%m') + '-' + d.format('%d') + ' ' + d.format('%H') + ':' + d.format('%M') + ':' + d.format('%S'));
		expect(d.format('db')).toEqual('1997-11-20 01:02:03');

		expect(d.format('compact')).toEqual(d.format('%Y') + d.format('%m') + d.format('%d') + 'T' + d.format('%H') + d.format('%M') + d.format('%S')); // missing!
		expect(d.format('compact')).toEqual('19971120T010203'); // missing!

		expect(d.format('iso8601')).toEqual('1997-11-20T00:02:03.000Z');

		expect(d.format('short')).toEqual(d.format('%d') + ' ' + d.format('%b') + ' ' + d.format('%H') + ':' + d.format('%M'));
		expect(d.format('short')).toEqual('20 Nov 01:02');

		expect(d.format('long')).toEqual(d.format('%B') + ' ' + d.format('%d') + ', ' + d.format('%Y') + ' ' + d.format('%H') + ':' + d.format('%M'));
		expect(d.format('long')).toEqual('November 20, 1997 01:02');


		// Thu, 20 Nov 1997 01:02:03 GMT
		expect(d.format('rfc822')).toEqual(d.format('%a') + ', ' + d.format('%d') + ' ' + d.format('%b') + ' ' + d.format('%Y') + ' ' + d.format('%H') + ':' + d.format('%M') + ':' + d.format('%S') + ' ' + d.format('%Z'));

		if (global['Browser'] && Browser.ie) expect(d.format('rfc822')).toEqual('Thu, 20 Nov 1997 01:02:03 ' + new Date(Date.UTC()).get('timezone'));
		else expect(d.format('rfc822')).toEqual('Thu, 20 Nov 1997 01:02:03 GMT');

		//Thu, 20 Nov 1997 01:02:03 +0100
		expect(d.format('rfc2822')).toEqual(d.format('%a') + ', ' + d.format('%d') + ' ' + d.format('%b') + ' ' + d.format('%Y') + ' ' + d.format('%H') + ':' + d.format('%M') + ':' + d.format('%S') + ' ' + d.format('%z'));

	});

	it('should return accented dates in correct abbreviated form', function(){
		Locale.use('fr-FR');
		d = new Date('Thu Feb 20 1997 01:02:03');
		expect(d.format('%b')).toEqual('févr.');
		Locale.use('en-US');
	});

});

describe('Date.getOrdinal', function(){

	it('should get the ordinal for a Date instance', function(){
		Date.$culture = 'GB';
		var d = new Date(1999, 11, 1);
		expect(d.get('ordinal')).toEqual('st');
		d.increment();
		expect(d.get('ordinal')).toEqual('nd');
		d.increment();
		expect(d.get('ordinal')).toEqual('rd');
		d.increment();
		expect(d.get('ordinal')).toEqual('th');
		d.increment('day', 17);
		expect(d.get('ordinal')).toEqual('st');
		d.increment();
		expect(d.get('ordinal')).toEqual('nd');
		d.increment();
		expect(d.get('ordinal')).toEqual('rd');
		d.increment();
		expect(d.get('ordinal')).toEqual('th');
		d.increment('day', 7);
		expect(d.get('ordinal')).toEqual('st');
	});

});

describe('Date.getDayOfYear', function(){

	it('should get the day of the year for a Date instance', function(){
		var d = new Date(1999, 0, 1, 1, 1, 1, 1);
		expect(d.get('dayofyear')).toEqual(1); // 1st jan 1999
		d.increment();
		expect(d.get('dayofyear')).toEqual(2); //2nd jan 1999
		d.increment('day', 364);
		expect(d.get('dayofyear')).toEqual(1); // 1st jan 2000 - a leap year
		d.increment('day', 365); // should stay in the same year!
		expect(d.get('dayofyear')).toEqual(366);
	});

});

describe('Date.getLastDayOfMonth', function(){

	it('should get the last day of the month for a Date instance', function(){
		var d = new Date(1999, 0, 1, 1, 1, 1, 1);
		expect(d.get('lastdayofmonth')).toEqual(31); // 1st jan 1999
		d.increment('day', 31);
		expect(d.get('lastdayofmonth')).toEqual(28); // 1st Feb 1999
		d.increment('day', 365); // 29th feb 2000 - a leap year!
		expect(d.get('lastdayofmonth')).toEqual(29);
	});

});

describe('Date.isValid', function(){

	it('should return a proper response for isValid', function(){
		expect(new Date().isValid()).toEqual(true);
		expect(Date.isValid(new Date())).toEqual(true);
		expect(new Date('foo').isValid()).toEqual(false);
		expect(Date.isValid(new Date('foo'))).toEqual(false);
	});

});

describe('Date.parse', function(){

	it('should parse a string datestamp', function(){
		expect(Date.parse('1277244682000')).toEqual(new Date(1277244682000));
	});

	it('should parse zero into a date', function(){
		expect(Date.parse(0)).toEqual(new Date(0));
	});

	it('should parse a millisecond value into a date', function(){
		var d = new Date(Date.UTC(2000, 0, 1, 1, 1, 1));
		expect(Date.parse(d.getTime())).toEqual(d);
	});

	it('should parse a string value into a date', function(){
//		Reverse parsing localized date strings?
//		Locale.list().each(function(lang){
//			Locale.use(lang);

			var d = new Date(2000, 11, 2, 0, 0, 0, 0);
			expect(Date.parse(d.format('%x'))).toEqual(d);
			expect(Date.parse(d.format('%b %d %Y'))).toEqual(d);
			expect(Date.parse(d.format('%d %B %Y'))).toEqual(d);
			expect(Date.parse(d.format('%Y %b %d'))).toEqual(d);
			expect(Date.parse(d.format('%o %b %d %X %z %Y'))).toEqual(d);

			['-', '.', '/'].each(function(punc){
				expect(Date.parse(d.format('%x').replace(/[-.\/]/g, punc))).toEqual(d);
				expect(Date.parse(d.format('%Y' + punc + '%m' + punc + '%d'))).toEqual(d);
			});

			d = new Date(2000, 11, 2, 22, 45, 0, 0);
			expect(Date.parse(d.format('%x %X'))).toEqual(d);
			expect(Date.parse(d.format('%B %d %Y %X'))).toEqual(d);
			expect(Date.parse(d.format('%d %b %Y %H:%M'))).toEqual(d);
			expect(Date.parse(d.format('iso8601'))).toEqual(d);
			expect(Date.parse(d.format('compact'))).toEqual(d);
			expect(Date.parse(d.format('db'))).toEqual(d);
			expect(Date.parse(d.format('long'))).toEqual(d);

			d = new Date(2000, 0, 1, 0, 0, 0, 0);
			expect(Date.parse('2000')).toEqual(d);

			d = new Date().clearTime();
			expect(Date.parse(d.set({date: 1, mo: d.getMonth()}).format('%B'))).toEqual(d);

			d = new Date().set({hours: 22, minutes: 45, seconds: 15});
			expect(Date.parse('22:45:15').format('compact')).toEqual(d.format('compact'));

			expect(Date.parse('22:45').format('%H:%M')).toEqual('22:45');
			expect(Date.parse('10:45pm').format('%H:%M')).toEqual('22:45');
			expect(Date.parse('11:45 AM').format('%H:%M')).toEqual('11:45');

//		});
//		Locale.use('en-US');
	});

	it('should consistently parse dates on any day/month/year', function(){
		// Monkey patch clearTime so parsing starts on Jan 1, 2001
		var clearTime = Date.prototype.clearTime;
		Date.prototype.clearTime = function(){
			return clearTime.call(this.set({mo: 0, date: 30, year: 2001}));
		};

		var d = new Date(2000, 1, 29, 0, 0, 0, 0);
		expect(Date.parse(d.format('%B %d %Y'))).toEqual(d);

		Date.prototype.clearTime = clearTime;
	});


	it('should parse 1st, Oct 31 and 31 Oct correctly', function(){

		var now = new Date();
		expect(Date.parse('1st').format('%m/%d')).toEqual(now.format('%m/01'));

		expect(Date.parse('1st Oct').format('%m/%d')).toEqual('10/01');
		expect(Date.parse('Oct 1st').format('%m/%d')).toEqual('10/01');

		expect(Date.parse('31 Oct').format('%m/%d')).toEqual('10/31');
		expect(Date.parse('Oct 31').format('%m/%d')).toEqual('10/31');

	});

});

})(this);
