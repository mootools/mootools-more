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
window.addEvent("domready", function(){
    function getChildren($ele) {return new Elements($ele.childNodes);}//fix for #2527
    function tableFix(match, text) {
        var container = new Element('table');
        var tag = match[1].toLowerCase();
        if (['td', 'th', 'tr'].contains(tag)){
            container = new Element('tbody').inject(container);
            if (tag != 'tr') container = new Element('tr').inject(container);
        }
        return getChildren(container.set('html', text));
    }
    var table_re = /^\s*<(t[dhr]|tbody|tfoot|thead)/i;
    var range = document.createRange && document.createRange();
    if(range && range.createContextualFragment) {
        var reference = document.getElement("div");
        range.selectNode(reference);

        Elements.from = function(text, excludeScripts) {
            if (excludeScripts || excludeScripts == null) text = text.stripScripts();

            var match = text.match(table_re);
            if(match) return tableFix(match,text);

            return getChildren(range.createContextualFragment(text));
        };

    } else { //fall back for ie<9
        Elements.from = function(text, excludeScripts){
            if (excludeScripts || excludeScripts == null) text = text.stripScripts();

            var match = text.match(table_re);
            if(match) return tableFix(match,text);

            return getChildren(new Element('div').set('html', text));
        };
    }
});
