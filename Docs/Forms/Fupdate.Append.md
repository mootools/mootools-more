Class: Fupdate.Append {#Fupdate-Append}
=======================================

Updates a DOM element with the response from the submission of a form (via Ajax). The result is appended to the DOM element instead of replacing its contents.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/09-forms/05.2-fupdate.append

### Extends

- [Fupdate][]

Fupdate.Append Method: constructor {#Fupdate-Append:constructor}
--------------------------------------------------

### Syntax

	new Fupdate.Append(form, update[, options]);

### Arguments

* The same as [Fupdate][]

### Options

* The same as [Fupdate][] in addition to:
* useReveal - (*boolean*) Use [Fx.Reveal][] to transition the result in to the appended DOM element; defaults to *true*.
* revealOptions - (*object*) Options passed along to [Fx.Reveal][].
* inject - (*string*) The injection location for the returned content (see [Element.inject][]) into the *update* element specified in the arguments; defaults to 'bottom'.


### Events

* onBeforeEffect - (*function*) callback executed before the new element begins its reveal; passed as arguments the container that is revealing.
* onSuccess - (*function*) callback executed after the new element is visible. Passed container of the new content, the container into which it is injected, and (passed along from Request.HTML's onSuccess method) the response tree, the response elements, the response html, and the response javascript

[Fupdate]: /more/Forms/Fupdate
[Fx.Reveal]: /more/Fx/Fx.Reveal
[Element.inject]: /core/Element/Element#Element:inject