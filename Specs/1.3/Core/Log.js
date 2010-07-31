/*
Script: Log.js
	Specs for Log.js

License:
	MIT-style license.
*/

(function(){
	
	if (!this.console) this.console = { log: function(){} };
	
	var last_msg, log = console.log;
	console.log = function(msg){
		last_msg = msg;
		return log.apply(console, arguments);
	};
	
	describe('Log', {
		
		'should push message onto message stack': function(){
			Log.disableLog().log('test');
			value_of(Log.logged[0][0]).should_be('test');
		},
		
		'should log message stack when enabled': function(){	
			Log.enableLog();
			value_of(Log.logged.length).should_be(0);
			value_of(last_msg).should_be('test');
		}

	});
})();