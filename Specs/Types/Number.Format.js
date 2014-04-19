/*
---
name: Number.Format Tests
requires: [More/Number.Extras]
provides: [Number.Format.Tests]
...
*/
describe('Number.Format', function(){

	describe('Number.format', function(){

		it('should format the number', function(){

			expect((1235432.163).format({
				decimals: 1,
				group: '.',
				decimal: ',',
				suffix: '+',
				prefix: '-'
			})).toEqual('-1.235.432,2+');

		});

		it('should format a negative number', function(){
			expect((-20000).format()).toEqual('-20,000');
		});

		it('should format a negative number with a special minus sign', function(){
			expect((-20000).format({negative: {prefix:'_'}})).toEqual('_20,000');
			expect((-20000).format({negative: {suffix:'_'}})).toEqual('20,000_');
			expect((-20000).format({negative: {prefix:'_', suffix: '^'}})).toEqual('_20,000^');
		});

		it('should format with the right decimals', function(){
			expect((123.456).format({decimals: 0})).toEqual('123');
			expect((123.456).format({decimals: 1, decimal: '.'})).toEqual('123.5');
			expect((123.451).format({decimals: 2, decimal: '.'})).toEqual('123.45');
		});

		it('should change precision', function(){
			expect((123456789).format({
				precision: 4,
				scientific: false
			})).toEqual('123,500,000');

			expect((12).format({
				precision: 4,
				scientific: false
			})).toEqual('12.00');
		});

		it('should have the right amouth of zeros', function(){
			expect((1e+30).format({scientific: false})).toEqual('1,000,000,000,000,000,000,000,000,000,000');

			expect((1.2345e+30).format({scientific: false})).toEqual('1,234,500,000,000,000,000,000,000,000,000');


			expect((1e-30).format({scientific: false})).toEqual('0.000000000000000000000000000001');

			expect((1.234345e-30).format({scientific: false})).toEqual('0.000000000000000000000000000001234345');
		});

		it('should format a currency', function(){
			expect((2000).formatCurrency()).toEqual('$ 2,000.00');
			expect((2000).formatCurrency(0)).toEqual('$ 2,000');
		});

		it('should format a negative currency', function(){
			expect((-2000).formatCurrency()).toEqual('$ -2,000.00');
		});

		it('should still format a currency', function(){
			expect((2000).formatCurrency()).toEqual('$ 2,000.00');
		});

		it('should format percentage', function(){
			expect((50.123).formatPercentage()).toEqual('50.12%');
			expect((50.123).formatPercentage(1)).toEqual('50.1%');
			expect((50.123).formatPercentage(0)).toEqual('50%');
		});

		it('should not change the options object', function(){
			var options = {prefix: 'foo'};
			(-3).format(options);
			expect(options.prefix).toEqual('foo');
		});

	});


});


