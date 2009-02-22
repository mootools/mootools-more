/*
Script: Fx.Tween.js
	Formerly Fx.Style, effect to transition any CSS property for an element.

License:
	MIT-style license.
*/

Fx.Shake = new Class({

	Extends: Fx.Tween,

	options: {
		times: 5
	},

	initialize: function(){
		this.parent.apply(this, arguments);
		this._start = this.start;
		this.start = this.shake;
		this.duration = this.options.duration;
		this.shakeChain = new Chain();
	},

	complete: function(){
		if (!this.shakeChain.$chain.length && this.stopTimer()) this.onComplete();
		else if (this.shakeChain.$chain.length) this.shakeChain.callChain();
		return this;
	},

	shake: function(property, distance, times){
		if (!this.check(arguments.callee, property, distance)) return this;
		var args = Array.flatten(arguments).link({property: String.type, distance: $defined, times: $defined});		
		property = args.property || this.options.property;
		times = args.times || this.options.times;
		this.stepDur = this.duration / (times + 2);
		this._getTransition = this.getTransition;
		this.origin = this.element.getStyle(property).toInt()||0;
		this.shakeChain.chain(
			function(){
				this.getTransition = function(){
					return function(p){
						return (1 + Math.sin( times*p*Math.PI - Math.PI/2 )) / 2;
					}.bind(this);
				}.bind(this);
				this.stopTimer();
				this.options.duration = this.stepDur * times;
				this._start(property, this.origin - args.distance);
				this.shakeChain.chain(
					function() {
							this.stopTimer();
							this.getTransition = this._getTransition;
							this.options.duration = this.stepDur;
							this._start(property, this.origin);
					}.bind(this)
				);
			}.bind(this)
		);
		this.options.duration = this.stepDur;
		this._start(property, this.origin + args.distance);
	},

	onCancel: function(){
		this.parent().shakeChain.clearChain();
	}

});