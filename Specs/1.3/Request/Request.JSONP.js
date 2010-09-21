
describe('Request.JSONP', function(){

	it('should grab some json from Flicr', function(){

		var onComplete = jasmine.createSpy(),
			complete = false,
			timeout = false,
			onRequest = jasmine.createSpy();

		var request = new Request.JSONP({
			log: true,
			callbackKey: 'jsoncallback',
			url: 'http://www.flickr.com/services/feeds/photos_public.gne?format=json',
			timeout: 20000,
			onComplete: function(){
				onComplete.apply(this, arguments);
				complete = true;
			},
			onRequest: function(script){
				onRequest.call(this, script);
			},
			onTimeout: function(){
				timeout = true;
			}

		});

		runs(function(){
			request.send();
		});

		runs(function(){
			expect(onRequest).toHaveBeenCalled();
		});

		waitsFor(1600, function(){
			return complete || timeout;
		});

		runs(function(){
			expect(onComplete).toHaveBeenCalled();
		});

	});

});
