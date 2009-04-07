/*
Script: URI.Relative.js
	...

	License:
		MIT-style license.

	Authors:
		Sebastian Markbåge
*/

URI.implement({
	
	toAbsolute: function(base){
		base = new URI(base);
		if (base) base.set('path', '');
		return this.toRelative(base);
	},
	
	toRelative: function(base){
		return this.get('value', new URI(base));
	}
	
});

['http', 'https', 'ftp', 'rtsp', 'mms', 'file'].each(function(key){

	var scheme = URI.Schemes[key], combine = scheme.combine;
	
	scheme.combine = function(bits, base, property){
		if(property != 'value' || !base || bits.scheme != base.scheme || bits.host != base.host || bits.port != base.port)
			return combine.apply(this, arguments);
		
		var end = bits.file + (bits.query ? '?' + bits.query : '') + (bits.fragment ? '#' + bits.fragment : '')
		
		if (!base.directory) return (bits.directory || (bits.file ? '' : './')) + end;
		
		var baseDir = base.directory.split('/'),
			relDir = bits.directory.split('/'),
			path = '',
			offset;
		
		for(offset = 0; offset < baseDir.length && offset < relDir.length && baseDir[offset] == relDir[offset]; offset++);
		for(var i = 0; i < baseDir.length - offset - 1; i++) path += '../';
		for(var i = offset; i < relDir.length - 1; i++) path += relDir[i] + '/';
			
		return (path || (bits.file ? '' : './')) + end;
	};

});
