var UnitTester = {
	site: 'MooTools More',
	title: 'Unit Tests',
	path: '../UnitTester/',
	ready: function(){
		var sources = {
			mootoolsCore: '../assets/mootools-core',
			mootoolsMore: '..'
		};
		new UnitTester(sources, {
			'mootools-more': 'UserTests'
		}, {
			autoplay: true
		});
	}
};