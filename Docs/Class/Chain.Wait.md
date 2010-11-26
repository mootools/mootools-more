Class: Chain {#Chain}
=====================
Extends the [Chain][] class.

### Tutorial/Demo

* [Online Tutorial/Demo][]
[Online Tutorial/Demo]:http://www.clientcide.com/wiki/cnet-libraries/01.1-class.extras/01-chain.wait

Chain Method: wait {#Chain:wait}
--------------------------------

Injects pauses between chained events.

### Syntax

	myClass.wait(duration);

### Arguments

1. duration - (*number*) The duration (in milliseconds) to pause the chain stack; defaults to *500*.

### Example

	new Fx.Tween('myElement', {
		property: 'width',
		link: 'chain'
	}).start(0).wait(400).start(100);

### Returns

* (*object*) - This instance of the class.

Type: Element {#Element}
==========================

Extends the Element Type (if present) with methods to delay effect chains.

Element Method: chains {#Element:chains}
----------------------------------------

Sets the Element's "built in" effect instances (both [Fx.Tween][] and [Fx.Morph][]) link option to "chain".

### Syntax

	myElement.chains();

### Returns

* (*element*) - This element.

Element Method: pauseFx {#Element:pauseFx}
------------------------------------------

Pauses a specified effect chain using [Chain.wait][].

### Syntax

	myElement.pauseFx([duration, effect]);

### Arguments

1. duration - (*number*) The duration (in milliseconds) to pause the chain stack; defaults to *500*.
2. effect - (*string*) Either "tween" or "morph" (defaults to "tween" so you only need specify it if it's morph).

[Fx.Tween]: /core/Fx/Fx.Tween
[Fx.Morph]: /core/Fx/Fx.Morph
[Chain]: /core/Class/Class.Extras#Chain
[Chain.wait]: #Chain:wait
