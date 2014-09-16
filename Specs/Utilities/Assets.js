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

			var myScript = Asset.javascript('base/Tests/Specs/assets/Assets.js.test.js', {
				id: 'myScript',
				onload: function(){
					load(this);
				}
			});

			waits(800);

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

		function addCSS(source, load){
			new Element('div', {
				id: 'moologo'
			}).inject($(document.body));

			return myCSS = Asset.css(source, {
				id: 'myStyle',
				title: 'myStyle',
				onLoad: function(){
					load(this);
				}
			});
		}
		
		afterEach(function(){
			$('myStyle').destroy();
			$('moologo').destroy();
		});

		it('should load a external css file and run load callback', function(){
			var load = jasmine.createSpy('load');
			var url = 'https://rawgit.com/mootools/mootools-more/master/Tests/Specs/assets/Assets.css.test.css';
			var myCSS = addCSS(url, load);
			var myCSS = addCSS(url, load);

			waits(3000);
			runs(function(){
				expect(myCSS.get('tag')).toEqual('link');
				expect(myCSS.id).toEqual('myStyle');
				expect(load).toHaveBeenCalledWith(myCSS);
				load = myCSS = null;
			});
		});

		it('should load a local css file and run load callback', function(){
			var load = jasmine.createSpy('load');
			var url = 'base/Tests/Specs/assets/Assets.css.test.css';
			var myCSS = addCSS(url, load);

			waits(2000);
			runs(function(){
				var border = $('moologo').getStyle('border');
				expect(load).toHaveBeenCalledWith(myCSS);
				expect(myCSS.get('tag')).toEqual('link');
				expect(myCSS.id).toEqual('myStyle');
				expect(border.contains('4px solid')).toBeTruthy();
				load = myCSS = null;
			});
		});
	});

	describe('Assets.image', function(){

		it('should load a image', function(){

			var load = jasmine.createSpy('load');

			var myImage = Asset.image('base/Tests/Specs/assets/mootools.png', {
				id: 'myImage',
				title: 'myImage',
				onload: load
			});

			waits(800);

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

			var myImage = Asset.image('base/Tests/Specs/assets/notExisting.png',{
				onload: load,
				onerror: error
			});

			waits(800);

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
				myImage1 = Asset.image('base/Tests/Specs/assets/mootools.png', {
					onload: loadedagain
				});
			};

			var myImage = Asset.image('base/Tests/Specs/assets/mootools.png', {
				onload: loaded
			});

			waits(800);

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

			waits(800);

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
				'base/Tests/Specs/assets/cow.png',
				'base/Tests/Specs/assets/mootools.png'
			], {
				onComplete: complete,
				onProgress: progress,
				onError: error
			});

			waits(800);

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
				'base/Tests/Specs/assets/iDontExist.png',
				'base/Tests/Specs/assets/cow.png',
				'base/Tests/Specs/assets/iDontExistEither.png'
			], {
				onComplete: complete,
				onProgress: progress,
				onError: error
			});

			waits(800);

			runs(function(){
				expect(complete).toHaveBeenCalled();
				expect(progress.callCount).toEqual(1);
				expect(error.callCount).toEqual(2);
			});
		});
	});
});
