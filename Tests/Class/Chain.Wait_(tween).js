var test_chainWait_tween = new function(){
	// Wait around a bit for an element on the new page
	this.test_open = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Class/Chain.Wait_(tween).html"
		}
	};
	this.test_waitForContainer = { 
		method: "waits.forElement",
		params: { 
			id: 'foo'
		}
	};
	
	this.test_pauseFx = function () {
		$('foo').get('tween').cancel();
		jum.assertEquals($('foo').getStyle('height'), '200px');
		$('foo').chains().pauseFx(10).tween('height', 100).pauseFx(500).get('tween').chain(function(){
			jum.assertEquals($('foo').getStyle('height'), '100px');
		});
		jum.assertEquals($('foo').getStyle('height'), '200px');
		$('foo').chains().tween('height', 200).get('tween').chain(function(){
			jum.assertEquals($('foo').getStyle('height'), '200px');
		});
		jum.assertEquals($('foo').getStyle('height'), '200px');
	};
};