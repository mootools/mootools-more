/*
Script: Depender.Client.js
	A dependency loader for the MooTools library that integrates with the server side Depender library.
	see:  http://github.com/anutron/mootools-depender/tree/

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
		target: null,
		builder: '/depender/build.php'
		*/
	},
	
	loadedSources: [],

	loaded: [],
	
	required: [],

	finished: [],
	
	lastLoaded: 0,

	require: function(options){

		if (!this.options.builder) return;
		this.fireEvent('require', options);

		var finish = function(script){
			this.finished.push(script);
			if (options.callback) options.callback(options);
			this.fireEvent('scriptLoaded', {
				script: this.loaded.join(', '),
				totalLoaded: (this.finished.length / this.required.length * 100).round(),
				currentLoaded: ((this.finished.length - this.lastLoaded) / (this.required.length - this.lastLoaded) * 100).round(),
				loaded: this.loaded
			});
			if (this.required.length == this.finished.length) this.lastLoaded = this.finished.length;
			this.fireEvent('requirementLoaded', [this.loaded, options]);
		}.bind(this);

		var src = [this.options.builder + '?depender=true'];

		if (options.scripts) {
			var scripts = $splat(options.scripts).filter(function(script) {
				return !this.loaded.contains(script);
			}, this);
			if (scripts.length) src.push('require=' + scripts.join(','));
		}

		if (options.sources) {
			var sources = $splat(options.sources).filter(function(source){
				return !this.loadedSources.contains(source);
			}, this);
			if (sources.length) src.push('requireLibs=' + $splat(sources).join(','));
		}

		if (src.length == 1) {
			finish();
			return this;
		}

		if (this.loaded.length) {
			src.push('exclude=' + this.loaded.join(','));
		}

		var script = new Element('script', {
			src: src.join('&'),
			events: {
				load: function(){
					finish(script);
				}
			}
		}).inject(this.options.target || document.head);

		this.required.push(script);

		return this;

	}

};

//make it easy to switch between the server side and the client side versions of this library.
['enableLog', 'disableLog', 'include'].each(function(fn) {
	Depender[fn] = $lambda(Depender);
});

$extend(Depender, new Events);
$extend(Depender, new Options);