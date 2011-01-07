
describe('Chain.Wait', function(){

	it('should wait some milliseconds between firing the functions', function(){

		var chain = this.chain = new Chain(),
			first = jasmine.createSpy(),
			second = jasmine.createSpy(),
			third = jasmine.createSpy();

		chain.chain(function(){
			first();
			chain.callChain();
		});

		chain.wait(400);
		chain.chain(function(){
			second();
			chain.callChain();
		});

		chain.wait(400);
		chain.chain(function(){
			third();
			chain.callChain();
		});

		// start chain
		chain.callChain();

		// first
		runs(function(){
			expect(first).toHaveBeenCalled();
		});

		// second
		waits(500);
		runs(function(){
			expect(second).toHaveBeenCalled();
		});

		// third
		waits(900);
		runs(function(){
			expect(third).toHaveBeenCalled();
		});

	});

});
