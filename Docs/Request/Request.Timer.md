Class: Request.Timer {#Request-Timer}
=====================================

Request.Timer requests the same URL periodically but increases the interval if no data is returned from the requested server.
This helps reducing load on a server and prevents pointless requests. If any valid response data is returned it resets the interval
and requests more often.

### Extends

* [Request][]

### Implements

* [Options][], [Events][]

### Syntax

	new Request.Timer(options);

### Options

* initialDelay - (*number*; defaults to 5000) The initial delay to wait for the request after a call to the start method
* delay - (*number*; defaults to 5000) The delay between requests and the number of ms to add if no valid data has been returned
* limit - (*number*; defaults to 60000) The maximum time the interval uses to request the server

### Example

	new Request.Timer({
		method: 'post',
		url: 'foo.php',
		initialDelay: 1000,
		delay: 5000,
		limit: 15000
	}).start({
		myData: 'value'
	});
	// Requests foo.php via post and the provided data initially a second after
	// calling the start method. If any valid response data is returned it requests
	// every five seconds. If no data is retrieved it adds five seconds to the
	// interval until the next request that returns data resets the interval.
	// This example uses a limit so the maximum interval will be 15 seconds.

Request.Timer Method: start {#Request-Timer:start}
------------------------------------------------------

Starts requesting the URL given by the initial options

### Syntax

	myRequest.start(data);

### Arguments

1. data - (*object*) The data you want to send along with your requests

### Example

	var foo = new Request.Timer({url: 'foo.php'});
	foo.start({myData: 'value'});

### Returns

* *object* - This instance of Request.Timer.

Request.Timer Method: stop {#Request-Timer:stop}
------------------------------------------------------

Stops the timer and does not execute any more requests beside an already running request.

### Syntax

	myRequest.stop();

### Returns

* *object* - This instance of Request.Timer.

Class: Request.HTML.Timer {#Request-HTML-Timer}
===============================================

An extension of [Request.HTML][] that uses the same options, methods and conventions as [Request.Timer][].

Class: Request.JSON.Timer {#Request-JSON-Timer}
===============================================

An extension of [Request.JSON][] that uses the same options, methods and conventions as [Request.Timer][].


[Events]: http://www.mootools.net/docs/Class/Class.Extras#Events
[Options]: http://www.mootools.net/docs/Class/Class.Extras#Options
[Request]: http://www.mootools.net/docs/Request/Request
[Request.HTML]: http://www.mootools.net/docs/Request/Request.HTML
[Request.JSON]: http://www.mootools.net/docs/Request/Request.JSON
[Request.Timer]: #Request-Timer