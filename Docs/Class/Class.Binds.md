Class: Class.Binds {#Class-Binds}
=================================

Extends [Class][]; this is a mutator. It binds methods to the class instance so it is easier to pass them as callbacks whithout losing Class instance context (`this`).

### Tutorial/Demo

* [Online Tutorial/Demo][]

### Simple Example

	var MyClass = new Class({

		Binds: ['show'],

		initialize: function(items){
			items.each(this.start);
		},

		show: function(){
			// this now always refers to the class instance
		}

	});


### Usage

*Class.Binds* allows you to specify methods in your class that should be bound to the instances of the class. It saves you the trouble of typing ".bind(this)" when you pass that method as an argument (for instance, to *Array.each* or to *addEvent*). The other big benefit is that it allows you to add events to things and remove them easily. When you specify a method and use *.bind(this)* you create a copy of that function (the new copy is bound to *this* or whatever you specify). If you want to remove such an event you need to have a reference to that copy. Typically, this is accomplished like so:

	var MyClass = new Class({

		initialize: function(element, message){
			this.el = $(element);
			this.message = message;
			this.boundSay = this.say.bind(this); //we must store this copy
		},

		monitor: function(){
			this.el.addEvent('click', this.boundSay); //then add it
		},

		stopMonitoring: function(){
			this.el.removeEvent('click', this.boundSay); //so we can remove it later
		},

		say: function(){
			alert(this.message);
		}

	});

*Class.Binds* saves you the trouble of keeping that bound reference around. See the example below.

### Example

	var MyClass = new Class({

		Binds: ['say'],

		initialize: function(element, message){
			this.el = $(element);
			this.message = message;
		},

		monitor: function(){
			this.el.addEvent('click', this.say); //say is already bound to 'this'
		},

		stopMonitoring: function(){
			this.el.removeEvent('click', this.say);
		},

		say: function(){
			alert(this.message);
		}

	});

By using *binds* in the example above, you don't need to bind *this.say* to *this* in the *addEvent* method in the *monitor* method; it has already been bound to *this*.

[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/02-class.binds
[Class]: /core/Class/Class
[http://blog.kassens.net/binds-class-mutator]: http://blog.kassens.net/binds-class-mutator
