/*
---

script: Element.Delegation.js

name: Element.Delegation

description: Extends the Element native object to include the delegate method for more efficient event management.

credits:
  - "Event checking based on the work of Daniel Steigerwald. License: MIT-style license. Copyright: Copyright (c) 2008 Daniel Steigerwald, daniel.steigerwald.cz"

license: MIT-style license

authors:
  - Aaron Newton
  - Daniel Steigerwald

requires: [/MooTools.More, Element.Event.Pseudos]

provides: [Element.Delegation]

...
*/

(function(){

var eventListenerSupport = !(window.attachEvent && !window.addEventListener),
	nativeEvents = Element.NativeEvents;

nativeEvents.focusin = 2;
nativeEvents.focusout = 2;

var formDelegation = function(formEventName){

	var $delegationKey = '$delegation:';

	return {
		base: 'focusin',

		onRemove: function(element){
			element.retrieve($delegationKey + 'forms', []).each(function(el){
				el.retrieve($delegationKey + 'listeners', []).each(function(listener){
					el.removeEvent(formEventName, listener);
				});
				el.eliminate($delegationKey + formEventName + 'listeners')
					.eliminate($delegationKey + formEventName + 'originalFn');
			});
		},

		listener: function(split, fn, args, monitor, options){
			var event = args[0],
				forms = this.retrieve($delegationKey + 'forms', []),
				target = event.target,
				form = (target.get('tag') == 'form') ? target : event.target.getParent('form'),
				formEvents = form.retrieve($delegationKey + 'originalFn', []),
				formListeners = form.retrieve($delegationKey + 'listeners', []);

			forms.include(form);
			this.store($delegationKey + 'forms', forms);

			if (!formEvents.contains(fn)){
				var formListener = function(event){
					if (Slick.match(this, split.value)) fn.call(this, event);
				};
				form.addEvent(formEventName, formListener);

				formEvents.push(fn);
				formListeners.push(formListener);

				form.store($delegationKey + formEventName + 'originalFn', formEvents)
					.store($delegationKey + formEventName + 'listeners', formListeners)
			}
		}
	};
};

Event.definePseudo('relay', {

	listener: function(split, fn, args, monitor, options){
		var event = args[0],
			eventOptions = options[split.event],
			check = eventOptions ? eventOptions.condition : null;

		for (var target = event.target; target && target != this; target = target.parentNode){
			var finalTarget = document.id(target);
			if (Slick.match(target, split.value) && (!check || check.call(finalTarget, event))){
				if (finalTarget) fn.call(finalTarget, event, finalTarget);
				return;
			}
		}
	},

	options: {
		mouseenter: {
			base: 'mouseover',
			condition: Element.Events.mouseenter.condition
		},
		mouseleave: {
			base: 'mouseout',
			condition: Element.Events.mouseleave.condition
		},
		focus: {
			base: 'focus' + (eventListenerSupport ? '' : 'in'),
			args: [true]
		},
		blur: {
			base: eventListenerSupport ? 'blur' : 'focusout',
			args: [true]
		},
		submit: eventListenerSupport ? {} : formDelegation('submit'),
		reset: eventListenerSupport ? {} : formDelegation('reset'),
		change: eventListenerSupport ? {
			args: [true]
		} : {
			base: 'focusin',
			listener: function(split, fn, args){
				var listener = function(event){
					if (Slick.match(this, split.value)) fn.call(this, event);
				};
				var remove = function(event){
					this.removeEvents({change: listener, blur: remove});
				};
				args[0].target.addEvents({change: listener, blur: remove});
			}
		}
	}

});

})();

