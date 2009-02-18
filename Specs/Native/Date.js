/*
Script: Date.js
	Specs for Date.js

License:
	MIT-style license.
*/

describe('String.repeat', {

	'should repeat (concatenate) a string a specified number of times': function(){
		value_of('fab'.repeat(3)).should_be('fabfabfab');
	}

});

describe('String.zeroise', {

	'should pad a string with zeros up to the length specified': function(){
		value_of('1234'.zeroise(6)).should_be('001234');
	}

});

describe('Number.zeroise', {

	'should convert an integer to a string and pad that string with zeros up to the length specified': function(){
		value_of(Number(1234).zeroise(6)).should_be('001234');
	}

});

describe('Date.clone', {

	'should clone a Date instance': function(){
		var d = new Date(Date.UTC(1999, 11, 31));
    var dc = d.clone();
		value_of(d.get('time')).should_be(dc.get('time'));
	},

	'the cloned Date should be a new instance of Date': function(){
		var d = new Date(Date.UTC(1999, 11, 31));
    var dc = d.clone();
    dc.set('date', 1);
		value_of(d.get('time')).should_not_be(dc.get('time'));
  }

});

describe('Date.increment', {
  /* All these tests avoid leap years and daylight savings dates.
   * Other tests may be needed. */
	'should increment a Date instance using milliseconds': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 1, 1, 1, 2));
		d.increment('ms');
		expect(d).should_be(d2);
	},
	'should increment a Date instance using seconds': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 1, 1, 2));
		d.increment('second');
		expect(d).should_be(d2);
	},
	'should increment a Date instance using minutes': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 1, 2, 1));
		d.increment('minute');
		expect(d).should_be(d2);
	},
	'should increment a Date instance using hours': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 20, 2, 1, 1));
		d.increment('hour');
		expect(d).should_be(d2);
	},
	'should increment a Date instance (default)': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 21, 1, 1, 1));
		d.increment();
		expect(d).should_be(d2);
	},
	'should increment a Date instance using days': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 10, 21, 1, 1, 1));
		d.increment('day');
		expect(d).should_be(d2);
	},
	'should increment a Date instance using months': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1998, 11, 20, 1, 1, 1));
		d.increment('month');
		expect(d).should_be(d2);
	},
	'should increment a Date instance using years': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1999, 10, 20, 1, 1, 1));
		d.increment('year');
		expect(d).should_be(d2);
	}

});

describe('Date.decrement', {

  /* All these tests avoid leap years and daylight savings dates.
   * Other tests may be needed. */
	'should decrement a Date instance using milliseconds': function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 2));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 1));
		d.decrement('ms');
		expect(d).should_be(d2);
	},
	'should decrement a Date instance using seconds': function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 1, 1, 2));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('second');
		expect(d).should_be(d2);
	},
	'should decrement a Date instance using minutes': function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 1, 2, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('minute');
		expect(d).should_be(d2);
	},
	'should decrement a Date instance using hours': function(){
		var d =  new Date(Date.UTC(1997, 10, 20, 2, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('hour');
		expect(d).should_be(d2);
	},
	'should decrement a Date instance (default)': function(){
		var d =  new Date(Date.UTC(1997, 10, 21, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement();
		expect(d).should_be(d2);
	},
	'should decrement a Date instance using days': function(){
		var d =  new Date(Date.UTC(1997, 10, 21, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('day');
		expect(d).should_be(d2);
	},
	'should decrement a Date instance using months': function(){
		var d =  new Date(Date.UTC(1997, 11, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('month');
		expect(d).should_be(d2);
	},
	'should decrement a Date instance using years': function(){
		var d =  new Date(Date.UTC(1998, 10, 20, 1, 1, 1));
		var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
		d.decrement('year');
		expect(d).should_be(d2);
	}

});

describe('Date.isLeapYear', {

	'should return whether a Date instance is in a leap year': function(){
		var d1 = new Date(Date.UTC(1900, 2, 1));
    d2 = new Date(Date.UTC(2000,2,1));
    d3 = new Date(Date.UTC(2002,2,1));
    d4 = new Date(Date.UTC(2004,2,1));
		expect([d1.isLeapYear(), d2.isLeapYear(), d3.isLeapYear(), d4.isLeapYear()]).should_be([false, true, false, true]);
		/* better mut messy error output! */
		/*
    var years = $H({'1600':true, '1900':false, '2000':true, '2002':false, '2004':true});
		var result = new Hash(), year, d;
		years.each(function(bool, year){
      d = new Date(Date.UTC(Number(year),0,1));
		  result.set(year, d.isLeapYear());
    });
		expect(result).should_be(years);
    )
    */
	}

});

describe('Date.clearTime', {

	'should clear the time portion of a Date instance': function(){
    var d =  new Date('Oct 01 1997 10:45:25');
		var d2 = new Date('Oct 01 1997 00:00:00');
    d.clearTime();
		expect(d).should_be(d2);
	}

});

describe('Date.diff', {
  /* All these tests avoid leap years and daylight savings dates.
   * Other tests may be needed. */

	'should compare two Date instances (milliseconds)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 0));
    var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 1, 999));
    value_of(d.diff(d2, 'ms')).should_be(999);
	},
	'should compare two Date instances (seconds)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1,  0));
    var d2 = new Date(Date.UTC(1997, 10, 20, 1, 1, 10));
    value_of(d.diff(d2, 'second')).should_be(10);
	},
	'should compare two Date instances (minutes)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1,  0, 1));
    var d2 = new Date(Date.UTC(1997, 10, 20, 1, 10, 1));
    value_of(d.diff(d2, 'minute')).should_be(10);
	},
	'should compare two Date instances (hours)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20,  0, 1, 1));
    var d2 = new Date(Date.UTC(1997, 10, 20, 10, 1, 1));
    value_of(d.diff(d2, 'hour')).should_be(10);
	},
	'should compare two Date instances (default)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
    var d2 = new Date(Date.UTC(1997, 10, 30, 1, 1, 1));
    value_of(d.diff(d2)).should_be(10);
	},
	'should compare two Date instances (days)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
    var d2 = new Date(Date.UTC(1997, 10, 30, 1, 1, 1));
    value_of(d.diff(d2, 'day')).should_be(10);
	},
	'should compare two Date instances (months)': function(){
		var d  = new Date(Date.UTC(1997,  9, 20, 1, 1, 1));
    var d2 = new Date(Date.UTC(1997, 11, 20, 1, 1, 1));
    value_of(d.diff(d2, 'month')).should_be(2);
	},
	'should compare two Date instances (years)': function(){
		var d  = new Date(Date.UTC(1997, 10, 20, 1, 1, 1));
    var d2 = new Date(Date.UTC(1999, 10, 20, 1, 1, 1));
    value_of(d.diff(d2, 'year')).should_be(2);
	}

});

describe('Date.getTimezone', {

	'should return the time zone of a Date instance': function(){
		var d = new Date(Date.UTC(2000, 0, 1, 1, 1, 1));
    if (Browser.Engine.trident) value_of(d.get('timezone')).should_be(new Date(Date.UTC()).get('timezone'));
		else value_of(d.get('timezone')).should_be('GMT');
	}

});

describe('Date.getWeek', {

	'should return the week of the year of a Date instance': function(){
		var d = new Date(2000, 0, 1, 1, 1, 1);
		value_of(d.get('week')).should_be(1);
		d.increment('day', 7 * 10 + 1);
		value_of(d.get('week')).should_be(11);
		d.increment('week', 42);
		value_of(d.get('week')).should_be(1);
	}

});

describe('Date.format', {

	'should format a Date instance as a string': function(){
		var d = new Date('Thu Nov 20 1997 01:02:03');
		value_of(d.format('%a')).should_be(Date.lang.get('days', 4).substr(0,3));
		value_of(d.format('%a')).should_be('Thu');

		value_of(d.format('%A')).should_be(Date.lang.get('days', 4));
		value_of(d.format('%A')).should_be('Thursday');

		value_of(d.format('%b')).should_be(Date.lang.get('months', 10).substr(0,3));
		value_of(d.format('%b')).should_be('Nov');

		value_of(d.format('%B')).should_be(Date.lang.get('months', 10));
		value_of(d.format('%B')).should_be('November');

    //value_of(d.format('%c')).should_be('Thu Nov 20 1997 01:02:03 GMT+0000 (GMT Standard Time)');
    /* This is never going to work consistantly...
     * "Tue Apr 08 2008 17:55:39 GMT+0100 (GMT Daylight Time)"
     * "Tue Apr 08 2008 17:55:39 GMT+0100 (GMT Standard Time)"
     * "Tue Apr 08 2008 17:55:39 GMT+0100 (Pacific Standard Time)"
     * The timezone the browser is in changes the offset/timezone parts! */

		value_of(d.format('%d')).should_be('20');
		value_of(d.format('%H')).should_be('01');
		value_of(d.format('%I')).should_be('1');
		value_of(d.format('%j')).should_be('324');
		value_of(d.format('%m')).should_be('11');
		value_of(d.format('%M')).should_be('02');
		value_of(d.format('%p')).should_be('AM');
		value_of(d.format('%S')).should_be('03');
		value_of(d.format('%U')).should_be('47');
		//value_of(d.format('%W')).should_be(''); // not implemented
		value_of(d.format('%w')).should_be('4');
		value_of(d.format('%x')).should_be('11/20/1997');
		value_of(d.format('%X')).should_be('1:02AM');
		value_of(d.format('%y')).should_be('97');
		value_of(d.format('%Y')).should_be('1997');
		//value_of(d.format('%T')).should_be('+0000');
		if (Browser.Engine.trident) value_of(d.format('%Z')).should_be(new Date(Date.UTC()).get('timezone'));
		else value_of(d.format('%Z')).should_be('GMT');
		value_of(d.format('%y%')).should_be('97%');

		value_of(d.format('db')).should_be(d.format('%Y') + '-' + d.format('%m') + '-' + d.format('%d') + ' ' + d.format('%H') + ':' + d.format('%M') + ':' + d.format('%S'));
		value_of(d.format('db')).should_be('1997-11-20 01:02:03');

		value_of(d.format('compact')).should_be(d.format('%Y') + d.format('%m') + d.format('%d') + 'T' + d.format('%H') + d.format('%M') + d.format('%S')); // missing!
		value_of(d.format('compact')).should_be('19971120T010203'); // missing!

		value_of(d.format('iso8601')).should_be(d.format('%Y') + '-' + d.format('%m') + '-' + d.format('%d') + 'T' + d.format('%H') + ':' + d.format('%M') + ':' + d.format('%S') + d.format('%T'));
		//value_of(d.format('iso8601')).should_be('1997-11-20T01:02:03+0000');

		value_of(d.format('rfc822')).should_be(d.format('%a') + ', ' + d.format('%d') + ' ' + d.format('%b') + ' ' + d.format('%Y') + ' ' + d.format('%H') + ':' + d.format('%M') + ':' + d.format('%S') + ' ' + d.format('%Z'));

		if (Browser.Engine.trident) value_of(d.format('rfc822')).should_be('Thu, 20 Nov 1997 01:02:03 ' + new Date(Date.UTC()).get('timezone'));
		else value_of(d.format('rfc822')).should_be('Thu, 20 Nov 1997 01:02:03 GMT');

		value_of(d.format('short')).should_be(d.format('%d') + ' ' + d.format('%b') + ' ' + d.format('%H') + ':' + d.format('%M'));
		value_of(d.format('short')).should_be('20 Nov 01:02');

		value_of(d.format('long')).should_be(d.format('%B') + ' ' + d.format('%d') + ', ' + d.format('%Y') + ' ' + d.format('%H') + ':' + d.format('%M'));
		value_of(d.format('long')).should_be('November 20, 1997 01:02');

	}
});

describe('Date.parse', {

	'should parse a millisecond value into a date': function(){
		var d = new Date(Date.UTC(2000, 0, 1, 1, 1, 1));
		value_of(Date.parse(d.getTime())).should_be(d);
	},

	'should parse a string value into a date': function(){
		$H(Date.$cultures).each(function(v, k){
			Date.$culture = k;
			var d = new Date(2000, 11, 2, 0, 0, 0, 0);
			value_of(Date.parse(d.format('%x')).clearTime()).should_be(d);
			d = new Date(2000, 11, 2, 22, 45, 0, 0);
			value_of(Date.parse(d.format('%x %X')).set('sec',0).set('ms',0)).should_be(d);
		});
	}

});
