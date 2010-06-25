/*
---

script: Request.JSONP.js

name: Request.JSONP

description: Defines Request.JSONP, a class for cross domain javascript via script injection.

license: MIT-style license

authors:
  - Aaron Newton
  - Guillermo Rauch
  - Arian Stolwijk

requires:
  - Core/Element
  - Core/Request

provides: [Request.JSONP]

...
*/

Request.JSONP = new Class({
	
	Implements: [Chain, Events, Options],
	
	options: {/*
		onRequest: function(scriptElement){},
		onComplete: function(data){},
		onSuccess: function(data){},
		onCancel: function(){}, */
		url: '',
		callbackKey: 'callback',
		injectScript: document.head,
		data: {},
		link: 'ignore',
		timeout: 0,
		retries: 0
	},
	
	initialize: function(options){
		this.setOptions(options);
	},

	check: Request.prototype.check,
	
	send: function(options){
		if (!this.check(options)) return this;
		this.running = true;
		
		var type = typeOf(options);
		if (type == 'string' || type == 'element') options = {data: options};
		if(typeOf(options) == 'object') options = Object.merge(this.options, options);
		if(options == null) options = this.options;

		var data = options.data;
		switch (typeOf(data)){
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Object.toQueryString(data);
		}

		var index = this.index = Request.JSONP.counter++;

		var src = options.url + 
			(options.url.test('\\?') ? '&' :'?') + 
			(options.callbackKey) + 
			'=Request.JSONP.request_map.request_'+ index + 
			(data ? '&' + data : '');		
		
		var script = this.script = new Element('script', {
			type: 'text/javascript',
			src: src
		});
		
		var request = function(){
			script.inject(options.injectScript);
			this.fireEvent('request', script);
		}.bind(this);
		
		if(options.timeout) request.delay(options.timeout);
		else request();
		
		Request.JSONP.request_map['request_' + index] = function(){
			this.success(arguments, index);
		}.bind(this);
		
		return this;
	},
	
	success: function(args, index){
		this.clear();
		this.fireEvent('complete', args).fireEvent('success', args).callChain();
	},
	
	cancel: function(){
		this.clear();
		this.fireEvent('cancel');
		return this;
	},
	
	clear: function(){
		if (this.script) this.script.destroy();
		this.running = false;
	}
	
});

Request.JSONP.counter = 0;
Request.JSONP.request_map = {};

