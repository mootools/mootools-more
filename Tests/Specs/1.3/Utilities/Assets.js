/*
---
name: Assets Tests
requires: [More/Assets]
provides: [Assets.Tests]
...
*/
describe('Assets', function(){

	describe('Assets.javascript', function(){

		it('should load a javascript file and fire the load event', function(){

			var load = jasmine.createSpy('load');

			var myScript = Asset.javascript('../assets/Assets.js.test.js', {
				id: 'myScript',
				onload: function(){
					load(this);
				}
			});

			waits(500);

			runs(function(){
				expect(myScript.get('tag')).toEqual('script');
				expect(myScript.id).toEqual('myScript');
				expect(load).toHaveBeenCalledWith(myScript);
				expect(load.callCount).toEqual(1);
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
				expect(myImage.width).toEqual(230);
				expect(myImage.height).toEqual(54);
				myImage.destroy();
			});

		});

		it('should fire the error event', function(){

			var load = jasmine.createSpy('load'),
				error = jasmine.createSpy('error');

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

		it('should fire the load event twice when loading the same image', function(){

			var loadedagain = jasmine.createSpy('load'),
				myImage1;

			var loaded = function(){
				myImage1 = Asset.image('../assets/mootools.png', {
					onload: loadedagain
				});
			};

			var myImage = Asset.image('../assets/mootools.png', {
				onload: loaded
			});

			waits(500);

			runs(function(){
				expect(loadedagain).toHaveBeenCalled();
				myImage.destroy();
				if (myImage1) myImage1.destroy();
			});
		});

		xit('should fire the error event when the source argument is empty', function(){

			var load = jasmine.createSpy('load'),
				error = jasmine.createSpy('error');

			var myImage = Asset.image('', {
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

			var complete = jasmine.createSpy('complete'),
				progress = jasmine.createSpy('progress'),
				error = jasmine.createSpy('error');

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

		it('should should fire the onError callback for non-existent images and empty sources', function(){

			var complete = jasmine.createSpy('complete'),
				progress = jasmine.createSpy('progress'),
				error = jasmine.createSpy('error');

			var loadedImages = new Asset.images([
				'../assets/iDontExist.png',
				'../assets/cow.png',
				'../assets/iDontExistEither.png'
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
