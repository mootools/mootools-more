Class: Log {#Log}
=================

A Utility Class which provides a simple way to log messages from within other classes.

### Syntax:

#### For new classes:

	var MyClass = new Class({ Implements: Log });

#### For existing classes:

	MyClass.implement(Log);

#### Stand alone

	var myLog = new Log;
	
### Example:

	var Test = new Class({
	  Implements: Log,
		initialize: function(){
		  this.log('Initializing test')
		}
	});
	
### Notes

- Log.logger is an unique global callback to which all instances of Log report. Its default behavior is to relay the message via console.log (if present), and stack the messages in Log.logged
- Log.logged stores all logged messages for the session. If you use a bookmarklet-based logger, make sure to iterate it and print the messages once it loads.

### See Also:

- [Class][]

Log Method: log {#Log:log}
---------------------------

Passes a message to the logger.

### Syntax:
  
  myClass.log(msg[, msg[, msg[, ...]]])
  
### Arguments:

  1. Any number of arguments.

[Class]: /Class/Class