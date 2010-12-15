describe('Fx.Reveal', function(){

	describe('set', function(){

		it('it should not remove css styling', function(){
			var el = new Element('div', { 
				styles: {
					display: 'none'
				}
			});
			el.set('reveal', {});
			expect(el.getStyle('display')).toEqual('none');
		});

	});

});
