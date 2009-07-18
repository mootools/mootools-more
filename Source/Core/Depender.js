var Depender = new Class({
	Implements: [Events],
	noCache: true,
	loaded: [],
	sources: {},
	initialize: function(url){
		this.fetchLibs(url);
	},
	fetchLibs: function(url) {
		this.request(url, function(data){
			this.libs = data;
			$each(this.libs, function(data, lib) {
				if (data.scripts) this.loadSource(lib, data.scripts);
			}, this);
		}.bind(this))
	},
	require: function(){
		if (this.libs) {
			this.loadDependencies.apply(this, arguments);
			return this;
		}
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
			prefix = "http://";
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
			this.fireEvent('mapLoaded');
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
		if (script == "None" || !script) return reqs;
		var deps = this.getDepsForScript(script);
		if (!deps) {
			dbug.log('dependencies not mapped: script: %o, map: %o, :deps: %o', script, this.pathMap, this.deps);
		} else {
			deps.each(function(scr){
				if (scr == script || scr == "None") return;
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
			return this.cleanDoubleSlash(dir + chunks.join('/') + '.js' + (this.noCache ? '?noCache=' + new Date().getTime() : ''));
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
				this.loadedScripts.set(scr, this.loadedScripts.get(scr) || false);
			}, this);
			if (scripts.length) {
				scripts.filter(function(scr){
					return scr != "None"
				}).each(function(scr){
					this.load(scr);
				}.bind(this));
			} else {
				this.fireEvent('ready');
			}
		}, this);
	},
	load: function(script) {
		new Element('script', {
			src: this.getPath(script),
			events: {
				load: function() {
					this.scriptLoaded(script);
				}.bind(this)
			}
		}).inject(document.head);
	},
	loadedScripts: $H({
		'mootools.all': true
	}),
	scriptLoaded: function(script) {
		this.loadedScripts[script] = true;
		var ready = this.loadedScripts.every(function(loaded, scr) {
			return loaded;
		}, this);
		if (ready) {
			this.fireEvent('ready');
		}
	}
});