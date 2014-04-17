/*
---

script: Elements.From.js

name: Elements.From

description: Returns a collection of elements from a string of html.

license: MIT-style license

authors:
  - Aaron Newton
  - adapted by Graeme Yeates

requires:
  - Core/String
  - Core/Element
  - /MooTools.More

provides: [Elements.from, Elements.From]

...
*/
(function() {
    var range;

    window.addEvent('domready', function(){
        range = document.createRange && document.createRange();
        if(range.createContextualFragment) { //ie >= 9
            range.selectNode(document.getElement('div'));
        } else {
            range = null;
        }
    });

    Node.from = function(text, excludeScripts){
        if (excludeScripts || excludeScripts == null) text = text.stripScripts();

        var match = text.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);
        if(match) {//table fix
            var container = new Element('table');
            var tag = match[1].toLowerCase();
            if (['td', 'th', 'tr'].contains(tag)){
                container = new Element('tbody').inject(container);
                if (tag != 'tr') container = new Element('tr').inject(container);
            }
            return new Elements(container.set('html', text).childNodes);
        }

        return new Elements((range ? range.createContextualFragment(text) : //use faster range if available
                                     new Element('div').set('html', text)).childNodes);
    };
    
    Elements.from = function(text, excludeScripts) {
        return Node.from(text, excludeScripts).filter(Type.isElement);
    };
})();
