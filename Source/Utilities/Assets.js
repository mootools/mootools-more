/*
Script: Assets.js
	Provides methods to dynamically load JavaScript, CSS, and Image files into the document.

	License:
		MIT-style license.

	Authors:
		Valerio Proietti
		Guillermo Rauch
*/

var Asset = new Class({
	
	Implements: [Options, Events],
	
	options: {/*
		onLoad: $empty,
		onLoaded: $empty,
		onComplete: $empty,*/
		properties: {},
		document: document
	},
	
	loaded: function(){
		this.fireEvent('complete', this.element).fireEvent('loaded', this.element);
	}
	
});

Asset.Javascript = new Class({
	
	Extends: Asset,
	
	options: {		
		check: $lambda(true)
	},
	
	initialize: function(url, options){
		this.setOptions(options);
		this.url = url;
		
		var load = this.loaded.bind(this), check = this.options.check;
		this.element = new Element('script', $merge(this.options.properties, {src: this.url, type: 'text/javascript'})).addEvents({
			load: loaded,
			readystatechange: function(){
				if (['loaded', 'complete'].contains(this.readyState)) loaded();
			}
		});

		if (Browser.Engine.webkit419) var checker = (function(){
			if (!$try(check)) return;
			$clear(checker);
			loaded();
		}).periodical(50);

		this.element.inject(this.options.document.head);
		this.fireEvent('load');
	}
	
});

Asset.Stylesheet = new Class({
	
	Extends: Asset,
		
	initialize: function(url, options){
		this.setOptions(options);
		this.url = url;
		
		this.element = new Element('link', $merge({
			rel: 'stylesheet', media: 'screen', type: 'text/css', href: source
		}, this.options.properties)).inject(this.document.head);
		
		// don't know if this method will work 
		// otherwise we can ask for a "check: selector" option and use Fx.CSS.search periodically
		// or we can load it through Request
		var check = function(){
			this.options.document.styleSheets.each(function(style){
				if(style.href && style.href = this.url) this.loaded();
			}, this);
		}.bind(this);
		
		var checker = (function(){
			if (!$try(check)) return;
			$clear(checker);
			load();
		}).periodical(50);

		this.fireEvent('load');
	}
	
});

Asset.Image = new Class({
	
	Extends: Asset,
	
	initialize: function(url, options){
		this.setOptions(options);
		this.url = url;
		
		var image = new Image();
		var element = $(image) || new Element('img');
		
		['load', 'abort', 'error'].each(function(name){
			var type = 'on' + name;
			image[type] = function(){
				if (!image) return;
				if (!element.parentNode){
					element.width = image.width;
					element.height = image.height;
				}
				image = image.onload = image.onabort = image.onerror = null;
				this.loaded.delay(1, this);
				element.fireEvent(name, element, 1);
			};
		}, this);
		
		image.src = element.src = this.url;
		if (image && image.complete) image.onload.delay(1);		
		
		this.element = element.set(this.options.properties);
		this.fireEvent('load');		
	}
	
});

Asset.Images = new Class({
	
	Extends: Asset,
	
	initialize: function(urls, options){
		this.setOptions(options);
		this.urls = urls;
		this.elements = [];
		
		var instances = [];
		this.urls.each(function(url){
			var image = new Asset.Image(url, this.options);
			instances.push(image);
			this.elements.push[image.element];
			this.fireEvent('load', url);
		}, this);		
		
		this.group = new Group(instances);
		this.group.addEvent('complete', this.loaded.bind(this));
	},
	
	loaded: function(){
		this.fireEvent('complete', this.elements).fireEvent('loaded', this.elements);
	}
	
});