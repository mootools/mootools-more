Additional InputValidators: {#Validators}
=======================================

### Tutorial/Demo

Here are the validators that are included in this libary. Add the name to any input's data-validators property and then create a new [Form.Validator][] and these will automatically be applied.

Validator: validate-nospace {#Validators:validate-nospace}
----------------------------------------------------------

Enforces that there are no spaces in the input value.

Validator: validate-enforce-oncheck {#Validators:validate-enforce-oncheck}
--------------------------------------------------------------------------

When added to a checkbox/radio button, and a list (*array*) of element id's can be passed in (*toEnforce*) to enforce validation on those fields.

### Example

	<input type="checkbox" class="validate-enforce-oncheck toEnforce:['name','email','phone']"/>
	//when checked, the inputs with the ids 'name', 'email', and 'phone' will also be validated on change/submit

	<input type="checkbox" class="validate-enforce-oncheck enforceChildrenOf:'someParent'"/>
	//when checked, all inputs inside $('someParent') will be validated on change/submit

Validator: validate-ignore-oncheck {#Validators:validate-ignore-oncheck}
------------------------------------------------------------------------

When added to a checkbox/radio button, and a list (*array*) of element id's can be passed in (*toIgnore*) in the *validatorProps* to ignore validation on those fields.

### Example

	<input type="checkbox" class="validate-ignore-oncheck toIgnore:['name','email','phone']"/>
	//when checked, the inputs with the ids 'name', 'email', and 'phone' will NOT be validated on change/submit

	<input type="checkbox" class="validate-ignore-oncheck ignoreChildrenOf:'someParent'"/>
	//when checked, all inputs inside $('someParent') will NOT be validated on change/submit



Validator: validate-toggle-oncheck {#Validators:validate-toggle-oncheck}
--------------------------------------------------------

When the input is checked or un-checked, the inputs defined will be toggled from ignore (if the input is un-checked) to enforce (if it is checked).

### Example

	<input type="checkbox" class="validate-toggle-oncheck toToggle:['name','email','phone']"/>
	//when checked, the inputs with the ids 'name', 'email', and 'phone' will be validated on change/submit
	//when unchecked, they will be ignored

	<input type="checkbox" class="validate-toggle-oncheck toToggleChildrenOf:'someParent'"/>
	//when checked, all inputs inside $('someParent') will be validated on change/submit
	//when unchecked, they will be ignored

Validator: validate-required-check {#Validators:validate-required-check}
-----------------------------------------------------

Forces the user to check a checkbox (thing agreeing to terms and conditions).

Validator: validate-reqchk-bynode {#Validators:validate-reqchk-bynode}
----------------------------------------------------

At least one checkbox/radio is required to be checked in this node. *nodeId* needs to be passed to the *validatorProps*.

### Example

	<input type="checkbox" class="validate-reqchk-bynode nodeId:'someParent'"/>

	//you can also specify a selector for the parent
	<input type="checkbox" class="validate-reqchk-bynode nodeId:'someParent' selector:'input.foo[type=checkbox]'"/>

Validator: validate-reqchk-byname {#Validators:validate-reqchk-byname}
----------------------------------------------------

At least one checkbox/radio is required to be checked in this name group. You can specify an optional label that completes the error message: "Please select a *label*." - it defaults to either "checkbox" or "radio" - the type of the input. By default it uses the name of the input to find all inputs with the same name but you can specify the optional *validatorProps* name *groupName* if you prefer.

### Example

	<input type="checkbox" class="validate-reqchk-byname label: 'flavor'" name="favoriteFlavor"/>

Validator: validate-after-date {#Validator:validate-after-date}
-----------------------------------------

Takes in the id of a start field id and compares it to make sure the given value is later than or equal to the start date. If no other input is specified it uses the current time. The other *validatorProps* option is *afterLabel* which completes the sentence "The date should be the same or after *label*." If you do not specify an *afterLabel*, either "the current time" or "the start date" is used (the latter is used if *afterElement* is specified);

### Example

	<input type="text" name="endDate" class="validate-after-date afterElement:'startDate'"/>
	//if you don't include afterElement the current time is used

Validator: validate-before-date {#Validator:validate-before-date}
-----------------------------------------

Takes in the id of a end field id and compares it to make sure the given value is before or equal to the end date. If no other input is specified it uses the current time. The other *validatorProps* option is *beforeLabel* which completes the sentence "The date should be the same or before *label*." If you do not specify an *beforeLabel*, either "the current time" or "the end date" is used (the latter is used if *beforeElement* is specified);

### Example

	<input type="text" name="startDate" class="validate-before-date beforeElement:'endDate'"/>
	//if you don't include beforeElement the current time is used

Validator: validate-custom-required {#Validators:validate-custom-required}
--------------------------------------------------------
Required field with an option to define what an empty value is. For example, if you have a list months in a drop down list and first option is "select month" has a value of 'null', you can define a custom-required with emptyValue='null', so it's treated as an empty value.

### Example

	<select class="validate-custom-required emptyValue:'null'">
		<option value="null">Select One</option>
		...etc.
	</select>

Validator: validate-same-month {#Validators:validate-same-month}
--------------------------------------------------------

Takes another input's id and makes sure both ranges are within the same month. Pass in the *sameMonthAs* value in the *validatorProps* as the id of the form to compare to.

### Example

	<input class="validate-same-month sameMonthAs:'startDate'"/>

Validator: validate-match {#Validators:validate-match}
--------------------------------------------------------

Takes in an id of a field and matches them together. Can also take *matchName* that is used in the error message (i.e.: password confirmations). *matchName* defaults to the name of the other field, which isn't always very helpful, so you should specify it.

	<input type="input" class="validate-match matchInput:'password' matchName:'password'"/>
	//error msg: This field needs to match the password field.

Validator: validate-cc-num {#Validators:validate-cc-num}
--------------------------------------------------------

Validates that an input is a valid credit card number (Visa, MasterCard, Amex, Discover). Note that it replaces all non-numeric characters to the value (but not to the input's displayed value) before it applies validation, so the user could put in dashes, letters, punctuation, whatever, but if the numbers in the value without those things makes a valid CC number, it will pass.

	<input type="input" class="validate-cc-num"/>

Form.Validator.Extras Language Localization {#Localization}
==========================================

*Form.Validator.Extras.js* includes the following key/values for localization.

* noSpace - (*string*) 'There can be no spaces in this input.'
* reqChkByNode - (*string*) 'No items are selected.'
* requiredChk - (*string*) 'This field is required.'
* reqChkByName - (*string*) 'Please select a {label}.'
* match - (*string*) 'This field needs to match the {matchName} field' where *matchName* is the name of another field
* startDate - (*string*)  'the start date'
* endDate - (*string*)  'the end date'
* currentDate - (*string*)  'the current date'
* afterDate - (*string*)  'The date should be the same or after {label}.' where *label* is the name of another date field
* beforeDate - (*string*)  'The date should be the same or before {label}.' where *label* is the name of another date field
* startMonth - (*string*)  'Please select a start month'
* sameMonth - (*string*)  'These two dates must be in the same month - you must change one or the other.'
* creditcard - (*string*) 'The credit card number entered is invalid. Please check the number and try again. {length} digits entered.' where *length* is the number of integers entered.


[Form.Validator]: /more/Forms/Form.Validator#Form-Validator
