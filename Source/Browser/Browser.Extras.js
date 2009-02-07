/*
Script: Browser.Extras.js
	Extends the Window native object to include methods useful in managing the window location and urls.

	License:
		MIT-style license.

	Authors:
		Aaron Newton, Lennart Pilon
*/

$extend(Browser, {

	getHost:function(url){
		var match = $pick(url, window.location.href).match(/http[s]?:\/\/([\w-.]+)/);
		return match ? match[1] : null;
	},

	getPort: function(url){
		var match = $pick(url, window.location.href).match(/:([0-9]{2,4})/);
		return match ? match[1] : null;
	},

	getQueryString: function(url){
		var qs = $pick(url, window.location.search, '').split('?')[1];
		if (!$chk(qs)) return {};
		return qs.split('#')[0].parseQuery();
	},

	mergeQueryString: function(values, url){
		url = $pick(url, window.location.href);
		var merged = $merge(url.contains('?') ? this.getQueryString(url) : url.parseQuery(), values);
		var newUrl = url.contains('?') ? url.split('?')[0] + '?' : url.contains('=') ? '' : url + '?';
		for (key in merged) newUrl += key + '=' +merged[key] + '&';
		return newUrl.substring(0, newUrl.length-1);
	},

	redraw: function(){
		var n = document.createTextNode(' ');
		this.adopt(n);
		(function(){ n.dispose(); }).delay(1);
	}

});