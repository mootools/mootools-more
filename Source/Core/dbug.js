/*
Script: dbug.js
	A wrapper for Firebug console.* statements. No dependencies.

	License:
		MIT-style license.

*/
var dbug = {

	logged: [],	

	timers: {},

	firebug: false, 

	enabled: false, 

	log: function() {
		dbug.logged.push(arguments);
	},

	nolog: function(msg) {
		dbug.logged.push(arguments);
	},

	time: function(name){
		dbug.timers[name] = new Date().getTime();
	},

	timeEnd: function(name){
		if (dbug.timers[name]) {
			var end = new Date().getTime() - dbug.timers[name];
			dbug.timers[name] = false;
			dbug.log('%s: %s', name, end);
		} else dbug.log('no such timer: %s', name);
	},

	enable: function(silent) { 
		if (dbug.firebug) {
			try {
				dbug.enabled = true;
				dbug.log = function(){
						(console.debug || console.log).apply(console, arguments);
				};
				dbug.time = function(){
					console.time.apply(console, arguments);
				};
				dbug.timeEnd = function(){
					console.timeEnd.apply(console, arguments);
				};
				if (!silent) dbug.log('enabling dbug');
				for(var i=0;i<dbug.logged.length;i++){ dbug.log.apply(console, dbug.logged[i]); }
				dbug.logged=[];
			} catch(e) {
				dbug.enable.delay(400);
			}
		}
	},

	disable: function(){ 
		if (dbug.firebug) dbug.enabled = false;
		dbug.log = dbug.nolog;
		dbug.time = function(){};
		dbug.timeEnd = function(){};
	},

	cookie: function(set){
		var value = document.cookie.match('(?:^|;)\\s*jsdebug=([^;]*)');
		var debugCookie = value ? unescape(value[1]) : false;
		if ((!$defined(set) && debugCookie != 'true') || ($defined(set) && set)) {
			dbug.enable();
			dbug.log('setting debugging cookie');
			var date = new Date();
			date.setTime(date.getTime()+(24*60*60*1000));
			document.cookie = 'jsdebug=true;expires='+date.toGMTString()+';path=/;';
		} else dbug.disableCookie();
	},

	disableCookie: function(){
		dbug.log('disabling debugging cookie');
		document.cookie = 'jsdebug=false;path=/;';
	}

};

(function(){

	var fb = typeof console != "undefined";

	var debugMethods = ['debug','info','warn','error','assert','dir','dirxml'];

	var otherMethods = ['trace','group','groupEnd','profile','profileEnd','count'];

	function set(methodList, defaultFunction) {
		for(var i = 0; i < methodList.length; i++){
			dbug[methodList[i]] = (fb && console[methodList[i]])?console[methodList[i]]:defaultFunction;
		}
	};

	set(debugMethods, dbug.log);

	set(otherMethods, function(){});

})();

if (typeof console != "undefined" && console.warn){

	dbug.firebug = true;

	var value = document.cookie.match('(?:^|;)\\s*jsdebug=([^;]*)');

	var debugCookie = value ? unescape(value[1]) : false;

	if (window.location.href.indexOf("jsdebug=true")>0 || debugCookie=='true') dbug.enable();

	if (debugCookie=='true')dbug.log('debugging cookie enabled');

	if (window.location.href.indexOf("jsdebugCookie=true")>0){
		dbug.cookie();
		if (!dbug.enabled)dbug.enable();
	}

	if (window.location.href.indexOf("jsdebugCookie=false")>0)dbug.disableCookie();

}