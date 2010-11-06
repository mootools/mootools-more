
describe('Assets', function(){

	describe('Assets.javascript', function(){

		it('should load a javascript file and fire the load event', function(){

			var load = jasmine.createSpy('load');
			var myScript = Asset.javascript('../assets/Assets.js.test.js', {
				id: 'myScript',
				events: {load: function(){
					load(this);
				}}
			});

			waits(500);

			runs(function(){
				expect(myScript.get('tag')).toEqual('script');
				expect(myScript.id).toEqual('myScript');
				if (!Browser.ie) expect(load).toHaveBeenCalledWith(myScript);
				myScript.destroy();
			});

		});

	});

	describe('Assets.css', function(){

		it('should load a css file and fire the load event', function(){

			var load = jasmine.createSpy('load');
			var myCSS = Asset.css('../assets/Assets.css.test.css', {
				id: 'myStyle',
				title: 'myStyle',
				events: {load: function(){
					load(this);
				}}
			});

			waits(500);

			runs(function(){
				expect(myCSS.get('tag')).toEqual('link');
				expect(myCSS.id).toEqual('myStyle');
				// Current implementation of assets uses the load event which only works in IE/Opera
				// expect(load).toHaveBeenCalledWith(myCSS);
				myCSS.destroy();
			});

		});

	});

	describe('Assets.image', function(){

		it('should load a image', function(){

			var load = jasmine.createSpy('load');
			var myImage = Asset.image('../assets/mootools.png', {
				id: 'myImage',
				title: 'myImage',
				onload: load
			});

			waits(500);

			runs(function(){
				expect(myImage.get('tag')).toEqual('img');
				expect(myImage.id).toEqual('myImage');
				expect(load).toHaveBeenCalledWith(myImage);
				myImage.destroy();
			});

		});

		it('should fire the error event', function(){

			var load = jasmine.createSpy('load');
			var error = jasmine.createSpy('error');
			var myImage = Asset.image('../assets/notExisting.png',{
				onload: load,
				onerror: error
			});

			waits(200);

			runs(function(){
				expect(load).not.toHaveBeenCalled();
				expect(error).toHaveBeenCalledWith(myImage);
				myImage.destroy();
			});

		});

		xit('should fire the error event when the source argument is empty', function(){

			var load = jasmine.createSpy('load');
			var error = jasmine.createSpy('error');
			var myImage = Asset.image('',{
				onload: load,
				onerror: error
			});

			waits(200);

			runs(function(){
				expect(load).not.toHaveBeenCalled();
				expect(error).toHaveBeenCalledWith(myImage);
				myImage.destroy();
			});

		});

	});

	describe('Assets.images', function(){

		it('shoud load several images', function(){

			var complete = jasmine.createSpy('complete');
			var progress = jasmine.createSpy('progress');
			var error = jasmine.createSpy('error');

			var loadedImages = new Asset.images([
				'../assets/cow.png',
				'../assets/mootools.png'
			], {
				onComplete: complete,
				onProgress: progress,
				onError: error
			});

			waits(200);

			runs(function(){
				expect(complete).toHaveBeenCalled();
				expect(progress.callCount).toEqual(2);
				expect(error).not.toHaveBeenCalled();
			});

		});

		xit('should should fire the onError callback for non-existent images and empty sources', function(){

			var complete = jasmine.createSpy('complete');
			var progress = jasmine.createSpy('progress');
			var error = jasmine.createSpy('error');

			var loadedImages = new Asset.images([
				'../assets/iDontExist.png',
				'../assets/cow.png',
				''
			], {
				onComplete: complete,
				onProgress: progress,
				onError: error
			});

			waits(200);

			runs(function(){
				expect(complete).toHaveBeenCalled();
				expect(progress.callCount).toEqual(1);
				expect(error.callCount).toEqual(2);
			});

		});

	});

});
