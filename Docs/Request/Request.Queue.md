Class: Request.Queue {#Request-Queue}
=====================================

A controller class for [Request][] instances (and its subclasses) that stacks up request calls so that only a fixed amount of requests are sent at a time.

### Tutorial/Demo

* [Online Tutorial/Demo](http://www.clientcide.com/wiki/cnet-libraries/06-request/02-request.queue)

### Implements

* [Options][], [Events][]

Request.Queue Method: constructor
---------------------------------

### Syntax

	new Request.Queue(options);

### Arguments

1. options - (*object*) an object with key/value options

### Options

* stopOnFailure - (*boolean*, defaults to *true*) If *false*, the next request on the stack will be called when there is an error or exception. Otherwise any queued requests are held until you call the *resume* method.
* autoAdvance - (*boolean*, defaults to *true*) If *true* any queued requests will be called one after the other until there are no more left. If *false* you must call the *runNext* method yourself.
* concurrent - (*number*, defaults to *1*) The number of concurrent requests you wish to allow.

### Events

All of the events supplied to the [Request][] class are supported with the difference that the class first passes the name of the request in the [Request.Queue][] class followed by the [Request][] instance itself. So, for instance, if *onComplete* passes the response text and then the response xml for [Request][], then the *onComplete* passes first the name of the instance, the instance of [Request][], followed by the response text and then the response xml.

* onRequest
* onSuccess
* onComplete
* onCancel
* onException
* onFailure

In addition to these events there is an *onEnd* event that is fired when all the requests have finished.

### Example

	var myRequests = {
		r1: new Request({
			url: '/foo1.php', data: { foo1: 'bar1'},
			onComplete: function(text, xml){
				console.log('myRequests.r1: ', text, xml);
			}
		}),
		r2: new Request({
			url: '/foo2.php', data: { foo2: 'bar2'},
			onComplete: function(text, xml){
				console.log('myRequests.r2: ', text, xml);
			}
		})
	};
	var myQueue = new Request.Queue({
		requests: myRequests,
		onComplete: function(name, instance, text, xml){
			console.log('queue: ' + name + ' response: ', text, xml);
		}
	});

	myRequests.r1.send();
	myRequests.r2.send(); //sends when above request completes
	myRequests.r1.send(); //sends when above request completes
	etc.

In the above example, when each request completes, it will first log out the 'myRequests.rq: &lt;text&gt;, &lt;xml&gt;' message from the *onComplete* event specified in each request instance. Then it will log the 'queue: r1/r2 response: &lt;text&gt;, &lt;xml&gt;' message from the *onComplete* method in the [Request.Queue][] event specified in its options.

Request.Queue Method: addRequest {#Request-Queue:addRequest}
------------------------------------------------------

Adds an instance of [Request][] (or its subclasses) to the Request.Queue for management.

### Syntax

	myRequestQueue.addRequest(name, request);

### Arguments

1. name - (*string*) The name you want to associate with this request
2. request - (*object*) An instance of [Request][] or one of its subclasses (such as [Request.HTML][]).

### Example

	var foo = new Request();
	myRequestQueue.addRequest('fooRequest', foo);

This allows you to refer to that instance within the queue in other methods listed below.

### Returns

* *object* - This instance of Request.Queue.

Request.Queue Method: addRequests {#Request-Queue:addRequests}
------------------------------------------------------

Adds several requests at once (see [addRequest][]).

### Syntax

	myRequestQueue.addRequests(requests);

### Arguments

1. requests - (*object*) an object of key/values where the keys are the names for each instance of request and the values are the instances.

### Example

	var foo = new Request();
	var bar = new Request();
	myRequestQueue.addRequests({
		req1: foo,
		req2: bar
	});

This allows you to refer to specific instances with other methods of the class.

Request.Queue Method: getName {#Request-Queue:getName}
------------------------------------------------------

Given an instance of [Request][] this method returns the name to which it is registered.

### Syntax

	myRequestQueue.getName(request);

### Arguments

1. request - (*object*) an instance of [Request][] or one of its subclasses.

### Example

	var foo = new Request();
	myRequestQueue.addRequest('fooRequest', foo);
	myRequestQueue.getName(foo); //fooRequest

### Returns

* mixed - If the name is found, it returns that name (a *string*), else it returns *null* if the Queue is not managing that instance.

Request.Queue Method: removeRequest {#Request-Queue:removeRequest}
------------------------------------------------------

Removes an instance of [Request][] or one of its subclasses from the queue management. Any queued or running requests from that instance are retained (see [clear][]).

### Syntax

	myRequestQueue.removeRequest(request);

### Arguments

1. request - (*mixed*) You can pass in either the instance of [Request][] to drop or the name under which it's registered.

### Example

	var foo = new Request();
	myRequestQueue.addRequest('fooRequest', foo);
	myRequestQueue.removeRequest(foo);
	//OR
	myRequestQueue.removeRequest('fooRequest');

Request.Queue Method: getRunning {#Request-Queue:getRunning}
------------------------------------------------------

Returns any instances of [Request][] that are currently running (but not necessarily any instances that are queued to run).

### Syntax

	myRequestQueue.getRunning();

### Returns

* *object* - An object of [Request][] instances that have open requests.

Request.Queue Method: send {#Request-Queue:send}
------------------------------------------------------

Sends a request using a specified instance.

### Syntax

	myRequestQueue.send(name, options);

### Arguments

1. name - (*string*) the name of the instance of [Request][] with which you registered it.
2. options - (*objects*) the options to be passed to that instance's *send* method.

### Example

	var foo = new Request();
	myRequestQueue.addRequest('fooRequest', foo);
	myRequestQueue.send('fooRequest', {data: {some:'thing'}});

### Notes

There's really no reason to use this method. You should just call the *send* method that exists on the request instance instead. Request.Queue will handle the queuing automatically.

### Returns

* *object* - This instance of Request.Queue.

Request.Queue Method: hasNext {#Request-Queue:hasNext}
------------------------------------------------------

Determines if there is a request in the queue.

### Syntax

	myRequestQueue.hasNext([name]);

### Arguments

1. name - (*string*, optional) If specified, will search the queue for any queued requests for a specific request.

### Example

	var foo = new Request();
	myRequestQueue.addRequest('fooRequest', foo);
	foo.send({data: {some:'thing'}}); //runs immediately
	foo.send({data: {something:'else'}}); //is queued until above request returns
	myRequestQueue.hasNext(); //true
	myRequestQueue.hasNext('fooRequest'); //true
	myRequestQueue.hasNext('barRequest'); //false

### Returns

* boolean - Returns *true* if there are any requests that match the specified name. If the name is not specified, it returns *true* if there are any requests queued at all.

Request.Queue Method: runNext {#Request-Queue:runNext}
------------------------------------------------------

Runs the next request in the queue. If the option "autoAdvance" is set to *true* (the default) you don't really need to call this method.

### Syntax

	myRequestQueue.runNext([name]);

### Arguments

1. name - (*string*, optional) If specified, the queue will be searched for the next queued request for the specified instance of [Request][], otherwise the next available request in the queue will run.

### Returns

* *object* - This instance of Request.Queue.

Request.Queue Method: runAll {#Request-Queue:runAll}
------------------------------------------------------

Runs all queued requests at once.

### Syntax

	myRequestQueue.runAll()

### Returns

* *object* - This instance of Request.Queue.


Request.Queue Method: resume {#Request-Queue:resume}
------------------------------------------------------

If the option *stopOnFailure* is set to *true* (the default), then all subsequent requests will be queued and will remain so until you tell the class to resume requests.

### Syntax

	myRequestQueue.resume()

### Returns

* *object* - This instance of Request.Queue.

Request.Queue Method: clear {#Request-Queue:clear}
------------------------------------------------------

Clears the request queue.

### Syntax

	myRequestQueue.clear([name])

### Arguments

1. name - (*string*, optional) If specified, only the requests queued for a specific instance of [Request][] will be removed.

### Example

	myRequestQueue.clear('foo'); //any pending requests for the 'foo' request are removed
	myRequestQueue.clear(); //all pending requests are cleared

### Returns

* *object* - This instance of Request.Queue.

Request.Queue Method: cancel {#Request-Queue:cancel}
------------------------------------------------------

Cancels a running request for the specified instance of [Request][].

### Syntax

	myRequestQueue.cancel(name);

### Arguments

1. name - (*string*) The name of the instance of Request as you registered it.

### Example

	var foo = new Request();
	myRequestQueue.addRequest('fooRequest', foo);
	foo.send({data: {some:'thing'}}); //runs immediately
	foo.send({data: {something:'else'}}); //is queued until above request returns
	myRequestQueue.cancel('foo'); //cancels the currently running request for *foo*
	//SAME AS foo.cancel()

### Notes

This method isn't really meant to be used. As illustrated above, you can just call the *cancel* method on the request instance instead. Note that it does not cancel pending requests from that instance. In the example above, as soon as we cancel the first request the second one will fire.

### Returns

* *object* - This instance of Request.Queue.

[Request]: /core/Request/Request
[Request.HTML]: /core/Request/Request.HTML
[Request.Queue]: #Request-Queue
[addRequest]: #Request-Queue:addRequest
[clear]: #Request-Queue:clear
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
