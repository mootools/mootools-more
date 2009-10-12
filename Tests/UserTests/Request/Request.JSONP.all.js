{
	tests: [
		{
			title: "Request.JSONP",
			description: "Gets an image from flickr",
			verify: "Did it load an image?",
			before: function(){
				new Request.JSONP({
					log: true,
					callbackKey: 'jsoncallback',
					url: 'http://www.flickr.com/services/feeds/photos_public.gne?format=json',
					onComplete: function(data){
						new Element('div').adopt(
							new Element('img', {
								src: data.items[0].media.m
							})
						).inject(document.body);
					}
				}).send();
			}
		}
	]
}