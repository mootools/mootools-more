/*
---
name: Chain.Wait Tests
requires: [More/Chain.Wait]
provides: [Chain.Wait.Tests]
...
*/
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

	it('should not break the chainComplete event in Fx', function(){
		var count = 0;
		new Fx({
			link: 'chain',
			onChainComplete: function(){
				count++;
			},
			duration: 50
		}).start(0, 1).wait(40).start(1, 0);

		waits(500);

		runs(function(){
			expect(count).toEqual(1);
		});

	});

});
