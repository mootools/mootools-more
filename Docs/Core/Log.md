Class: Log {#Log}
=================

A Utility Class which provides a simple way to log messages from within other classes.

### Syntax:

#### For new classes:

	var MyClass = new Class({ Implements: Log });

#### For existing classes:

	MyClass.implement(new Log);

#### Stand alone

	var myLog = new Log;
	
### Example:

	var Test = new Class({
	  Implements: Log,
	  initialize: function(){
	    this.enableLog().log('Initializing test');
	  }
	});
	
### Notes

- Log.log is an unique global callback to which all instances of Log report. Its default behavior is to relay the message via console.log (if present), and stack the messages in Log.logged
- If you use a bookmarklet-based logger, make sure to call Log.enableLog() once it has loaded.

### See Also:

- [Class][]

Log Method: log {#Log:log}
---------------------------

Passes a message to the logger.

### Syntax:
  
  myClass.log(msg[, msg[, msg[, ...]]]);
  
### Arguments:

  1. Any number of arguments.

Log Method: enableLog {#Log:enableLog}
--------------------------------------

Enabled logging to the console, logs everything in the stack, and then clears the stack.

### Syntax:

  myClass.enableLog();

Log Method: disableLog {#Log:disableLog}
----------------------------------------

Disables logging to the console and instead subsequent calls to [log][Log:log] will be stored on the stack.

### Syntax:

  myClass.disableLog();

Log Method: resetLog {#Log:resetLog}
------------------------------------

Clears the log stack.

### Syntax:

  myClass.resetLog();

[Class]: /Class/Class