Class: Class.Binds {#Class-Binds}
=================================
Extends the [Class][] native, this is a mutator.

See: [http://blog.kassens.net/binds-class-mutator][]


### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/02-class.binds

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

[Class]: http://docs.mootools.net/Class/Class
[http://blog.kassens.net/binds-class-mutator]: http://blog.kassens.net/binds-class-mutator
