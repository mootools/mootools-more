
describe('Object hasOwnProperty', function(){

	it('should not fail on window', function(){
		expect(function(){
			window._drinks = {milk: 'yum!'};
			Object.getFromPath(window, '_drinks.milk');
		}).not.toThrow();
	});

});
