
describe('Fx.Slide', function(){

	it('should reset the height when the resetHeight option is set to true by element.set', function(){
		var div = new Element('div', {text: 'moo'}).inject(document.body);
		div.set('slide', {
			resetHeight: true,
			duration: 20
		});
		var fx = div.get('slide');
		fx.hide().slideIn();

		waits(100);

		runs(function(){
			expect(fx.wrapper.style.height).toEqual('');
			fx.wrapper.destroy();
		});
	});

});