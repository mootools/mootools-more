{
	tests: [
		{
			title: "Request.JSONP",
			description: "Gets the current rating of an ipod from CNET using script injection",
			verify: "Did it alert the rating?",
			before: function(){
				new Request.JSONP({
					log: true,
					url: 'http://api.cnet.com/restApi/v1.0/techProduct?productId=32069546&iod=none&viewType=json&partKey=19926949750937665684988687810562',
					onComplete: function(data){
					  alert("The ipod gets an " + data.CNETResponse.TechProduct.EditorsRating.$);
					}
				}).send(); //alerts 8.3 - the rating of the ipod
			}
		},
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