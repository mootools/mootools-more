Class: Request Periodical {#Request}
====================================

*Request.Periodical.js* extends [Request][], [Request.HTML][], and [Request.JSON][] to add methods that periodically request the same
URL but increase the interval if no data is returned from the server. This helps reducing load on a server and prevents pointless requests.
If any valid response data is returned it resets the interval and executes more requests again.

### Extends

* [Request][], [Request.HTML][], and [Request.JSON][]

Request Method: constructor
---------------------------

### Syntax

	var myRequest = new Request(options);
	myRequest.startTimer(data);

### Options

* all the options in the original Request.* class, plus:
* initialDelay - (*number*; defaults to 5000) The initial delay to wait for the request after a call to the start method
* delay - (*number*; defaults to 5000) The delay between requests and the number of ms to add if no valid data has been returned
* limit - (*number*; defaults to 60000) The maximum time the interval uses to request the server

### Example

	new Request({
		method: 'post',
		url: 'foo.php',
		initialDelay: 1000,
		delay: 5000,
		limit: 15000
	}).startTimer({
		myData: 'value'
	});
	// Requests foo.php via post and the provided data initially a second after
	// calling the start method. If any valid response data is returned it requests
	// every five seconds. If no data is retrieved it adds five seconds to the
	// interval until the next request that returns data resets the interval.
	// This example uses a limit so the maximum interval will be 15 seconds.

Request Method: startTimer {#Request:startTimer}
------------------------------------------------------

Starts requesting the URL given by the initial options

### Syntax

	myRequest.startTimer(data);

### Arguments

1. data - (*object*) The data you want to send along with your requests

### Example

	var foo = new Request({url: 'foo.php'});
	foo.startTimer({myData: 'value'});

### Returns

* *object* - This instance of Request.

Request Method: stopTimer {#Request:stopTimer}
------------------------------------------------------

Stops the timer and does not execute any more requests beside an already running request.

### Syntax

	myRequest.stopTimer();

### Returns

* *object* - This instance of Request.

[Request]: /core/Request/Request
[Request.HTML]: /core/Request/Request.HTML
[Request.JSON]: /core/Request/Request.JSON
[Request.Periodical]: #Request-Periodical
