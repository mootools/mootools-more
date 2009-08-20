Class: Fupdate {#Fupdate}
=========================
Updates a DOM element with the response from the submission of a form (via Ajax).

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/09-forms/05.1-fupdate

### About the name

I know - "Fupdate" (Form Update abbr.) is kinda lame, but I really couldn't come up with a better name... BTW, it's pronounced as one word (not "F-Update"; rather "fupdate"). I'm open to suggestions!

### Implements

- [Options][], [Events][], [Class.Occlude][]

Fupdate Method: constructor {#Fupdate:constructor}
--------------------------------------------------

### Syntax

	new Fupdate(form, update[, options]);

### Arguments

1. form  - (*mixed*) A form Element or the string id of a form Element to manage submissions.
2. update - (*mixed*) An Element or the string id of an Element to update with the response.
3. options - (*object*, optional) The options object described below:

### Options

* requestOptions - (*object*) The options passed on to the instance of [Request.HTML] created by the class that sends the form. Defaults to *{evalScripts: true, useWaiter: true, url: <the form url>, emulation: false, waiterTarget: <the update argument>}*.
* extraData - (*object*) An optional set of key/value pairs to be included with the form data submitted to the server. If keys in this collide with data in the form, the form values will be preserved and the *extraData* discarded.
* resetForm - (*boolean*) If *true* (the default), the form is reset when the request is sent.

### Events

* onSend - (*function*) The function to execute when the request is sent. Passed the form being submitted and the data (an *object*) being submited.
* onFailure - (*function*) The function to execute when the request fails. Passed the xhr that is returned by *Request* on failure.
* onSuccess - (*function*) The function to execute when the request succeeds. Passed the target being updated, the request text, and the request xml.

Fupdate and FormValidator {#Fupdate:FormValidator}
-------------------------------------------------

*Fupdate* integrates with [FormValidator][] to prevent the ajax being sent if the validation fails. It retrieves the *FormValidator* instance from the form, so all that is required is that you instantiate the *FormValidator* before you instantiate the instance of *Fudpate*. If the instance of *FormValidator* has the *stopOnFailure* option set to *true* (the default) then *Fupdate* will not send the ajax request if the validator fails.

Fupdate Method: send {#Fupdate:send}
--------------------------------------

Sends the form.

### Syntax

	myFupdate.send();

### Returns

* (*object*) - This instance of [Fupdate][]

Fupdate Method: disable {#Fupdate:disable}
--------------------------------------

Detaches the Fupdate from the form (disabling the ajax).

### Syntax

	myFupdate.disable();

### Returns

* (*object*) - This instance of [Fupdate][]

Fupdate Method: disable {#Fupdate:enable}
--------------------------------------

Attaches the Fupdate to the form (enabling the ajax). Note that this is done on instantiation, so you only need to use this method if you disable the [Fupdate][] instance and want to re-enable it.

### Syntax

	myFupdate.enable();

### Returns

* (*object*) - This instance of [Fupdate][]


[Chain]: /core/Class/Class.Extras#Chain
[Events]: /core/Class/Class.Extras#Events
[Options]: /core/Class/Class.Extras#Options
[Class.Occlude]: /more/Class/Class.Occlude