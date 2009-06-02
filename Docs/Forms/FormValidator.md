Class: InputValidator {#InputValidator}
=======================================

This class contains functionality to test a field for various criteria and also to generate an error message when that test fails.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/09-forms/04-formvalidator

### Authors

* Aaron Newton
* Based on [validation.js by Andrew Tetlaw][]

### Implements

* [Options][]

### Syntax

	new InputValidator(className, options);

### Arguments

1. className - (*string*) a className that this field will be related to (see example below)
2. options - (*object*) a key/value set of options

### Options

* errorMsg - (*mixed*) a message to display; see section below for details.
* test - (*function*) a function that returns *true* or *false*

### Option: errorMsg

The errorMsg option can be any of the following:

* *string* - the message to display if the field fails validation
* *boolean:false* - do not display a message at all
* *function* - a function to evaluate that returns either a *string* or *false*. This function will be passed two parameters: the field being evaluated and	any properties defined for the validator as a className (see examples below)

### Option: test

The test option is a function that will be passed the field being evaluated and any properties defined for the validator as a className (see example below); this function **must** return *true* or *false*.

### Examples

	//html code
	<input type="text" name="firstName" class="required" id="firstName"/>

	//simple validator
	var isEmpty = new InputValidator('required', {
		errorMsg: 'This field is required.',
		test: function(field){
			return ((field.get('value') == null) || (field.get('value').length == 0));
		}
	});
	isEmpty.test($("firstName")); //true if empty
	isEmpty.getError($("firstName")) //returns "This field is required."

	//two complex validators
	<input type="text" name="username" class="minLength:10 maxLength:100" id="username"/>

	var minLength = new InputValidator ('minLength', {
		errorMsg: function(element, props){
			//props is {minLength:10, maxLength:100}
			if ($type(props.minLength))
				return 'Please enter at least ' + props.minLength + ' characters' +
					' (you entered ' + element.value.length + ' characters).';
			else return '';
		},
		test: function(element, props){
			//if the value is >= than the minLength value, element passes test
			return (element.value.length >= $pick(props.minLength, 0));
			else return false;
		}
	});
	minLength.test($('username'));
	var maxLength = new InputValidator ('maxLength', {
		errorMsg: function(element, props){
			//props is {minLength:10, maxLength:100}
			if ($type(props.maxLength))
				return 'Please enter no more than ' + props.maxLength + ' characters' +
					'(you entered ' + element.value.length + ' characters).';
			else return '';
		},
		test: function(element, props){
			//if the value is <= than the maxLength value, element passes test
			return (element.value.length <= $pick(props.maxLength, 10000));
		}
	});

InputValidator Method: test {#InputValidator:test}
--------------------------------------------------

Tests a field against the validator's rule(s).

### Syntax

	myInputValidator.test(field);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the form input to test

### Returns

* (*boolean*) - *true* if the field passes the test; *false* if it does not pass the test

InputValidator Method: getError {#InputValidator:getError}
----------------------------------------------------------

Retrieves the error message for the validator.

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the form input to test

### Returns

* (*mixed*) - The error message (*string*) or *boolean false* if no message is meant to be returned.


Class: FormValidator {#FormValidator}
====================================

Evaluates an entire form against all the validators that are set up, firing events when inputs fail validation.

### Implements

* [Options][], [Events][]

### Syntax

	new FormValidator(form[, options]);

### Arguments

1. form - (*mixed*) A string of the id for an Element or an Element reference of the form to evaluate
2. options - (*object*) a key/value set of options

### Options

* stopOnFailure - (*boolean*) if *true* (the default) the form will not submit if there is a validation error.
* fieldSelectors - (*string*) the selector for fields to include in the validation; defaults to *"input, select, textarea"*; these are applied only to the children of the form
* useTitles - (*boolean*) use the titles of inputs for the error message; overrides the messages defined in the InputValidators (see [InputValidator][]); defaults to *false*
* evaluateOnSubmit - (*boolean*) whether to validate the form when the user submits it; defaults to *true*
* evaluateFieldsOnBlur - (*boolean*) whether to validate the fields when the blur event fires; defaults to *true*
* evaluateFieldsOnChange - (*boolean*) whether to validate the fields when the change event fires; defaults to *true*
* serial - (*boolean*) whether to validate other fields if one field fails validation unless the other fields' contents actually change (instead of onblur); defaults to *true*
* ignoreHidden - (*boolean*) if *true* (the default), all fields that are not visible to the user (who are display:none or whose parents are display:none) are not validated.
* warningPrefix - (*string*) prefix to be added to every warning; defaults to *"Warning: "*
* errorPrefix - (*string*) prefix to be added to every error; defaults to *"Error: "*

### Events

* onFormValidate - (*function*) callback to execute when the form validation completes; this function is passed three arguments: a *boolean* (*true* if the form passed validation); the form *element*; and the onsubmit *event* object if there was one (otherwise, passed *undefined*)
* onElementValidate - (*function*) callback to execute when an input element is tested. This function is passed four arguments: a *boolean* (*true* if the form passed validation), the input *element* that was tested, the name of the validator that failed, and a *boolean* that denotes if it was configured as a warning or not (*true* means warn). Note that this callback is executed for each validator.
* onElementPass - (*function*) callback to execute when an input element passes *all* of it's validators. Passed one argument: the *element* that was tested.
* onElementFail - (*function*) callback to execute when an element *fails one or more* of its validators. Passed two arguments: the *element* that was tested and an *array* of all the validator names that failed.

### Example

	var myFormValidator = new FormValidator($('myForm'), {
		onFormValidate: myFormHandler,
		useTitles: true
	});

### Notes

* [FormValidator][] must be configured with [InputValidator][] objects (see below for details as well as a list of built-in validators). Each [InputValidator][] will be applied to any input that matches its className within the elements of the form that match the fieldSelectors option.
* You can define a css class-name value called *msgPos* as the id of an element into which the validation errors for that input will be inserted. Example:

		<input class="validate-email msgPos:'emailAdvice'">
		<div id="emailAdvice"></div>


* The preferred method for passing in validator properties (like the minimum length) is to append the value after the class name. This value will be passed through [JSON.decode][] so it can be a number, string, array representation, etc.

		//the minimum length the user can supply is the integer 10
		<input class="minLength:10">
		//there isn't a default validator like this, but if there were,
		//it would be passed the *string* 'foo'
		<input class="cannotContain:'foo'">

* You can use a property called "validatorProps" and pass in Json values if you like, but this is not valid XHTML. This is deprecated but will continue to be supported.

		<input class="minLength maxLength" validatorProps="{minLength: 10, maxLength:20}">

* You can pass properties that are not a validator's name. All properties will be passed to the validator:

		//here we validate the date, but the validator gets access to
		//the property defined for dateFormat (and any other property defined this way)
		<input class="validate-date dateFormat:'%d/%m/%Y">

* Note that the property must be decodable by [JSON.decode][], so strings must have quotes, for example (single quotes are fine).

### Using Warnings

Each [InputValidator][] can also be used to generate warnings. Warnings still show error messages, but do not prevent the form from being submitted. Warnings can be applied in two ways:

* **warn per validator** - You can specify any validator as a warning by prefixing "warn-" to the class name. So, for example, if you have a validator called "validate-numbers" you can add the class "warn-validate-numbers" and a warning will be offered rather than an error. The validator will not prevent the form from submitting.
* **warn per field** - You can also ignore all the validators for a given field. You can add the class "warnOnly" to set all it's validators to present warnings only or you can add the class "ignoreValidation" to the field to turn all the validators off. Note that the [FormValidator][] class has methods do this for you: see [FormValidator:ignoreField][] and [FormValidator:enforceField][].

### Internationalization

FormValidator comes with numerous built-in validators (see below), each of which presents a validation error to the user when they trip it. These can be altered for different languages. See [Lang][]

If you do translate these, please [send them back to us][] so we can add them to our repository.


FormValidator Method: reset {#FormValidator:reset}
--------------------------------------------------

Removes all the error messages from the form.

### Syntax

	myFormValidator.reset();

### Returns

* (*object*) - This instance of [FormValidator][]

FormValidator Method: validate {#FormValidator:validate}
--------------------------------------------------------

Validates all the inputs in the form; note that this function is called on submit unless you specify otherwise in the options.

### Syntax

	myFormValidator.validate(event);

### Arguments

1. event - (*event*, optional) the submit event

### Returns

* (*boolean*) *true* if all the form inputs pass validation

FormValidator Method: validateField {#FormValidator:validateField}
----------------------------------------------------------------------

Validates the value of a field against all the validators.

### Syntax

	myFormValidator.validateField(field[, force]);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to evaluate
2. force - (*boolean*, optional) whether to force validation; if *false* (or *undefined*) **and** *options.serial == true*, the validation does not occur

### Returns

* (*boolean*) *true* if the form input passes validation

FormValidator Method: test {#FormValidator:test}
------------------------------------------------

Tests a field against a specific validator.

### Syntax

	myFormValidator.test(className, field, warn);

### Arguments

1. className - (*string*) the className associated with the validator
2. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to test against the className/validator
3. warn - (*boolean*, optional) whether test will add a warning advice message if the validator fails; if set to *true* test will always return valid regardless of the input.

### Returns

* (*boolean*) *true* if the form input passes the specified validation

FormValidator Method: resetField {#FormValidator:resetField}
------------------------------------------------------------

Removes all the error messages for a specific field.

### Syntax

	myFormValidator.resetField(field);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to reset

### Returns

* (*object*) This instance of [FormValidator][]

FormValidator Method: stop {#FormValidator:stop}
------------------------------------------------

Stops validating the form; when form is submitted, even if there are values that do not pass validation the submission will proceed.

### Syntax

	myFormValidator.stop();

### Returns

* (*object*) This instance of [FormValidator][]

FormValidator Method: start {#FormValidator:start}
------------------------------------------------

Resumes validating the form.

### Syntax

	myFormValidator.start();

### Returns

* (*object*) This instance of [FormValidator][]



FormValidator Method: ignoreField {#FormValidator Method:ignoreField}
----------------------------------------------------------------------

Stops validating a particular field.

### Syntax

	myFormValidator.ignoreField(field[, warn]);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to ignore
2. warn - (*boolean*, optional) whether to produce a warning if the validtor does not pass; defaults to *false*

### Returns

* (*object*) This instance of [FormValidator][]

FormValidator Method: enforceField {#FormValidator:enforceField}
----------------------------------------------------------------

Resumes validating a particular field

### Syntax

	myFormValidator.enforceField(field);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to resume validating

### Returns

* (*object*) - This instance of [FormValidator][]

Adding Custom Validators {#AddingValidators}
============================================

*FormValidator.js* includes many default validators. You can add your own using these methods.

FormValidator Method: add {#AddingValidators:add}
-------------------------------------------------

Adds a new form validator to the global [FormValidator][] object or to an instance (see notes).

### Syntax

	//add a form validator to my instance
	myFormValidator.add(className, options);
	//add a form validator to all future instances (globally)
	FormValidator.add(className, options);

### Arguments

1. className - (*string*) the className associated with the validator
2. options - (*object*) the [InputValidator][] options (*errorMsg* and *test*)

### Notes

This method is a property of every instance of [FormValidator][] as well as the [FormValidator][] object itself. That is to say that you can add validators to the [FormValidator][] object or to an instance of it. Adding validators to an instance of [FormValidator][] will make those validators apply only to that instance, while	adding them to the Class will make them available to all instances.

### Examples

	//add a validator for ALL instances
	FormValidator.add('isEmpty', {
		errorMsg: 'This field is required',
		test: function(element){
			if (element.value.length == 0) return false;
			else return true;
		}
	});
	//this validator is only available to this single instance
	var myFormValidatorInstance = new FormValidator('myform');
	myFormValidatorInstance.add('doesNotContainTheLetterQ', {
		errorMsg: 'This field cannot contain the letter Q!',
		test: function(field){
			return !field.get('value').test(/q/,'i');
		}
	});
	//Extend FormValidator, add a global validator for all instances of that version
	var NewFormValidator = FormValidator.extend({
		//...some code
	});
	NewFormValidator.add('doesNotContainTheLetterZ', {
		errorMsg: 'This field cannot contain the letter Z!',
		test: function(field){
			return !field.get('value').test(/z/,'i');
		}
	});

FormValidator: addAllThese {#AddingValidators:addAllThese}
----------------------------------------------------------

An array of [InputValidator][] configurations (see [FormValidator:add][] above).

### Syntax

	//add several input validators to all instances of FormValidator
	FormValidator.addAllThese(validators);
	//add several input validators to a specific instance of FormValidator
	myFormValidator.addAllThese(validators);

### Arguments

1. validators - (*array*) an array of validators (see example below and [FormValidator:add][]).

### Example

	FormValidator.addAllThese([
		['className1', {errorMsg: ..., test: ...}],
		['className2', {errorMsg: ..., test: ...}],
		['className3', {errorMsg: ..., test: ...}],
		// etc..
	]);

Native: Element {#Element}
==========================

Element Property: validator {#Element-Properties:validator}
---------------------------------------------------------

Sets and gets default options for the FormValidator instance of an Element.

### Setter:

#### Syntax:

	el.set('validator'[, options]);

#### Arguments:

* options - (*object*) the FormValidator options.

#### Returns:

* (*element*) This Element.

#### Examples:

	el.set('validator', {serial: true});
	el.validate();

### Getter:

#### Syntax:

	el.get('validator', [options]);

#### Arguments:

1. property - (*string*) the FormValidator property argument.
2. options  - (*object*) the FormValidator options.

#### Returns:

* (*object*) The Element's internal FormValidator instance.

#### Examples:

	el.get('validator', {serial: true, evaluateFieldsOnBlur: false}).reset();

### Notes:

- When options are passed to either the setter or the getter, the instance will NOT be recreated. Its existing instance will have its options set with the new values.
- As with the other Element shortcuts, the difference between a setter and a getter is that the getter returns the instance, while the setter returns the element (for chaining and initialization).

Element method: validate {#Element:validate}
--------------------------------------------

Calls the *validate* method on the specified element.

### Syntax

	myForm.validate([options]);

### Arguments

1. options - (*object*; optional) options to apply to the internal element's of FormValidator.

### Returns

* (*boolean*) Returns *true* if the form passes validation, else *false* if there were errors.

Included InputValidators: {#Validators}
=======================================

Here are the validators that are included in this libary. Add the className to any input and then create a new [FormValidator][] and these will automatically be applied. See [FormValidator:add][] on how to add your own.

Validator: IsEmpty {#Validators:IsEmpty}
----------------------------------------

Evalutes if the input is empty; this is a utility validator, see [FormValidator.required][].

Validator: required {#Validators:required}
------------------------------------------

Displays an error if the field is empty.

Error Msg: "This field is required"

Validator: minLength {#Validators:minLength}
--------------------------------------------

Displays a message if the input value is less than the supplied length.

Error Msg: "Please enter at least [defined minLength] characters (you entered [input length] characters)"

### Note

You must add this className AND properties for it to your input.

### Example

	<input type="text" name="username" class="minLength:10" id="username"/>

Validator: maxLength {#Validators:maxLength}
--------------------------------------------

Displays a message if the input value is less than the supplied length.

Error Msg: "Please enter no more than [defined maxLength] characters (you entered [input length] characters)"

### Note

You must add this className AND properties for it to your input.

### Example

	<input type="text" name="username" class="maxLength:10" id="username"/>

Validator: validate-numeric {#Validators:validate-numeric}
-----------------------------------------------------------

Validates that the entry is a number.

Error Msg: 'Please enter only numeric values in this field ("1" or "1.1" or "-1" or "-1.1").'

Validator: validate-integer {#Validators:validate-integer}
----------------------------------------------------------

Validates that the entry is an integer.

Error Msg: "Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted."


Validator: validate-digits {#Validators:validate-digits}
--------------------------------------------------------

Validates that the entry contains only numbers but allows punctuation and spaces (for example, a phone number)

Error Msg: "Please use numbers only in this field. Please avoid spaces or other characters such as dots or commas."

Validator: validate-alpha {#Validators:validate-alpha}
------------------------------------------------------

Validates that the entry contains only letters

Error Msg - "Please use letters only (a-z) in this field."

Validator: validate-alphanum {#Validators:validate-alphanum}
------------------------------------------------------------

Validates that the entry is letters and numbers only

Error Msg: "Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed."

Validator: validate-date {#Validators:validate-date}
----------------------------------------------------

Validates that the entry parses to a date.

Error Msg: "Please enter a valid date (such as 12/31/1999)"

Validate: validate-email {#Validators:validate-email}
-----------------------------------------------------

Validates that the entry is a valid email address.

Error Msg: "Please enter a valid email address. For example 'fred@domain.com'."

Validate: validate-url {#Validators:validate-url}
-------------------------------------------------

Validates that the entry is a valid url

Error Msg: "Please enter a valid URL."

Validator: validate-currency-dollar {#Validators:validate-currency-dollar}
--------------------------------------------------------------------------

Validates that the entry matches any of the following:

	* [$]1[##][,###]+[.##]
	* [$]1###+[.##]
	* [$]0.##
	* [$].##

Error Msg: "Please enter a valid $ amount. For example $100.00 ."

Validator: validate-one-required {#Validators:validate-one-required}
--------------------------------------------------------------------

Validates that all the entries within the same node are not empty.

Error Msg: "Please enter something for at least one of the above options."

### Note
 * This validator will get the parent element for the input and then check all its children. To use this validator, enclose all the inputs you want to group in another element (doesn't matter which); you only need apply this class to *one* of the elements.

### Example

	<div>
		<input ..../>
		<input ..../>
		<input .... className="validate-one-required"/>
	</div>


FormValidator Language Localization {#Localization}
==========================================

*FormValidator.js* includes the following key/values for localization.

* required - (*string*) 'This field is required.'
* minLength - (*string*) 'Please enter at least {minLength} characters (you entered {length} characters).' where *minLength* and *length* are variables for the minimum length and the length the user entered.
* maxLength - (*string*) 'Please enter no more than {maxLength} characters (you entered {length} characters).' where *maxLength* and *length* are variables for the maximum length and the length the user entered.
* integer - (*string*) 'Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.'
* numeric - (*string*) 'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").'
* digits - (*string*) 'Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).'
* alpha - (*string*) 'Please use letters only (a-z) with in this field. No spaces or other characters are allowed.'
* alphanum - (*string*) 'Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.'
* dateSuchAs - (*string*) 'Please enter a valid date such as {date}' where *date* is an example of a valid date entry
* dateInFormatMDY - (*string*) 'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")'
* email - (*string*) 'Please enter a valid email address. For example "fred@domain.com".'
* url - (*string*) 'Please enter a valid URL such as http://www.google.com.'
* currencyDollar - (*string*) 'Please enter a valid $ amount. For example $100.00 .'
* oneRequired - (*string*) 'Please enter something for at least one of these inputs.'
* errorPrefix - (*string*)  'Error: '
* warningPrefix - (*string*)  'Warning: '

[InputValidator]: #InputValidator
[FormValidator]: #FormValidator
[FormValidator:ignoreField]: #FormValidator:ignoreField
[FormValidator:enforceField]: #FormValidator:enforceField
[FormValidator:add]: #AddingValidators:add
[FormValidator.required]: #FormValidator:required
[validation.js by Andrew Tetlaw]: http://tetlaw.id.au/view/blog/really-easy-field-validation-with-prototype
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[send them back to us]: http://groups.google.com/group/mootools-lang
[JSON.decode]: /core/Utilities/JSON#decode
[Lang]: /lang/