/*
Script: Request.Periodical.js
	Requests the same URL to pull data from a server but increases the intervals if no data is returned to reduce the load

	License:
		MIT-style license.

	Authors:
		Christoph Pojer

*/

Request.implement({

	options: {
		initialDelay: 5000,
		delay: 5000,
		limit: 60000
	},

	startTimer: function(data){
		var fn = (function(){
			if (!this.running) this.send({data: data});
		});
		this.timer = fn.delay(this.options.initialDelay, this);
		this.lastDelay = this.options.initialDelay;
		this.completeCheck = function(j){
			$clear(this.timer);
			if (j) this.lastDelay = this.options.delay;
			else this.lastDelay = (this.lastDelay + this.options.delay).min(this.options.limit);
			this.timer = fn.delay(this.lastDelay, this);
		};
		this.addEvent('complete', this.completeCheck);
		return this;
	},

	stopTimer: function(){
		$clear(this.timer);
		this.removeEvent('complete', this.completeCheck);
		return this;
	}

});