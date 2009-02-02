UnitTester.site = 'MooTools More';
UnitTester.title = 'Unit Tests';

window.addEvent('load', function(){
	var sources = {
		mootoolsCore: '../../mootools-core',
		mootoolsMore: '../../mootools-more'
	};
	if (window.location.href.contains("http://www.clientcide.com/tests")){
		sources = {
			mootoolsCore: '/cnet.gf/svn/Mootools/mootools-core',
			mootoolsMore: '/cnet.gf/svn/Mootools/mootools-more'
		};
	}
	
	new UnitTester(sources, {
		'mootools-more': 'UserTests/'
	}, {
		autoplay: true
	});
});