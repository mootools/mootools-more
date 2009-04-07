/*
Script: URI.Schemes.js
	...

	License:
		MIT-style license.

	Authors:
		Sebastian Markbåge
*/

URI.Schemes.extend({

	mailto: new URI.Scheme({

		value: {
			regex: /^(mailto):([^\.:@]+(?:\.[^:@]+)*)@((?:[^?:\.]+\.)*[^?:\.]+)(?:\?(.*))?/i,
			parts: ['scheme', 'user', 'host', 'query'],
			combine: function(bits){
				return 'mailto:' + bits.user + '@' + bits.host + (bits.query ? '?' + bits.query : '');
			}
		},

		email: {
			regex: /^([^\.:@]+(?:\.[^:@]+)*)@((?:[^?:\.]+\.)*[^?:\.]+)$/,
			parts: ['username', 'hostname'],
			combine: function(bits){ return bits.user + '@' + bits.host; }
		}

	}),
	
	javascript: new URI.Scheme({

		value: {
			regex: /(javascript):(.*)/i,
			parts: ['scheme', 'script'],
			combine: function(bits){
				return 'javascript:' + (bits.script || '').toString().replace(/\r?\n/g, ' ');
			}
		}

	}),
	
	about: new URI.Scheme({

		value: {
			regex: /(about):([^?]*)(?:\?(.*))?/i,
			parts: ['scheme', 'about', 'query'],
			combine: function(bits){
				return 'about:' + bits.about + (bits.query ? '?' + bits.query : '');
			}
		}

	})

});

// TODO: Add prefix schemes WebCal: 80, WebCalS: 443, Feed: 80, 'Feed:HTTPS': 443