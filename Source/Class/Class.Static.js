/*
---

script: Class.Static.js

name: Class.Static

description: Allow classes to define "static" methods from declaration, (as Object.extend afterwards).

license: MIT-style license.

authors:
  - Francois Leurent

requires:
  - Core/Class
  - /MooTools.More


provides: [Class.Static]

...
*/


Function.prototype.static = function(){
  this.$static = true;
  return this;
}

var legacy = Class.prototype.implement;
Class.implement('implement', function(k,v){
  if(v.$static) this[k] = v;
  else legacy.apply(this, [k, v]);
}.overloadSetter());

