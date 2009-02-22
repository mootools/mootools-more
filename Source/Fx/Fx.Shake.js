/*
Script: Fx.Tween.js
	Formerly Fx.Style, effect to transition any CSS property for an element.

License:
	MIT-style license.
*/

var Chain = new Class({

	$chains: {},

	getChain: function(key) {

		this.$chains[key] = this.$chains[key] || {

			$chain: [],

			chain: function(){
				this.getChain(key).$chain.extend(Array.flatten(arguments));
				return this;
			}.bind(this),

			callChain: function(){
				return (this.getChain(key).$chain.length) ? this.getChain(key).$chain.shift().apply(this, arguments) : false;
			}.bind(this),

			clearChain: function(){
				this.getChain(key).$chain.empty();
				return this;
			}.bind(this)

		};

		return this.$chains[key];

	}

});

(function(){

	var methods = {};

	['chain', 'callChain', 'clearChain'].each(function(method) {

		methods[method] = function(){
			return this.getChain('default')[method].apply(this, arguments);
		};
	
	});

	Chain.implement(methods);

})();


Fx.Shake = new Class({

	Extends: Fx.Tween,

	Implements: Chain,

	options: {
		times: 5
	},

	initialize: function(){
		this.parent.apply(this, arguments);
		this._start = this.start;
		this.start = this.shake;
		this.duration = this.options.duration;
	},

	complete: function(){
		if (!this.getChain('shake').$chain.length && this.stopTimer()) this.onComplete();
		else if (this.getChain('shake').$chain.length) this.getChain('shake').callChain();
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
		this.getChain('shake').chain(
			function(){
				this.getTransition = function(){
					return function(p){
						return (1 + Math.sin( times*p*Math.PI - Math.PI/2 )) / 2;
					}.bind(this);
				}.bind(this);
				this.stopTimer();
				this.options.duration = this.stepDur * times;
				this._start(property, this.origin - args.distance);
				this.getChain('shake').chain(
					function() {
							this.stopTimer();
							this.getTransition = this._getTransition;
							this.options.duration = this.stepDur;
							this._start(property, this.origin);
					}
				);
			}.bind(this)
		);
		this.options.duration = this.stepDur;
		this._start(property, this.origin + args.distance);
	},

	onCancel: function(){
		this.parent().getChain('shake').clearChain();
	}

});