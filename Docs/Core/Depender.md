Class: Depender {#Depender}
==========================

Loads dependencies from MooTools script repositories.

### Implements:

* [Events][], [Options][]

### Syntax

	new Depender(libs[, options]);

### Arguments

* libs - (*mixed*) either a *string* or *object*. If an *object*, see section below on libs. If a *string*, a url to a JSON file that contains the libs object.
* options - (*object*) a key/value set of options

### Options

* target - (*mixed*) A DOM Element or its ID - the target where the scripts are to be injected. Defaults to *document.head*.
* loadedScripts - (*array*) This is a list of scripts already loaded into the document. By default, it is an array of the scripts on which Depender depends (*Core*, *Browser*, *Array*, *String*, *Function*, *Number*, *Hash*, *Element*, *Event*, *Element.Event*, *Class*, *Class.Extras*, *Request*, *JSON*, *Request.JSON*, *More*, and *Depender*).
* loadedSources - (*array*) An array of lib keys that are loaded in their entirety. For example, if your libs.json object has a definition for 'mootools-core' and you have all of core loaded, you can just define *loadedLibs: ['mootools-core']* and all the files in that source will be marked as having been loaded.
* noCache - (*boolean*) this setting is passed along to [Request][] to prevent caching. This is useful in development where scripts are changing often but should be left disabled for production. Defaults to *false*.
* useScriptInjection - (*boolean*) if *false* (the default), scripts are loaded with [Request][] and evaluated. If *true*, script tags are injected into the document.head. The advantage of using [Request][] is that the requests are asynchronous, so other activities are not blocked. The downside to using [Request][] is that errors in your external script files are hard to find (as there is no line number reported) and the scripts *must* be on the same domain as your web app.

### Events

* onRequire - (*function*) callback executed whenever new requirements are passed in to be loaded. Passed an array of the scripts required.
* onReady - (*function*) callback executed when all scripts have finished loading. Note that all *onReady* events are removed when it is fired. This means that if you require a script, all its dependencies and that script will load and then all *onReady* callbacks will be executed, and then those callback will be removed. This allows you to later require additional scripts without executing the callback for the first batch. See the *onRequirementLoaded* event if you want to attach an event to every time the *onReady* event is fired. Passed an array of currently loaded and available scripts.
* onRequirementLoaded - (*function*) callback executed anytime the current set of requirements is loaded. This event fires every time *onReady* fires, but its attached events are not removed. Pased a list of currently loaded and available scripts.
* scriptLoaded - (*function*) callback executed whenever a script loads. Passed an object with the following properties:
** script: the script loaded, 
** totalLoaded: the % loaded of total dependencies, 
** currentLoaded: the % of the current batch (so if you load a group of scripts, and then later require a second group, the third argument here is the percent of that 2nd batch loaded), 
** loaded: and an array of all the loaded scripts.

### Notes

* Multiple instances - note that having multiple instances is ill-advised. If you attempt to create more than one you will be returned the first you created.
* The *onReady* and *onRequirementLoaded* events can be delayed by adding additional requirements. That is to say, if you call the *require* method and specify a script, and then call it again before that script's requirements have loaded, the requirements from the second call will be added and the *onReady* and *onRequirementLoaded* will not fire until both requirements have loaded.
* No two scripts in any of the libs should have the same name. So if one library has *Foo.js*, no other library should either.

### Libs

This class works when it is instantiated with a list of pointers to *scripts.json* files similar to the one used in MooTools. This means that in order to use this class you must organize your own scripts in a similar fashion. The libs argument that you pass to [Depender][] must be an object or a url to a JSON file of that object that lists the location of each *scripts.json* in your dependency map. Here's an example libs.json file or object:

	{
		"core": {
			"scripts": "/core/Source"
		},
		"more": {
			"scripts": "/more/Source"
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

If you want to pass the libs object directly to Depender you can. Simply pass the object instead of the url to the object.

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

### Example Usage

	var myDepender = new Depender({
		core: {
			scripts: "/core/Source"
		},
		more: {
			scripts: "/more/Source"
		},
		myproject: {
			scripts: "/Source"
		}
	}).requireSource('core').require('DatePicker', 'Logger.Extended').addEvents({
		ready: function(loadedScripts) {
			//your startup code that needs DatePicker and Logger.Extended
			//this method will only run once, even if you require more
			//scripts later
		},
		scriptLoaded: function(script, percentOfTotal, percentOfThisBatch, loadedScripts){
			//here you could, for example, show a % loaded message
			//or check loadedScripts for a specific dependency and fire off some logic
			//as soon as its ready
		},
		onRequire: function(requiredScripts) {
			//this will happen every time a new batch is required
			$('loadingSpinner').setStyle('display', 'none');
		},
		onRequirementLoaded: function(loadedScripts) {
			//this will happen every time a batch is completed loading
			$('loadingSpinner').setStyle('display', 'none');
		}
	});
	//later, you need to load more dependencies...
	myDepender.require('Fx.Reveal').addEvent('ready', function(){
		//your previous onReady event will not fire again
		//but your other events event *will*
		$('someElement').reveal();
	});


Depender Method: require {#Depender:require}
--------------------------------------------

Requires a list of scripts to be loaded and starts the process of fetching them.

### Syntax

	new Depender(myLibs).require(script1[, script2, script3, etc]);

### Arguments

1. script - (*string*) The name of the script to require; you can require numerous files by simply specifying more arguments.

### Example

	new Depender(myLibs).require('Fx.Reveal', 'MyWidget', 'Date', 'Etc');

### Returns

* *object* - This instance of [Depender][].

Depender Method: requireSource {#Depender:requireSource}
--------------------------------------------------------

Loads the entire contents of the specified sources.

### Syntax

	new Depender(myLibs).requireSources(sourceName1[, sourceName2, sourceName3])

### Arguments

1. sourceName - (*string*) the key of a source defined in your libs object.

### Example

	new Depender(myLibs).require('core', 'more', 'myproject');

### Returns

* *object* - This instance of [Depender][].

[Events]: /core/Class/Class.Extras#Events
[Options]: /core/Class/Class.Extras#Options
[Request]: /core/Request/Request