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

[dbug:disableCookie]: #dbug:disableCookie
[dbug:enable]: #dbug:enable
[dbug:cookie]: #dbug:cookie
[http://getfirebug.com]: http://getfirebug.com
[http://www.getfirebug.com/console.html]: http://www.getfirebug.com/console.html
