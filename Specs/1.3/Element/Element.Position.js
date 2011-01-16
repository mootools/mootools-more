/*
Script: Element.Pin.js
	Specs for Element.Pin.js

License:
	MIT-style license.
*/

describe("Element.Position", function(){

	describe("place", function(){
    it("should return the positioned element", function(){

    });

		it("should return just the position styles without styling element when returnPos option is specified", funciton(){

		});
	});

	describe("getOptions", function(){
		it("should merge default options with passed options", function(){

		});
		it("should set position option", function(){

		});
		it("should set edge option", funciton(){

		});
		it("should set offset option", function(){
		
		});
		it("should set dimensions option", function(){

		});
		it("should return options object", function(){

		});
	});

	describe("getPositionOption", function(){
		it("should return coordinate value", function(){

		});
	});

	describe("getEdgeOption", function(){
		it("should return coordinate value", function(){

		});
	});

	describe("getOffsetOption", function(){
		it("should measure offset parent", function(){

		});
		it("should return offset object with parentPositioned, x, and y values", function(){

		});
	});

	describe("getDimensionsOption", function(){
		it("should call getDimensions on element", function(){

		});
		it("should return dimension object", function(){

		});
	});

	describe("getPosition", function(){
		it("should get position relative to options.relativeTo", function(){

		});
		it("should get position relative to toEdge", function(){

		});
		it("should get position relative to toMinimumMaximum", function(){

		});
		it("should get position relative to toRelFixedPosition", function(){

		});
		it("should get position relative to toIgnoreScroll", function(){

		});
		it("should get position relative to toIgnoreMargins", function(){

		});
		it("should call Math.ceil on positions", function(){

		});
		it("should return position object", function(){
		});
	});

	describe("toMinimumMaximum", function(){
		it("should return a position with min/max limits applied to it", function(){

		});		
	});
	describe("toRelFixedPosition", function(){
		it("should return a position with scroll applied if rel is fixed", function(){

		});
	});
	describe("toIgnoreScroll", function(){
		it("should return a position which ignores scrolling if ignorescroll options is present", function(){

		});
	});
	describe("toIgnoreMargins", function(){
		it("should return a position which ignores margins if ignoremargin options is present", function(){

		});
	});
	describe("toEdge", function(){
		it("should return a position relative to the edge specified in the edge option", function(){

		});
	});
	describe("getCoordinateFromValue", function(){
		it("should return a coordinates object from a string", function(){
		});
	});
});

describe("Element.position", function(){
	it("should call original position method if x,y array is passed", function(){

	});
	it("should call Element.Position.place with element and options if options object is passed", function(){

	});
});
