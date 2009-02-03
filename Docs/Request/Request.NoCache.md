Class: Request.NoCache {#Request}
=========================

Extends [Request][] and [Request.HTML][] to automatically include a unique noCache value to prevent request caching.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/06-request/01-request.nocache

### Options

* noCache - (*boolean*; defaults to *false*) If *true*, appends a unique *noCache* value to the request to prevent caching.

### Example

	new Request({
		url: '/foo.php',
		data: {
			foo: 'bar'
		},
		noCache: true
	}).send();
	//sends to /foo.php?foo=bar&noCache=1227220177454
	//where the value (1227220177454) is the result of new Date().getTime()

### Notes

IE has a bad habit of caching ajax request values. Including this script and setting the *noCache* value to true will prevent it from caching. The server should ignore the *noCache* value.

### Setting noCache to default to true

Want to have all your Requests default to this behavior? No problem:

	(function(){ //don't polute the global namespace
		var ref = function(cls){
		    return Class.refactor(cls, options: {
		        noCache: true
		    });
		});
		Request = ref(Request);
		Request.HTML = ref(Request.HTML);
		//all future instances of Request and Request.HTML
		//default to using the noCache functionalty
	})();


[Request]: http://docs.mootools.net/Request/Request
[Request.HTML]: http://docs.mootools.net/Request/Request.HTML

