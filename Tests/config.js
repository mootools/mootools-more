UnitTester.site = 'MooTools More';
UnitTester.title = 'Unit Tests';

window.addEvent('load', function(){
	var sources = {
		mootoolsCore: '../assets/mootools-core',
		mootoolsMore: '../'
	};

	new UnitTester(sources, {
		'mootools-more': 'UserTests/'
	}, {
		autoplay: true
	});
});
