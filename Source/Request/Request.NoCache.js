/*
Script: Request.NoCache.js
	Extends Request and Request.HTML to automatically include a unique noCache value to prevent request caching.

	License:
		MIT-style license.

	Authors:
		Aaron Newton

*/
(function(){
	var rqst = function(cls){

		return Class.refactor(cls, {
/*		options: {
				noCache: false
			}, */
			send: function(options){
				if (this.options.noCache){
					var type = $type(options);
					if (type == 'string' || type == 'element') options = {data: options};

					var old = this.options;
					options = $extend({data: old.data, url: old.url, method: old.method}, options);
					var data = options.data, url = options.url, method = options.method;

					if (options.url){
						options.url += (options.url.contains("?")?"&":"?")+"noCache=" + new Date().getTime();
					} else  {
						switch ($type(data)){
							case 'element': data = $(data).toQueryString(); break;
							case 'object': case 'hash': data = Hash.toQueryString(data);
						}
						data += (data.length?"&":"") + "noCache=" + new Date().getTime();
						options.data = data;
					}
				}
				this.parent(options);
			}
		});

	};
	Request = rqst(Request);
	Request.HTML = rqst(Request.HTML);
})();