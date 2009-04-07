/*
Script: URI.Schemes.js
	...

	License:
		MIT-style license.

	Authors:
		Sebastian Markbåge
*/

URI.MailTo = new Class({

	Extends: URI,

	regex: /^(mailto):([^\.:@]+(?:\.[^:@]+)*)@((?:[^?:\.]+\.)*[^?:\.]+)(?:\?(.*))?/i,
	parts: ['scheme', 'user', 'host', 'query'],
	schemes: { mailto: undefined },
	
	merge: function(bits){ return bits; },

	combine: function(bits){
		return 'mailto:' + bits.user + '@' + bits.host + (bits.query ? '?' + bits.query : '');
	}
	
});

URI.JavaScript = new Class({

	Extends: URI,

	regex: /^(javascript):(.*)/i,
	parts: ['scheme', 'script'],
	schemes: { javascript: undefined },

	merge: function(bits){ return bits; },

	combine: function(bits){
		return 'javascript:' + (bits.script || '').toString().replace(/\r?\n/g, ' ');
	}

});

URI.About = new Class({

	Extends: URI,

	regex: /^(about):([^?]*)(?:\?(.*))?/i,
	parts: ['scheme', 'about', 'query'],
	schemes: { about: undefined },

	merge: function(bits){ return bits; },

	combine: function(bits){
		return 'about:' + bits.about + (bits.query ? '?' + bits.query : '');
	}

});

// TODO: Add prefix schemes WebCal: 80, WebCalS: 443, Feed: 80, 'Feed:HTTPS': 443