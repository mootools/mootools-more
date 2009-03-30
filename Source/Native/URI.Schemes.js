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
		scheme: 'mailto',
		regex: /^([^\.:@]+(?:\.[^:@]+)*)@((?:[^?:\.]+\.)*[^?:\.]+)(?:\?(.*))?/i,
		parts: ['user', 'host', 'query'],
		combine: function(bits){ return bits.user + '@' + bits.host + (bits.query ? '?' + bits.query : ''); },
		props: {
			email: {
				regex: /^([^\.:@]+(?:\.[^:@]+)*)@((?:[^?:\.]+\.)*[^?:\.]+)$/,
				parts: ['username', 'hostname'],
				combine: function(bits){ return bits.user + '@' + bits.host; }
			}
		}
	}),
	
	javascript: new URI.Scheme({
		scheme: 'javascript',
		regex: /^(.*)/,
		parts: ['script'],
		combine: function(bits){ return (bits.script || '').toString().replace(/\r?\n/g, ' '); }
	})

});