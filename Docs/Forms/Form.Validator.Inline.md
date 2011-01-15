Class: Form.Validator.Inline {#Form-Validator-Inline}
====================================

Evaluates an entire form against all the validators that are set up *displaying messages* in-line in the page.

### Extends

* [Form.Validator][]

### Implements

* [Options][], [Events][]


Form.Validator.Inline Method: Constructor
------------------------------------------

### Syntax

	new Form.Validator.Inline(form[, options]);

### Arguments

1. form - (*mixed*) A string of the id for an Element or an Element reference of the form to evaluate
2. options - (*object*) a key/value set of options

### Options

* all the options defined for [Form.Validator][], plus
* scrollToErrorsOnSubmit - (*boolean*) if *true* (the default), when the user submits the form the window (or overflown parent) will scroll up to that element so it is in view. Will use [Fx.Scroll][] if it's available, otherwise it will jump to the element.
* scrollToErrorsOnBlur - (*boolean*) Defaults false, however if true blur events will be attached to inputs, triggering a scroll to relevant errored field.
* scrollToErrorsOnChange - (*boolean*) Defaults false, however if true change events will be attached to inputs, triggering a scroll to the relevant errored field.
* scrollFxOptions - (*object*) options for [Fx.Scroll][] if it's available; used for scrolling to errors if *scrollToErrorsOnSubmit* is *true*.
* showError - (*function*) the function used to show messages. Passed the message element which is injected into the document already and needs to have its display set to *block*. By default, this method uses [Fx.Reveal][] to smoothly show the message (if it is loaded), otherwise it just sets the display style to block.
* hideError - (*function*) the function used to hide messages. Works exactly like the *showAdvice* option above, but instead is meant to hide the message. Uses [Fx.Reveal][] if possible, otherwise sets display to *none*.

### Events

* all the events defined for [Form.Validator][], plus
* onShowAdvice - (*function*) callback executed when advice is shown. Passed three arguments: an Element reference for the input being validated, an Element reference to the advice element, and the failed validator's name.
* onHideAdvice - (*function*) callback exectued when advice is shown. Passed three arguments: an Element reference for the input being validated, an Element reference to the advice element, and the failed validator's name.

### Note

* You can define a data-validators value called *msgPos* as the id of an element into which the validation errors for that input will be inserted. Example:

		<input data-validators="validate-email msgPos:'emailAdvice'">
		<div id="emailAdvice"></div>

Form.Validator.Inline method: getAllAdviceMessages {#Form-Validator-Inline:getAllAdviceMessages}
----------------------------------------------------------------------

Returns all the messages that an input can produce, regardless of the user input.

### Syntax

	myFormValidator.getAllAdviceMessages(field[, force]);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input
2. force - (*boolean*; optional) if *false*, no messages are returned if the input has the string 'ignoreValidation' in its *data-validators* property

### Returns

* (*object*) An object containing information about the message. See example:

		{
			message: string, //The message the user would see
			warnOnly: boolean, //true if this should just be a warning
			passed: boolean, //true if the current value passes validation
			validator: validator //the InputValidator instance
		}

Form.Validator method: getAdvice {#Form-Validator-Inline:getAdvice}
----------------------------------------------------------------------

Retrieves the advice message for a field and a given validator name.

### Syntax

	myFormValidator.getAdvice(field, validatorName);

### Example

	myFormValidator.getAdvice(myInput, 'validate-email');

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input.
2. validatorName - (*string*) A string that represents the validator's name as it was added to [Form.Validator][].

### Returns

* (*element*) A DOM element containing the message for the user.

[Form.Validator]: /more/Forms/Form.Validator
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[Fx.Scroll]: /more/Fx/Fx.Scroll
