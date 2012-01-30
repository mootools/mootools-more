Class: Form.Validator {#Form-Validator}
=======================================

Evaluates an entire form against all the validators that are set up, firing events when inputs fail validation.

### Demo

* [Enhanced Form](http://mootools.net/demos/?demo=Enhanced-Form)

### Implements

* [Options][], [Events][]

Form.Validator Method: Constructor
----------------------------------

### Syntax

	new Form.Validator(form[, options]);

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
* ignoreDisabled - (*boolean*) if *true* (the default), all disabled fields are not validated.
* warningPrefix - (*string*) prefix to be added to every warning; defaults to *"Warning: "*
* errorPrefix - (*string*) prefix to be added to every error; defaults to *"Error: "*

### Events

* formValidate - (*function*) callback to execute when the form validation completes; this function is passed three arguments: a *boolean* (*true* if the form passed validation); the form *element*; and the onsubmit *event* object if there was one (otherwise, passed *undefined*)
* elementValidate - (*function*) callback to execute when an input element is tested. This function is passed four arguments: a *boolean* (*true* if the form passed validation), the input *element* that was tested, the name of the validator that failed, and a *boolean* that denotes if it was configured as a warning or not (*true* means warn). Note that this callback is executed for each validator.
* elementPass - (*function*) callback to execute when an input element passes *all* of it's validators. Passed one argument: the *element* that was tested.
* elementFail - (*function*) callback to execute when an element *fails one or more* of its validators. Passed two arguments: the *element* that was tested and an *array* of all the validator names that failed.

### Example

	var myFormValidator = new Form.Validator($('myForm'), {
		onFormValidate: myFormHandler,
		useTitles: true
	});

### Notes

* [Form.Validator][] must be configured with [InputValidator][] objects (see below for details as well as a list of built-in validators). Each [InputValidator][] will be applied to any input that includes its name in the data-validators property within the elements of the form that match the fieldSelectors option.
* The preferred method for passing in validator properties (like the minimum length) is to append the value after the name. This value will be passed through [JSON.decode][] so it can be a number, string, array representation, etc.

		// the minimum length the user can supply is the integer 10
		<input data-validators="minLength:10" />
		// there isn't a default validator like this, but if there were,
		// it would be passed the *string* 'foo'
		<input data-validators="cannotContain:'foo'"/>

* You can use a property called "data-validator-properties" and pass in JSON values if you like.

		<input class="minLength maxLength" data-validator-properties="{minLength: 10, maxLength:20}"/>

* You can pass properties that are not a validator's name. All properties will be passed to the validator:

		// here we validate the date, but the validator gets access to
		// the property defined for dateFormat (and any other property defined this way)
		<input data-validators="validate-date dateFormat:'%d/%m/%Y'" />

* Note that the property must be decodable by [JSON.decode][], so strings must have quotes, for example (single quotes are fine).
* Note that string values that require spaces should use URL encoding, as spaces are the delimiters for validator names. Then your validator should url decode them from the data-validator-properites object when it uses them. Alternately, you can store this data directly on the input:

		$('myinput').set('validatorProps', {
			someValue: "I'm a string with spaces!"
		});

### Using Warnings

Each [InputValidator][] can also be used to generate warnings. Warnings still show error messages, but do not prevent the form from being submitted. Warnings can be applied in two ways:

* **warn per validator** - You can specify any validator as a warning by prefixing "warn-" to the name. So, for example, if you have a validator called "validate-numbers" you can add the name "warn-validate-numbers" and a warning will be offered rather than an error. The validator will not prevent the form from submitting.
* **warn per field** - You can also ignore all the validators for a given field. You can add the name "warnOnly" to set all it's validators to present warnings only or you can add the class "ignoreValidation" to the field to turn all the validators off. Note that the [Form.Validator][] class has methods do this for you: see [Form.Validator:ignoreField][] and [Form.Validator:enforceField][].

### Internationalization

Form.Validator comes with numerous built-in validators (see below), each of which presents a validation error to the user when they trip it. These can be altered for different languages. See [Locale][]

If you do translate these, please [send them back to us][] so we can add them to our repository.


Form.Validator Method: enable {#Form-Validator:enable}
----------------------------------------------------

Enables the form validator, attaching events for submit, blur, and change per the options configuration. This method is invoked on startup.

### Syntax

	myFormValidator.enable();

### Returns

* (*object*) - This instance of [Form.Validator][]


Form.Validator Method: disable {#Form-Validator:disable}
----------------------------------------------------

Disables the form validator, removing events for submit, blur, and change per the options configuration.

### Syntax

	myFormValidator.disable();

### Returns

* (*object*) - This instance of [Form.Validator][]

Form.Validator Method: reset {#Form-Validator:reset}
----------------------------------------------------

Removes all the error messages from the form.

### Syntax

	myFormValidator.reset();

### Returns

* (*object*) - This instance of [Form.Validator][]

Form.Validator Method: validate {#Form-Validator:validate}
----------------------------------------------------------

Validates all the inputs in the form; note that this function is called on submit unless you specify otherwise in the options.

### Syntax

	myFormValidator.validate(event);

### Arguments

1. event - (*event*, optional) the submit event

### Returns

* (*boolean*) *true* if all the form inputs pass validation

Form.Validator Method: validateField {#Form-Validator:validateField}
--------------------------------------------------------------------

Validates the value of a field against all the validators.

### Syntax

	myFormValidator.validateField(field[, force]);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to evaluate
2. force - (*boolean*, optional) whether to force validation; if *false* (or *undefined*) **and** *options.serial == true*, the validation does not occur

### Returns

* (*boolean*) *true* if the form input passes validation

Form.Validator Method: test {#Form-Validator:test}
--------------------------------------------------

Tests a field against a specific validator.

### Syntax

	myFormValidator.test(name, field, warn);

### Arguments

1. name - (*string*) the name associated with the validator
2. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to test against the name/validator
3. warn - (*boolean*, optional) whether test will add a warning advice message if the validator fails; if set to *true* test will always return valid regardless of the input.

### Returns

* (*boolean*) *true* if the form input passes the specified validation

Form.Validator Method: resetField {#Form-Validator:resetField}
--------------------------------------------------------------

Removes all the error messages for a specific field.

### Syntax

	myFormValidator.resetField(field);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to reset

### Returns

* (*object*) This instance of [Form.Validator][]

Form.Validator Method: stop {#Form-Validator:stop}
--------------------------------------------------

Stops validating the form; when form is submitted, even if there are values that do not pass validation the submission will proceed.

### Syntax

	myFormValidator.stop();

### Returns

* (*object*) This instance of [Form.Validator][]

Form.Validator Method: start {#Form-Validator:start}
----------------------------------------------------

Resumes validating the form.

### Syntax

	myFormValidator.start();

### Returns

* (*object*) This instance of [Form.Validator][]



Form.Validator Method: ignoreField {#Form-Validator:ignoreField}
----------------------------------------------------------------

Stops validating a particular field.

### Syntax

	myFormValidator.ignoreField(field[, warn]);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to ignore
2. warn - (*boolean*, optional) whether to produce a warning if the validator does not pass; defaults to *false*

### Returns

* (*object*) This instance of [Form.Validator][]

Form.Validator Method: enforceField {#Form-Validator:enforceField}
------------------------------------------------------------------

Resumes validating a particular field

### Syntax

	myFormValidator.enforceField(field);

### Arguments

1. field - (*mixed*) A string of the id for an Element or an Element reference of the input element to resume validating

### Returns

* (*object*) - This instance of [Form.Validator][]

Adding Custom Validators {#AddingValidators}
============================================

*Form.Validator.js* includes many default validators. You can add your own using these methods.

Form.Validator Method: add {#AddingValidators:add}
--------------------------------------------------

Adds a new form validator to the global [Form.Validator][] object or to an instance (see notes).

### Syntax

	//add a form validator to my instance
	myFormValidator.add(name, options);
	//add a form validator to all future instances (globally)
	Form.Validator.add(name, options);

### Arguments

1. name - (*string*) the name associated with the validator
2. options - (*object*) the [InputValidator][] options (*errorMsg* and *test*)

### Notes

This method is a property of every instance of [Form.Validator][] as well as the [Form.Validator][] object itself. That is to say that you can add validators to the [Form.Validator][] object or to an instance of it. Adding validators to an instance of [Form.Validator][] will make those validators apply only to that instance, while adding them to the Class will make them available to all instances.

### Examples

	//add a validator for ALL instances
	Form.Validator.add('isEmpty', {
		errorMsg: 'This field is required',
		test: function(element){
			if (element.value.length == 0) return false;
			else return true;
		}
	});
	//this validator is only available to this single instance
	var myFormValidatorInstance = new Form.Validator('myform');
	myFormValidatorInstance.add('doesNotContainTheLetterQ', {
		errorMsg: 'This field cannot contain the letter Q!',
		test: function(field){
			return !field.get('value').test(/q/,'i');
		}
	});
	//Extend Form.Validator, add a global validator for all instances of that version
	var NewFormValidator = Form.Validator.extend({
		//...some code
	});
	NewFormValidator.add('doesNotContainTheLetterZ', {
		errorMsg: 'This field cannot contain the letter Z!',
		test: function(field){
			return !field.get('value').test(/z/,'i');
		}
	});

Form.Validator: addAllThese {#AddingValidators:addAllThese}
-----------------------------------------------------------

An array of [InputValidator][] configurations (see [Form.Validator:add][] above).

### Syntax

	//add several input validators to all instances of Form.Validator
	Form.Validator.addAllThese(validators);
	//add several input validators to a specific instance of Form.Validator
	myFormValidator.addAllThese(validators);

### Arguments

1. validators - (*array*) an array of validators (see example below and [Form.Validator:add][]).

### Example

	Form.Validator.addAllThese([
		['name1', {errorMsg: ..., test: ...}],
		['name2', {errorMsg: ..., test: ...}],
		['name3', {errorMsg: ..., test: ...}],
		// etc..
	]);

Type: Element {#Element}
========================

Element Property: validator {#Element-Properties:validator}
-----------------------------------------------------------

Sets and gets default options for the Form.Validator instance of an Element.

### Setter

#### Syntax

	el.set('validator'[, options]);

#### Arguments

* options - (*object*) the Form.Validator options.

#### Returns

* (*element*) This Element.

#### Examples

	el.set('validator', {serial: true});
	el.validate();

### Getter

#### Syntax

	el.get('validator', [options]);

#### Arguments

1. property - (*string*) the Form.Validator property argument.
2. options  - (*object*) the Form.Validator options.

#### Returns

* (*object*) The Element's internal Form.Validator instance.

#### Examples

	el.get('validator', {serial: true, evaluateFieldsOnBlur: false}).reset();

### Notes

- When options are passed to either the setter or the getter, the instance will NOT be recreated. Its existing instance will have its options set with the new values.
- As with the other Element shortcuts, the difference between a setter and a getter is that the getter returns the instance, while the setter returns the element (for chaining and initialization).

Element method: validate {#Element:validate}
--------------------------------------------

Calls the *validate* method on the specified element.

### Syntax

	myForm.validate([options]);

### Arguments

1. options - (*object*; optional) options to apply to the internal element's of Form.Validator.

### Returns

* (*boolean*) Returns *true* if the form passes validation, else *false* if there were errors.

Included InputValidators: {#Validators}
=======================================

Here are the validators that are included in this library. Add the name to any input's data-validators property and then create a new [Form.Validator][] and these will automatically be applied. See [Form.Validator:add][] on how to add your own.

Validator: IsEmpty {#Validators:IsEmpty}
----------------------------------------

Evaluates if the input is empty; this is a utility validator, see [Form.Validator.required][].

Validator: required {#Validators:required}
------------------------------------------

Displays an error if the field is empty.

Error Msg: "This field is required"

Validator: length {#Validators:length}
--------------------------------------------

Displays a message if the input value is not the exact supplied length.

Error Msg: "Please enter [defined length] characters (you entered [input length] characters)"

### Note

You must add this name AND properties for it to your input.

### Example

	<input type="text" name="username" class="length:10" id="username" />


Validator: minLength {#Validators:minLength}
--------------------------------------------

Displays a message if the input value is less than the supplied length.

Error Msg: "Please enter at least [defined minLength] characters (you entered [input length] characters)"

### Note

You must add this name AND properties for it to your input.

### Example

	<input type="text" name="username" class="minLength:10" id="username" />

Validator: maxLength {#Validators:maxLength}
--------------------------------------------

Displays a message if the input value is less than the supplied length.

Error Msg: "Please enter no more than [defined maxLength] characters (you entered [input length] characters)"

### Note

You must add this name AND properties for it to your input.

### Example

	<input type="text" name="username" class="maxLength:10" id="username" />

Validator: validate-numeric {#Validators:validate-numeric}
----------------------------------------------------------

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

Validates that the entry parses to a date. The *dateFormat* property can be set to format the date after the field is validated.

If you want to validate a custom format, you should use [Date.defineParser][] or use [Date Locale][]. If [Date][] is not included in your build, only the `dd/mm/yy` or `dd/mm/yyyy` formats are accepted.

Error Msg: "Please enter a valid date (such as 12/31/1999)"

### Example:

	<input data-validators="validate-date dateFormat:'%d/%m/%Y'" />

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

* [$]1[\#\#][,\#\#\#]+[.\#\#]
* [$]1\#\#\#+[.\#\#]
* [$]0.\#\#
* [$].\#\#

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
		<input .... data-validators="validate-one-required"/>
	</div>


Class: InputValidator {#InputValidator}
=======================================

This class contains functionality to test a field for various criteria and also to generate an error message when that test fails.

### Authors

* Aaron Newton
* Based on [validation.js by Andrew Tetlaw][]

### Implements

* [Options][]

### Syntax

	new InputValidator(name, options);

### Arguments

1. name - (*string*) a name that this field will be related to (see example below)
2. options - (*object*) a key/value set of options

### Options

* errorMsg - (*mixed*) a message to display; see section below for details.
* test - (*function*) a function that returns *true* or *false*

### Option: errorMsg

The errorMsg option can be any of the following:

* *string* - the message to display if the field fails validation
* *boolean:false* - do not display a message at all
* *function* - a function to evaluate that returns either a *string* or *false*. This function will be passed two parameters: the field being evaluated and any properties defined for the validator as a name (see examples below)

### Option: test

The test option is a function that will be passed the field being evaluated and any properties defined for the validator as a name (see example below); this function **must** return *true* or *false*.

### Examples

	//html code
	<input type="text" name="firstName" data-validators="required" id="firstName"/>

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
	<input type="text" name="username" data-validators="minLength:10 maxLength:100" id="username"/>

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


[InputValidator]: #InputValidator
[Form.Validator]: #Form-Validator
[Form.Validator:ignoreField]: #Form-Validator:ignoreField
[Form.Validator:enforceField]: #Form-Validator:enforceField
[Form.Validator:add]: #AddingValidators:add
[Form.Validator.required]: #Validators:required
[validation.js by Andrew Tetlaw]: http://tetlaw.id.au/view/blog/really-easy-field-validation-with-prototype
[Options]: /core/Class/Class.Extras#Options
[Events]: /core/Class/Class.Extras#Events
[send them back to us]: http://groups.google.com/group/mootools-lang
[JSON.decode]: /core/Utilities/JSON#JSON:decode
[Locale]: /more/Locale/Locale/
[Date Locale]: /more/Locale/Date
[Date]: /more/Types/Date
[Date.defineParser]: /more/Types/Date#Date:defineParser



