/*
---
name: Element.Position Tests
requires: [More/Element.Position]
provides: [Element.Position.Tests]
...
*/

describe("Element.Position", function(){

	var element,
		options;

		beforeEach(function(){
			window.scroll(0,0); //calculations are based off of zero scroll unless otherwise set
			options = {};
			element = new Element('div').inject(document.body);
		});

		afterEach(function(){
			element.destroy();
		});

		describe("element.position", function(){

			describe('options.returnPos', function(){

				it('should return the element when options.returnPos is not present', function(){
					expect(element.position(options)).toEqual(element);
				});

				it('should set the element style when options.returnPos is not present', function(){
					expect(element.position(options).get('style')).not.toEqual('');
				});

				it('should return a position object if options.returnPos is present', function(){
					options.returnPos = true;
					expect(typeOf(element.position(options))).toEqual('object');
				});

				it('should return an object with left, top, and absolute properties when  options.returnPos is present', function(){
					options.returnPos = true;
					var position = element.position(options);
					expect(position.left).not.toEqual(null);
					expect(position.top).not.toEqual(null);
				});

			});

			describe('original', function(){

				it('should call original position method when options x y values are present', function(){
					options.x = 0;
					options.y = 0;
					spyOn(element, 'calculatePosition');
					spyOn(element, 'position');
					element.position(options);
					expect(element.calculatePosition).not.toHaveBeenCalled();
					expect(element.position).toHaveBeenCalled();
				});

			});

			describe('relativeTo', function(){

				var container;

				function setup(position, element, options){
					container = new Element('div', {
						'styles': {
							'position': position,
							'width': 100,
							'height': 100,
							'top': 0,
							'left': 0
						}
					}).inject(document.body, 'top');

					element.setStyles({
						'width': 20,
						'height': 20
					});

					options.ignoreMargins = true;
					options.ignoreScroll = true;
					options.relativeTo = container;
					options.allowNegative = true;
				}

				function testVerbage(placement, edge, blockPosition, where){
					return 'should return coordinates of element at ' + placement +
						' when options position=' + placement +
						' and edge =' + edge +
						' and container is ' + blockPosition +
						' and element placement is' + where;
				}

				var blockPositions = ['fixed', 'absolute'],
					wheres = ['after', 'top'],
					edges = ['centerCenter', 'leftTop', 'bottomRight'],
					placements = ['leftTop', 'leftCenter', 'leftBottom', 'centerTop', 'centerCenter', 'centerBottom', 'rightTop', 'rightCenter', 'rightBottom'];

				var expectedValues = {
					'centerCenter': [-10, 40, 90],
					'leftTop': [0, 50, 100],
					'bottomRight': [-20, 30, 80]
				};

				afterEach(function(){
					container.dispose();
				});

				blockPositions.each(function(blockPosition){

					wheres.each(function(where){

						edges.each(function(edge){

							var i = 0,
								j = 0;

							placements.each(function(placement){

								it(testVerbage(placement, edge, blockPosition, where), function(){
									setup(blockPosition, element, options);
									element.inject(container, where);
									options.position = placement;
									options.relFixedPosition = blockPosition == 'fixed';
									options.edge = edge;
									var position = element.calculatePosition(options);
									expect(position.top).toEqual(expectedValues[edge][j]);
									expect(position.left).toEqual(expectedValues[edge][i]);
									if (j++ == 2){
										if( i++ == 2) i = 0;
										j = 0;
									}
								});

							});

						});

					});

				});

				describe('minimum/maximum', function(){

					it("should return coordinates relative to a minimum x, y value when a minimum is supplied", function(){
						setup(position, element, options);
						element.inject(container);
						options.position = 'topLeft';
						options.minimum = {x: 10, y: 10};
						var position = element.calculatePosition(options);
						expect(position.top).toEqual(10);
						expect(position.left).toEqual(10);
					});

					it("should return coordinates relative to a maximum x, y value when a maximum is supplied", function(){
						setup(position, element, options);
						element.inject(container);
						options.position = "bottomRight";
						options.maximum = {x: 70, y: 70};
						var position = element.calculatePosition(options);
						expect(position.top).toEqual(70);
						expect(position.left).toEqual(70);
					});

				});

				it('should return the correct position of an element not positioned with css', function(){
					var foo = new Element('div').adopt(new Element('div', {styles: {width: 10}})).inject(document.body);
					expect(element.position({returnPos: true, relativeTo: document.body}).left).not.toEqual(0);
					foo.destroy();
				});

			});

	});

});
