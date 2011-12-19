/*
---
name: Request.JSONP Tests
requires: [More/Request.JSONP]
provides: [Request.JSONP.Tests]
...
*/
describe('Request.JSONP', function(){

	it('should grab some json from from assets/jsonp.js', function(){

		var onComplete = jasmine.createSpy(),
			complete = false,
			timeout = false,
			onRequest = jasmine.createSpy();

		var request = new Request.JSONP({
			log: true,
			callbackKey: 'jsoncallback',
			url: '../assets/jsonp.js',
			timeout: 20000,
			onComplete: function(){
				onComplete.apply(this, arguments);
				complete = true;
			},
			onRequest: function(src, script){
				onRequest.call(this, src);
				expect(script.get('tag')).toEqual('script');
			},
			onTimeout: function(){
				timeout = true;
			}
		});

		runs(function(){
			request.send();
		});

		runs(function(){
			expect(onRequest).toHaveBeenCalledWith('../assets/jsonp.js?jsoncallback=Request.JSONP.request_map.request_0');
		});

		waitsFor(1600, function(){
			return complete || timeout;
		});

		runs(function(){
			expect(onComplete).toHaveBeenCalled();
			// See json.js file
			expect(onComplete.mostRecentCall.args[0].test).toEqual(true);
		});

	});

});
