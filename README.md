MooTools Plugins and Enhancements Repository

### Wiki

* [See the wiki for how to get involved](http://wiki.github.com/mootools/mootools-more).
* See also [MooTools-Core](https://github.com/mootools/mootools-core/tree) and [MooTools-Lang](http://github.com/anutron/mootools-lang/tree/master)

### TO DO

* Lang updates for additional timeAgoInWords phrases (see: https://mootools.lighthouseapp.com/projects/24057/tickets/79-additional-expressions-for-datetimediffinwords)
* Move demo/tutorials from Clientcide wiki to Mootorial; update links in docs
* Compat for Clientcide
* make detach method for all classes that attach to elements
* make destroy method for all classes that create elements

### StyleGuide

* http://wiki.github.com/mootools/mootools-core/syntax-and-coding-style-conventions


### Changes

NOTE: none of the changes below are breaking changes.

#### Changes in MooTools More 1.2.4.2

* 

#### Changes in MooTools More 1.2.4.1

* [roughly a dozen issues fixed or closed (in lighthouse)](https://mootools.lighthouseapp.com/projects/24057-mootoolsmore/tickets?q=milestone%3A1.2.4.1)
* Numerous documentation updates
* Spinner: Adding a getSpinner method to Request in Spinner's refactoring of that Class
* Spinner: Fixing default styles
* Form.Validator, Date: Added Ukrainian translations
* Date: Added new Date parser (parses "Thu Oct 22 08:11:23 +0000 2009")
* Fx.Accordion: handling the alwaysHide option so you can still have returnHeightToAuto set to true (see [this discussion](http://groups.google.com/group/mootools-users/browse_thread/thread/27004d2d0dc227c2u))
* Tips: Restoring arguments to the show/hide events; tip no longer defaults to display:none (this restores the previous behavior)
* Fx.Reveal: stores cssText whenever it starts a transition and restores it when it finishes or is canceled, leaving the element without a bunch of inline styles, as if you'd just done setStyle('display', 'block'/'none')
* Fx.SmoothScroll: adding a "scrolledTo" event
* Drag: added new 'stopPropagation' option
* HtmlTable.Select: ensuring that instances only delegates to immediate children (for nested tables)
* HtmlTable.Sort.js: detects and sorts date columns more accurately, handles negative integers and floats
* Reorganized scripts json so Depender can implement Log

##### Changes to Clientcide plugins adopted by MooTools More in this release

* Fupdate is now named Form.Request; see compat layer on [Clientcide.com](http://clientcide.com/js)

#### Changes in MooTools More 1.2.3.1

* Issues fixed (in lighthouse): #50, #55, #65, and various other minor bugs
* Replaced all occurrences of $ with document.id
* Overhauled Date.js
* Prevented overtext from focusing on inputs except when they are interacted with
* Moved some methods from Date.Extras into Date because of some dependencies that weren't seen before.
* Added Date.now for all browsers.  Removed unnecessary genericization.
* Date.define2DigitYearStart now in effect.  Defaults to 1970. 2 digit dates before 70 will default to 2000*
* Fx.Scroll: added scrollIntoView method
* JSONP was calling this.request instead of this.send
* Patch for FormValidator.Inline's scrollFxOptions being ignored, [see clientcide bug](http://github.com/anutron/clientcide/issues#issue/27).
* Updated Iframeshim's empty document creation; fixes https issues in IE6
* OverText now stops polling when elements are hidden (when polling is enabled).
* Added error callback for Assets.images

#### Changes in MooTools More 1.2.2.2

* Issues fixed (in lighthouse): #47, #38, and various other minor bugs
* Updated the OverText class to allow for the user to set the element type.

#### Breaking changes from RC1

* URI
 - domain renamed to host
* Fx.Accordion
 - no longer organizes the DOM for you

#### Breaking Changes from More

* Tips
  - options:offsets in Tips renamed to offset
* Accorion
  - renamed to Fx.Accordion
* SmoothScroll
  - renamed to Fx.SmoothScroll

#### Breaking Changes from Clientcide

* IframeShim
  - options:zindex renamed to zIndex
* JsonP
  - renamed to Request.JSONP
  - constructor/send/prepareUrl take options hash, no longer an url directly (like Request)
  - user can change options on the fly when calling send() with a new hash, reusing the object
  - added check method. support for link: ignore, cancel, chain (like Request)
  - added success, request and cancel events
  - data can be a hash or string now (like Request)
  - queryString option gone
  - makeUrl logic now moved to new getScript(), which directly returns the script
  - changed how it essentially works. instead of storing the object reference, we store a new function every time a request is made, that keeps a reference of the script element and the object instance.
  - abortAfter and timeout gone. there's now a single timeout for retries and for when retries run out.
  - globalFunction gone, deemed useless
* Browser.Extras completely refactored into URI Native object
  - Browser.redraw is gone
* Class.Binds no longer supports lowercase binds
* Element.fxOpacityOk (which was never documented or intended for external use) is gone
* Element.isVisible renamed to Element.isDisplayed
* Form.Validator base class no longer does what it did (that is now in Form.Validator.Inline)
* OverText
  - no longer takes a collection of inputs.
  - .showTxt > .show, .hideTxt > .hide
  - .hide and .show no longer take the element and 'focus' arguments.
  - .repositionAll is gone; .repositionOverTxt is now just .reposition; it does not take an argument
* String.Extras
  - findAllEmails gone, too specific
* Date
  - Number / String extensions moved to string extras. zeroise made an anonymous function, was lame
* Element.setPosition is now Element.position
* String.Extra query functions moved to URI.js
 - parseQuery > parseQueryString for consistency with cleanQueryString
* Request.Queue
	- event names all renamed; *onRequestStart* >> *onRequest*, *onRequestSuccess* >> *onSuccess*, etc