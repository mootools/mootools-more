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
		onRequest: function(src, scriptElement){},
		onComplete: function(data){},
		onSuccess: function(data){},
		onCancel: function(){},
		onTimeout: function(){},
		onTooLongURL: function(){}, */
		url: '',
		callbackKey: 'callback',
		injectScript: document.head,
		data: {},
		link: 'ignore',
		timeout: 0,
		log: false
	},
	
	initialize: function(options){
		this.setOptions(options);

		if (this.options.log && window.Log){
			Object.append(this, new Log);
			this.enableLog().addEvents({
				request: function(src){
					this.log('JSONP retrieving script with url: ' + src);
				}.bind(this),
				tooLongURL: function(src){
					this.log('JSONP '+ src +' will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs');
				}.bind(this),
				succes: function(args){
					this.log('JSONP successfully retrieved: ', args);
				}.bind(this),
				timeout: function(src){
					this.log('JSONP request timed out with url: ' + src)
				}.bind(this)
			});
		}
	},

	check: Request.prototype.check,
	
	send: function(options){
		if (!this.check(options)) return this;
		this.running = true;
		
		var type = typeOf(options);
		if (type == 'string' || type == 'element') options = {data: options};
		options = Object.merge(this.options, options || {});

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
				
		if(src.length > 2083) this.fireEvent('tooLongURL', src);
		
		var script = this.getScript(src).inject(options.injectScript);
		
		this.fireEvent('request', [script.get('src'), script]);
		
		Request.JSONP.request_map['request_' + index] = function(){
			this.success(arguments, index);
		}.bind(this);
		
		if(options.timeout){
			(function(){
				this.cancel().fireEvent('timeout', [script.get('src'), script])
			}).delay(options.timeout, this);
		}
		
		return this;
	},
	
	getScript: function(src){
		return this.script = new Element('script', {
			type: 'text/javascript',
			src: src
		});
	},
	
	success: function(args, index){
		this.clear()
			.fireEvent('complete', args).fireEvent('success', args)
			.callChain();
	},
	
	cancel: function(){
		return this.clear().fireEvent('cancel');
	},
	
	clear: function(){
		if (this.script) this.script.destroy();
		this.running = false;
		return this;
	}
	
});

Request.JSONP.counter = 0;
Request.JSONP.request_map = {};
