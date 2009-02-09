/*
Script: Browser.Extras.js
	Extends the Window native object to include methods useful in managing the window location and urls.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/
$extend(Browser, {

	getHost:function(url){
		var match = $pick(url, window.location.href).match(/http[s]?:\/\/([\w-.]+)/);
		return match ? match[1] : null;
	},

	getQueryStringValue: function(key, url){
			return Browser.getQueryStringValues(url)[key];
	},

	getQueryStringValues: function(url){
		var qs = $pick(url, window.location.search, '').split('?')[1]; //get the query string
		if (!$chk(qs)) return {};
		qs = qs.split("#")[0];
		return qs.parseQuery();
	},

	getPort: function(url){
		url = $pick(url, window.location.href);
		var m = $pick(url, window.location.href).match(/:([0-9]{2,4})/);
		if (m == null) return false;
		else return m[1];
	},

	redraw: function(element){
		var n = document.createTextNode(' ');
		this.adopt(n);
		(function(){n.dispose()}).delay(1);
		return this;
	},

	//thanks to Lennart Pilon
	mergeQueryStringValues: function(values, url){
		url = $pick(url, window.location.href);
		var merged = $merge(url.contains('?') ? this.getQueryStringValues(url) : url.parseQuery(), values);
		var newUrl = url.contains('?') ? url.split('?')[0] + '?' : url.contains("=") ? '' : url + '?';
		for (key in merged) newUrl += key + '=' +merged[key] + '&';
		newUrl = newUrl.substring(0, newUrl.length-1);
		return newUrl;
	}

});
window.addEvent('domready', function(){
	//just a shortcut so you can do
	//Browser.qs['foo']
	//instead of Browser.getQueryStringValue('foo');
	Browser.qs = Browser.getQueryStringValues();
});
