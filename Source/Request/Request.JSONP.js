/*
Script: Request.JSONP.js
	Defines Request.JSONP, a class for cross domain javascript via script injection.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

Request.JSONP = new Class({

	Implements: [Chain, Events, Options],

	options: {/*
		onRequest: $empty,
		onComplete: $empty,
		onSuccess: $empty,
		onCancel: $empty,*/
		url: '',
		data: {},
		retries: 0,
		timeout: 0,
		link: 'ignore',
		callBackKey: 'callback',
		injectScript: document.head
	},

	initialize: function(options){
		this.setOptions(options);
		this.running = false;
		this.requests = 0;
		this.triesRemaining = [];
	},
	
	check: function(caller){
		if (!this.running) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(caller.bind(this, Array.slice(arguments, 1))); return false;
		}
		return false;
	},

	send: function(options){
		if (!$chk(arguments[1]) && !this.check(arguments.callee, options)) return this;
		
		var type = $type(options), old = this.options, index = $chk(arguments[1]) ? arguments[1] : this.requests++;
		if (type == 'string' || type == 'element') options = {data: options};
		
		options = $extend({data: old.data, url: old.url}, options);
		
		if (!$chk(this.triesRemaining[index])) this.triesRemaining[index] = this.options.retries;
		var remaining = this.triesRemaining[index];
				
		(function(){
			var script = this.getScript(options);
			MooTools.log('JSONP retrieving script with url: ' + script.src);
			this.running = true;
			
			(function(){
				if (remaining){
					this.triesRemaining[index] = remaining - 1;
					if (script){
						script.destroy();
						this.request(options, index);
						this.fireEvent('retry', this.options.retries());
					}
				} else if(script && this.options.timeout){
					script.destroy();
					this.cancel();
				}					
			}).delay(this.options.timeout, this);
		}).delay(Browser.Engine.trident ? 50 : 0, this);
		return this;
	},
	
	cancel: function(){
		if (!this.running) return this;
		this.running = false;
		this.fireEvent('cancel');
		return this;
	},
 	
	getScript: function(options){
		var options = this.options, index = Request.JSONP.requests.length, data;
		
		switch ($type(options.data)){
			case 'element': data = $(options.data).toQueryString(); break;
			case 'object': case 'hash': data = Hash.toQueryString(options.data);
		}
		
		var script = new Element('script', {
			type: 'text/javascript',
			src: options.url + 
				 (options.url.test('\\?') ? '&' :'?') + 
				 (options.callBackKey || this.options.callBackKey) + 
				 "=Request.JSONP.requests["+ index +"]" + 
				 (data ? '&' + data : '')
		}).inject(this.options.injectScript);
		
		Request.JSONP.requests.push(function(data){ this.success(data, script); }.bind(this));
				
		return script;
	},
	
	success: function(data, script){
		if (script) script.destroy();
		this.running = false;
		MooTools.log('JSONP successfully retrieved: ',  data);
		this.fireEvent('complete', data).fireEvent('success', data).callChain();
	}

});

Request.JSONP.requests = [];

$extend(MooTools, {
	logged: [],
	log: function(){
		MooTools.logged.push(arguments);
	}
});