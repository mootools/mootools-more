Class: Request.JSONP {#Request-JSONP}
=====================================

Creates a JSON request using script tag injection and handles the callbacks for you.

### Tutorial/Demo

* [Online Tutorial/Demo][]

### Implements

* [Options][], [Events][]

Request.JSONP Method: constructor
---------------------------------

### Syntax

	new Request.JSONP(options);

### Arguments

1. options - (*object*) an object with key/value options

### Options

* url - (*url*) the url to get the JSON data
* callbackKey - (*string*: defaults to *callback*) the key in the url that the server uses to wrap the JSON results. So, for example, if you used *callbackKey: 'callback'* then the server is expecting something like *http://..../?q=search+term&callback=myFunction*; This must be defined correctly.
* data - (*string*: defaults to '') The default data for [Request-JSONP:send][], used when no data is given.
* link       - (*string*: defaults to 'ignore') Can be 'ignore', 'cancel' and 'chain'.
	* 'ignore' - Any calls made to start while the request is running will be ignored.
	* 'cancel' - Any calls made to start while the request is running will take precedence over the currently running request. The new request will start immediately, canceling the one that is currently running.
	* 'chain'  - Any calls made to start while the request is running will be chained up, and will take place as soon as the current request has finished, one after another.
* timeout - (*number*: defaults to *0*) In conjunction with onTimeout event, it determines the amount of milliseconds before considering a connection timed out. (It's suggested to not use timeout with big files and only when knowing what's expected.)
* injectScript - (*mixed*: defaults to document head) where to inject the script elements used for the calls
* log - (*boolean*: defaults to *false*) if *true*, sends logging messages with `console.log` as default onRequest and onError events.

### Events

* onRequest - (*function*, optional) fired when the script tag is injected; it will pass the requested url and the script element.
* onComplete - (*function*, optional) fired when the data returns; it will be passed the data and the instance of Request.JSONP that requested it.
* onCancel - (*function*, optional) fired when the request is canceled.
* onTimeout - (*function*, optional) fired when the timeout has been exceeded.

### Example

	var myJSONP = new Request.JSONP({
		url: 'http://www.flickr.com/services/feeds/photos_public.gne?format=json',
		callbackKey: 'jsoncallback',
		data: {
			partTag: 'mtvo',
			iod: 'hlPrice',
			viewType: 'json',
			results: '100',
			query: 'ipod'
		},
		onRequest: function(url){
			// a script tag is created with a src attribute equal to url
		},
		onComplete: function(data){
			// the request was completed.
		}
	}).send();

The above example would generate this url:

	http://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=Request.JSONP.request_map.request_0

It would embed a script tag (in the head of the document) with this url and, when it loaded, execute the "myFunction" callback defined.

Request.JSONP Method: send {#Request-JSONP:send}
------------------------------------------------

Executes the JSON request.

### Syntax

	myJSONP.send([options]);

### Arguments

1. options - (*object*; optional) key/value options that configure the request. Can either be the same as (or a subset of) the options for the class, an element (such as a form) whose child inputs will be converted into a query string, or a query string.

### Returns

* (*object*) This instance of [Request.JSONP][]


Request.JSONP Method: cancel {#Request-JSONP:cancel}
----------------------------------------------------

Cancels the currently running request, if any.

### Syntax

	myJSONP.cancel();

### Returns

* (*object*) This instance of [Request.JSONP][]


Request.JSONP Method: isRunning {#Request-JSONP:isRunning}
----------------------------------------------------------

Returns true if the request is currently running

### Syntax:

	myRequest.isRunning()

### Returns:

* (*boolean*) True if the request is running

### Example:

	if (myJSONP.isRunning()) // It runs!


[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/06-request/00-jsonp
[Request.JSONP]: #Request-JSONP
[Request-JSONP:send]: #Request-JSONP:send
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events

