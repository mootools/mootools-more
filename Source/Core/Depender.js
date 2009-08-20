/*
Script: Depender.js
	Clientside dependency loader for MooTools.

	License:
		MIT-style license.

	Authors:
		Aaron Newton
*/

var Depender = {

	options: {
		/* 
		onRequire: $empty(options),
		onRequirementLoaded: $empty([scripts, options]),
		onScriptLoaded: $empty({
			script: script, 
			totalLoaded: percentOfTotalLoaded, 
			loaded: scriptsState
		}),
		serial: false,
		target: null,
		noCache: false,
		log: false,*/
		loadedSources: [],
		loadedScripts: ['Core', 'Browser', 'Array', 'String', 'Function', 'Number', 'Hash', 'Element', 'Event', 'Element.Event', 'Class', 'DomReady', 'Class.Extras', 'Request', 'JSON', 'Request.JSON', 'More', 'Depender'],
		useScriptInjection: true
	},

	resetLog: function(){
		this.logged.empty();
		return this;
	},

	enableLog: function(){
		this.log = function(){
			console.log.apply(console, arguments);
			return this;
		};
		this.log('enabling depender log.');
		this.logged.each(function(logged){
			this.log.apply(this, logged);
		}, this);
		return this.resetLog();
	},

	logged:[],

	disableLog: function(){
		this.log = function(){
			this.logged.push(arguments);
			return this;
		};
		return this;
	},

	loaded: [],

	sources: {},

	libs: {},

	include: function(libs) {
		this.mapLoaded = false;
		var loader = function(data){
			this.libs = $merge(this.libs, data);
			$each(this.libs, function(data, lib) {
				if (data.scripts) this.loadSource(lib, data.scripts);
			}, this);
		}.bind(this);
		if ($type(libs) == 'string') {
			this.log('fetching libs ', libs);
			this.request(libs, loader);
		} else {
			loader(libs);
		}
		return this;
	},

	required: [],

	require: function(options){
		var loaded = function(){
			var scripts = this.calculateDependencies(options.scripts);
			if (options.sources) {
				options.sources.each(function(source){
					scripts.combine(this.libs[source].files);
				}, this);
			}
			if (options.serial) scripts.combine(this.getLoadedScripts());
			options.scripts = scripts;
			this.required.push(options);
			this.fireEvent('require', options);
			this.loadScripts(options.scripts);
		}.bind(this);
		if (this.mapLoaded) {
			loaded();
		} else {
			//if !this.mapLoaded, then fetchLibs is still running and the map isn't loaded
			var fetcher = function(){
				loaded();
				this.removeEvent('mapLoaded', fetcher);
			}.bind(this);
			this.addEvent('mapLoaded', fetcher);
		}
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
		if (this.libs[lib].files) return this.dataLoaded();
		this.log('loading source: ', source);
		this.request(this.cleanDoubleSlash(source + '/scripts.json'), function(result){
			this.libs[lib].files = result;
			this.dataLoaded();
		}.bind(this));
	},

	//manage loaded data
	dataLoaded: function(){
		var loaded = true;
		$each(this.libs, function(v, k) {
			if (!this.libs[k].files) loaded = false;
		}, this);
		if (loaded) {
			this.mapTree();
			this.mapLoaded = true;
			this.calculateLoaded();
			this.lastLoaded = this.getLoadedScripts().getLength();
			this.fireEvent('mapLoaded');
		}
	},

	calculateLoaded: function(){
		var set = function(script) {
			this.scriptsState[script] = true;
		}.bind(this);
		if (this.options.loadedScripts) this.options.loadedScripts.each(set);
		if (this.options.loadedSources) {
			this.options.loadedSources.each(function(lib) {
				$each(this.libs[lib].files, function(dir) {
					$each(dir, function(data, file){
						set(file);
					}, this);
				}, this);
			}, this);
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
					if (this.deps[source+':'+folder+':'+script]) return;
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
	calculateDependencies: function(scripts){
		var reqs = [];
		$splat(scripts).each(function(script){
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
			}
			reqs.include(script);
		}, this);
		return reqs;
	},

	//get the path for a script
	getPath: function(script){
		try {
			var chunks = this.pathMap[script].split(':');
			var lib = this.libs[chunks[0]];
			var dir = (lib.path || lib.scripts) + '/';
			chunks.erase(chunks[0]);
			return this.cleanDoubleSlash(dir + chunks.join('/') + '.js');
		} catch(e){
			return script;
		}
	},

	//load the missing dependencies for a given script
	loadScripts: function(scripts){
		scripts = scripts.filter(function(s){
			if (!this.scriptsState[s] && s != "None") {
				this.scriptsState[s] = false;
				return true;
			}
		}, this);
		if (scripts.length) {
			scripts.each(function(scr){
				this.loadScript(scr);
			}.bind(this));
		} else {
			this.check();
		}
	},

	toLoad: [],

	loadScript: function(script) {
		var finish = function() {
			this.loading = false;
			this.scriptLoaded(script);
			if (this.toLoad.length) this.loadScript(this.toLoad.shift());
		}.bind(this);
		if (this.scriptsState[script] && this.toLoad.length) return this.loadScript(this.toLoad.shift());
		if (this.loading) return this.toLoad.push(script);
		this.loading = true;
		scriptPath = this.getPath(script);
		var error = function() {
			this.log('could not load: ', scriptPath);
		}.bind(this);
		if (this.options.useScriptInjection) {
			new Element('script', {
				src: scriptPath + (this.options.noCache ? '?noCache=' + new Date().getTime() : ''),
				events: {
					load: function() {
						this.log('loaded script: ', scriptPath);
						finish();//.delay(50, this); << can't remember why I had this delay, but I bet it matters; leaving this comment for now
					}.bind(this),
					error: error
				}
			}).inject(this.options.target || document.head);
		} else {
			new Request({
				url: scriptPath,
				noCache: this.options.noCache,
				onComplete: function(js) {
					this.log('loaded script: ', scriptPath);
					$exec(js);
					finish();//.delay(50, this); << can't remember why I had this delay, but I bet it matters; leaving this comment for now
				}.bind(this),
				onFailure: error,
				onException: error
			}).send();
		}
	},

	scriptsState: $H({}),
	getLoadedScripts: function(){
		return this.scriptsState.filter(function(state){
			return state;
		});
	},

	scriptLoaded: function(script) {
		this.scriptsState[script] = true;
		this.check();
		var loaded = this.getLoadedScripts();
		var loadedLength = loaded.getLength();
		var toLoad = this.scriptsState.getLength();
		this.fireEvent('scriptLoaded', {
			script: script,
			totalLoaded: (loadedLength / toLoad * 100).round(),
			currentLoaded: ((loadedLength - this.lastLoaded) / (toLoad - this.lastLoaded) * 100).round(),
			loaded: loaded
		});
		if (loadedLength == toLoad) this.lastLoaded = loadedLength;
	},

	lastLoaded: 0,

	check: function(){
		var incomplete = [];
		this.required.each(function(required) {
			var loaded = [];
			required.scripts.each(function(script) {
				if (this.scriptsState[script]) loaded.push(script);
			}, this);
			if (required.onStep) {
				required.onStep({
					percent: loaded.length / required.scripts.length * 100,
					scripts: loaded
				});
			};
			if (required.scripts.length != loaded.length) return;
			required.callback();
			this.required.erase(required);
			this.fireEvent('requirementLoaded', [loaded, required]);
		}, this);
	}

};
$extend(Depender, new Events);
$extend(Depender, new Options);
Depender._setOptions = Depender.setOptions;
Depender.setOptions = function() {
	Depender._setOptions.apply(Depender, arguments);
	if (this.options.log) Depender.enableLog();
	return this;
};
Depender.disableLog();