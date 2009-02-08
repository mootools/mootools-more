/*
Script: Forms2.js
	Provides support for Web Forms 2 spec by WhatWG (http://www.whatwg.org/specs/web-forms/current-work/)
	And also new amazing features, such as custom validators, custom inputs like your custom <select> javascript-based 

	License:
		MIT-style license.

	Authors:
		Guillermo Rauch
*/

(function(){

var compat = {
  attributes: ['step', 'min', 'max', 'pattern'],
  types: ['date', 'datetime', 'datetime-local', 'time', 'month', 'week', 'time', 'range', 'email', 'url']
}

var Forms2 = new Class({
  
  Implements: [Options, Events, Class.Occlude],
  
  options: {/*
    onSubmit: $empty,*/
    compat: false,
    browsers: true // has to be changed when browsers start supporting HTML5
  },
  
  property: 'forms2',
  
  initialize: function(element){
    this.element = $(element);
    if (this.occlude()) return this.occluded;
    this.element.getElements('input, select, textarea').each(this.formalize, this);
  },
  
  formalize: function(input){
    input.store('forms2', this);
    if(this.options.compat){
      input.store('forms2:origtype', input.type);
      // translate css class-based or element.storage-based properties to whatwg markup
      // ...
    }
      
    // create the control. the user can supply myUberGmailLikeDropdownSelect, or a type based one will be generated
    var klass = input.retrieve('forms2:class', input.type.camelCase());
    input.store('forms2:object', new klass(input));
      
    // run input mutators
    Forms2.InputMutators.each(function(fn){ fn.apply(this) }, this);
  },
  
  unformalize: function(input){
    input.type = input.retrieve('forms2:origtype');
  },
  
  submit: function(){
    if(this.validate()){
      this.clone = element.clone(false).store('forms2:clone', true);
      this.element.getElements('input, select, textarea').each(function(el){
        this.clone.adopt(new Element('input', {type: 'hidden', value: el.get('value')}));
      }, this);
      
      // here, to submit the cloned form, we should fire the element submit, 
      // and if the event is not stopped or false is not returend, submit. we should probably create a fake Event object
      this.clone.submit();
      
      this.clone.destroy();
    }
  },
  
  validate: function(){
    
  }
  
});

var Forms2Control = new Class({
  
  initialize: function(input){
    this.element = $(input);
  },
  
  getValue: function(){
    return this.element.get('value');
  }
  
})

Forms2.Controls = {};

Forms2.Controls.url = new Class({
  
  Extends: Forms2Control,
  
  validate: function(){
    return Validators.url(this.getValue());
  }
  
});

Forms2.Controls.email = new Class({
  
  Extends: Forms2Control,
  
  validate: function(){
    return Validators.email(this.getValue());
  }
  
});

Forms2.Controls.number = new Class({
  
  Extends: Forms2Control,
  
  // has to be expressed as float according to spec  
  getValue: function(){
    return parseFloat(this.parent());
  }
  
  validate: function(){
    return !isNaN(this.getValue());
  }
  
});

// more to come

Forms2.Validators = {};

// this validators will always run. attribute-based
Forms2.Validators.Native = {
      
  // input[pattern]
  'pattern': function(control){
    return control.getValue().test(this.get('pattern')) || 'patternMismatch';
  }
  
  // more to come
  
};

// user supplied
Forms2.Validators.Custom = {
  
  
  
};

// these are option for every forms2-naturalized (formalized) element
Forms2.InputMutators = {
  
  digitarald: function(){
    // code provided by the plugin, such as:
    // if(this.get('autocomplete')) new Autocompleter(this)    
  }
  
};

// 

});

Element.Properties.value = {

  get: function(real){
    var forms2 = this.retrieve('forms2:object');
    if (forms2 && !real) return forms2.getValue(this);
    return this.value;
  },

  set: function(value, real){
    var forms2 = this.retrieve('forms2:object');
    if (forms2 && !real) forms2.setValue(this, value);
    else this.value = value;
  }
  
};

// forms2 property is used to append new elements to a forms2 form, so that they do not behave standard
// example: new Element('input', { 'type': 'url' }).inject(myForms2Form).set('forms2', true);

Element.Properties.forms2 = {
  
  set: function(v){
    this.getParent('form').retrieve('forms2')[(v ? '' : 'un') . 'formalize'](this);
  }
  
}

Element.implement({
  
  validate: function(options){
    return this.get('forms2', options).validate();
  }
  
});

Element.Events.submit = {  
  base: 'submit',
  
  condition: function(e){
    if(this.retrieve('forms2')){
      new Event(e).stop();
      this.get('forms2').submit();
      return false;
    }
    return true;
  }
};