Singleton: Depender {#Depender}
==========================

Loads dependencies from MooTools script repositories.

### Implements:

* [Events][], [Options][]

Depender Method: setOptions {#Depender:setOptions}
--------------------------------------------------

This is the setOptions method from [Options][]. As Depender is not a class, you must call this method directly to configure it.

### Options

* target - (*mixed*) A DOM Element or its ID - the target where the scripts are to be injected. Defaults to *document.head*.
* loadedScripts - (*array*) This is a list of scripts already loaded into the document. By default, it is an array of the scripts on which Depender depends (*Core*, *Browser*, *Array*, *String*, *Function*, *Number*, *Hash*, *Element*, *Event*, *Element.Event*, *Class*, *Class.Extras*, *Request*, *JSON*, *Request.JSON*, *More*, and *Depender*).
* loadedSources - (*array*) An array of lib keys that are loaded in their entirety. For example, if your libs.json object has a definition for 'mootools-core' and you have all of core loaded, you can just define *loadedLibs: ['mootools-core']* and all the files in that source will be marked as having been loaded.
* noCache - (*boolean*) this setting is passed along to [Request][] to prevent caching. This is useful in development where scripts are changing often but should be left disabled for production. Defaults to *false*.
* useScriptInjection - (*boolean*) if *false*, scripts are loaded with [Request][] and evaluated. If *true* (the default), script tags are injected into the document.head (or the target specified in the options). The advantage of using [Request][] is that the requests are asynchronous, so other activities are not blocked. The downside to using [Request][] is that errors in your external script files are hard to find (as there is no line number reported) and the scripts *must* be on the same domain as your web app.
* serial - (*boolean*) if *true*, Depender will ensure that all calls to [require][] are loaded in order and that the callbacks are loaded in order. For example, let's say you require scripts *A*, *B*, and *C* to load and when they are loaded you wish to execute the function *X*. You then require script *B* in a separate call to the [require][] method and, when it is loaded, you wish to execute function *Y*. When *B* loads, *Y* will execute, *before* *X* because, *X* is still waiting on *C*. If you set serial to *true*, it will wait for *X* to be executed before running *Y*, even though *Y*'s requirements are met earlier. It defaults to *false*.

### Events

* onRequire - (*function*) callback executed whenever new requirements are passed in to be loaded. Passed the object that is passed to the [require][] method.
* onRequirementLoaded - (*function*) callback executed anytime the current set of requirements is loaded. Passed the object that is passed to the [require][] method.
* scriptLoaded - (*function*) callback executed whenever a script loads. Passed an object with the following properties:
** script: the script loaded, 
** totalLoaded: the % loaded of total dependencies, 
** currentLoaded: the % of the current batch (so if you load a group of scripts, and then later require a second group, the third argument here is the percent of that 2nd batch loaded), 
** loaded: and an array of all the loaded scripts.

### Notes

* No two scripts in any of the libs should have the same name. So if one library has *Foo.js*, no other library should either. This is a remnant of the MooTools scripts.json, which wasn't designed originally to work with other scripts.json files. This naming requirement will be removed with MooTools 2.0.
* Note that you can create 3 different types of loading progress bars:
** a progress bar that shows a percentage of ALL dependencies loading. This means that if you load one batch with, say, 2 items in it, it will go 0%-50%-100%. If you load a second batch at some later point, that has another 2 scripts, your progress bar will start at 50% (2 loaded, 2 to go) and go 50%-75%-100%. A subsequent load statement of 2 more scripts would produce 66%-83%-100%. This can be created with the *totalLoaded* value in the *onRequirementLoaded* callback.
** a progress bar that shows a percentage of the current *batch*. Whenever you require a set of scripts, the Depender starts loading them. When all dependencies are loaded, it resets its "batch" counter. If you then later require additional scripts, the counter starts going up until all requirements are loaded. Note that if Depender is loading requirements and you call the *require* method again and the total requirements to load grows in size, you'll see the counter go down, as now there are more files to load. You can create this progress bar using the *currentLoaded* value in the *onRequirementLoaded* callback.
** a progress bar for a specific requirement. This could be useful if you want to show numerous loading bars at once. This is created using the *onStep* callback in the *[require][]* method's argument.

Depender Method: include {#Depender:include}
--------------------------------------------

Includes a collection of scripts.

### Syntax

	Depender.include(libs);

### Arguments

1. libs - (*mixed*) either a string (a url to fetch a json object) or an object (the data itself - see below).

### Returns:

* *object* - the *Depender* object.

### Libs

This class works when it is supplied with a list of pointers to *scripts.json* files similar to the one used in MooTools. This means that in order to use this class you must organize your own scripts in a similar fashion. The libs argument that you pass to [Depender][] must be an object or a url to a JSON file of that object that lists the location of each *scripts.json* in your dependency map. Here's an example libs.json file or object:

	{
		"core": {
			"scripts": "/core/Source",
			"path": "http://mycdn.com/mootools/core/Source"
		},
		"more": {
			"scripts": "/more/Source",
			"path": "http://mycdn.com/mootools/more/Source"
		},
		"myLibrary": {
			"scripts": "/Source"
		}
	}

This implies you have your files organized like so in your web document root:

	/core/Source/scripts.json
	/more/Source/scripts.json
	/Source/scripts.json << your scripts

Note that these locations must be accessible locally (i.e. via ajax) as these json files are fetched with [Request][].

The "path" values for "core" and "more" tell Depender that rather than looking for the scripts in the same place as the scripts.json file, it must prepend the file paths with the given path. This allows you to include scripts from a different domain (note: only if you have the option *useScriptInjection* set to *true* - the default).

If you want to pass the libs object directly to Depender you can. Simply pass the object instead of the url to the object.

	Depender.include('/libs.json');
	//OR
	Depender.include({
		core: {
			scripts: '/core/Source'
		},
		etc...
	});

### Scripts

Inside each directory that you link to there must be a scripts.json. Examples of these documents can be found inside of MooTools Core and MooTools More. Here is a very brief example of what one might look like. (Note that the MooTools *scripts.json* files include descriptions and perhaps other data, but all that is required is the dependency values).

	{
		"UI": {
			"Widget": {
				"deps": ["Class", "Element", "Fx.Morph"]
			},
			"DatePicker": {
				"deps": ["Widget", "Date"]
			}
		},
		"Util": {
			"Logger": {
				"deps": ["Class"]
			},
			"Logger.Extended": {
				"deps": ["Logger"]
			}
		}
	}


### Returns

	* *object* - This instance of [Depender][].

Depender method: require {#Depender:require}
--------------------------------------------

Loads required scripts and executes a callback when they are ready.

### Syntax

	Depender.require(options);

### Arguments

1. options - (*object*) a key/value set of options

### Options

* scripts - (*mixed*) an *array* of script names (*strings*) to load. If you have only one script required, it can be a *string*.
* sources - (*mixed*) an *array* of source names (*strings*) to load. If you have only one source required, it can be a *string*. The source name should map to the names defined in your libs argument passed to the *include* method. From the previous section's example, you could include "core" for example, and this would load all the scripts in the MooTools Core.
* onStep - (*function*) callback executed every time a dependency for this call to [require][] is made. Even if other scripts are loaded, if they are not dependencies of this call, the *onStep* method will not be called. It is passed an object with two values: percent - a 1-100 integer of the percentage of dependencies loaded, and scripts: an array of all the names of the scripts thus-far loaded.
* callback - (*function*) callback executed when all scripts that are required for this call are loaded. If the option *serial* is set to true, then the callback may be delayed if there were any previous requirements on the stack before this one.

### Returns

* *object* - This instance of [Depender][].

Example Usage {#Depender:Example}
---------------------------------

	Depender.setOptions({
		scriptLoaded: function(data){
			//here you could, for example, show a % loaded message
			//or check loadedScripts for a specific dependency and fire off some logic
			//as soon as its ready
			//data is
			//{
			//	script: script name, 
			//	percentOfTotal: 1-100 integer, 
			//	percentOfThisBatch: 1-100 integer, 
			//	loadedScripts: array of available scripts
			//}
		},
		onRequire: function(requiredScripts) {
			//this will happen every time a new batch is required
			$('loadingSpinner').setStyle('display', 'none');
		},
		onRequirementLoaded: function(loadedScripts) {
			//this will happen every time a batch is completed loading
			$('loadingSpinner').setStyle('display', 'none');
		}
	}).include({
		//add these resources
		core: {
			scripts: "/core/Source"
		},
		more: {
			scripts: "/more/Source"
		},
		myproject: {
			scripts: "/Source"
		}
	}).require({
		scripts: ['DatePicker', 'Logger.Extended'], //array or single string for one item
		sources: 'core', //include ALL of core; this can be an array or a single string for one item
		callback: function() {
			//your startup code that needs DatePicker and Logger.Extended
			//this method will only run once, even if you require more
			//scripts later
		},
		onStep: function(data){
			//function executed every time a dependency of this specific requirement is loaded
			//data is:
			//{
			//	percent: 1-100 percentage loaded of THIS requirement
			//	scripts: array of all available scripts
			//}
		}
	});
	//later, you need to load more dependencies...
	Depender.require({
		scripts: 'Fx.Reveal', //array or single string for one item
		callback: function(){
			//if, for some reason, Fx.Reveal is available already,
			//or it is loaded before the requirements for the previous
			//require statements are met, then this function will load,
			//meaning that it may run before the methods above
			//UNLESS you set the *serial* option to *true*
			$('someElement').reveal();
		}
	});



[Events]: /core/Class/Class.Extras#Events
[Options]: /core/Class/Class.Extras#Options
[Request]: /core/Request/Request
[require]: #Depender:require