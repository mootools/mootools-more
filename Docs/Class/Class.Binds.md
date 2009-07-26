Class: Class.Binds {#Class-Binds}
=================================
Adds a method for caching bound methods on a class.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/02-class.binds

### Usage

*Class.Binds* provides a method that returns a bound copy of an instance method, bound to the instance. It allows you to add events to things and remove them easily. When you specify a method and use *.bind(this)* you create a copy of that function (the new copy is bound to *this* or whatever you specify). If you want to remove such an event you need to have a reference to that copy. Typically, this is accomplished like so:

	var MyClass = new Class({
		initialize: function(element, message){
			this.el = $(element);
			this.message = message;
		},
		monitor: function(){
			this.boundSay = this.say.bind(this); //we must store this copy
			this.el.addEvent('click', this.boundSay); //then add it
		},
		stopMonitoring: function(){
			this.el.removeEvent('click', this.boundSay); //so we can remove it later
		},
		say: function(){
			alert(this.message);
		}
	});

*Class.Binds* saves you some trouble by caching that bound method for you with its *bound* method. See the example below.

### Example

	var MyClass = new Class({
		initialize: function(element, message){
			this.el = $(element);
			this.message = message;
		},
		monitor: function(){
			this.el.addEvent('click', this.bound('say')); //bound() returns this.say bound to 'this'
		},
		stopMonitoring: function(){
			this.el.removeEvent('click', this.bound('say'));
		},
		say: function(){
			alert(this.message);
		}
	});

By using *bound* in the example above, you are attaching an event listener pointing to *this.say* bound to *this*. When you need to reference that method again, just call the *bound* method again.

### Note

Previously *Class.Binds* was a mutator, and did this binding automatically (i.e. the *this.bound* method is new). This is a breaking change. Any classes you may be using that still reference a *Binds* property will no longer bind them automatically; a console warning is thrown if you have Firebug enabled.

[Class]: /core/Class/Class