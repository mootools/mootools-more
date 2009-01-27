Object: dbug {#dbug}
====================

Wrapper for the firebug console.log() function. No dependencies.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01-core/00-dbug

About dbug
----------
dbug is a wrapper for the firebug console plugin for firefox. The syntax for logging is the same as documented at [http://getfirebug.com][].

You can leave *dbug.log()* statements in your code and they will not be echoed out to the screen in any way. 

Enabling dbug {#dbug:enable}
----------------------------
To display the dbug statements, you have two options: include **"jsdebug=true"** in the query string of the page and all your dbug statements will be printed as they occur OR **type into the firebug console dbug.enable()** and the debug statements that have occurred up until that point will be echoed, and all others from that point will be printed as they occur. You can also **put dbug.enable() in your page's javascript** to turn it on.

Disabling dbug {#dbug:disable}
------------------------------
*dbug.disable()* will turn it back off.

dbug Properties {#dbug:properties}
----------------------------------
* logged - (*array*) the messages logged previously if *dbug* is not enabled. When *dbug.enable* is invoked, all logged messages are dumped to the console
* firebug - (*boolean*) *true* if firebug (or Moobugger) is present; if *false*, *dbug.enable* will not have any effect
* debug - (*boolean*) *true* if debugging is enabled

dbug Method: log {#dbug:log}
----------------------------

Sends a message to the console if dbug is enabled, otherwise it stores this info until dbug is enabled.

### Syntax

	dbug.log(msg[, msg2, msg3, etc]);

### Arguments

1. (*mixed*) collection of messages to log to the console. You may pass as many as you like.

### Messages

Messages sent to *dbug* methods can contain various substitutions. See [http://getfirebug.com][].

### Examples

	dbug.log("message");
	> message
	dbug.log("my var is %s", myVar);
	> my var is x
	dbug.log($('myelement'));
	> <div id="myelement"></div>
	dbug.log("myelement: %s, some value: %s", $('myelement'), somevalue);
	> myelement: <div id="myelement"></div>, some value: blah

dbug Method: cookie {#dbug:cookie}
----------------------------------

Turns debugging on for the rest of the day for that domain. This lets you click around without having to add jsdebug=true to each new page's url and reload the page or execute *dbug.enable* every time.

Calling dbug.cookie() when the cookie is already present will disable it (toggle).

### Syntax

	dbug.cookie(set);

### Arguments

*  set - (*boolean*, optional) if *true* sets the cookie even if it's already set (overrides toggle), if *false* overrides to disable the cookie (same as [dbug:disableCookie][]);

### Examples

	dbug.cookie(); //toggles debugging state for the current browser session
	dbug.cookie(true); //forces debug cookie to be set, overriding toggle

dbug Method: disableCookie {#dbug:disableCookie}
------------------------------------------------

This removes the cookie set by [dbug:cookie][] and turns off debugging for subsequent page loads.

### Syntax

	dbug.disableCookie(); //cookie is disabled

Additional dbug Methods
-----------------------
See [http://www.getfirebug.com/console.html][] for all the methods that Firebug supports. Each of these methods will be passed through to the console so any of them will work against *dbug*, just as if you had called them against *console*.

### Examples

	dbug.time(); //same as console.time()
	dbug.timeEnd(); //same as console.timeEnd()
	dbug.trace(); //same as console.trace();
	dbug.dir(obj); //same as console.dir(obj);
	//etc

Script: dbugScripts.js {#dbugScripts-js}
========================================


This stand-alone script allows you to debug against a live environment by discarding the live version of a library (typically compressed with no line breaks or comments) in exchange for a non-live one (typically uncompressed). This provides two primary benefits:

1. you can test against an environment using a non-compressed version of the library
2. you can test against an environment without changing it (i.e. test against a live environment with non-production ready code)

This is the entirety of the method:

	function dbugScripts(baseurl,libs){
		var value = document.cookie.match('(?:^|;)\\s*jsdebug=([^;]*)');
		var debugCookie = value ? unescape(value[1]) : false;
		if (window.location.href.indexOf("basePath=this")>0){
			var path=baseurl.substring(baseurl.substring(7,baseurl.length).indexOf("/")+8,baseurl.length);
			var href=window.location.href;
			baseurl=href.substring(href.substring(7,href.length).indexOf("/")+8,href.length);
		}
		if (window.location.href.indexOf("jsdebug=true")>0 || window.location.href.indexOf("jsdebugCookie=true")>0 || debugCookie == 'true'){ 
			if (libs) {
				for(var i=0;i<libs.length;i++){
					document.write("<scri"+"pt src=\""+baseurl+libs[i]+"\" type=\"text/javascript\"></sc"+"ript>");
				}
			} else {
				document.write("<scri"+"pt src=\""+baseurl+"\" type=\"text/javascript\"></scr"+"ipt>");
			}
			return true;
		}
		return false;
	};

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01-core/00-dbug#dbugscripts

Function: dbugScripts {#dbugScripts}
------------------------------------

### Syntax

	if (!dbugScripts(baseHref[, scripts]) {
		//...compressed code
	}

### Arguments

1. baseHref - (*string*) the url to the common directory containing all the compressed scripts OR the url to a single js file
2. libs - (*array*, optional) a list of file locations relative to the baseHref to each of the files contained in the library

### Details

If you include this method at the top of your first library you then can wrap your compressed library with a conditional for debugging:

	if (!dbugScritps("http://test.foo.com", ["library.js", "library2.js"]) {
		//...compressed library.js goes here
		//...compressed library2.js goes here
	}

If your compressed document only includes one file, you don't have to use the second argumnet:

	if (!dbugScripts("http://test.foo.com/foo.js")) {
		//...compressed foo.js goes here
	}

Then, using the enabling methods described in dbug.js above (see [dbug:enable][] & [dbug:cookie][]) you can switch between the uncompressed library and the compressed (live) one.

[dbug:disableCookie]: #dbug:disableCookie
[dbug:enable]: #dbug:enable
[dbug:cookie]: #dbug:cookie
[http://getfirebug.com]: http://getfirebug.com
[http://www.getfirebug.com/console.html]: http://www.getfirebug.com/console.html
