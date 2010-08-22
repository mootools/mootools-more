var test_chainWait = new function(){
	// Wait around a bit for an element on the new page
	this.test_open = {
		method: "open",
		params: {
			url: "/test/?project=more&path=/Class/Chain.Wait.html"
		}
	};
	this.test_waitForThird = { 
		method: "waits.forElement",
		params: { 
			id: 'third'
		}
	};
	this.test_validateDates = function () {
		var first = $('first').get('html');
		var second = $('second').get('html');
		var third = $('third').get('html');
		jum.assertEquals(new Date(second) - new Date(first), 1000);
		jum.assertEquals(new Date(third) - new Date(second), 1000);
	};
};