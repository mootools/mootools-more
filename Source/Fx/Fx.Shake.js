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
	},

	complete: function(){
		dbug.log('complete ')
		if (!this.$$chain.length && this.stopTimer()) this.onComplete();
		else if (this.$$chain.length) this._callChain();
		return this;
	},

	shake: function(property, distance, times){
		if (!this.check(arguments.callee, property, distance)) return this;
		var args = Array.flatten(arguments);
		property = this.options.property || args.shift();

		this.origin = this.element.getStyle(property).toInt()||0;
		var to = this.origin + distance;
		var from = this.origin;
		this._chain(function(){
			(function(){
				this._start.delay(1, this, [property, to, from]);
			}).delay(1, this);
		}.bind(this));
		this._start(property, from, to);
	},

	$$chain: [],

	_chain: function(){
		this.$$chain.extend(Array.flatten(arguments));
		return this;
	},

	_callChain: function(){
		return (this.$$chain.length) ? this.$$chain.shift().apply(this, arguments) : false;
	},

	_clearChain: function(){
		this.$$chain.empty();
		return this;
	}
	

});

Fx.Transitions.extend({

	Sinusoidal: function(p, n){
		return (1 + sin( n*p*Math.PI - Math.PI/2 )) / 2
	}

});
