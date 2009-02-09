Class: Request.JsonP {#Request-JsonP}
=====================

Creates a Json request using script tag injection and handles the callbacks for you.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/06-request/00-jsonp

### Implements

* [Options][], [Events][]

### Syntax

	new Request.JsonP(options);

### Arguments

1. options - (*object*) an object with key/value options

### Options

* url - (*url*) the url to get the json data
* callBackKey - (*string*) the key in the url that the server uses to wrap the Json results. So, for example, if you used *callBackKey: 'callback'* then the server is expecting something like *http://..../?q=search+term&callback=myFunction*; defaults to "callback". This must be defined correctly.
* data - (*object*) additional key/value data to append to the url
* retries - (*integer*; defaults to *zero*) if this value is a positive integer, the JsonP request will abort after the duration specified in the *timeout* option and fire again until the number of retries has been exhausted.
* timeout - (*integer*; defaults to *zero*) the duration to wait before aborting a request or retrying.
* injectScript - (*mixed*; defaults to document head) where to inject the script elements used for the calls

### Events

* onComplete - (*function*, optional) callback to execute when the data returns; it will be passed the data and the instance of Request.JsonP that requested it.

### Example

	new Request.JsonP({
	  url: 'http://api.cnet.com/restApi/v1.0/techProductSearch',
		data: {
			partTag: 'mtvo',
			iod: 'hlPrice',
			iewType: 'json',
			results: '100',
			query: 'ipod'
		},
		onComplete: myFunction.bind(someObject)
	}).send();

The above example would generate this url:

	http://api.cnet.com/restApi/v1.0/techProductSearch?partTag=mtvo&iod=hlPrice&viewType=json&results=100&query=ipod&callback=Request.JsonP.requestors[0].handleResults&

It would embed a script tag (in the head of the document) with this url and, when it loaded, execute the "myFunction" callback defined.

Request.JsonP Method: send {#Request-JsonP:send}
--------------------------------------

Executes the Json request.

### Syntax

	myJsonP.send();

### Returns

* (*object*) This instance of [Request.JsonP][]

[Request.JsonP]: #Request-JsonP
[Options]: http://docs.mootools.net/Class/Class.Extras#Options
[Events]: http://docs.mootools.net/Class/Class.Extras#Events
