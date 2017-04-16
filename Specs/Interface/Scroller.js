/*
---
name: Scroller Tests
requires: [Core/Events, Core/Options, Core/Element.Event, Core/Element.Dimensions, MooTools.More]
provides: [Scroller.Tests]
...
*/
describe('Scroller', function(){

    var inner, wrapper, myScroller, body = $(document.body);

    beforeEach(function(){
        wrapper = new Element('div', {
            id: 'myScroll',
            styles: {
                width: 300,
                height: 200,
                overflow: 'scroll'
            }
        });
        wrapper.inject(body);
        inner = new Element('div', {
            styles: {
                width: 600,
                height: 400
            }
        }).inject(wrapper);

        myScroller = new Scroller('myScroll', {
            area: Math.round(window.getWidth() / 10)
        });
    });

    afterEach(function(){
        inner.destroy();
        wrapper.destroy();
        myScroller = null;
    });

    it('should initialize', function(){
        expect(myScroller.element).toEqual(wrapper);
    });

    it('should be error free when calling .scroll()', function(){
        expect(myScroller.scroll()).toBe(undefined);
    });

});
