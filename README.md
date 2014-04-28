# MooTools More 
MooTools Plugins and Enhancements Repository    
[![Build Status](https://travis-ci.org/mootools/mootools-more.svg?branch=master)](https://travis-ci.org/mootools/mootools-more)

---

## Contribute

You are welcome to contribute to MooTools! What we ask of you:

a. __To report a bug:__

   1. Crete a [jsFiddle](http://jsfiddle.net/) with the minimal amount of code to reproduce the bug.
   2. Create a [Github Issue](https://github.com/mootools/mootools-more/issues), and link to the jsFiddle.

b. __To fix a bug:__

   1. Clone the repo.
   2. Fix the bug.
   3. Add a [spec](http://jasmine.github.io/1.3/introduction.html).
   4. Build and run the specs.
   5. Push to your Github fork.
   6. Create Pull Request, and send Pull Request.


__Do try to contibute!__ This is a community project.

#### TO DO

* change the interactive specs to work without the Clientcide dev app
* deprecate and remove things from -More that are deprecated or not mantained anymore
* add touch / mobile functionality
* make detach method for all classes that attach to elements
* make destroy method for all classes that create elements

#### StyleGuide

* http://wiki.github.com/mootools/mootools-core/syntax-and-coding-style-conventions

## Building & Testing

Current build process uses [Grunt](http://github.com/gruntjs), [Grunt MooTools Packager plugin](https://github.com/ibolmo/grunt-packager), and [Karma related repos](http://github.com/karma-runner/grunt-karma).

**By default**, the build process runs the tests (specs) relevant to the build. To build without testing see the `packager` build targets.

### Testing locally

MooTools More has 2 test suites. One interactive that needs you to click & drag elements, and one non-interactive where the Jasmine & Karma do the whole job. 

**To run the interactive** specs you have to install [mootools-ui-runner](https://github.com/arian/mootools-ui-runner). If you follow the link you find the 2 step quick setup.

**To run the non-interactive** specs you can follow these steps in order:

    $ git clone https://github.com/mootools/mootools-more  # clone the MooTools repo
    $ cd mootools-more                                     # get into the directory
    $ npm install                                          # install de testing tools
    $ npm install grunt-cli -g                             # install the Grunt command line interface
    $ grunt default                                        # run the specs!


You can also change which browser to call in the Gruntfile.js.
__Note that__ _most browsers need to be closed when starting tests so Grunt-Karma opens and closes the browser. Otherwise they might not close on its own and fire a timeout error for inactivity._

Example:

	continuous: {
		browsers: ['PhantomJS', 'IE', 'Chrome', 'Firefox', 'Safari']
	},

If the log is too long, or if you want to store it in a file you can do:

    $ grunt > logs.txt   # This will create a new file called logs.txt in the local directory



### Building MooTools _With_ Compatibility
This means `1.5.x` that is compatible with: `1.4.x`, `1.3.x`, `1.2.x`, and so on.

**Examples**

	grunt               # to build and run specs, or
	grunt packager:all  # to only build the source

### Building MooTools _Without_ Compatibility
This means `1.5.x` **without** deprecated code in `1.4.x`, `1.3.x`, `1.2.x`, and so on.

``` js
'Proceed at your own risk'
See the changelog or the blog related to each version for migrating your code.
```

**Examples**

	grunt nocompat           # to build and run specs, or
	grunt packager:nocompat  # to only build the source


### Testing on Travis & Sauce Labs

Every new Build and Pull Request is now tested on [Travis](https://travis-ci.org/) and [Sauce Labs](https://saucelabs.com/). You can also open your own free account on [Travis](https://travis-ci.org/) and [Sauce Labs](https://saucelabs.com/) to test new code ideas there.

[Travis](https://travis-ci.org/) testing uses [PhantomJS](http://phantomjs.org/) which is a headless browser. When connected to [Sauce Labs](https://saucelabs.com/) then it is possible to choose any number of [different Browsers and Platforms](https://saucelabs.com/platforms). You will need in this case to change the login key so it will match your account.


#### Browsers, Platforms, and More

This test suite is ready for Travis & SauceLabs.
You can also run locally.

Support:

 - IE
 - Firefox
 - Safari
 - Chrome
 - Opera
 - PhantomJS (virtual browser)



## More Information

 - [See the MooTools Wiki for more information](http://github.com/mootools/mootools-core/wikis)
 - [See the MooTools More changelog](https://github.com/mootools/mootools-more/blob/master/changelog.md)