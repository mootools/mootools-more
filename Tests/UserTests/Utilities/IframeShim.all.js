{
	tests: [
		{
			title: "Fix the select box - IE6 only!",
			description: "Fix the select list that pops through the box.",
			verify: "Did the select list get obscured by the box?",
			before: function(){
				IframeShim.ready = true;
				new IframeShim('foo', {display: true});
				window.fireEvent('load')
			}
		}
	]
}