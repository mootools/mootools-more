/*
Script: Depender.js
	Clientside dependency loader for MooTools.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

var Depender = new Class({

	Implements: [Events, Options],

	options: {
		/* 
		target: document.head,
		onReady: $empty(loadedScripts),
		requirementLoaded: $empty(loadedScripts),
		scriptLoaded: $empty(script),
		*/
		loaded: 'core',
		noCache: true,
		serial: Browser.Engine.trident4
	},

	initialize: function(url, options){
		this.setOptions(options);
		this.fetchLibs(url);
	},

	loaded: [],

	sources: {},

	fetchLibs: function(url) {
		this.request(url, function(data){
			this.libs = data;
			$each(this.libs, function(data, lib) {
				if (data.scripts) this.loadSource(lib, data.scripts);
			}, this);
		}.bind(this))
	},

	require: function(){
		if (this.mapLoaded) {
			this.loadDependencies.apply(this, arguments);
			return this;
		}
		//if !this.mapLoaded, then fetchLibs is still running and the map isn't loaded
		var fetcher = function(){
			this.require.apply(this, arguments);
			this.removeEvent('mapLoaded', fetcher);
		}.bind(this, arguments);

		this.addEvent('mapLoaded', fetcher);
		return this;
	},

	cleanDoubleSlash: function(str){
		if (!str) return str;
		var prefix = '';
		if (str.test(/^http:\/\//)) {
			prefix = 'http://';
			str = str.substring(7, str.length);
		}
		str = str.replace(/\/\//g, '/');
		return prefix + str;
	},

	request: function(url, callback) {
		new Request.JSON({
			url: url,
			secure: false,
			onSuccess: callback
		}).send();
	},

	loadSource: function(lib, source){
		this.request(this.cleanDoubleSlash(source + '/scripts.json'), function(result){
			this.libs[lib].files = result;
			this.dataLoaded();
		}.bind(this));
	},

	//manage loaded data; fire onReady when all sources are loaded
	dataLoaded: function(){
		var loaded = true;
		$each(this.libs, function(v, k) {
			if (!this.libs[k].files) loaded = false;
		}, this);
		if (loaded) {
			this.mapTree();
			this.mapLoaded = true;
			this.calculateLoaded();
			this.fireEvent('mapLoaded');
		}
	},

	calculateLoaded: function(){
		var loaded = this.options.loaded;
		var set = function(script) {
			this.loadedScripts[script] = true;
		}.bind(this);
		if (loaded) {
			if ($type(loaded) == 'string') {
				if (this.libs[loaded]) {
					$each(this.libs[loaded].files, function(scripts) {
						$each(scripts, function(data, name) {
							set(name);
						});
					}, this);
				} else {
					this.loadedScripts[loaded] = true;
				}
			} else if ($type(loaded) == 'array') {
				loaded.each(set);
			} else if ($type(loaded) == 'object') {
				$each(loaded, set);
			}
		}
	},

	//map dependencies
	deps: {},

	pathMap: {},

	//create a map of source to paths
	mapTree: function(){
		$each(this.libs, function(data, source){
			$each(data.files, function(scripts, folder){
				$each(scripts, function(details, script){
					this.deps[source+':'+folder+':'+script] = details.deps;
					this.pathMap[script] = source+':'+folder+':'+script;
				}, this);
			}, this);
		}, this);
	},

	//get the dependencies for a given script
	getDepsForScript: function(script){
		return this.deps[this.pathMap[script]] || [];
	},

	//calculate the dependencies for a given script
	calculateDependencies: function(script){
		var reqs = [];
		if (script == 'None' || !script) return reqs;
		var deps = this.getDepsForScript(script);
		if (!deps) {
			if (window.console && console.warn) console.warn('dependencies not mapped: script: %o, map: %o, :deps: %o', script, this.pathMap, this.deps);
		} else {
			deps.each(function(scr){
				if (scr == script || scr == 'None' || !scr) return;
				if (!reqs.contains(scr)) reqs.combine(this.calculateDependencies(scr));
				reqs.include(scr);
			}, this);
			return reqs;
		}
	},

	//get the path for a script
	getPath: function(script){
		try {
			var chunks = this.pathMap[script].split(':');
			var dir = this.libs[chunks[0]].scripts + '/';
			chunks.erase(chunks[0]);
			return this.cleanDoubleSlash(dir + chunks.join('/') + '.js' + (this.options.noCache ? '?noCache=' + new Date().getTime() : ''));
		} catch(e){
			return script;
		}
	},

	//load the missing dependencies for a given script
	loadDependencies: function(){
		$each(arguments, function(script){
			var scripts = this.calculateDependencies(script).include(script);
			scripts = scripts.filter(function(s){return !this.loadedScripts.get(s)}, this);
			scripts.each(function(scr) {
				this.loadedScripts[scr] = this.loadedScripts.get(scr) || false;
			}, this);
			if (scripts.length) {
				scripts.filter(function(scr){
					return scr != 'None'
				}).each(function(scr){
					this.load(scr);
				}.bind(this));
			} else {
				this.ready();
			}
		}, this);
	},

	toLoad: [],

	load: function(script) {
		var finish = function() {
			this.loading = false;
			this.scriptLoaded(script);
			if (this.toLoad.length) this.load(this.toLoad.shift());
		}.bind(this);
		if (this.options.serial && this.loading) return this.toLoad.push(script);
		this.loading = true;
		new Request({
			url: this.getPath(script),
			onComplete: function(js) {
				$exec(js);
				finish.delay(50, this);
			}.bind(this)
		}).send();
	},

	loadedScripts: $H({}),

	scriptLoaded: function(script) {
		this.loadedScripts[script] = true;
		this.fireEvent('scriptLoaded', script);
		var ready = this.loadedScripts.every(function(loaded, scr) {
			return loaded;
		}, this);
		if (ready) {
			this.ready();
		}
	},

	ready: function(){
		this.fireEvent('ready', this.loadedScripts.getKeys());
		this.removeEvents('ready');
		this.addEvent('ready', function(scripts){
			this.fireEvent('requirementLoaded', scripts);
		}.bind(this));
	}

});