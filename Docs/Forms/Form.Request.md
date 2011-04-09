Class: Form.Request {#Form-Request}
===================================

Updates a DOM element with the response from the submission of a form (via Ajax).

### Demo

* [Enhanced Form](http://mootools.net/demos/?demo=Enhanced-Form)


### Implements

- [Options][], [Events][], [Class.Occlude][]

Form.Request Method: constructor {#Form-Request:constructor}
--------------------------------------------------

### Syntax

	new Form.Request(form, update[, options]);

### Arguments

1. form  - (*mixed*) A form Element or the string id of a form Element to manage submissions.
2. update - (*mixed*) An Element or the string id of an Element to update with the response.
3. options - (*object*, optional) The options object described below:

### Options

* requestOptions - (*object*) The options passed on to the instance of [Request.HTML] created by the class that sends the form. Defaults to *{evalScripts: true, useSpinner: true, url: <the form url>, emulation: false, spinnerTarget: <the update argument>}*.
* extraData - (*object*) An optional set of key/value pairs to be included with the form data submitted to the server. If keys in this collide with data in the form, the form values will be preserved and the *extraData* discarded.
* resetForm - (*boolean*) If *true* (the default), the form is reset when the request is sent.

### Events

* send - (*function*) The function to execute when the request is sent. Passed the form being submitted and the data (an *object*) being submitted.
* failure - (*function*) The function to execute when the request fails. Passed the XHR that is returned by *Request* on failure.
* success - (*function*) The function to execute when the request succeeds. Passed the target being updated, the request text, and the request xml.

Form.Request and Form.Validator {#Form-Request:Form-Validator}
-------------------------------------------------

*Form.Request* integrates with [Form.Validator][] to prevent the ajax being sent if the validation fails. It retrieves the *Form.Validator* instance from the form, so all that is required is that you instantiate the *Form.Validator* before you instantiate the instance of *Fudpate*. If the instance of *Form.Validator* has the *stopOnFailure* option set to *true* (the default) then *Form.Request* will not send the ajax request if the validator fails.

Form.Request Method: setTarget {#Form-Request:setTarget}
--------------------------------------

Changes the target that the instance will update with the Request response.

### Syntax

	myFormRequest.setTarget(newTarget);

### Arguments

1. newTarget - (*mixed*) An Element or the string id of an Element to update with the response.

### Returns

* (*object*) - This instance of [Form.Request][]

Form.Request Method: send {#Form-Request:send}
--------------------------------------

Sends the form.

### Syntax

	myFormRequest.send();

### Returns

* (*object*) - This instance of [Form.Request][]

Form.Request Method: disable {#Form-Request:disable}
--------------------------------------

Detaches the Form.Request from the form (disabling the ajax).

### Syntax

	myFormRequest.disable();

### Returns

* (*object*) - This instance of [Form.Request][]

Form.Request Method: enable {#Form-Request:enable}
--------------------------------------

Attaches the Form.Request to the form (enabling the ajax). Note that this is done on instantiation, so you only need to use this method if you disable the [Form.Request][] instance and want to re-enable it.

### Syntax

	myFormRequest.enable();

### Returns

* (*object*) - This instance of [Form.Request][]

Type: Element {#Element}
==========================

Extends the [Element][] Type with a reference to its [Form.Request][] instance and a method to create one.

Element Method: formRequest {#Element:formRequest}
-------------------------------------

Creates a new instance of [Form.Request][] and calls its *send* method.

### Syntax

	$(element).formRequest(update, options);

### Arguments

* update - (*mixed*) An Element or the string id of an Element to update with the response.
* options - (*object*) a key/value set of options. See [Form.Request:options][].

### Returns

* (*element*) This Element.

### Example

	$(element).formRequest($('myDiv'), { requestOptions: {useSpinner: false } });

Element property: form.request {#Element:form.request}
------------------------------------------------

### Syntax

	myForm.retrieve('form.request'); //the instance of Form.Request for the element

[Chain]: /core/Class/Class.Extras#Chain
[Events]: /core/Class/Class.Extras#Events
[Options]: /core/Class/Class.Extras#Options
[Class.Occlude]: /more/Class/Class.Occlude
[Form.Request]: #Form-Request
[Form.Validator]: /more/Forms/Form.Validator#Form-Validator
[Element]: /core/Type/Element