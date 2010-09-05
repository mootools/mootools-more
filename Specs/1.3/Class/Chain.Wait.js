
describe('Chain.Wait', function(){

	it('should wait some milliseconds between firing the functions', function(){

		var time = Date.now();

		var chain = this.chain = new Chain();

		var first = jasmine.createSpy();
		var second = jasmine.createSpy();
		var third = jasmine.createSpy();

		chain.chain(function(){
			first();
			chain.callChain();
		});
		chain.wait(50);
		chain.chain(function(){
			second();
			chain.callChain();
		});
		chain.wait(50);
		chain.chain(function(){
			third();
			chain.callChain();
		});

		chain.callChain();

		// first
		runs(function(){
			expect(first).toHaveBeenCalled();
		});


		// second
		waitsFor(75, function(){
			return (Date.now() - 60) > time;
		});
		
		runs(function(){
			expect(second).toHaveBeenCalled();
		});


		// third
		waitsFor(125, function(){
			return (Date.now() - 115) > time;
		});
		
		runs(function(){
			expect(third).toHaveBeenCalled();
		});

	});

});
