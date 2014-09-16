/*
---
name: Sortables
requires: [Core/Fx.Morph, Drag.Move]
provides: [Sortables]
...
*/

describe('Sortables', function () {

    // function to format for Syn
    function dragCenterPos(el) {
        var dragPos = el.getPosition();
        var dragSize = el.getSize();
        return {
            pageX: dragPos.x + Math.round(dragSize.x / 2),
            pageY: dragPos.y + Math.round(dragSize.y / 2)
        }
    }

    it('should fire the "complete" event after the clone is destroyed', function () {
        // support fiddle: http://jsfiddle.net/Px7sq/
        
        var environment = new Element('div', {
            styles: {
                width: '500px',
                height: '500px'
            }
        }).inject($(document.body));
        new Element('li', {
            alt: "1",
            styles: {
                width: '400px',
                height: '100px',
                backgroundColor: 'green'
            }
        }).inject(environment);
        new Element('li', {
            alt: "2",
            styles: {
                width: '400px',
                height: '100px',
                backgroundColor: 'black'
            }
        }).inject(environment);
        var presentElements = {
            withClones: 0,
            real: 0
        };
        var elements = document.getElements('li');
        
        new Sortables(environment, {
            clone: true,
            revert: true,
            onComplete: function () {
                this.serialize(function (el) {
                    presentElements.withClones++;
                });
                presentElements.real = this.elements.length;
            }
        });

        setTimeout(function () { // Syn needs some extra time
            Syn.drag({
                from: dragCenterPos(elements[0]),
                to: dragCenterPos(elements[1]),
                duration: 100
            }, elements[0]);
        }, 200);
        
        waits(400);
        runs(function () {
            expect(presentElements.withClones == presentElements.real).toBeTruthy();
            environment.destroy();
        });
    });
});