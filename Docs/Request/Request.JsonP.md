Class: Request.JsonP {#Request-JsonP}
=====================

Creates a Json request using script tag injection and handles the callbacks for you.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/06-request/00-jsonp

### Implements

* [Options][], [Events][]

### Syntax

	new Request.JsonP(url[, options]);

### Arguments

1. url - (*url*) the url to get the json data
2. options - (*object*) an object with key/value options

### Options

* callBackKey - (*string*) the key in the url that the server uses to wrap the Json results. So, for example, if you used *callBackKey: 'callback'* then the server is expecting something like *http://..../?q=search+term&callback=myFunction*; defaults to "callback". This must be defined correctly.
* queryString - (*string*) additional querystring values to append to the url
* data - (*object*) additional key/value data to append to the url
* globalFunction - (*string*) the name of a global (i.e. in window scope) function that your returned json expects to handle results (for instance, Flickr requires that a function called "jsonFlickrFeed" handle all responses); *note* this will overwrite any previous value for that function, including pre-existing or already running jsonp calls. Be cautious.
* retries - (*integer*; defaults to *zero*) if this value is a positive integer, the JsonP request will abort after the duration specified in the *timeout* option and fire again until the number of retries has been exhausted.
* timeout - (*integer*; defaults to *5000*) if retries is a positive integer, the duration between tries in milliseconds.
* abortAfter - (*integer*; defaults to *zero*) the duration to wait before aborting a request. Note that this is different than *timeout* above - it is used even if the *retries* value is *zero* (the default). However, if you have *retries* set to a positive number, this option is ignored so long as there are retries remaining.

### Events

* onComplete - (*function*, optional) callback to execute when the data returns; it will be passed the data and the instance of Request.JsonP that requested it.

### Example

	new Request.JsonP('http://api.cnet.com/restApi/v1.0/techProductSearch', {
		data: {
			partTag: 'mtvo',
			iod: 'hlPrice',
			iewType: 'json',
			results: '100',
			query: 'ipod'
		},
		onComplete: myFunction.bind(someObject)
	}).request();

The above example would generate this url:

	http://api.cnet.com/restApi/v1.0/techProductSearch?partTag=mtvo&iod=hlPrice&viewType=json&results=100&query=ipod&callback=Request.JsonP.requestors[0].handleResults&


It would embed a script tag (in the head of the document) with this url and, when it loaded, execute the "myFunction" callback defined.

Request.JsonP Method: request {#Request-JsonP:request}
--------------------------------------

Executes the Json request.

### Syntax

	myJsonP.request();

### Returns

* (*object*) This instance of [Request.JsonP][]

[Request.JsonP]: #Request-JsonP
[Options]: http://docs.mootools.net/Class/Class.Extras#Options
[Events]: http://docs.mootools.net/Class/Class.Extras#Events
