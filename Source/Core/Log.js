/*
Script: Log.js
	Provides basic logging functionality for plugins to implement.

	License:
		MIT-style license.

	Authors:
		Guillermo Rauch
		Thomas Aylott
*/

var Log = new Class({
	
	log: function(){
		Log.logger.call(this, arguments);
	}
	
});

Log.logged = [];

Log.logger = function(){
	var args = Array.slice(arguments);
	if (window.console && console.log) console.log(args);
	else Log.logged.push(args);
};