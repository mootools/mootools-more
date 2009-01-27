{
	tests: [
		{
			title: "Request.JsonP",
			description: "Gets the current rating of an ipod from CNET using script injection",
			verify: "Did it alert the rating?",
			before: function(){
						new Request.JsonP('http://api.cnet.com/restApi/v1.0/techProduct?productId=32069546&iod=none&viewType=json&partKey=19926949750937665684988687810562', {
				  onComplete: function(data){
				    alert("The ipod gets an " + data.CNETResponse.TechProduct.EditorsRating.$);
				  }
				}).request(); //alerts 8.3 - the rating of the ipod
			}
		}
	]
}