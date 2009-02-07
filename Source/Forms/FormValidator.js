var FormValidator = new Class({
  
  Implements: [Options, Events],
  
  options: {/*
    onError: $empty,
    onErrors: $empty,*/,
    elementsLimit: null,
    errorsLimit: null,
    classPrefix: 'fv_',    
    fireInputEvent: true
  },
  
  initialize: function(element, options){
    this.setOptions(options);
    this.element = $(element);    
  },
  
  run: function(){
    var r = [];
    this.element.getElements('input, select, textarea').each(function(input) { 
      var errors = this.check(input);
      if(errors){
        r.push([input, errors]);
        this.error(input, errors)
        if(r.length === this.options.elementsLimit) return;
      }
    }, this);
    if(r) this.errors(r);
    return !! r;
  },
  
  error: function(input, errors){
    this.fireEvent('error', [input, errors]);
    if(this.options.fireInputEvent) input.fireEvent('validateError', errors);
  },
  
  errors: function(errors){
    this.fireEvent('errors', errors);
  },
  
  check: function(input){
    var errors = [], v = FormValidator.Validators;
    Hash.each(v, function(value, key){
      if ((input.hasClass(this.options.classPrefix + key) || input.retrieve(validators, []).contains(key)) && !v[key](value)) 
        errors.push(key);
      if (errors.length === this.options.errorsLimit) return;
    });
    return errors;
  }
  
});

FormValidator.Validators = {
  
  'valid': function(input){
    return $chk(input.get('value').clean());
  },
  
  'valid-email': function(input){
    return input.get('value').clean().test(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  }
  
};

Element.Properties.validator = {
  
  set: function(options){
		var validator = this.retrieve('validator');
		return this.eliminate('validator').store('validator:options', options);
	},

	get: function(options){
		if (options || !this.retrieve('validator')){
			if (options || !this.retrieve('validator:options')) this.set('validator', options);
			this.store('validator', new FormValidator(this, this.retrieve('validator:options')));
		}
		return this.retrieve('validator');
	}
  
};

Element.Events.validatedSubmit = {
	base: 'submit',
	
	condition: function(e){
	  if(! this.get('validator').run())
	  {
	    new Event(e).stop();
	    return false;
	  }
	  return true;
	}
};

Element.implement({
  
  validate: function(options){
    return this.get('validator', options).run();
  }
  
})

// Formvalidator textual extends FormValidator and implements error message reporting, with moo lang.
// basically extends .error / .errors()

FormValidator.Textual = new Class({
  

  
})